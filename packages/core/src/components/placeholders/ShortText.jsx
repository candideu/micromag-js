/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';

import Placeholder from '../partials/Placeholder';

import styles from '../../styles/partials/placeholders.module.scss';

export const ShortText = (props) => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.shortText])}
        height={0.2}
        lines={2}
    />
);

export default ShortText;
