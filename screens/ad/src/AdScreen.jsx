/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Box from '@micromag/element-box';
import Image from '@micromag/element-image';
// import Link from '@micromag/element-link';

import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    image: MicromagPropTypes.imageElement,
    link: MicromagPropTypes.linkElement,
    box: MicromagPropTypes.boxElement,
    background: MicromagPropTypes.backgroundElement,
    visible: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    image: null,
    link: null,
    box: null,
    background: null,
    visible: true,
    renderFormat: 'view',
    className: null,
};

const AdScreen = ({
    image: imageElement,
    link: linkElement,
    box,
    background,
    visible,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPlaceholder, isSimple, isEditor } = getRenderFormat(renderFormat);

    const { url, target = '_blank', rel = 'noopener noreferer' } = linkElement || {};
    const { image: { url: imageUrl = null } = {} } = imageElement || {};

    // console.log('ad', linkElement, imageElement);

    const inner =
        imageUrl || isEditor ? (
            <Image
                className={styles.content}
                emptyClassName={styles.empty}
                caption="Ad"
                {...imageElement}
                {...(isEditor && imageUrl === null
                    ? {
                          resize: true,
                          showEmpty: true,
                      }
                    : { width, height })}
            />
        ) : null;

    const content =
        url !== null && isView ? (
            <a href={url} target={target} rel={rel}>
                {inner}
            </a>
        ) : (
            inner
        );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.disabled]: isSimple,
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                className={styles.background}
            >
                <Frame className={styles.frame} width={width} height={height} visible={visible}>
                    <Box {...box} withSmallSpacing={isSimple}>
                        {isPlaceholder ? (
                            <Placeholders.Ad className={styles.placeholder} />
                        ) : (
                            content
                        )}
                    </Box>
                </Frame>
            </Background>
        </div>
    );
};

AdScreen.propTypes = propTypes;
AdScreen.defaultProps = defaultProps;

export default React.memo(AdScreen);
