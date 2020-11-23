/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useFieldsManager } from '@micromag/core/contexts';

import FieldRow from './FieldRow';

const propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    component: PropTypes.nodeType,
    label: MicromagPropTypes.label,
    help: MicromagPropTypes.label,
    errors: MicromagPropTypes.errors,
    value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    fields: MicromagPropTypes.formFields,
    isHorizontal: PropTypes.bool,
    isSection: PropTypes.bool,
    onChange: PropTypes.func,
    gotoFieldForm: PropTypes.func,
    closeFieldForm: PropTypes.func,
    className: PropTypes.string,
    labelClassName: PropTypes.string,
};

const defaultProps = {
    type: null,
    component: null,
    label: null,
    help: null,
    value: null,
    errors: null,
    fields: undefined,
    isHorizontal: null,
    isSection: false,
    onChange: null,
    gotoFieldForm: null,
    closeFieldForm: null,
    className: null,
    labelClassName: null,
};

const Field = ({
    name,
    type,
    component: providedComponent,
    label,
    help,
    errors,
    fields: providedFields,
    isHorizontal,
    isSection,
    value,
    onChange,
    gotoFieldForm,
    closeFieldForm,
    className,
    labelClassName,
    fieldRowClassName,
    ...props
}) => {
    const fieldsManager = useFieldsManager();
    const FieldsComponent = fieldsManager.getComponent('fields');
    const {
        component: FieldComponent = FieldsComponent,
        fields = providedFields,
        settings = null,
        withoutLabel = false,
        withoutFieldRow = false,
        isList = false,
        ...fieldProps
    } = (type !== null ? fieldsManager.getDefinition(type) || null : null) || {
        component: providedComponent,
    };
    const isFields = FieldComponent === FieldsComponent;

    const gotoForm = useCallback((form) => gotoFieldForm(name, form), [name, gotoFieldForm]);
    const closeForm = useCallback((form) => closeFieldForm(name, form), [name, closeFieldForm]);
    const gotoSettings = useCallback(() => gotoForm('settings'), [gotoForm]);

    if (FieldComponent === null) {
        return null;
    }

    const finalIsHorizontal =
        isHorizontal !== null
            ? isHorizontal
            : FieldComponent.isHorizontal || typeof FieldComponent.withForm !== 'undefined' || null;
    const finalWithoutLabel = withoutLabel || FieldComponent.withoutLabel || false;
    const finalWithSettings =
        settings !== null ||
        (typeof FieldComponent.withSettings !== 'undefined' && FieldComponent.withSettings) ||
        typeof FieldComponent.settingsComponent !== 'undefined' ||
        false;
    const finalWithForm = FieldComponent.withForm || false;

    const fieldElement = (
        <FieldComponent
            isHorizontal={finalIsHorizontal && !isFields}
            isList={isList}
            labelClassName={classNames({
                'col-sm-3': isHorizontal && isFields,
                [labelClassName]: labelClassName !== null,
            })}
            {...props}
            {...fieldProps}
            errors={errors}
            fields={fields}
            name={name}
            value={value}
            onChange={onChange}
            gotoFieldForm={gotoFieldForm}
            gotoForm={gotoForm}
        />
    );

    // console.log(type, fieldElement, value, props);

    return !withoutFieldRow ? (
        <FieldRow
            label={label}
            errors={errors}
            help={help}
            isHorizontal={finalIsHorizontal || false}
            isSection={isSection}
            withoutLabel={finalWithoutLabel}
            withSettings={finalWithSettings}
            withForm={finalWithForm}
            gotoSettings={gotoSettings}
            gotoForm={gotoForm}
            closeForm={closeForm}
            className={className}
            labelClassName={labelClassName}
        >
            {fieldElement}
        </FieldRow>
    ) : (
        fieldElement
    );
};

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;

export default Field;
