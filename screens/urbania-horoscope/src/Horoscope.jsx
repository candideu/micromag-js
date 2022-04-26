/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    PlaceholderText,
    PlaceholderTitle,
    ScreenElement,
    TransitionsStagger,
} from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
// import { useTrackScreenEvent } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import Author from '@micromag/element-urbania-author';
import SignsGrid from './SignsGrid';
// import signsImages from './images';
import Astrologie from './images/astrologie-text.svg';
import signsList from './signs';
import styles from './styles.module.scss';

const propTypes = {
    defaultSigns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            label: PropTypes.string,
        }),
    ),
    signs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            label: PropTypes.string,
            word: MicromagPropTypes.headingElement,
            description: MicromagPropTypes.textElement,
        }),
    ),
    title: MicromagPropTypes.headingElement,
    description: MicromagPropTypes.textElement,
    author: MicromagPropTypes.authorElement,
    button: MicromagPropTypes.buttonElement,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    popupBackground: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    defaultSigns: signsList,
    signs: null,
    title: null,
    description: null,
    author: null,
    button: null,
    spacing: 20,
    background: null,
    popupBackground: null,
    current: true,
    active: true,
    transitions: null,
    transitionStagger: 100,
    className: null,
};

const Horoscope = ({
    defaultSigns,
    signs: signsValue,
    title,
    description,
    author,
    button,
    spacing,
    background,
    popupBackground,
    current,
    active,
    transitions,
    transitionStagger,
    className,
}) => {
    const [hasPopup, setHasPopup] = useState(true);

    const openPopup = useCallback(() => {
        setHasPopup(true);
    }, [hasPopup, setHasPopup]);

    const closePopup = useCallback(() => {
        setHasPopup(false);
    }, [hasPopup, setHasPopup]);

    const signs = defaultSigns.map((sign, index) => ({
        ...sign,
        ...(signsValue !== null && signsValue[index] ? signsValue[index] || null : null),
        // image: signsImages[sign.id] ? signsImages[sign.id] : null,
    }));

    // console.log(signs);

    const { width, height, menuOverScreen } = useScreenSize();
    const { menuSize } = useViewer();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const hasTitle = isTextFilled(title);
    const hasDescription = isTextFilled(description);

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active || !isView;

    // Create elements
    const items = [
        // !isPlaceholder ? <Spacer key="spacer-cta-top" /> : null,
        <div className={styles.headerContainer}>
            <ScreenElement
                key="title"
                placeholder={<PlaceholderTitle className={styles.titlePlaceholder} />}
                emptyLabel={
                    <FormattedMessage defaultMessage="Title" description="Title placeholder" />
                }
                emptyClassName={styles.emptyText}
                isEmpty={!hasTitle}
            >
                <img src={Astrologie} alt="" className={styles.title} />
                {/* <Astrologie /> */}
                {/* <Heading className={styles.title} {...title} /> */}
            </ScreenElement>
            <ScreenElement
                key="description"
                placeholder={<PlaceholderText className={styles.descriptionPlaceholder} />}
                emptyLabel={
                    <FormattedMessage defaultMessage="Description" description="Text placeholder" />
                }
                emptyClassName={styles.emptyText}
                isEmpty={!hasDescription}
            >
                {hasDescription ? <Text className={styles.description} {...description} /> : null}
            </ScreenElement>
            {!isPlaceholder && !isEdit ? (
                <Author author={author} className={styles.author} />
            ) : null}
        </div>,
        <ScreenElement
            key="button"
            placeholder={<PlaceholderText className={styles.buttonPlaceholder} />}
            emptyLabel={
                <FormattedMessage defaultMessage="Button" description="Button placeholder" />
            }
            emptyClassName={styles.emptyText}
            isEmpty={!hasDescription}
        >
            {!isPlaceholder ? (
                <div className={styles.buttonContainer}>
                    {button ? (
                        <Button
                            className={styles.button}
                            type="button"
                            separ
                            ateBorder
                            onClick={openPopup}
                        >
                            {button.label}
                        </Button>
                    ) : null}
                </div>
            ) : null}
        </ScreenElement>,
        hasPopup ? (
            <SignsGrid
                width={width}
                height={height}
                className={styles.signsGrid}
                closeButton={closePopup}
                background={popupBackground}
            />
        ) : null,

        // !isPlaceholder ? <Spacer key="spacer-cta-bottom" /> : null,
    ].filter((el) => el !== null);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready
        >
            <Background
                background={background}
                width={width}
                height={height}
                playing={backgroundPlaying}
                shouldLoad={backgroundShouldLoad}
            />
            <Container width={width} height={height}>
                <Scroll
                    disabled={scrollingDisabled}
                    // onScrolledBottom={onScrolledBottom}
                    // onScrolledNotBottom={onScrolledNotBottom}
                    verticalAlign="middle"
                >
                    <Layout
                        className={styles.layout}
                        style={
                            !isPlaceholder
                                ? {
                                      padding: spacing,
                                      paddingTop:
                                          (menuOverScreen && !isPreview ? menuSize : 0) + spacing,
                                  }
                                : null
                        }
                        height={height * 0.8}
                    >
                        <TransitionsStagger
                            transitions={transitions}
                            stagger={transitionStagger}
                            disabled={transitionDisabled}
                            playing={transitionPlaying}
                        >
                            {items}
                        </TransitionsStagger>
                    </Layout>
                </Scroll>
            </Container>
        </div>
    );
};

Horoscope.propTypes = propTypes;
Horoscope.defaultProps = defaultProps;

export default React.memo(Horoscope);
