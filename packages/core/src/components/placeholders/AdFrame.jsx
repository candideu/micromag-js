/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAd } from '@fortawesome/free-solid-svg-icons';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/partials/placeholders.module.scss';

export const AdFrame = (props) => (
    <PlaceholderBlock {...props} width="80%" className={classNames([props.className, styles.ad])}>
        <FontAwesomeIcon icon={faAd} className={styles.icon} />
    </PlaceholderBlock>
);

export default AdFrame;