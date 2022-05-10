/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { getStyleFromBox } from '@micromag/core/utils';
import styles from '../styles/box-style.module.scss';
import FieldWithForm from './FieldWithForm';

const propTypes = {
    value: PropTypes.shape({
        color: PropTypes.string,
        alpha: PropTypes.number,
    }),
    isForm: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const defaultProps = {
    value: null,
    isForm: false,
    isHorizontal: false,
    className: null,
    onChange: null,
    closeForm: null,
};

const DropShadowForm = ({ value, onChange, closeForm, ...props }) => {
    const previewElement =
        value !== null ? (
            <span className={styles.preview}>
                <span
                    className={styles.box}
                    style={{
                        ...getStyleFromBox(value),
                        padding: 0,
                    }}
                />
            </span>
        ) : null;
    return (
        <FieldWithForm
            isForm
            value={value}
            onChange={onChange}
            thumbnail={previewElement}
            noValueLabel={
                <FormattedMessage defaultMessage="Edit style..." description="No value label" />
            }
            {...props}
        />
    );
};

DropShadowForm.propTypes = propTypes;
DropShadowForm.defaultProps = defaultProps;
DropShadowForm.withForm = true;

export default DropShadowForm;
