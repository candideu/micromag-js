export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/title.json',
    group: 'Title',
    title: 'Title',
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
                    enum: ['default', 'split'],
                    default: 'default',
                },
                title: {
                    title: 'Titre',
                    $ref: 'https://schemas.micromag.ca/0.1/elements/heading.json',
                    component: 'element',
                    componentProps: {
                        isSection: true,
                    },
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
