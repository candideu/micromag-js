export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/link.json',
    title: 'link',
    type: 'object',

    properties: {
        url: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/url.json',
            title: 'URL',
        },
    },
};