/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import GalleryScrollScreen from '../GalleryScrollScreen';

const propTypes = {
    columns: PropTypes.arrayOf(PropTypes.number),
};

const defaultProps = {
    columns: [2],
};

const GalleryScrollDouble = ({ columns, ...otherProps }) => {
    return <GalleryScrollScreen columns={columns} {...otherProps} />;
};

GalleryScrollDouble.propTypes = propTypes;
GalleryScrollDouble.defaultProps = defaultProps;

export default GalleryScrollDouble;