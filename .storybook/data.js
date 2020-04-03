import Chance from 'chance';

import authors from './data/authors';
import companies from './data/companies';
import randomWords from './data/words';

import AudioTest from './data/test.mp3';

const chance = new Chance();

const random = array => array[Math.floor(Math.random() * array.length)];

const words = (likelyhood = 100, min = 1, max = 2) =>
    likelyhood === 100 ? randomWords.slice(0, chance.integer({ min, max })).join(' ') : null;

const sentences = (likelyhood = 100, min = 1, max = 2) =>
    likelyhood === 100 ? randomWords.slice(0, chance.integer({ min, max }) * 5).join(' ') : null;

const name = (likelyhood = 100) => (likelyhood === 100 ? random(authors) : null);

const company = (likelyhood = 100) => (likelyhood === 100 ? random(companies) : null);

// Methods

export const title = ({ likelyhood = 100, min = 1, max = 6 } = {}) => words(likelyhood, min, max);

export const subtitle = ({ likelyhood = 100, min = 3, max = 9 } = {}) =>
    words(likelyhood, min, max);

export const shortText = ({ likelyhood = 100, min = 10, max = 20 } = {}) =>
    words(likelyhood, min, max);

export const longText = ({ likelyhood = 100, min = 30, max = 50 } = {}) =>
    words(likelyhood, min, max);

export const quote = ({ likelyhood = 100, min = 7, max = 20 } = {}) => words(likelyhood, min, max);

export const author = ({ likelyhood = 100 } = {}) => name(likelyhood);

export const source = ({ likelyhood = 100 } = {}) => company(likelyhood);

export const description = ({ likelyhood = 100, min = 1, max = 3 } = {}) =>
    sentences(likelyhood, min, max);

export const paragraph = ({ likelyhood = 100, min = 3, max = 6 } = {}) =>
    sentences(likelyhood, min, max);

export const image = ({ width = 800, height = 800 } = {}) => ({
    url: `https://picsum.photos/${width}/${height}`,
    imageWidth: width,
    imageHeight: height,
});

export const imageWithRandomSize = ({ min = 100, max = 800 } = {}) => {
    const width = chance.integer({ min, max });
    const height = chance.integer({ min, max });
    return {
        url: `https://picsum.photos/${width}/${height}`,
        imageWidth: width,
        imageHeight: height,
    };
};

export const imageSquareWithRandomSize = ({ min = 100, max = 800 } = {}) => {
    const size = chance.integer({ min, max });
    return {
        url: `https://picsum.photos/${size}/${size}`,
        imageWidth: size,
        imageHeight: size,
    };
};

export const video = () => ({
    url: 'https://www.youtube.com/watch?v=AfeAhCWaMD0',
    width: 640,
    height: 480,
});

export const background = () => ({ color: { color: chance.color({ format: 'rgb' }) } });

export const backgroundWithImage = () => ({
    color: { color: chance.color({ format: 'rgb' }) },
    image: image(),
});

export const audio = () => ({
    src: AudioTest,
    length: '16000',
    controls: true,
});

export const advertising = ({ width, height }) => ({
    width,
    height,
    image: { url: `https://picsum.photos/${width}/${height}`, width, height },
    url: 'https://www.urbania.ca',
});

export const renderFormats = {
    View: 'view',
    Preview: 'preview',
    Placeholder: 'placeholder',
    Edit: 'edit',
};

export default {
    title,
    subtitle,
    quote,
    author,
    source,
    description,
    paragraph,
};
