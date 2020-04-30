import { defineMessages } from 'react-intl';

const messages = defineMessages({});

export const schemas = defineMessages({
    schemaTitle: {
        id: 'schema.title',
        defaultMessage: 'Panorama',
    },
    background: {
        id: 'schema.properties.background',
        defaultMessage: 'Background',
        file: 'src/messages.js',
    },
});

export default messages;