import { defineMessage } from 'react-intl';

import TimelineScreen from './Timeline';
import TimelineIllustratedScreen from './TimelineIllustrated';
import * as transforms from './transforms/index';

export default [
    {
        id: 'timeline',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'List',
                description: 'List screen group',
            }),
            order: 8,
        },
        title: defineMessage({
            defaultMessage: 'Timeline',
            description: 'Timeline screen title',
        }),
        component: TimelineScreen,
        layouts: ['normal'],
        transforms,
        fields: [
            {
                name: 'items',
                type: 'entries',
                theme: {
                    title: {
                        textStyle: 'heading2',
                    },
                    description: {
                        textStyle: 'text',
                    },
                },
                label: defineMessage({
                    defaultMessage: 'Entries',
                    description: 'Field label',
                }),
            },
            {
                name: 'bulletShape',
                type: 'radios',
                defaultValue: 'circle',
                options: [
                    {
                        value: 'circle',
                        label: defineMessage({
                            defaultMessage: 'Circle',
                            description: 'Circle label',
                        }),
                    },
                    {
                        value: 'square',
                        label: defineMessage({
                            defaultMessage: 'Square',
                            description: 'Square label',
                        }),
                    },
                ],
                label: defineMessage({
                    defaultMessage: 'Bullet shape',
                    description: 'Field label',
                }),
            },
            {
                name: 'bulletFilled',
                type: 'toggle',
                defaultValue: false,
                label: defineMessage({
                    defaultMessage: 'Bullet filled',
                    description: 'Field label',
                }),
            },
            {
                name: 'bulletColor',
                type: 'color',
                defaultValue: { alpha: 1, color: '#FFFFFF' },
                label: defineMessage({
                    defaultMessage: 'Bullet color',
                    description: 'Field label',
                }),
            },
            {
                name: 'lineColor',
                type: 'color',
                defaultValue: { alpha: 1, color: '#FFFFFF' },
                label: defineMessage({
                    defaultMessage: 'Line color',
                    description: 'Field label',
                }),
            },
            {
                name: 'background',
                type: 'background',
                label: defineMessage({
                    defaultMessage: 'Background',
                    description: 'Background field label',
                }),
            },
            {
                name: 'callToAction',
                type: 'call-to-action',
                theme: {
                    boxStyle: 'cta',
                    label: {
                        textStyle: 'cta',
                    },
                },
            },
            {
                name: 'shareIncentive',
                type: 'share-incentive',
            },
        ],
    },
    {
        id: 'timeline-illustrated',
        type: 'screen',
        group: {
            label: defineMessage({
                defaultMessage: 'List',
                description: 'List screen group',
            }),
            order: 8,
        },
        title: defineMessage({
            defaultMessage: 'Timeline with images',
            description: 'TimelineIllustrated screen title',
        }),
        component: TimelineIllustratedScreen,
        layouts: ['title-image-description', 'title-description-image', 'image-title-description'],
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                defaultValue: 'title-image-description',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
                }),
            },
            {
                name: 'items',
                type: 'entries-with-visual',
                theme: {
                    title: {
                        textStyle: 'heading2',
                    },
                    description: {
                        textStyle: 'text',
                    },
                },
                label: defineMessage({
                    defaultMessage: 'Entries',
                    description: 'Field label',
                }),
            },
            {
                name: 'bulletShape',
                type: 'radios',
                defaultValue: 'circle',
                options: [
                    {
                        value: 'circle',
                        label: defineMessage({
                            defaultMessage: 'Circle',
                            description: 'Circle label',
                        }),
                    },
                    {
                        value: 'square',
                        label: defineMessage({
                            defaultMessage: 'Square',
                            description: 'Square label',
                        }),
                    },
                ],
                label: defineMessage({
                    defaultMessage: 'Bullet shape',
                    description: 'Field label',
                }),
            },
            {
                name: 'bulletFilled',
                type: 'toggle',
                defaultValue: false,
                label: defineMessage({
                    defaultMessage: 'Bullet filled',
                    description: 'Field label',
                }),
            },
            {
                name: 'bulletColor',
                type: 'color',
                defaultValue: { alpha: 1, color: '#FFFFFF' },
                label: defineMessage({
                    defaultMessage: 'Bullet color',
                    description: 'Field label',
                }),
            },
            {
                name: 'lineColor',
                type: 'color',
                defaultValue: { alpha: 1, color: '#FFFFFF' },
                label: defineMessage({
                    defaultMessage: 'Line color',
                    description: 'Field label',
                }),
            },
            {
                name: 'background',
                type: 'background',
                label: defineMessage({
                    defaultMessage: 'Background',
                    description: 'Background field label',
                }),
            },
            {
                name: 'callToAction',
                type: 'call-to-action',
                theme: {
                    boxStyle: 'cta',
                    label: {
                        textStyle: 'cta',
                    },
                },
            },
            {
                name: 'shareIncentive',
                type: 'share-incentive',
            },
        ],
    },
];
