/* eslint-disable react/no-array-index-key, react/no-danger, react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button as CoreButton } from '@micromag/core/components';
import { getStyleFromText, getStyleFromColor, getStyleFromRounded } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    style: PropTypes.shape({
        text: MicromagPropTypes.textStyle,
        color: MicromagPropTypes.color,
        rounded: PropTypes.bool,
    }),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
};

const defaultProps = {
    style: null,
    disabled: false,
    onClick: null,
    children: null,
    className: null,
};

const Button = ({ style, disabled, onClick, children, className }) => {
    let finalStyle = null;

    const { text: textStyle = null, color: backgroundColor = null, rounded = null } = style || {};
    if (textStyle !== null) {
        finalStyle = {
            ...finalStyle,
            ...getStyleFromText(textStyle),
        };
    }

    if (backgroundColor !== null) {
        finalStyle = {
            ...finalStyle,
            ...getStyleFromColor(backgroundColor, 'backgroundColor'),
        };
    }

    if (rounded !== null) {
        finalStyle = {
            ...finalStyle,
            ...getStyleFromRounded(rounded),
        };
    }

    return (
        <CoreButton
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={finalStyle}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </CoreButton>
    );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;