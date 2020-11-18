/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import classNames from 'classnames';

import styles from '../../styles/partials/placeholder-text.module.scss';

const propTypes = {
    lines: PropTypes.number,
    lineMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    fontSize: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    lines: 1,
    lineMargin: null,
    width: '3em',
    height: null,
    fontSize: 16,
    className: null,
};

const PlaceholderText = ({ lines, lineMargin, width, height, fontSize, className }) => {
    const lineHeight =
        height !== null && isNumber(height) ? `${Math.round(height * fontSize)}px` : height;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            {[...Array(lines)].map((e, index) => (
                <div
                    key={`line-${index}`}
                    className={styles.line}
                    style={{
                        width,
                        height: lineHeight,
                    }}
                />
            ))}
        </div>
    );
};

PlaceholderText.propTypes = propTypes;
PlaceholderText.defaultProps = defaultProps;

export default PlaceholderText;