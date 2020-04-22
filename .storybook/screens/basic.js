import uuid from 'uuid/v1';

import { advertising, image, images, text } from '../data';

export default [
    {
        id: uuid(),
        type: 'title',
        layout: 'center',
        title: {
            body: 'A title',
        },
        background: {
            color: '#FF0000',
        },
    },
    {
        id: uuid(),
        type: 'image',
        layout: 'center',
        image: image({ width: 300, height: 300 }),
        background: {
            color: '#FF00FF',
        },
    },
    {
        id: uuid(),
        type: 'ad',
        layout: 'center',
        ad: advertising({ width: 300, height: 250 }),
        background: {
            color: '#00FFFF',
        },
    },
    {
        id: uuid(),
        type: 'audio',
        layout: 'center',
        image: image({ width: 300, height: 300 }),
        background: {
            color: '#00FF00',
        },
    },
    {
        id: uuid(),
        layout: 'one_plus_three',
        type: 'gallery',
        images: images({ count: 4 }),
        background: {
            color: '#00FF00',
        },
    },
    {
        id: uuid(),
        type: 'gallery-scroll',
        layout: 'double',
        images: images({ count: 10 }),
        background: {
            color: '#00FF00',
        },
    },
    {
        id: uuid(),
        type: 'text',
        layout: 'center',
        text: {
            ...text(),
            style: {
                text: {
                    color: '#EEE',
                },
            },
        },
        background: {
            color: '#0000FF',
        },
    },
    {
        id: uuid(),
        type: 'text-image',
        layout: 'center',
        text: {
            body: 'An image text',
        },
        image: {
            ...image(),
        },
        background: {
            color: '#00CC00',
        },
    },
];