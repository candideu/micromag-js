export default {
    $id: 'https://schemas.micromag.ca/0.1/fields/images.json',
    title: 'Images field',
    type: 'array',
    component: 'images',

    items: {
        $ref: 'https://schemas.micromag.ca/0.1/fields/image.json',
    },
};