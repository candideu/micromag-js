/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Image from '@micromag/element-image';
import Text from '@micromag/element-text';

import {
    PropTypes as MicromagPropTypes,
    PlaceholderImage,
    PlaceholderText,
    Empty,
} from '@micromag/core';
import { getRenderFormat } from '@micromag/core/utils';
import { useScreenSize } from '@micromag/core/contexts';
import Transitions from '@micromag/core/src/components/transitions/Transitions';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'center', 'bottom', 'split']),
    image: MicromagPropTypes.imageMedia,
    image2: MicromagPropTypes.imageMedia,
    text: MicromagPropTypes.textElement,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',
    image: null,
    image2: null,
    text: null,
    background: null,
    current: true,
    active: true,
    renderFormat: 'view',
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 1000,
        },
        out: 'scale',
    },
    transitionStagger: 100,
    className: null,
};

const TwoImages = ({
    layout,
    image,
    image2,
    text,
    background,
    current,
    active,
    renderFormat,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPlaceholder, isEditor } = getRenderFormat(renderFormat);

    const withText = text !== null;
    const withImage = image !== null;
    const withImage2 = image2 !== null;
    const isEmpty = isEditor && !withText && !withImage;

    const imagesCount = [withImage, withImage2].reduce(
        (acc, curr) => acc + (curr ? 1 : 0),
        0,
    );
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const ready = imagesLoaded >= imagesCount;
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    let imageElement = null;
    let image2Element = null;
    let textElement = null;

    if (isPlaceholder) {
        imageElement = <PlaceholderImage />;
        image2Element = <PlaceholderImage />;
        textElement = <PlaceholderText />;
    } else if (isEmpty) {
        imageElement = (
            <Empty className={classNames([styles.empty, styles.emptyImage])}>
                <FormattedMessage defaultMessage="Image" description="Image placeholder" />
            </Empty>
        );
        image2Element = (
            <Empty className={classNames([styles.empty, styles.emptyImage])}>
                <FormattedMessage
                    defaultMessage="Second image"
                    description="Second image placeholder"
                />
            </Empty>
        );
        textElement = (
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Title" description="Title placeholder" />
            </Empty>
        );
    } else {
        let transitionDelay = 0;

        const createElement = (children) => {
            const element = (
                <Transitions
                    transitions={transitions}
                    delay={transitionDelay}
                    playing={transitionPlaying}
                >
                    {children}
                </Transitions>
            );
            transitionDelay += transitionStagger;
            return element;
        };

        if (withImage) {
            imageElement = createElement(
                <Image
                    {...image}
                    objectFit={{ size: 'cover' }}
                    onLoaded={onImageLoaded}
                />,
            );
        }

        if (withImage2) {
            image2Element = createElement(
                <Image
                    {...image2}
                    objectFit={{ size: 'cover' }}
                    onLoaded={onImageLoaded}
                />,
            );
        }

        if (withText) {
            textElement = createElement(<Text {...text} />);
        }
    }

    // Add elements to items

    const items = [];
    if (imageElement !== null) {
        items.push(imageElement);
    }

    if (textElement !== null) {
        items.push(textElement);
    }

    if (image2Element !== null) {
        items.push(image2Element);
    }

    // convert layout to Container props
    const layoutChunks = layout.split('-');
    const isDistribution = layoutChunks[0] === 'split';
    const verticalAlign = isDistribution ? layoutChunks[1] : layoutChunks[0];
    const distribution = isDistribution ? 'between' : null;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEditor && active)}
                maxRatio={maxRatio}
            />
            <Container
                width={width}
                height={height}
                maxRatio={maxRatio}
                verticalAlign={verticalAlign}
                distribution={distribution}
            >
                {items}
            </Container>
        </div>
    );
};

TwoImages.propTypes = propTypes;
TwoImages.defaultProps = defaultProps;

export default React.memo(TwoImages);
