/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { map, markers, background } from '../../../../.storybook/data';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import MapImages from '../MapImages';
import definition from '../definition';

const props = {
    map: map(),
    markers: markers(),
    splash: { body: 'Débuter' },
    background: background()
};

export default {
    title: 'Screens/MapImages',
    decorators: [withGoogleMaps],
    component: MapImages,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === MapImages),
    },
};

export const Placeholder = (storyProps) => <MapImages {...storyProps} />;

export const Preview = (storyProps) => <MapImages {...storyProps} {...props} />;

export const Edit = (storyProps) => <MapImages {...storyProps} />;

export const Normal = (storyProps) => <MapImages {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;