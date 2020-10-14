import { layouts } from './GalleryScroll';
import { schemas as messages } from './messages';

export default {
    $id: 'https://schemas.micromag.ca/0.1/screens/gallery-scroll.json',
    title: 'Gallery scroll',
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
                layout: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/screen-layout.json',
                    title: 'Layout',
                    screenType: 'gallery-scroll',
                    enum: layouts,
                    intl: {
                        title: messages.layout,
                    },
                },
                images: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/images.json',
                    title: 'Images',
                    intl: {
                        title: messages.images,
                    },
                },
                background: {
                    $ref: 'https://schemas.micromag.ca/0.1/elements/background.json',
                    title: 'Background',
                    intl: {
                        title: messages.background,
                    },
                },
                spacing: {
                    $ref: 'https://schemas.micromag.ca/0.1/fields/spacing.json',
                    title: 'Spacing',
                    intl: {
                        title: messages.spacing,
                    },
                },
            },
        },
    ],
};
