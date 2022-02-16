/* eslint-disable react/no-array-index-key, react/button-has-type, jsx-a11y/label-has-associated-control */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import getSelectOptions from '../utils/getSelectOptions';

import styles from '../styles/checkboxes.module.scss';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.string),
    options: MicromagPropTypes.selectOptions,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    options: [],
    className: null,
    onChange: null,
};

const Checkboxes = ({ name, value, options, className, onChange }) => {
    const finalOptions = useMemo(() => getSelectOptions(options), [options]);
    return (
        <div
            className={classNames([
                'btn-group',
                'btn-group-toggle',
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            data-toggle="buttons"
        >
            {finalOptions.map(({ value: optionValue, label }) => (
                <label
                    key={`radio-${optionValue}`}
                    className={classNames([
                        'btn',
                        'btn-outline-secondary',
                        {
                            active: value !== null && value.indexOf(optionValue) !== -1,
                        },
                    ])}
                >
                    <input
                        type="checkbox"
                        name={`${name}[]`}
                        autoComplete="off"
                        value={optionValue}
                        className="btn-check"
                        onChange={e => {
                            let newValue = value || [];
                            if (e.currentTarget.checked) {
                                newValue.push(optionValue);
                            } else {
                                newValue = value !== null ? value.filter(it => it !== optionValue) : null;
                            }
                            if (newValue.length === 0) {
                                newValue = null;
                            }
                            if (onChange !== null) {
                                onChange(newValue);
                            }
                        }}
                        checked={value !== null && value.indexOf(optionValue) !== -1}
                    />{' '}
                    {label}
                </label>
            ))}
        </div>
    );
};

Checkboxes.propTypes = propTypes;
Checkboxes.defaultProps = defaultProps;

export default Checkboxes;
