/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { ScreenElement, TransitionsStagger } from '@micromag/core/components';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout, { Spacer } from '@micromag/element-layout';
import Quote from '@micromag/element-quote';
import Text from '@micromag/element-text';
import CallToAction from '@micromag/element-call-to-action';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    quote: MicromagPropTypes.textElement,
    author: MicromagPropTypes.textElement,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',
    quote: null,
    author: null,
    spacing: 20,
    background: null,
    callToAction: null,
    current: true,
    transitions: null,
    transitionStagger: 100,
    className: null,
};

const QuoteScreen = ({
    layout,
    quote,
    author,
    spacing,
    background,
    callToAction,
    current,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height, menuOverScreen } = useScreenSize();
    const { menuSize } = useViewer();

    const {
        isView,
        isPreview,
        isPlaceholder,
        isEdit,
        isStatic,
        isCapture,
    } = useScreenRenderContext();

    const hasQuote = isTextFilled(quote);
    const hasAuthor = isTextFilled(author);

    const isSplitted = layout === 'split';
    const isTopLayout = layout === 'top';
    const isMiddleLayout = layout === 'middle';
    const verticalAlign = isSplitted ? null : layout;

    const quoteWithMargin = hasQuote && hasAuthor && !isSplitted;
    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview;
    const backgroundPlaying = current && (isView || isEdit);

    const hasCallToAction = callToAction !== null && callToAction.active === true;

    const items = [
        !isPlaceholder && hasCallToAction && isMiddleLayout ? (
            <Spacer key="spacer-cta-top" />
        ) : null,
        <ScreenElement
            key="quote"
            placeholder="quote"
            emptyLabel={<FormattedMessage defaultMessage="Quote" description="Quote placeholder" />}
            emptyClassName={styles.emptyQuote}
            isEmpty={!hasQuote}
        >
            {hasQuote ? (
                <Quote
                    className={classNames([styles.quote, { [styles.withMargin]: quoteWithMargin }])}
                    {...quote}
                />
            ) : null}
        </ScreenElement>,
        isSplitted && <Spacer key="spacer" />,
        <ScreenElement
            key="author"
            placeholder="subtitle"
            emptyLabel={
                <FormattedMessage defaultMessage="Author" description="Author placeholder" />
            }
            emptyClassName={styles.emptyAuthor}
            isEmpty={!hasAuthor}
        >
            {hasAuthor ? <Text className={styles.author} {...author} /> : null}
        </ScreenElement>,
        !isPlaceholder && hasCallToAction && (isTopLayout || isMiddleLayout) ? (
            <Spacer key="spacer-cta-bottom" />
        ) : null,
        !isPlaceholder && hasCallToAction ? (
            <CallToAction
                key="call-to-action"
                callToAction={callToAction}
                animationDisabled={isPreview}
            />
        ) : null,
    ].filter((el) => el !== null);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready
        >
            {!isPlaceholder ? (
                <Background
                    {...background}
                    width={width}
                    height={height}
                    playing={backgroundPlaying}
                />
            ) : null}
            <Container width={width} height={height}>
                <Layout
                    className={styles.layout}
                    fullscreen
                    verticalAlign={verticalAlign}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop: (menuOverScreen && !isPreview ? menuSize : 0) + spacing,
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
            </Container>
        </div>
    );
};

QuoteScreen.propTypes = propTypes;
QuoteScreen.defaultProps = defaultProps;

export default React.memo(QuoteScreen);
