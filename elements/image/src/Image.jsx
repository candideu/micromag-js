/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextElement from '@micromag/element-text';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromImage, getStyleFromContainer } from '@micromag/core/utils';

// import { getSizeWithinBounds } from '@folklore/size';

import styles from './styles.module.scss';

const propTypes = {
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    name: PropTypes.string,
    caption: PropTypes.string,
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fit: MicromagPropTypes.objectFit,
    imageStyle: MicromagPropTypes.imageStyle,
    containerStyle: MicromagPropTypes.containerStyle,
    captionStyle: MicromagPropTypes.textStyle,
    className: PropTypes.string,
    imageClassName: PropTypes.string,
};

const defaultProps = {
    url: null,
    width: null,
    height: null,
    name: null,
    caption: null,
    maxWidth: null,
    maxHeight: null,
    fit: null,
    imageStyle: {},
    containerStyle: {},
    captionStyle: {},
    className: null,
    imageClassName: null,
};

const Image = ({
    url,
    width: imageWidth,
    height: imageHeight,
    name,
    caption,
    maxWidth,
    maxHeight,
    fit: defaultFit,
    imageStyle,
    containerStyle,
    captionStyle,
    className,
    imageClassName,
}) => {
    const width = maxWidth !== null ? Math.min(imageWidth, maxWidth) : null;
    const height = maxHeight !== null ? Math.min(imageHeight, maxHeight) : null;

    // Much much simpler now
    const { size = 'contain' } = defaultFit || {};

    // const imgRef = useRef(null);
    // const imageSize = useRef({ width: null, height: null });
    // const onLoad = useCallback(() => {
    //     imageSize.current.width = imgRef.current.width;
    //     imageSize.current.height = imgRef.current.height;
    // }, [imgRef.current]);

    let fill = false;
    let alt = name || 'image';
    let finalStyle = {
        width,
        height,
        objectFit: size,
    };
    if (imageStyle !== null) {
        finalStyle = {
            ...finalStyle,
            ...getStyleFromImage(imageStyle),
        };
        if (imageStyle.alt) {
            alt = imageStyle.alt;
        }
        if (imageStyle.fit) {
            if (imageStyle.fit.fill) {
                fill = imageStyle.fit.fill;
            }
        }
    }

    let containerFinalStyle = {
        width: fill ? '100%' : maxWidth,
        height: fill ? '100%' : maxHeight,
    };

    if (containerStyle !== null) {
        containerFinalStyle = {
            ...containerFinalStyle,
            ...getStyleFromContainer(containerStyle),
        };
    }

    // console.log('is', imageStyle, finalStyle, containerStyle, containerFinalStyle);

    const img = url ? (
        <img
            src={url}
            alt={alt || name}
            className={classNames([
                styles.img,
                {
                    [imageClassName]: imageClassName !== null,
                },
            ])}
            style={finalStyle}
        />
    ) : null;

    // console.log(className);

    return (
        <div
            id="image"
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={containerFinalStyle}
        >
            {img}
            {url && caption ? (
                <div className={styles.caption}>
                    <TextElement body={caption} style={captionStyle} className={styles.text} />
                </div>
            ) : null}
        </div>
    );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
