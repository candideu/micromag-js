/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading, jsx-a11y/label-has-associated-control */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, Label } from '@micromag/core/components';

import FieldErrors from './FieldErrors';
import FieldHelp from './FieldHelp';

import styles from '../styles/field-row.module.scss';

const propTypes = {
    label: MicromagPropTypes.label,
    errors: MicromagPropTypes.errors,
    help: MicromagPropTypes.label,
    children: PropTypes.node,
    isSection: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    isListItem: PropTypes.bool,
    withoutLabel: PropTypes.bool,
    withSettings: PropTypes.bool,
    withForm: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    buttonTheme: MicromagPropTypes.buttonTheme,
    buttonOutline: PropTypes.bool,
    gotoSettings: PropTypes.func,
    gotoForm: PropTypes.func,
    className: PropTypes.string,
    labelClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
};

const defaultProps = {
    label: null,
    errors: null,
    help: null,
    children: null,
    isSection: false,
    isHorizontal: false,
    isListItem: false,
    withoutLabel: false,
    withSettings: false,
    withForm: false,
    buttonTheme: null,
    buttonOutline: false,
    gotoSettings: null,
    gotoForm: null,
    className: null,
    labelClassName: null,
    buttonClassName: null,
};

const FieldRow = ({
    label,
    errors,
    help,
    children,
    isSection,
    isHorizontal,
    isListItem,
    withoutLabel,
    withSettings,
    withForm,
    buttonTheme,
    buttonOutline,
    gotoForm,
    gotoSettings,
    className,
    labelClassName,
    buttonClassName,
}) => {
    const withLabel = !withoutLabel && label !== null;
    const isClickable = withForm;

    const onClickRow = useCallback(() => {
        if (typeof withForm === 'string') {
            gotoForm(withForm);
        } else if (withForm) {
            gotoForm();
        }
    }, [withForm, gotoForm]);

    const containerClassName = classNames([
        'form-group',
        {
            'list-group-item': isListItem,
            'mb-0': isListItem,
            'py-2': isListItem,
            'px-2': isListItem,
            [className]: className !== null,
        },
    ]);

    const labelElement = (
        <label
            className={classNames({
                'col-form-label': isHorizontal || withSettings,
                'col-auto': isHorizontal,
                col: !isHorizontal && withSettings,
                'py-0': isHorizontal,
                'text-truncate': isHorizontal,
                'font-weight-normal': !isSection,
                'font-weight-bold': isSection,
                [labelClassName]: labelClassName !== null,
            })}
        >
            <Label>{label}</Label>
        </label>
    );

    const helpElement = help !== null ? <FieldHelp>{help}</FieldHelp> : null;

    const errorsElement =
        errors !== null && errors.length > 0 ? <FieldErrors errors={errors} /> : null;

    const arrowElement = isClickable ? (
        <span className="col-auto">
            <FontAwesomeIcon icon={faAngleRight} />
        </span>
    ) : null;

    if (isHorizontal) {
        const rowInner = (
            <span className={classNames(['form-row', 'align-items-center', 'flex-nowrap'])}>
                {labelElement}
                <span className={classNames(['col', styles.colValue])}>{children}</span>
                {arrowElement}
                {helpElement}
                {errorsElement}
            </span>
        );

        return isClickable ? (
            <>
                <button
                    type="button"
                    className={classNames([
                        containerClassName,
                        {
                            [styles.resetButton]: !isListItem,
                            'd-block': !isListItem,
                            'p-2': !isListItem,
                        },
                    ])}
                    onClick={onClickRow}
                >
                    {rowInner}
                </button>
            </>
        ) : (
            <div className={containerClassName}>{rowInner}</div>
        );
    }
    return (
        <div className={containerClassName}>
            {withLabel ? (
                <>
                    {withSettings ? (
                        <div className={classNames(['form-row', 'align-items-center'])}>
                            {labelElement}
                            <div className={classNames(['col-auto'])}>
                                <Button withoutStyle onClick={gotoSettings}>
                                    <FontAwesomeIcon icon={faSlidersH} />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        labelElement
                    )}
                </>
            ) : null}
            {isClickable ? (
                <Button
                    className={classNames([
                        'd-block',
                        'w-100',
                        'px-2',
                        {
                            'bg-white': buttonTheme === null,
                            'text-dark': buttonTheme === null,
                            [buttonClassName]: buttonClassName !== null,
                        },
                    ])}
                    theme={buttonTheme}
                    outline={buttonOutline}
                    onClick={onClickRow}
                >
                    <span className="form-row align-items-center">
                        <span className={classNames(['col', styles.colValue])}>{children}</span>
                        {arrowElement}
                    </span>
                </Button>
            ) : (
                children
            )}
            {helpElement}
            {errorsElement}
        </div>
    );
};

FieldRow.propTypes = propTypes;
FieldRow.defaultProps = defaultProps;

export default FieldRow;
