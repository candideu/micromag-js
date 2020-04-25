/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { FORMS_NAMESPACE } from '@micromag/core/components';
import { RoutesProvider, ComponentsContext } from '@micromag/core/contexts';
import {
    repository as defaultSchemasRepository,
    SchemasProvider,
    SchemasRepository,
} from '@micromag/schemas';
import { slug } from '@micromag/core/utils';
import { ScreensProvider } from '@micromag/screens';
import { FieldsProvider } from '@micromag/fields';

import * as EditorPropTypes from '../lib/PropTypes';
import FormsProvider from './forms/FormsProvider';
import Editor from './Editor';

import defaultRoutes from '../data/routes.json';

const propTypes = {
    routes: EditorPropTypes.routes,
    schemasRepository: PropTypes.instanceOf(SchemasRepository),
    memoryRouter: PropTypes.memoryRouter,
    basePath: PropTypes.string,
};

const defaultProps = {
    routes: defaultRoutes,
    schemasRepository: defaultSchemasRepository,
    memoryRouter: false,
    basePath: null,
};

const EditorContainer = ({ schemasRepository, memoryRouter, routes, basePath, ...props }) => {
    const Router = memoryRouter ? MemoryRouter : BrowserRouter;
    return (
        <Router basename={!memoryRouter ? basePath : null}>
            <ScreensProvider>
                <FieldsProvider>
                    <FormsProvider>
                        <SchemasProvider repository={schemasRepository}>
                            <ComponentsContext.Consumer>
                                {({ components }) => {
                                    const formComponents =
                                        components !== null
                                            ? components[FORMS_NAMESPACE] || null
                                            : null;
                                    const formRegEx =
                                        formComponents !== null
                                            ? Object.keys(formComponents)
                                                  .map(name => slug(name))
                                                  .join('|')
                                            : null;
                                    return (
                                        <RoutesProvider
                                            routes={{
                                                ...routes,
                                                'screen.field.form': routes[
                                                    'screen.field.form'
                                                ].replace(/:form$/, `:form(${formRegEx})`),
                                            }}
                                        >
                                            <Editor {...props} />
                                        </RoutesProvider>
                                    );
                                }}
                            </ComponentsContext.Consumer>
                        </SchemasProvider>
                    </FormsProvider>
                </FieldsProvider>
            </ScreensProvider>
        </Router>
    );
};

EditorContainer.propTypes = propTypes;
EditorContainer.defaultProps = defaultProps;

export default EditorContainer;
