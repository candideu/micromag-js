/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromBox } from '@micromag/core/utils';
import Text from '@micromag/element-text';

import styles from './styles.module.scss';

const propTypes = {
    className: PropTypes.string,
    label: MicromagPropTypes.textElement,
    boxStyle: MicromagPropTypes.boxStyle,
};

const defaultProps = {
    className: null,
    label: null,
    boxStyle: null,
};

const ShareIncentive = ({ className, label, boxStyle }) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        <div
            className={styles.box}
            style={{
                ...getStyleFromBox(boxStyle),
            }}
        >
            <Text className={styles.text} {...label} />
        </div>
    </div>
);

ShareIncentive.propTypes = propTypes;
ShareIncentive.defaultProps = defaultProps;

export default ShareIncentive;
