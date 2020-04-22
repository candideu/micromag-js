/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router';

import * as AppPropTypes from '../lib/PropTypes';

const RoutesContext = React.createContext(null);

export const useRoutes = () => useContext(RoutesContext);

export const useUrlGenerator = () => {
    const routes = useRoutes();
    const urlGenerator = useCallback((key, data) => generatePath(routes[key], data), [
        generatePath,
        routes,
    ]);
    return urlGenerator;
};

const propTypes = {
    children: PropTypes.node.isRequired,
    routes: AppPropTypes.routes.isRequired,
};

const defaultProps = {};

export const RoutesProvider = ({ routes, children }) => (
    <RoutesContext.Provider value={routes}>{children}</RoutesContext.Provider>
);

RoutesProvider.propTypes = propTypes;
RoutesProvider.defaultProps = defaultProps;

export default RoutesContext;
