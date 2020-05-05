/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Empty } from '@micromag/core/components';

import FieldRow from './FieldRow';
import MarkerField from './Marker';

const messages = defineMessages({
    noImage: {
        id: 'markers.no_marker',
        defaultMessage: 'No marker...',
    },
    addImage: {
        id: 'markers.add_marker',
        defaultMessage: 'Add a marker',
    },
});

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    newDefaultValue: PropTypes.object, // eslint-disable-line
    className: PropTypes.string,
    gotoFieldForm: PropTypes.func,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    newDefaultValue: {},
    className: null,
    gotoFieldForm: null,
    onChange: null,
};

const MarkersField = ({ name, value, newDefaultValue, className, onChange, gotoFieldForm }) => {
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

    return (
        <div className={className}>
            {value !== null ? (
                <div className="list-group">
                    {value.map((itemValue, index) => (
                        <div className="list-group-item py-2 px-2">
                            <FieldRow
                                key={`item-${index}`}
                                label={`#${index + 1}`}
                                withForm
                                gotoForm={() => gotoFieldForm(`${name}.${index}`)}
                            >
                                <MarkerField
                                    value={itemValue}
                                    onChange={newValue => onItemChange(index, newValue)}
                                />
                            </FieldRow>
                        </div>
                    ))}
                </div>
            ) : (
                <Empty className="p-4">{messages.noImage}</Empty>
            )}
            <div className="mt-2">
                <Button
                    theme="primary"
                    size="sm"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={onClickAdd}
                >
                    {messages.addImage}
                </Button>
            </div>
        </div>
    );
};

MarkersField.propTypes = propTypes;
MarkersField.defaultProps = defaultProps;

export default MarkersField;
