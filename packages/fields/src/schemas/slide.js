export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/slide.json',
    title: 'Slide field',
    type: 'object',
    component: 'slide',

    properties: {
        image: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/image.json',
            title: 'Image',
        },
        text: {
            $ref: 'https://schemas.micromag.ca/0.1/fields/text.json',
            title: 'Text',
        },
    },
};