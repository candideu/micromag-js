/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenPlaceholder } from '@micromag/core/components';

import Radios from './Radios';

import styles from '../styles/layout.module.scss';

const propTypes = {
    enums: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    enums: [],
    value: null,
    className: null,
    onChange: null,
};

const LayoutField = ({ enums, value, className, onChange }) => (
    <Radios
        options={enums.map(layout => ({
            value: layout,
            label: (
                <div className={styles.layout}>
                    <ScreenPlaceholder
                        screen={{
                            type: 'title',
                            layout,
                        }}
                    />
                </div>
            ),
        }))}
        value={value}
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
        buttonClassName={styles.button}
        onChange={onChange}
    />
);

LayoutField.propTypes = propTypes;
LayoutField.defaultProps = defaultProps;

export default LayoutField;