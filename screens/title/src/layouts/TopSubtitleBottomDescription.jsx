/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TitleScreen from '../TitleScreen';

const propTypes = {
    groups: PropTypes.arrayOf(PropTypes.array),
    grid: MicromagPropTypes.gridElement,
};

const defaultProps = {
    groups: [['description'], ['title'], ['subtitle']],
    grid: {
        layout: [
            {
                rows: 1,
                columns: [1],
            },
            {
                rows: 1,
                columns: [1],
            },
            {
                rows: 1,
                columns: [1],
            },
        ],
        reverse: true,
    },
};

const TitleTopSubtitleBottomDescription = ({ grid, groups, ...otherProps }) => {
    return <TitleScreen grid={grid} groups={groups} {...otherProps} />;
};

TitleTopSubtitleBottomDescription.propTypes = propTypes;
TitleTopSubtitleBottomDescription.defaultProps = defaultProps;

export default TitleTopSubtitleBottomDescription;