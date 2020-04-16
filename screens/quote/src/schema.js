export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/quote.json',
    group: 'Title',
    title: 'Quote',
    type: 'object',
    allOf: [
        {
            $ref: 'https://schemas.micromag.ca/0.1/screens/screen.json',
        },
        {
            properties: {
                layout: {
                    type: 'string',
                    title: 'Mise en page',
                    enum: ['default'],
                    default: 'default',
                },
                quote: {
                    title: 'Texte',
                    $ref: 'https://schemas.micromag.ca/0.1/elements/text.json',
                    component: 'element',
                },
                source: {
                    title: 'Texte',
                    $ref: 'https://schemas.micromag.ca/0.1/elements/text.json',
                    component: 'element',
                },
                author: {
                    title: 'Texte',
                    $ref: 'https://schemas.micromag.ca/0.1/elements/text.json',
                    component: 'element',
                },
                background: {
                    title: 'Arrière-Plan',
                    $ref: 'https://schemas.micromag.ca/0.1/elements/background.json',
                    componentProps: {
                        withBorders: true,
                        isSection: true,
                    },
                },
            },
        },
    ],
};
