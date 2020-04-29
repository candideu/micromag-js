import { schemas as messages } from './messages';
// import { names } from './layouts/names';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/slideshow.json',
    title: 'Slideshow',
    group: 'Gallery',
    type: 'object',
    intl: {
        title: messages.schemaTitle,
    },
    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/screens/screen.json',
        },
        {
            properties: {
                // layout: {
                //     $ref: 'https://schemas.micromag.ca/0.1/fields/screen-layout.json',
                //     title: 'Layout',
                //     screenType: 'slideshow',
                //     enum: names,
                //     intl: {
                //         title: messages.layout,
                //     },
                // },
                cards: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/cards.json',
                    title: 'Cards',
                    intl: {
                        title: messages.cards,
                    },
                },
                background: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/background.json',
                    title: 'Background',
                    intl: {
                        title: messages.background,
                    },
                },
            },
        },
    ],
};
