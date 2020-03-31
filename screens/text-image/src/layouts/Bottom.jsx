/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TextImageComponent from '../TextImageComponent';

const propTypes = {
    box: MicromagPropTypes.box,
    reverse: PropTypes.bool,
};

const defaultProps = {
    box: {
        direction: null,
        axisAlign: 'bottom',
        crossAlign: null,
        spacing: 10,
    },
    reverse: false,
};

const TextImageBottom = ({ box, reverse, ...otherProps }) => {
    return <TextImageComponent box={box} reverse={reverse} {...otherProps} />;
};

TextImageBottom.propTypes = propTypes;
TextImageBottom.defaultProps = defaultProps;

export default TextImageBottom;
