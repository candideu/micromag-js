import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/elements/link.json',
    title: 'Link',
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
                url: {
                    type: 'string',
                    component: 'url',
                    intl: {
                        title: messages.url,
                    },
                },
            },
        },
    ],
};