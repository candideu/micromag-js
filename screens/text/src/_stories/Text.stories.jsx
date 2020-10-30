/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { text } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import Text from '../Text';
import definition from '../definition';

const props = {
    text: text('verylong'),
};

export default {
    title: 'Screens/Text',
    component: Text,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === Text),
    },
};

export const Placeholder = (storyProps) => <Text {...storyProps} />;

export const Preview = (storyProps) => <Text {...storyProps} {...props} />;

export const Edit = (storyProps) => <Text {...storyProps} />;

export const Normal = (storyProps) => <Text {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
