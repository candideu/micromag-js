/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import GalleryScrollScreen from '../GalleryScrollScreen';

const propTypes = {
    columns: PropTypes.arrayOf(PropTypes.number),
};

const defaultProps = {
    columns: [1],
};

const GalleryScrollSingle = ({ columns, ...otherProps }) => {
    return <GalleryScrollScreen columns={columns} {...otherProps} />;
};

GalleryScrollSingle.propTypes = propTypes;
GalleryScrollSingle.defaultProps = defaultProps;

export default GalleryScrollSingle;
