/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    PlaceholderText,
    PlaceholderTitle,
    ScreenElement,
    TransitionsStagger,
} from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { useTrackScreenEvent } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import styles from './styles.module.scss';

const propTypes = {
    category: MicromagPropTypes.headingElement,
    date: MicromagPropTypes.textElement,
    title: MicromagPropTypes.headingElement,
    sponsor: MicromagPropTypes.textElement,
    description: MicromagPropTypes.textElement,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    active: PropTypes.bool,
    animateBackground: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    category: null,
    date: null,
    title: null,
    sponsor: null,
    description: null,
    spacing: 20,
    background: null,
    callToAction: null,
    current: true,
    active: true,
    animateBackground: false,
    transitions: null,
    transitionStagger: 100,
    className: null,
};

const Recommendation = ({
    category,
    date,
    title,
    sponsor,
    description,
    spacing,
    background,
    callToAction,
    current,
    active,
    animateBackground,
    transitions,
    transitionStagger,
    className,
}) => {
    const trackScreenEvent = useTrackScreenEvent();

    const { width, height, menuOverScreen } = useScreenSize();
    const { menuSize } = useViewer();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const hasCategory = isTextFilled(category);
    const hasDate = isTextFilled(date);
    const hasTitle = isTextFilled(title);
    const hasSponsor = isTextFilled(sponsor);
    const hasDescription = isTextFilled(description);

    const onlyCategory = hasCategory && !hasDate && !hasTitle && !hasSponsor && !hasDescription;

    const hasTextCard = hasCategory || hasDate || hasTitle || hasSponsor || hasDescription;

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active || !isView;
    const finalAnimateBackground = animateBackground && !isPlaceholder && !isStatic && !isPreview;

    const hasCallToAction = callToAction !== null && callToAction.active === true;
    const [scrolledBottom, setScrolledBottom] = useState(false);

    const onScrolledBottom = useCallback(
        ({ initial }) => {
            if (initial) {
                trackScreenEvent('scroll', 'Screen');
            }
            setScrolledBottom(true);
        },
        [trackScreenEvent],
    );

    const onScrolledNotBottom = useCallback(() => {
        setScrolledBottom(false);
    }, [setScrolledBottom]);

    const finalBackground = useMemo(
        () => ({
            fit: 'contain',
            horizontalAlign: 'left',
            verticalAlign: '-20%',
            repeat: true,
            ...background,
        }),
        [background],
    );

    // Create elements
    const items = [
        !isPlaceholder ? <Spacer key="spacer-cta-top" /> : null,
        hasTextCard || isPlaceholder ? (
            <Container
                className={classNames([
                    styles.textCard,
                    {
                        [className]: className !== null,
                        [styles.isPlaceholder]: isPlaceholder,
                    },
                ])}
            >
                {/* // CATEGORY */}
                <ScreenElement
                    key="category"
                    placeholder={<PlaceholderTitle className={styles.categoryPlaceholder} />}
                    emptyLabel={
                        <FormattedMessage
                            defaultMessage="Category"
                            description="Category placeholder"
                        />
                    }
                    emptyClassName={styles.emptyText}
                    isEmpty={!hasCategory}
                >
                    {hasCategory ? (
                        <Heading
                            className={classNames([
                                styles.category,
                                {
                                    [className]: className !== null,
                                    [styles.noBottomBorder]: onlyCategory,
                                },
                            ])}
                            {...category}
                        />
                    ) : null}
                </ScreenElement>
                {hasDate || hasTitle || isPlaceholder ? (
                    <div
                        className={classNames([
                            styles.dateTitleRow,
                            {
                                [className]: className !== null,
                                [styles.bottomBorder]:
                                    hasSponsor || (!hasSponsor && hasDescription),
                                [styles.isPlaceholder]: isPlaceholder,
                            },
                        ])}
                    >
                        {/* // DATE */}
                        <ScreenElement
                            key="date"
                            placeholder={<PlaceholderText className={styles.datePlaceholder} />}
                            emptyLabel={
                                <FormattedMessage
                                    defaultMessage="Date"
                                    description="Date placeholder"
                                />
                            }
                            emptyClassName={styles.emptyText}
                            isEmpty={!hasDate}
                        >
                            {hasDate ? (
                                <div
                                    className={classNames([
                                        styles.dateContainer,
                                        {
                                            [className]: className !== null,
                                            [styles.rightBorder]: hasTitle,
                                        },
                                    ])}
                                >
                                    <Text
                                        className={classNames([
                                            styles.date,
                                            {
                                                [className]: className !== null,
                                                [styles.centerDate]: !hasTitle,
                                            },
                                        ])}
                                        {...date}
                                    />
                                </div>
                            ) : null}
                        </ScreenElement>
                        {/* // TITLE */}
                        <ScreenElement
                            key="title"
                            placeholder="title"
                            emptyLabel={
                                <FormattedMessage
                                    defaultMessage="Title"
                                    description="Title placeholder"
                                />
                            }
                            emptyClassName={styles.emptyTitle}
                            isEmpty={!hasTitle}
                        >
                            {hasTitle ? (
                                <div
                                    className={classNames([
                                        styles.titleContainer,
                                        {
                                            [className]: className !== null,
                                            [styles.leftBorder]: hasDate,
                                        },
                                    ])}
                                >
                                    <Heading className={styles.title} {...title} />
                                </div>
                            ) : null}
                        </ScreenElement>
                    </div>
                ) : null}
                {/* // SPONSOR */}
                <ScreenElement
                    key="sponsor"
                    placeholder={<PlaceholderText className={styles.sponsorPlaceholder} />}
                    emptyLabel={
                        <FormattedMessage defaultMessage="Sponsor" description="Text placeholder" />
                    }
                    emptyClassName={styles.emptyText}
                    isEmpty={!hasSponsor}
                >
                    {hasSponsor ? (
                        <Text
                            className={classNames([
                                styles.sponsor,
                                {
                                    [className]: className !== null,
                                    [styles.bottomBorder]: hasDescription,
                                },
                            ])}
                            {...sponsor}
                        />
                    ) : null}
                </ScreenElement>

                {/* // DESCRIPTION */}
                <ScreenElement
                    key="description"
                    placeholder={<PlaceholderText className={styles.descriptionPlaceholder} />}
                    emptyLabel={
                        <FormattedMessage
                            defaultMessage="Description"
                            description="Text placeholder"
                        />
                    }
                    emptyClassName={styles.emptyText}
                    isEmpty={!hasDescription}
                >
                    {hasDescription ? (
                        <Text className={styles.description} {...description} />
                    ) : null}
                </ScreenElement>
            </Container>
        ) : null,
        !isPlaceholder ? <Spacer key="spacer-cta-bottom" /> : null,
        !isPlaceholder && hasCallToAction ? (
            <div style={{ margin: -spacing, marginTop: '10px' }} key="call-to-action">
                <CallToAction
                    callToAction={callToAction}
                    disabled={!scrolledBottom}
                    animationDisabled={isPreview}
                    focusable={current && isView}
                    screenSize={{ width, height }}
                />
            </div>
        ) : null,
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
            {!isPlaceholder ? (
                <Background
                    background={finalBackground}
                    width={width}
                    height={height}
                    playing={backgroundPlaying}
                    shouldLoad={backgroundShouldLoad}
                    backgroundClassName={finalAnimateBackground ? styles.background : null}
                />
            ) : null}
            <Container width={width} height={height}>
                <Scroll
                    disabled={scrollingDisabled}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
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

Recommendation.propTypes = propTypes;
Recommendation.defaultProps = defaultProps;

export default React.memo(Recommendation);