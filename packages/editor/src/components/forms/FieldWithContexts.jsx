/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { FieldForm } from '@micromag/core/components';
import { useScreenDefinition, useFormsComponents } from '@micromag/core/contexts';
import { Fields } from '@micromag/fields';
import getScreenFieldsWithStates from '../../lib/getScreenFieldsWithStates';

const propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    name: null,
    children: null,
};

const FieldWithContexts = ({ name, ...props }) => {
    // Get definitions
    const definition = useScreenDefinition();
    const { states = null } = definition;
    const screenFields = getScreenFieldsWithStates(definition);
    // const [stateId = null] = name.split('.');
    // const currentState = states !== null ? states.find(({ id }) => id === stateId) || null : null;

    const nameParts = name.split('.');
    const [stateId = null] = nameParts;
    const currentState = states !== null ? states.find(({ id }) => id === stateId) || null : null;
    let finalNameParts = nameParts;
    const { repeatable = false, fieldName = null, fields: stateFields = [] } = currentState || {};
    if (currentState !== null) {
        finalNameParts =
            repeatable || fieldName !== null
                ? [fieldName || stateId, ...nameParts.slice(1)]
                : nameParts.slice(1);
    }

    const formComponents = useFormsComponents();
    // if (currentState !== null && !repeatable && stateFieldName === null) {
    //     return (
    //         <div className="p-2">
    //             <Fields fields={stateFields} {...props} />
    //         </div>
    //     );
    // }
    // const finalFields =
    //     repeatable || stateFieldName !== null
    //         ? [{
    //               name: stateFieldName || stateId,
    //               itemsField: {
    //                   type: 'fields',
    //                   fields: stateFields,
    //                   className: 'p-2'
    //               },
    //           }]
    // : fields;
    return (
        <div className="p-2">
            {finalNameParts.length > 0 ? (
                <FieldForm
                    fields={screenFields}
                    formComponents={formComponents}
                    name={finalNameParts.join('.')}
                    {...props}
                />
            ) : (
                <Fields fields={stateFields} {...props} />
            )}
        </div>
    );
};

FieldWithContexts.propTypes = propTypes;
FieldWithContexts.defaultProps = defaultProps;

export default FieldWithContexts;
