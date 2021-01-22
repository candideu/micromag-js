/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { ScreenElement, TransitionsStagger } from '@micromag/core/components';
import { useResizeObserver, useTrackScreenEvent } from '@micromag/core/hooks';
import { isImageFilled, isTextFilled } from '@micromag/core/utils';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Image from '@micromag/element-image';
import Text from '@micromag/element-text';

import styles from './styles.module.scss';


const propTypes = {
    layout: PropTypes.oneOf(['normal', 'reverse']),
    images: PropTypes.oneOf([MicromagPropTypes.imageElementsWithCaption, MicromagPropTypes.imagesMedias]),
    withCaptions: PropTypes.bool,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    type: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'normal',
    images: [],
    withCaptions: false,
    spacing: 20,
    background: null,
    current: true,
    active: true,
    transitions: null,
    transitionStagger: 75,
    type: null,
    className: null,
};

const GalleryFeedScreen = ({
    layout,
    images,
    withCaptions,
    spacing,
    background,
    current,
    active,
    transitions,
    transitionStagger,
    type,
    className,    
}) => {
    const trackScreenEvent = useTrackScreenEvent(type);
    const { width, height, landscape } = useScreenSize();
    const { menuSize } = useViewer();

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const imagesCount = images.length;
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const ready = imagesLoaded >= imagesCount;
    const transitionPlaying = current && ready;
    const transitionDisabled = !isView && !isEdit;
    const trackingEnabled = isView;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    const isReversed = layout === 'reverse';

    const items = [];

    const editImages = isEdit && images.length === 0 ? [null] : images;
    const finalImages = isPlaceholder ? [...Array(5)] : editImages;

    const {
        ref: firstImageRef,
        entry: { contentRect },
    } = useResizeObserver();
    const { width: firstImageRefWidth } = contentRect || {};

    const onScrolledBottom = useCallback(() => {
        if (trackingEnabled) {
            trackScreenEvent('scroll', 'screen');
        }
    }, [trackScreenEvent, trackingEnabled]);

    finalImages.forEach((image, index) => {
        const finalImage = withCaptions ? image : { media: image };
        const { caption = null } = finalImage || {};
        const hasImage = isImageFilled(finalImage);
        const hasCaption = isTextFilled(caption);

        const imageElement = (
            <ScreenElement
                key={`image-${index}`}
                placeholder="image"
                emptyLabel={
                    <FormattedMessage defaultMessage="Image" description="Image placeholder" />
                }
                emptyClassName={styles.emptyImage}
                isEmpty={!hasImage}
            >
                <div className={styles.imageContainer} ref={index === 0 ? firstImageRef : null}>
                    <Image
                        {...finalImage}
                        width={firstImageRefWidth}
                        onLoaded={onImageLoaded}
                    />
                </div>
            </ScreenElement>
        );

        let captionElement = null;

        if (withCaptions) {
            const marginTop = !isReversed || index > 0 ? spacing / 2 : 0;
            const marginBottom = isReversed || index < finalImages.length - 1 ? spacing / 2 : 0;
            captionElement = (
                <ScreenElement
                    key={`caption-${index}`}
                    placeholder="text"
                    placeholderProps={{ lines: 2 }}
                    emptyLabel={
                        <FormattedMessage
                            defaultMessage="Caption"
                            description="Caption placeholder"
                        />
                    }
                    emptyClassName={styles.emptyCaption}
                    isEmpty={!hasCaption}
                >
                    <div
                        className={styles.caption}
                        style={{
                            marginTop,
                            marginBottom,
                        }}
                    >
                        <Text {...caption} className={styles.captionText} />
                    </div>
                </ScreenElement>
            );
        }

        if (isReversed) {
            if (withCaptions) {
                items.push(captionElement);
            }
            items.push(imageElement);
        } else {
            items.push(imageElement);
            if (withCaptions) {
                items.push(captionElement);
            }
        }

        if (!isPlaceholder && index < finalImages.length - 1) {
            items.push(<div key={`spacing-${index}`} style={{ height: spacing }} />);
        }
    });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEdit && active)}
            />

            <Container width={width} height={height}>
                <Scroll disabled={isPlaceholder || isPreview || !current} onScrolledBottom={onScrolledBottom}>
                    <Layout
                        className={styles.layout}
                        style={
                            !isPlaceholder
                                ? {
                                      padding: spacing,
                                      paddingTop: (!landscape && !isPreview ? menuSize : 0) + spacing,
                                  }
                                : null
                        }
                    >
                        <TransitionsStagger
                            transitions={transitions}
                            stagger={transitionStagger}
                            disabled={transitionDisabled}
                            playing={transitionPlaying}
                        >
                            {items}
                        </TransitionsStagger>
                    </Layout>
                </Scroll>
            </Container>
        </div>
    );
};

GalleryFeedScreen.propTypes = propTypes;
GalleryFeedScreen.defaultProps = defaultProps;

export default React.memo(GalleryFeedScreen);
