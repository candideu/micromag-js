/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import {
    FIELDS_NAMESPACE,
    ComponentsProvider,
    FieldsProvider as BaseFieldsProvider,
} from '@micromag/core/contexts';

import * as components from './components/index';
import manager from './manager';

const propTypes = {
    children: PropTypes.node.isRequired,
};

const defaultProps = {};

const FieldsProvider = ({ children }) => (
    <ComponentsProvider namespace={FIELDS_NAMESPACE} components={components}>
        <BaseFieldsProvider manager={manager}>{children}</BaseFieldsProvider>
    </ComponentsProvider>
);

FieldsProvider.propTypes = propTypes;
FieldsProvider.defaultProps = defaultProps;

export default FieldsProvider;
