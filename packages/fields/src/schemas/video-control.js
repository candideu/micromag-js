export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/video-control.json',
    title: 'Video control field',
    type: 'object',

    properties: {
        visible: {
            type: 'boolean',
            title: 'Afficher',
            component: 'toggle',
            default: true,
            componentProps: {
                isHorizontal: true,
            },
        },
        color: {
            type: 'object',
            title: 'Couleur',
            $ref: 'https://schemas.micromag.ca/0.1/fields/color.json',
            component: 'color',
        },
    },
};