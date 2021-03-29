/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MemoryRouter } from 'react-router';

import { ApiProvider } from '../../../data/src/contexts/ApiContext';

import FieldsProvider from '../../../fields/src/FieldsProvider';

import video from '../../../../.storybook/data/test.mp4';
import sound from '../../../../.storybook/data/test.mp3';
import withUppy from '../../../../.storybook/decorators/withUppy';
import list from './list.json';
// import { paragraph, image } from '../../../../.storybook/data';

import MediaGallery from '../components/MediaGallery';

const hasWindow = typeof window !== 'undefined';
const apiBaseUrl = hasWindow ? `${window.location.protocol}//${window.location.host}/api` : '/api';

const props = {
    medias: [
        {
            id: '1',
            type: 'video',
            thumbnail_url: 'https://picsum.photos/id/100/300/300',
            name:
                'uuuuurbaniaDog1 sdfasdflasd s df adsf asdfasdfgasdf dasgf ads gadsfg adsfg adfg dsfg.mov',
            url: video,
            metadata: {
                user: { id: 1, name: 'paul ' },
            },
        },
        {
            id: '2',
            type: 'video',
            thumbnail_url: 'https://picsum.photos/id/200/300/300',
            name: 'moon.mov',
            url: video,
        },
        {
            id: '3',
            type: 'video',
            thumbnail_url: 'https://picsum.photos/id/300/300/300',
            name: 'sea.mov',
            url: video,
        },
        {
            id: '4',
            type: 'image',
            thumbnail_url: 'https://picsum.photos/id/400/300/300',
            name: 'moondog.jpg',
            url: 'https://picsum.photos/id/400/800/800',
        },
        {
            id: '5',
            type: 'image',
            thumbnail_url: 'https://picsum.photos/id/500/300/300',
            name: 'urbaniaDog5.jpg',
            url: 'https://picsum.photos/id/500/800/800',
        },
        {
            id: '6',
            type: 'audio',
            thumbnail_url: 'https://picsum.photos/id/600/300/300',
            name: 'Cool thang',
            url: sound,
        },
    ],
};

export default {
    component: MediaGallery,
    title: 'Editor/MediaGallery',
    decorators: [withUppy],
    parameters: {
        screenSize: true,
        intl: true,
    },
};

export const Normal = () => (
    <ApiProvider baseUrl={apiBaseUrl}>
        <FieldsProvider>
            <MemoryRouter>
                <MediaGallery />
            </MemoryRouter>
        </FieldsProvider>
    </ApiProvider>
);

export const WithTestMedia = () => (
    <ApiProvider baseUrl={apiBaseUrl}>
        <FieldsProvider>
            <MemoryRouter>
                <MediaGallery {...props} type="image" />
            </MemoryRouter>
        </FieldsProvider>
    </ApiProvider>
);

export const WithList = () => (
    <ApiProvider baseUrl={apiBaseUrl}>
        <FieldsProvider>
            <MemoryRouter>
                <MediaGallery medias={list} />
            </MemoryRouter>
        </FieldsProvider>
    </ApiProvider>
);
