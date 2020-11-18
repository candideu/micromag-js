/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import * as MicromagPropTypes from '../PropTypes';
import { useScreensManager } from './ScreensContext';

const ScreenContext = React.createContext({
    data: null,
    definition: null,
    renderContext: null,
});

export const useScreen = () => useContext(ScreenContext);

export const useScreenDefinition = () => {
    const { definition } = useScreen() || {};
    return definition;
};

export const useScreenData = () => {
    const { data } = useScreen() || {};
    return data;
};

export const useScreenRenderContext = () => {
    const { renderContext = 'view' } = useScreen() || {};
    return {
        renderContext,
        isPlaceholder: renderContext === 'placeholder',
        isPreview: renderContext === 'preview',
        isEdit: renderContext === 'edit',
        isView: renderContext === 'view',
    };
};

const propTypes = {
    children: PropTypes.node.isRequired,
    data: MicromagPropTypes.screen,
    definition: MicromagPropTypes.screenDefinition,
    renderContext: MicromagPropTypes.renderContext,
};

const defaultProps = {
    data: null,
    definition: null,
    renderContext: null,
};

export const ScreenProvider = ({ data, definition, renderContext, children }) => {
    const {
        data: previousData = null,
        definition: previousDefinition = null,
        renderContext: previousContext = null,
    } = useScreen() || {};

    const finalData = data || previousData || null;

    const { type = null } = finalData || {};
    const screensManager = useScreensManager();
    const contextDefinition = screensManager !== null ? screensManager.getDefinition(type) : null;
    const finalDefinition = definition || contextDefinition || previousDefinition;

    const finalRenderContext = renderContext || previousContext || 'view';

    const value = useMemo(
        () => ({
            data: finalData,
            definition: finalDefinition,
            renderContext: finalRenderContext,
        }),
        [finalData, finalDefinition, finalRenderContext],
    );
    return <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>;
};

ScreenProvider.propTypes = propTypes;
ScreenProvider.defaultProps = defaultProps;

export default ScreenContext;