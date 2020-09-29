import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    maxRatio: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    width: '100%',
    height: '100%',
    maxRatio: 2 / 3,
    className: null,
    children: null,
};

const Container = ({ width, height, maxRatio, className, children }) => {
    console.log('TODO: calculate ratio', maxRatio);
    const finalStyle = {
        width,
        height,
        maxWidth: 768,
    };
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={finalStyle}
        >
            {children}
        </div>
    );
};

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
