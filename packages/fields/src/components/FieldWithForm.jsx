/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import get from 'lodash/get';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Label } from '@micromag/core/components';

import Fields from './Fields';

import styles from '../styles/field-with-form.module.scss';

const propTypes = {
    value: MicromagPropTypes.media,
    isForm: PropTypes.bool,
    label: PropTypes.node,
    thumbnail: PropTypes.node,
    labelPath: PropTypes.string,
    thumbnailPath: PropTypes.string,
    noValueLabel: MicromagPropTypes.label,
    isHorizontal: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const defaultProps = {
    value: null,
    isForm: false,
    label: null,
    thumbnail: null,
    labelPath: 'label',
    thumbnailPath: 'thumbnail',
    noValueLabel: (
        <FormattedMessage
            defaultMessage="Click to edit..."
            description="Label when no value is provided to Field with form"
        />
    ),
    isHorizontal: false,
    children: null,
    className: null,
    onChange: null,
    closeForm: null,
};

const FieldWithForm = ({
    value,
    isForm,
    noValueLabel,
    label,
    labelPath,
    thumbnail,
    thumbnailPath,
    isHorizontal,
    className,
    onChange,
    closeForm,
    children,
    ...props
}) => {
    if (isForm) {
        return children !== null ? (
            children
        ) : (
            <Fields {...props} className="p-2" value={value} onChange={onChange} />
        );
    }

    const labelElement = label !== null ? label : get(value, labelPath, null);

    let thumbnailElement = null;
    const thumbnailSrc = get(value, thumbnailPath, null);
    if (thumbnail !== null) {
        thumbnailElement = thumbnail;
    } else if (thumbnailSrc !== null) {
        thumbnailElement = <img src={thumbnailSrc} className={styles.thumbnail} alt={label} />;
    }
    return (
        <span
            className={classNames([
                'form-row',
                'align-items-center',
                'flex-nowrap',
                {
                    [className]: className !== null,
                },
            ])}
        >
            {thumbnailElement !== null || labelElement !== null ? (
                <>
                    {!isHorizontal && thumbnailElement !== null ? (
                        <span className="col-auto">{thumbnailElement}</span>
                    ) : null}
                    <span
                        className={classNames([
                            styles.label,
                            'col',
                            'text-monospace',
                            'text-left',
                            'text-truncate',
                            {
                                'text-left': !isHorizontal,
                                'text-right': isHorizontal,
                            },
                        ])}
                    >
                        {labelElement}
                    </span>
                    {isHorizontal && thumbnailElement !== null ? (
                        <span className="col-auto">{thumbnailElement}</span>
                    ) : null}
                </>
            ) : (
                <span
                    className={classNames([
                        'col',
                        'text-muted',
                        {
                            'text-left': !isHorizontal,
                            'text-right': isHorizontal,
                        },
                    ])}
                >
                    <Label>{noValueLabel}</Label>
                </span>
            )}
        </span>
    );
};

FieldWithForm.propTypes = propTypes;
FieldWithForm.defaultProps = defaultProps;
FieldWithForm.withForm = true;

export default FieldWithForm;