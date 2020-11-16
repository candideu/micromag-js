/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { ScreenElement, Transitions } from '@micromag/core/components';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout, { Spacer } from '@micromag/element-layout';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';
import Button from '@micromag/element-button';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    question: MicromagPropTypes.textElement,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            label: MicromagPropTypes.textElement,
            percent: PropTypes.number,
        }),
    ),
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',
    question: null,
    options: null,
    spacing: 20,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 250,
        },
        out: 'scale',
    },
    transitionStagger: 100,
    className: null,
};

const SurveyScreen = ({
    layout,
    question,
    options,
    spacing,
    background,
    current,
    active,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const hasQuestion = question !== null;

    const isEmptyQuestion = isEdit && !hasQuestion;

    const [userAnswerIndex, setUserAnswerIndex] = useState(null);
    const answered = userAnswerIndex !== null;

    const isSplitted = layout === 'split';
    const verticalAlign = isSplitted ? null : layout;

    const onOptionClick = useCallback(
        (optionIndex) => {
            if (userAnswerIndex === null) {
                setUserAnswerIndex(optionIndex);
            }
        },
        [userAnswerIndex, setUserAnswerIndex],
    );

    // Question

    const items = [
        <ScreenElement
            key="question"
            placeholder="title"
            emptyLabel={
                <FormattedMessage defaultMessage="Question" description="Question placeholder" />
            }
            emptyClassName={styles.empty}
            isEmpty={isEmptyQuestion}
        >
            {hasQuestion ? (
                <Transitions transitions={transitions} playing={current}>
                    <Heading {...question} className={styles.question} />
                </Transitions>
            ) : null}
        </ScreenElement>,
    ];

    if (isSplitted) {
        items.push(<Spacer key="spacer" />);
    }

    // Answer

    items.push(
        <div
            key="answer"
            className={styles.answer}
        >
            {options !== null ? (// Options
                <div
                    className={styles.options}
                >
                    {options.map((option, optionI) => {
                        const hasOption = option !== null;
                        const isEmptyOption = isEdit && !hasOption;

                        const { label = null, percent = null } = option || {};

                        return (
                            <div
                                key={`option-${optionI}`}
                                className={classNames([
                                    styles.option,
                                    {
                                        [styles.userAnswered]: userAnswerIndex === optionI,
                                    },
                                ])}
                            >
                                <ScreenElement
                                    placeholder="button"
                                    emptyLabel={
                                        <FormattedMessage
                                            defaultMessage="Option"
                                            description="Option placeholder"
                                        />
                                    }
                                    emptyClassName={styles.empty}
                                    isEmpty={isEmptyOption}
                                >
                                    {hasOption ? (
                                        <Transitions
                                            transitions={transitions}
                                            playing={current}
                                            delay={(optionI + 1) * transitionStagger}
                                        >
                                            <div className={styles.optionContent}>
                                                <Button
                                                    className={styles.button}
                                                    onClick={() => onOptionClick(optionI)}
                                                >
                                                    <Text
                                                        {...label}
                                                        className={styles.optionLabel}
                                                    />
                                                </Button>
                                                <div className={styles.resultContainer}>
                                                    <div className={styles.resultContent}>
                                                        <div className={styles.result} style={{ width: `${percent}%` }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Transitions>
                                    ) : null}
                                </ScreenElement>
                            </div>
                        );
                    })}
                </div>
            ) : null}
        </div>,
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.answered]: answered,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEdit && active)}
                maxRatio={maxRatio}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <Layout
                    fullscreen
                    verticalAlign={verticalAlign}
                    style={isView || isPreview ? { padding: spacing } : null}
                >
                    {items}
                </Layout>
            </Container>
        </div>
    );
};

SurveyScreen.propTypes = propTypes;
SurveyScreen.defaultProps = defaultProps;

export default SurveyScreen;
