import { defineMessage } from 'react-intl';
import { description } from '../../../.storybook/data';
import * as images from './images/index';

export default [
    {
        id: 'aries',
        image: images.aries,
        label: defineMessage({
            defaultMessage: 'Aries',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Mar 21 - Apr 19',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'taurus',
        image: images.taurus,
        label: defineMessage({
            defaultMessage: 'Taurus',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Apr 20 - May 20',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'gemini',
        image: images.gemini,
        label: defineMessage({
            defaultMessage: 'Gemini',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'May 21 - June 20',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'cancer',
        image: images.cancer,
        label: defineMessage({
            defaultMessage: 'Cancer',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'June 21 - July 22',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'leo',
        image: images.leo,
        label: defineMessage({
            defaultMessage: 'Leo',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'June 23 - Aug 22',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'virgo',
        image: images.virgo,
        label: defineMessage({
            defaultMessage: 'Virgo',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Aug 23 - Sept 22',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'libra',
        image: images.libra,
        label: defineMessage({
            defaultMessage: 'Libra',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Sept 23 - Oct 22',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'scorpio',
        image: images.scorpio,
        label: defineMessage({
            defaultMessage: 'Scorpio',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Oct 23 - Nov 22',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'sagittarius',
        image: images.sagittarius,
        label: defineMessage({
            defaultMessage: 'Sagittarius',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Nov 23 - Dec 21',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'capricorn',
        image: images.capricorn,
        label: defineMessage({
            defaultMessage: 'Capricorn',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Dec 22 - Jan 20',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'aquarius',
        image: images.aquarius,
        label: defineMessage({
            defaultMessage: 'Aquarius',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Jan 21 - Feb 18',
            description: 'Horoscope date',
        }),
    },
    {
        id: 'pisces',
        image: images.pisces,
        label: defineMessage({
            defaultMessage: 'Pisces',
            description: 'Horoscope sign',
        }),
        date: defineMessage({
            defaultMessage: 'Feb 19 - Mar 20',
            description: 'Horoscope date',
        }),
    },
];
