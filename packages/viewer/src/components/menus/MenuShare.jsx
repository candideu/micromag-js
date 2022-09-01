/* eslint-disable react/no-array-index-key, jsx-a11y/control-has-associated-label, jsx-a11y/label-has-associated-control, react/jsx-props-no-spreading, arrow-body-style */
// stylelint-disable stylelint-family-no-missing-generic-family-keyword
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromColor } from '@micromag/core/utils';
import Scroll from '@micromag/element-scroll';
import ShareOptions from '@micromag/element-share-options';

import MicromagPreview from '../partials/MicromagPreview';

import styles from '../../styles/menus/menu-share.module.scss';

const propTypes = {
    viewerTheme: MicromagPropTypes.viewerTheme,
    menuWidth: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    items: MicromagPropTypes.menuItems,
    focusable: PropTypes.bool,
    // shouldLoad: PropTypes.bool, // @todo still needed? to re-implement?
    currentScreenIndex: PropTypes.number,
    shareUrl: PropTypes.string,
    onShare: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    viewerTheme: null,
    menuWidth: null,
    title: null,
    description: null,
    items: [],
    focusable: true,
    currentScreenIndex: 0,
    shareUrl: null,
    onShare: null,
    className: null,
};

const ViewerMenuShare = ({
    viewerTheme,
    menuWidth,
    title,
    description,
    items,
    focusable,
    currentScreenIndex,
    shareUrl,
    onShare,
    className,
}) => {
    // Viewer theme
    // @todo room for improvement here probably
    const { colors = null, background = null, logo: brandLogo = null } = viewerTheme || {};
    // @todo could get from theme provider? need to re-implement
    const { primary: brandPrimaryColor = null, secondary: brandSecondaryColor = null } =
        colors || {};
    const { color: brandBackgroundColor = null, image = null } = background || {};
    const { url: brandImageUrl = null } = image || {};

    // const borderPrimaryColorStyle = getStyleFromColor(brandPrimaryColor, 'borderColor');
    // const colorSecondaryColorStyle = getStyleFromColor(brandSecondaryColor, 'color');
    const backgroundColorStyle = getStyleFromColor(brandBackgroundColor, 'backgroundColor');
    // const { url: brandLogoUrl = null } = brandLogo || {};
    const brandImageStyle =
        brandImageUrl !== null
            ? {
                  backgroundImage: `url(${brandImageUrl})`,
              }
            : null;

    const coverScreen = useMemo(() => {
        const { screen = null } = items[0] || {};
        return screen;
    }, [items]);

    const currentScreen = useMemo(() => {
        const found = items.find((item) => {
            const { current = false } = item || {};
            return current;
        });
        const { screen = null } = found || {};

        return screen;
    }, [items, currentScreenIndex, focusable]);

    const [shareCurrentScreen, setShareCurrentScreen] = useState(false);
    const onShareModeChange = useCallback(() => {
        setShareCurrentScreen((value) => !value);
    }, [setShareCurrentScreen]);

    const [finalShareUrl, setFinalShareUrl] = useState(shareUrl);
    useEffect(() => {
        setFinalShareUrl(
            shareCurrentScreen && currentScreenIndex !== 0
                ? `${shareUrl}/${currentScreenIndex}`
                : shareUrl,
        );
    }, [shareCurrentScreen, currentScreenIndex, setFinalShareUrl]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{ ...backgroundColorStyle, ...brandImageStyle, width: menuWidth }}
            aria-hidden={focusable ? null : 'true'}
        >
            <div className={styles.content}>
                <Scroll className={styles.scroll}>
                    <div className={styles.header}>
                        <MicromagPreview
                            className={styles.preview}
                            screen={shareCurrentScreen ? currentScreen : coverScreen}
                            title={title}
                            url={finalShareUrl}
                            description={description}
                        />

                        {currentScreenIndex !== 0 ? (
                            <div className={styles.mode}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="currentScreen"
                                        value="currentScreen"
                                        onChange={onShareModeChange}
                                        checked={shareCurrentScreen}
                                    />
                                    <FormattedMessage
                                        defaultMessage="Start from the current screen"
                                        description="Share mode"
                                    />
                                </label>
                            </div>
                        ) : null}
                    </div>

                    <ShareOptions
                        className={styles.options}
                        itemClassName={styles.optionItem}
                        buttonClassName={styles.optionButton}
                        title={title}
                        url={finalShareUrl}
                        focusable={focusable}
                        onShare={onShare}
                        shareCurrentScreen={shareCurrentScreen}
                    />
                </Scroll>
            </div>
        </div>
    );
};

ViewerMenuShare.propTypes = propTypes;
ViewerMenuShare.defaultProps = defaultProps;

export default ViewerMenuShare;