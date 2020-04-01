/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAd } from '@fortawesome/free-solid-svg-icons';

import Placeholder from './Placeholder';
import PlaceholderBlock from './PlaceholderBlock';

import styles from '../../styles/partials/placeholders.module.scss';

export const Text = props => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.text])}
        height={0.2}
        lines={4}
    />
);

export const Title = props => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.title])}
        height={1}
        lines={1}
        lineMargin={1}
    />
);

export const Subtitle = props => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.subtitle])}
        height={0.5}
        lines={1}
    />
);

export const Quote = props => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.subtitle])}
        height={0.5}
        lines={1}
    />
);

export const Image = props => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.image])}
        height={2}
        lines={1}
    />
);

export const Video = props => (
    <PlaceholderBlock
        {...props}
        className={classNames([props.className, styles.video])}
        width="100%"
        height="50%"
    >
        <FontAwesomeIcon icon={faPlay} className={styles.icon} />
    </PlaceholderBlock>
);

export const Map = props => (
    <Placeholder {...props} className={classNames([props.className, styles.map])} />
);

export const Timeline = props => (
    <Placeholder {...props} className={classNames([props.className, styles.timeline])} />
);

export const Ad = props => (
    <PlaceholderBlock {...props} className={classNames([props.className, styles.ad])}>
        <FontAwesomeIcon icon={faAd} className={styles.icon} />
    </PlaceholderBlock>
);

export default {
    Text,
    Description: Text,
    Title,
    Subtitle,
    Quote,
    Image,
    Video,
    Map,
    Timeline,
    Ad,
};
