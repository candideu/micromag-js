/* eslint-disable react/no-array-index-key, react/button-has-type, jsx-a11y/label-has-associated-control */
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons/faDotCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import styles from '../styles/position.module.scss';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import getSelectOptions from '../utils/getSelectOptions';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    axisOptions: PropTypes.arrayOf(PropTypes.string),
    crossOptions: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    axisOptions: ['top', 'center', 'bottom'],
    crossOptions: ['left', 'center', 'right'],
    className: null,
    buttonClassName: null,
    onChange: null,
};

const Icon = ({ label }) => {
    switch (label) {
        case 'top-left':
            return <FontAwesomeIcon icon={faArrowUp} className={styles.rotateLeft} />;
        case 'top-center':
            return <FontAwesomeIcon icon={faArrowUp} className={styles.icon} />;
        case 'top-right':
            return <FontAwesomeIcon icon={faArrowUp} className={styles.rotateRight} />;
        case 'center-left':
            return <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />;
        case 'center-center':
            return <FontAwesomeIcon icon={faDotCircle} className={styles.icon} />;
        case 'center-right':
            return <FontAwesomeIcon icon={faArrowRight} className={styles.icon} />;
        case 'bottom-left':
            return <FontAwesomeIcon icon={faArrowDown} className={styles.rotateRight} />;
        case 'bottom-center':
            return <FontAwesomeIcon icon={faArrowDown} className={styles.icon} />;
        case 'bottom-right':
            return <FontAwesomeIcon icon={faArrowDown} className={styles.rotateLeft} />;
        default:
    }
    return null;
};

Icon.propTypes = { label: PropTypes.string.isRequired };

const Position = ({
    name,
    value,
    axisOptions: vertical,
    crossOptions: horizontal,
    className,
    buttonClassName,
    onChange,
}) => {
    const axisOptions = useMemo(() => getSelectOptions(vertical), [vertical]);
    const crossOptions = useMemo(() => getSelectOptions(horizontal), [horizontal]);
    const { axisAlign = null, crossAlign = null } = value || {};
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
            {axisOptions.map(({ value: axisOption, label: axisLabel }) =>
                crossOptions.map(({ value: crossOption, label: crossLabel }) => (
                    <label
                        key={`radio-${axisOption}-${crossOption}`}
                        className={classNames([
                            'btn',
                            'btn-outline-secondary',
                            {
                                [styles.button]: true,
                                active: axisOption === axisAlign && crossOption === crossAlign,
                                [buttonClassName]: buttonClassName !== null,
                            },
                        ])}
                    >
                        <input
                            type="radio"
                            name={name}
                            autoComplete="off"
                            value={`${axisOption}-${crossOption}`}
                            onChange={(e) => {
                                if (onChange !== null) {
                                    onChange(
                                        e.currentTarget.checked
                                            ? {
                                                  axisAlign: axisOption,
                                                  crossAlign: crossOption,
                                              }
                                            : value,
                                    );
                                }
                            }}
                            checked={axisOption === axisAlign && crossOption === crossAlign}
                        />{' '}
                        <Icon label={`${axisLabel}-${crossLabel}`} />
                    </label>
                )),
            )}
        </div>
    );
};

Position.propTypes = propTypes;
Position.defaultProps = defaultProps;

export default Position;
