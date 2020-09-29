export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/video-params.json',
    title: 'Video parameters',
    type: 'object',

    properties: {
        controls: {
            type: 'boolean',
            title: 'Controls',
            component: 'toggle',
        },
        loop: {
            type: 'boolean',
            title: 'Loop',
            component: 'toggle',
        },
        autoPlay: {
            type: 'boolean',
            title: 'Autoplay',
            component: 'toggle',
        },
        muted: {
            type: 'boolean',
            title: 'Muted',
            component: 'toggle',
        },
    },
};