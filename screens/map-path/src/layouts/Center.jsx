/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import MapPathScreen from '../MapPathScreen';

const propTypes = {
    box: PropTypes.shape({
        direction: MicromagPropTypes.flexDirection,
    }),
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
};

const MapCenter = ({ box, ...otherProps }) => {
    return <MapPathScreen box={box} {...otherProps} />;
};

MapCenter.propTypes = propTypes;
MapCenter.defaultProps = defaultProps;

export default MapCenter;
