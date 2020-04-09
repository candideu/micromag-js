/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Box from '@micromag/component-box';
import Image from '@micromag/component-image';

import { PropTypes as MicromagPropTypes, Placeholders, PreviewBlock } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    ad: MicromagPropTypes.adFormat,
    background: MicromagPropTypes.backgroundComponent,
    isFullScreen: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    ad: {
        width: null,
        height: null,
        url: null,
        target: '_blank',
        iframe: null,
        image: null,
    },
    background: null,
    isFullScreen: false,
    renderFormat: 'view',
    className: null,
};

const AdScreen = ({ ad, background, isFullScreen, renderFormat, className }) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple } = getRenderFormat(renderFormat);
    const { width: adWidth, height: adHeight, url, iframe, image, target } = ad;

    const adStyle = {
        width: isFullScreen ? width : adWidth,
        height: isFullScreen ? height : adHeight,
    };

    const preview = isSimple ? <PreviewBlock {...adStyle} /> : null;

    let inner = null;
    inner =
        iframe !== null && !isSimple ? (
            <iframe className={styles.iframe} src={iframe} title="iframe" />
        ) : (
            preview
        );

    inner =
        image !== null && !isSimple ? (
            <Image className={styles.content} {...image} {...adStyle} alt="Ad" />
        ) : (
            preview
        );

    const content =
        url !== null ? (
            <a href={url} target={target} rel="noopener noreferer">
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
                    [styles.isFullScreen]: isFullScreen,
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.disabled]: isSimple,
                    [styles.isPreview]: renderFormat === 'preview',
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
                <Frame className={styles.frame} width={width} height={height}>
                    <Box withSmallSpacing={isSimple}>
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

export default AdScreen;
