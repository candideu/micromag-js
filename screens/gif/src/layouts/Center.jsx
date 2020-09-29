/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import GifScreen from '../GifScreen';

const propTypes = {
    box: MicromagPropTypes.boxElement,
    fit: PropTypes.shape({
        size: PropTypes.string,
    }),
    defaultParams: PropTypes.shape({
        loop: PropTypes.bool,
        autoPlay: PropTypes.bool,
        muted: PropTypes.bool,
        controls: PropTypes.bool,
    }),
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
    fit: { size: 'contain' },
    defaultParams: {
        loop: true,
        autoPlay: true,
        muted: true,
        controls: false,
    },
};

const GifCenter = ({ ...props }) => {
    return <GifScreen {...props} />;
};

GifCenter.propTypes = propTypes;
GifCenter.defaultProps = defaultProps;

export default GifCenter;