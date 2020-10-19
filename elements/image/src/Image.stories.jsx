/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Image from './Image';
import { imageWithRandomSize } from '../../../.storybook/data';

export default {
    component: Image,
    title: 'Elements/Image',
};

export const normal = () => <Image {...imageWithRandomSize()} />;

export const fit = () => (
    <>
        <div style={{ marginBottom: 10 }}>
            <div>No fit 200x200 (stretch)</div>
            <Image
                media={{
                    url: 'https://picsum.photos/200/300',
                    width: 200,
                    height: 300,
                }}
                width={200}
                height={200}
            />
        </div>
        <div style={{ marginBottom: 10 }}>
            <div>Fit 200x200 contain</div>
            <Image
                media={{
                    url: 'https://picsum.photos/200/300',
                    width: 200,
                    height: 300,
                }}
                width={200}
                height={200}
                objectFit={{ fit: 'contain' }}
                imageStyle={{ background: 'black' }}
            />
        </div>
        <div style={{ marginBottom: 10 }}>
            <div>Fit 200x200 cover</div>
            <Image
                media={{
                    url: 'https://picsum.photos/200/300',
                    width: 200,
                    height: 300,
                }}
                width={200}
                height={200}
                objectFit={{ fit: 'cover' }}
            />
        </div>
    </>
);
