/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { text, title, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import TimelineScreen from '../Timeline';
import definition from '../definition';

const props = {
    items: [...new Array(10)].map(() => ({
        title: { body: title() },
        description: text('long'),
    })),
    background: background(),
};

const normalProps = {
    bulletColor: '#FFF',
    lineColor: '#FFF',
    bulletFilled: false
};

export default {
    title: 'Screens/Timeline',
    component: TimelineScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === TimelineScreen),
    },
};

export const Placeholder = (storyProps) => <TimelineScreen {...storyProps} {...props} />;

export const Preview = (storyProps) => <TimelineScreen {...storyProps} {...props} {...normalProps} />;

export const Edit = (storyProps) => <TimelineScreen {...storyProps} />;

export const Normal = (storyProps) => <TimelineScreen {...storyProps} {...props} {...normalProps} />;

export const Definition = () => <ScreenDefinition definition={definition} />;