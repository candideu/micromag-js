/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import * as MicromagPropTypes from '../../packages/core/src/PropTypes';
import Fields from '../../packages/fields/src/components/Fields';
import FieldsProvider from '../../packages/fields/src/FieldsProvider';

const propTypes = {
    definition: MicromagPropTypes.screenDefinition.isRequired,
};

const defaultProps = {};

const ScreenFields = ({ definition: { fields }, ...props }) => (
    <FieldsProvider>
        <Fields fields={fields} {...props} />
    </FieldsProvider>
);

ScreenFields.propTypes = propTypes;
ScreenFields.defaultProps = defaultProps;

export default ScreenFields;