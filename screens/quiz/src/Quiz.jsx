/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

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
            answer: PropTypes.bool,
        }),
    ),
    answerIndex: PropTypes.number,
    result: PropTypes.shape({
        image: MicromagPropTypes.imageElement,
        text: MicromagPropTypes.textElement,
    }),
    spacing: PropTypes.number,
    showResultsDelay: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    resultsTransitionDuration: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',
    question: null,
    options: null,
    answerIndex: null,
    result: null,
    spacing: 20,
    showResultsDelay: 750,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: { in: 'fade', out: 'fade' },
    transitionStagger: 100,
    resultsTransitionDuration: 500,
    className: null,
};

const QuizScreen = ({
    layout,
    question,
    options,
    answerIndex,
    result,
    spacing,
    showResultsDelay,
    background,
    current,
    active,
    maxRatio,
    transitions,
    transitionStagger,
    resultsTransitionDuration,
    className,
}) => {
    const { width, height } = useScreenSize();
    const landscape = width > height;
    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const hasQuestion = question !== null;
    const hasResult = result !== null;

    const isEmptyQuestion = isEdit && !hasQuestion;
    const isEmptyResult = isEdit && !hasResult;

    const [userAnswerIndex, setUserAnswerIndex] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const answered = userAnswerIndex !== null;
    const hasUserAnsweredRight = answered ? userAnswerIndex === answerIndex : null;

    const isSplitted = layout === 'split';
    const verticalAlign = isSplitted ? null : layout;

    const onOptionClick = useCallback(
        (optionIndex) => {
            let timeout = null;
            if (userAnswerIndex === null) {
                setUserAnswerIndex(optionIndex);
                timeout = setTimeout(setShowResults, showResultsDelay, true);
            }

            return () => {
                if (timeout !== null) {
                    clearTimeout(timeout);
                }                
            }
        },
        [userAnswerIndex, setUserAnswerIndex, showResultsDelay],
    );
    
    // @TODO update scale + inverted scale inside instead of height for best performance

    // we get .answer's current and future height to animate its height
    // we also get the right answer's Y to animate its position

    const answerRef = useRef(null);
    const optionsRef = useRef(null);
    const rightAnswerRef = useRef(null);
    const resultRef = useRef(null);

    const [answerTransitionProps, setAnswerTransitionProps] = useState(null);

    useEffect(() => {
        const answerEl = answerRef.current;
        const optionsEl = optionsRef.current;
        const rightAnswerEl = rightAnswerRef.current;
        const resultEl = resultRef.current;

        if (
            answerEl !== null &&
            optionsEl !== null &&
            rightAnswerEl !== null &&
            resultEl !== null
        ) {
            const answerRect = answerEl.getBoundingClientRect();
            const optionsRect = optionsEl.getBoundingClientRect();
            const rightAnswerRect = rightAnswerEl.getBoundingClientRect();
            const resultRect = resultEl.getBoundingClientRect();

            const answerHeight = answerRect.height;
            const optionsY = optionsRect.top;
            const rightAnswerY = rightAnswerRect.top;
            const rightAnswerHeight = rightAnswerRect.height;
            const resultHeight = resultRect.height;

            setAnswerTransitionProps({
                rightAnswerTranslateY: optionsY - rightAnswerY,
                answerInitialHeight: answerHeight,
                answerAnsweredHeight: rightAnswerHeight + resultHeight,
            });
        }
    }, [setAnswerTransitionProps, width, height]);

    // when the animation is done, we set a state to remove animations props
    // .results' position changes from absolute to relative
    // the wrong options are removed from DOM

    const [answerTransitionComplete, setAnswerTransitionComplete] = useState(false);

    useEffect(() => {
        let timeout = null;
        if (showResults) {
            timeout = setTimeout(setAnswerTransitionComplete, resultsTransitionDuration, true);
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [showResults, resultsTransitionDuration, setAnswerTransitionComplete]);

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
                <Transitions transitions={transitions} playing={current} disabled={!isView}>
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
            ref={answerRef}
            style={answerTransitionProps !== null && !answerTransitionComplete && isView ? {
                transitionDuration: `${resultsTransitionDuration}ms`,
                height: !showResults
                    ? answerTransitionProps.answerInitialHeight
                    : answerTransitionProps.answerAnsweredHeight,
            } : null }
        >
            {options !== null ? (// Options
                <div
                    className={styles.options}
                    ref={optionsRef}
                >
                    {options.map((option, optionI) => {
                        const hasOption = option !== null;
                        const isEmptyOption = isEdit && !hasOption;
                        const rightAnswer = optionI === answerIndex;
                        const userAnswer = optionI === userAnswerIndex;

                        return answerTransitionComplete && !rightAnswer ? null : (
                            <div
                                key={`option-${optionI}`}
                                ref={rightAnswer ? rightAnswerRef : null}
                                className={classNames([
                                    styles.option,
                                    {
                                        [styles.rightAnswer]: rightAnswer,
                                        [styles.userAnswer]: userAnswer,
                                    },
                                ])}
                                style={
                                    answerTransitionProps &&
                                    showResults &&
                                    rightAnswer &&
                                    !answerTransitionComplete
                                        ? {
                                              transform: `translateY(${answerTransitionProps.rightAnswerTranslateY}px)`,
                                              transitionDuration: `${resultsTransitionDuration}ms`,
                                          }
                                        : null
                                }
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
                                            disabled={!isView}
                                        >
                                            <Button
                                                className={styles.button}
                                                onClick={() => onOptionClick(optionI)}
                                                disabled={answered}
                                            >
                                                {rightAnswer ? (
                                                    <span className={styles.resultIcon}>
                                                        <FontAwesomeIcon className={styles.faIcon} icon={hasUserAnsweredRight ? faCheck : faTimes } />
                                                    </span>
                                                ) : null}
                                                <Text
                                                    {...option.label}
                                                    tag="span"
                                                    className={styles.optionLabel}
                                                />
                                            </Button>
                                        </Transitions>
                                    ) : null}
                                </ScreenElement>
                            </div>
                        );
                    })}
                </div>
            ) : null}
            <ScreenElement
                placeholder="text"
                emptyLabel={
                    <FormattedMessage defaultMessage="Result" description="Result placeholder" />
                }
                emptyClassName={styles.empty}
                isEmpty={isEmptyResult}
            >
                {hasResult ? (// Result
                    <div
                        className={styles.result}
                        ref={resultRef}
                    >
                        <Transitions
                            transitions={transitions}
                            playing={current}
                            delay={(1 + options.length) * transitionStagger}
                            disabled={!isView}
                        >
                            <Text {...result} className={styles.resultText} />
                        </Transitions>
                    </div>
                ) : null}
            </ScreenElement>
        </div>,
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.answered]: answered,
                    [styles.showResults]: showResults,
                    [styles.answerTransitionComplete]: answerTransitionComplete,
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
                    style={isView || isPreview ? { padding: spacing, paddingTop: isView && !landscape ? spacing * 2 : spacing } : null}
                >
                    {items}
                </Layout>
            </Container>
        </div>
    );
};

QuizScreen.propTypes = propTypes;
QuizScreen.defaultProps = defaultProps;

export default QuizScreen;
