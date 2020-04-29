import { names } from './layouts/names';
import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/map-path.json',
    title: 'Map with path',
    group: 'Map',
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
                layout: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/screen-layout.json',
                    title: 'Layout',
                    screenType: 'map-path',
                    enum: names,
                    intl: {
                        title: messages.layout,
                    },
                },
                cards: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/cards.json',
                    title: 'Cards',
                    intl: {
                        title: messages.cards,
                    },
                },
                cardBackground: {
                    title: "Arrière-plan d'item",
                    $ref: 'https://schemas.micromag.ca/0.1/elements/background.json',
                    intl: {
                        title: messages.cardBackground,
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
