import { defineMessage } from 'react-intl';
import Map from './Map';

export default {
    id: 'map',
    type: 'screen',
    title: defineMessage({
        defaultMessage: 'Map',
        description: 'Map screen title'
    }),
    component: Map,
    layouts: ['top', 'bottom'],
    fields: [
        {
            name: 'layout',
            type: 'screen-layout',
            label: defineMessage({
                defaultMessage: 'Layout',
                description: 'Layout field label'
            }),
        },
        {
            name: 'map',
            type: 'map',
            label: defineMessage({
                defaultMessage: 'Map',
                description: 'Map field label'
            }),
        },
        {
            name: 'markers',
            type: 'markers',
            label: defineMessage({
                defaultMessage: 'Markers',
                description: 'Markers field label'
            }),
        },
        {
            name: 'background',
            type: 'background',
            label: defineMessage({
                defaultMessage: 'Background',
                description: 'Background field label'
            }),
        },
    ],
};
