/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { map, markers, background } from '../../../../.storybook/data';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import MapScreen from '../Map';
import definition from '../definition';

const props = {
    map: map(),
    markers: markers(),
    splash: { body: 'Débuter' },
    background: background(),
};

export default {
    title: 'Screens/Map',
    decorators: [withGoogleMaps],
    component: MapScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === MapScreen),
    },
};

export const Placeholder = (storyProps) => <MapScreen {...storyProps} />;

export const Preview = (storyProps) => <MapScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <MapScreen {...storyProps} />;

export const Normal = (storyProps) => <MapScreen {...storyProps} {...props} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;