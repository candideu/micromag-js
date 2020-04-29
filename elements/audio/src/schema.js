import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/elements/audio.json',
    title: 'Audio',
    type: 'object',
    component: 'element',
    intl: {
        title: messages.schemaTitle,
    },
    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/elements/element.json',
        },
        {
            properties: {
                src: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/url.json',
                    title: 'URL',
                    intl: {
                        title: messages.url,
                    },
                },
            },
        },
    ],
};
