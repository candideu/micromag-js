/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Screen from './Screen';

import { getDeviceScreens } from '../../utils/getDeviceScreens';
import { useScreenSizeFromElement } from '../../hooks/useScreenSize';

import { ScreenSizeProvider } from '../../contexts/ScreenSizeContext';
import * as AppPropTypes from '../../PropTypes';

import styles from '../../styles/screens/story.module.scss';

const propTypes = {
    screen: AppPropTypes.component,
    width: PropTypes.number,
    height: PropTypes.number,
    deviceScreens: AppPropTypes.deviceScreens,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    screen: {},
    width: null,
    height: null,
    deviceScreens: getDeviceScreens(),
    className: null,
    children: null,
};

const Story = ({ screen, width, height, deviceScreens, className, children }) => {
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        width,
        height,
        screens: deviceScreens,
    });
    // console.log(styles, screenSize, refContainer);
    return (
        <div
            className={styles.container}
            ref={refContainer}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
            <ScreenSizeProvider size={screenSize}>
                <Screen
                    screen={screen}
                    component={children}
                    isPlaceholder
                    width={screenSize.width}
                    height={screenSize.height}
                    className={classNames([
                        styles.screen,
                        {
                            [className]: className !== null,
                        },
                    ])}
                />
            </ScreenSizeProvider>
        </div>
    );
};

Story.propTypes = propTypes;
Story.defaultProps = defaultProps;

export default Story;
