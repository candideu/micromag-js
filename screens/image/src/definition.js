import { defineMessage } from 'react-intl';
import Image from './Image';
import ImageTitle from './ImageTitle';
import ImageText from './ImageText';
import ImageTitleText from './ImageTitleText';
import ImageLegend from './ImageLegend';

export default [
    {
        id: 'image',
        type: 'screen',
        title: defineMessage({
            defaultMessage: 'Image',
            description: 'Image screen title',
        }),
        component: Image,
        layouts: ['normal'],
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
                }),
            },
            {
                name: 'image',
                type: 'image',
                label: defineMessage({
                    defaultMessage: 'Image',
                    description: 'Image field label',
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
        ],
    },
    {
        id: 'image-title',
        type: 'screen',
        title: defineMessage({
            defaultMessage: 'ImageTitle',
            description: 'ImageTitle screen title',
        }),
        component: ImageTitle,
        layouts: ['normal', 'reverse'],
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
                }),
            },
            {
                name: 'image',
                type: 'image',
                label: defineMessage({
                    defaultMessage: 'Image',
                    description: 'Image field label',
                }),
            },
            {
                name: 'title',
                type: 'text',
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Title field label',
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
        ],
    },
    {
        id: 'image-text',
        type: 'screen',
        title: defineMessage({
            defaultMessage: 'ImageText',
            description: 'ImageText screen title',
        }),
        component: ImageText,
        layouts: ['normal', 'reverse'],
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
                }),
            },
            {
                name: 'image',
                type: 'image',
                label: defineMessage({
                    defaultMessage: 'Image',
                    description: 'Image field label',
                }),
            },
            {
                name: 'text',
                type: 'text',
                label: defineMessage({
                    defaultMessage: 'Text',
                    description: 'Text field label',
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
        ],
    },
    {
        id: 'image-title-text',
        type: 'screen',
        title: defineMessage({
            defaultMessage: 'ImageTitleText',
            description: 'ImageTitleText screen title',
        }),
        component: ImageTitleText,
        layouts: ['normal', 'reverse', 'title-top'],
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
                }),
            },
            {
                name: 'image',
                type: 'image',
                label: defineMessage({
                    defaultMessage: 'Image',
                    description: 'Image field label',
                }),
            },
            {
                name: 'title',
                type: 'text',
                label: defineMessage({
                    defaultMessage: 'Title',
                    description: 'Title field label',
                }),
            },
            {
                name: 'text',
                type: 'text',
                label: defineMessage({
                    defaultMessage: 'Text',
                    description: 'Text field label',
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
        ],
    },
    {
        id: 'image-legend',
        type: 'screen',
        title: defineMessage({
            defaultMessage: 'ImageLegend',
            description: 'ImageLegend screen title',
        }),
        component: ImageLegend,
        layouts: ['normal', 'reverse'],
        fields: [
            {
                name: 'layout',
                type: 'screen-layout',
                label: defineMessage({
                    defaultMessage: 'Layout',
                    description: 'Layout field label',
                }),
            },
            {
                name: 'image',
                type: 'image',
                label: defineMessage({
                    defaultMessage: 'Image',
                    description: 'Image field label',
                }),
            },
            {
                name: 'legend',
                type: 'text',
                label: defineMessage({
                    defaultMessage: 'Legend',
                    description: 'Legend field label',
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
        ],
    },
];
