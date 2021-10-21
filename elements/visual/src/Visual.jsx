/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { getSizeWithinBounds } from '@folklore/size';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import Image from '@micromag/element-image';
import Video from '@micromag/element-video';

import styles from './styles.module.scss';

const propTypes = {
    media: MicromagPropTypes.media,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    objectFit: MicromagPropTypes.objectFit,
    videoAutoplay: PropTypes.bool,
    videoLoop: PropTypes.bool,
    videoInitialMuted: PropTypes.bool,
    onLoaded: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    media: null,
    width: null,
    height: null,
    objectFit: null,
    videoAutoplay: true,
    videoLoop: true,
    videoInitialMuted: true,
    onLoaded: null,
    className: null,
};

const Visual = ({
    media,
    width,
    height,
    objectFit,
    videoAutoplay,
    videoLoop,
    videoInitialMuted,
    onLoaded,
    className,
    ...props
}) => {
    const { type = null, thumbnail_url:thumbnailUrl = null } = media || {};

    const elProps = { ...props, media };
    const imageElProps = type === 'video' && !videoAutoplay ? {...elProps, media: { url: thumbnailUrl }} : elProps;

    let videoContainerStyle = null;

    if (type === 'video' && objectFit !== null && videoAutoplay) {
        const { fit = 'cover' } = objectFit || {};
        const { metadata: videoMetadata = null } = media || {};
        const { width: videoWidth = 0, height: videoHeight = 0 } = videoMetadata || {};
        const {
            width: resizedVideoWidth,
            height: resizedVideoHeight,
        } = getSizeWithinBounds(videoWidth, videoHeight, width, height, { cover: fit === 'cover' });

        const resizedVideoLeft = -(resizedVideoWidth - width) / 2;
        const resizedVideoTop = -(resizedVideoHeight - height) / 2;

        videoContainerStyle = {
            width: resizedVideoWidth,
            height: resizedVideoHeight,
            left: resizedVideoLeft,
            top: resizedVideoTop,
        };
    }

    return type !== null ? (
        <>
            {type === 'image' || !videoAutoplay ? (
                <Image
                    {...imageElProps}
                    objectFit={objectFit}
                    width={width}
                    height={height}
                    onLoaded={onLoaded}
                    className={classNames([styles.container, { [className]: className !== null }])}
                />
            ) : null}
            {type === 'video' && videoAutoplay ? (
                <div
                    className={classNames([styles.container, { [className]: className !== null }])}
                    style={{ width, height }}
                >
                    <div style={videoContainerStyle} className={styles.videoContainer}>
                        <Video
                            {...elProps}
                            width={objectFit === null ? width : null}
                            height={objectFit === null ? height : null}
                            autoPlay
                            loop={videoLoop}
                            initialMuted={videoInitialMuted}
                            onReady={onLoaded}
                        />
                    </div>
                </div>
            ) : null}
        </>
    ) : null;
};

Visual.propTypes = propTypes;
Visual.defaultProps = defaultProps;

export default Visual;
