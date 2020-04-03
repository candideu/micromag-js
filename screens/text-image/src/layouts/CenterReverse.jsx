/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextImageComponent from '../TextImageComponent';

const propTypes = {
    box: MicromagPropTypes.boxComponent,
    reverse: PropTypes.bool,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
    reverse: true,
};

const TextImageCenterReverse = ({ box, reverse, ...otherProps }) => {
    return <TextImageComponent box={box} reverse={reverse} {...otherProps} />;
};

TextImageCenterReverse.propTypes = propTypes;
TextImageCenterReverse.defaultProps = defaultProps;

export default TextImageCenterReverse;
