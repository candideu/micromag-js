/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { getDeviceScreens } from '../packages/core/src/utils';
import { useScreenSizeFromElement } from '../packages/core/src/hooks';
import { ScreenSizeProvider, GoogleMapsClientProvider } from '../packages/core/src/contexts';

const GoogleMapsApiKey =
    process.env && process.env.GOOGLE_MAPS_API_KEY ? process.env.GOOGLE_MAPS_API_KEY : null;

export const withGoogleMapsApi = storyFn => {
    if (!GoogleMapsApiKey) return <div>Error loading api key</div>;
    return (
        <GoogleMapsClientProvider apiKey={GoogleMapsApiKey}>{storyFn()}</GoogleMapsClientProvider>
    );
};

export const withScreenSize = ({
    width = null,
    height = null,
    style = null,
    containerStyle = null,
} = {}) => storyFn => {
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        width,
        height,
        screens: getDeviceScreens(),
    });

    let innerStyle = {
        ...style,
    };

    let outerStyle = {};

    if (width || height) {
        innerStyle = {
            ...style,
            position: 'relative',
            width,
            height,
        };
        outerStyle = {
            display: 'inline-block',
            margin: '10px',
            ...containerStyle,
        };
    }

    return (
        <div style={outerStyle}>
            <div
                ref={refContainer}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    ...innerStyle,
                }}
            >
                <ScreenSizeProvider size={screenSize}>{storyFn()}</ScreenSizeProvider>
            </div>
        </div>
    );
};

export const withPlaceholderSize = () =>
    withScreenSize({ width: 80, height: 120, containerStyle: { border: '1px solid #ccc' } });

export const withPreviewSize = () =>
    withScreenSize({
        width: 320,
        height: 480,
        style: { transform: 'scale(0.4)', transformOrigin: 'top left' },
    });

export default withScreenSize;