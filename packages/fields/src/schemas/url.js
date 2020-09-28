export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/url.json',
    title: 'URL field',
    type: 'object',

    properties: {
        url: {
            type: 'string',
            title: 'URL',
            component: 'url',
        },
        // target: {
        //     type: 'string',
        //     title: 'Cible',
        //     component: 'target',
        // },
    },
};
