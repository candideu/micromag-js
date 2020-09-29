/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, Empty, Label } from '@micromag/core/components';

import FieldRow from './FieldRow';

const messages = defineMessages({
    noItem: {
        id: 'items.no_item',
        defaultMessage: 'No item...',
    },
    addItem: {
        id: 'items.add_item',
        defaultMessage: 'Add an item',
    },
    itemFieldLabel: {
        id: 'items.item_field_label',
        defaultMessage: '#{index}',
    },
});

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    newDefaultValue: PropTypes.object, // eslint-disable-line
    noItemLabel: MicromagPropTypes.label,
    addItemLabel: MicromagPropTypes.label,
    itemFieldLabel: MicromagPropTypes.label,
    children: PropTypes.func,
    ItemComponent: PropTypes.elementType,
    className: PropTypes.string,
    gotoFieldForm: PropTypes.func,
    closeFieldForm: PropTypes.func,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    newDefaultValue: {},
    noItemLabel: messages.noItem,
    addItemLabel: messages.addItem,
    itemFieldLabel: messages.itemFieldLabel,
    children: null,
    ItemComponent: null,
    className: null,
    gotoFieldForm: null,
    closeFieldForm: null,
    onChange: null,
};

const ItemsField = ({
    name,
    value,
    newDefaultValue,
    noItemLabel,
    addItemLabel,
    itemFieldLabel,
    children,
    ItemComponent,
    className,
    onChange,
    gotoFieldForm,
    closeFieldForm,
}) => {
    const onClickAdd = useCallback(() => {
        if (onChange !== null) {
            onChange([...(value || []), newDefaultValue]);
        }
    }, [value, onChange, newDefaultValue]);
    const onItemChange = useCallback(
        (index, newValue) => {
            if (onChange !== null) {
                onChange(
                    newValue !== null
                        ? [...value.slice(0, index), newValue, ...value.slice(index + 1)]
                        : [...value.slice(0, index), ...value.slice(index + 1)],
                );
            }
        },
        [value, onChange],
    );

    const gotoForms = useMemo(
        () =>
            value !== null
                ? value.map((val, index) => () => gotoFieldForm(`${name}.${index}`))
                : null,
        [value, gotoFieldForm],
    );
    const closeForms = useMemo(
        () =>
            value !== null
                ? value.map((val, index) => () => closeFieldForm(`${name}.${index}`))
                : null,
        [value, closeFieldForm],
    );

    return (
        <div className={className}>
            {value !== null ? (
                <div className="list-group">
                    {value.map((itemValue, index) => {
                        const itemProps = {
                            name: `${name}.${index}`,
                            value: itemValue,
                            onChange: newValue => onItemChange(index, newValue),
                            closeForm: closeForms[index],
                            gotoFieldForm,
                            closeFieldForm,
                        };
                        return (
                            <div className="list-group-item py-2 px-2">
                                <FieldRow
                                    key={`item-${index}`}
                                    label={
                                        <Label values={{ index: index + 1 }}>
                                            {itemFieldLabel}
                                        </Label>
                                    }
                                    name={`${name}.${index}`}
                                    withForm
                                    gotoForm={gotoForms[index]}
                                    closeForm={closeForms[index]}
                                >
                                    {children !== null
                                        ? children(itemValue, index, itemProps)
                                        : null}
                                    {ItemComponent !== null ? (
                                        <ItemComponent {...itemProps} />
                                    ) : null}
                                </FieldRow>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <Empty className="p-4">{noItemLabel}</Empty>
            )}
            <div className="mt-2">
                <Button
                    theme="primary"
                    size="sm"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={onClickAdd}
                >
                    {addItemLabel}
                </Button>
            </div>
        </div>
    );
};

ItemsField.propTypes = propTypes;
ItemsField.defaultProps = defaultProps;

export default ItemsField;