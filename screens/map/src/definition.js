import { defineMessage } from 'react-intl';
import MapScreen from './Map';
import MapImagesScreen from './MapImages';

export default [
    {
        id: 'map',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Map',
            description: 'Map screen group',
        }),
        title: defineMessage({
            defaultMessage: 'Map',
            description: 'Map screen title',
        }),
        component: MapScreen,
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
                name: 'map',
                type: 'map',
                label: defineMessage({
                    defaultMessage: 'Map',
                    description: 'Map field label',
                }),
            },
            {
                name: 'markers',
                type: 'markers',
                label: defineMessage({
                    defaultMessage: 'Markers',
                    description: 'Markers field label',
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
        id: 'map-images',
        type: 'screen',
        group: defineMessage({
            defaultMessage: 'Map',
            description: 'Map screen group',
        }),
        title: defineMessage({
            defaultMessage: 'MapImages',
            description: 'MapImages screen title',
        }),
        component: MapImagesScreen,
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
                name: 'map',
                type: 'map',
                label: defineMessage({
                    defaultMessage: 'Map',
                    description: 'Map field label',
                }),
            },
            {
                name: 'markers',
                type: 'markers',
                label: defineMessage({
                    defaultMessage: 'Markers',
                    description: 'Markers field label',
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