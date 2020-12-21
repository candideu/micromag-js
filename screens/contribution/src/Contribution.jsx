/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { isTextFilled, isLabelFilled } from '@micromag/core/utils';
import { useContributions, useContributionCreate } from '@micromag/data';

import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import TextInput from '@micromag/element-text-input';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom']),
    title: MicromagPropTypes.headingElement,
    name: MicromagPropTypes.inputElement,
    message: MicromagPropTypes.inputElement,
    submit: MicromagPropTypes.textElement,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    resizeTransitionDuration: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'middle',
    title: null,
    name: null,
    message: null,
    submit: null,
    spacing: 20,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: null,
    transitionStagger: 100,
    resizeTransitionDuration: 750,
    className: null,
};

const ContributionScreen = ({
    layout,
    title,
    name,
    message,
    submit,
    spacing,
    background,
    current,
    active,
    maxRatio,
    transitions,
    transitionStagger,
    resizeTransitionDuration,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { menuSize } = useViewer();
    const intl = useIntl();

    const landscape = width > height;

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const hasTitle = isTextFilled(title);
    const hasNameLabel = isLabelFilled(name);
    const hasMessageLabel = isLabelFilled(message);
    const hasSubmit = isTextFilled(submit);

    const contributionsRef = useRef(null);
    const formRef = useRef(null);
    const [interactiveContainerHeight, setInteractiveContainerHeight] = useState(null);

    const [userName, setUserName] = useState('');
    const [userMessage, setUserMessage] = useState('');

    // 0 = default, 1 = submitting, 2 = submitted, 3 = resizing, 4 = done
    const [submitState, setSubmitState] = useState(0);

    const onContributionSubmitted = useCallback(() => {
        setSubmitState(2);
    }, [setSubmitState]);

    const { create: submitContribution } = useContributionCreate({
        screenId: 'screen-id',
        onSubmitSuccess: onContributionSubmitted,
    });

    const { contributions } = useContributions({ screenId: 'screen-id' });

    const onNameChange = useCallback(
        (e) => {
            setUserName(e.currentTarget.value);
        },
        [setUserName],
    );

    const onMessageChange = useCallback(
        (e) => {
            setUserMessage(e.currentTarget.value);
        },
        [setUserMessage],
    );

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (submitState === 0) {
                setInteractiveContainerHeight(formRef.current.offsetHeight);
                setSubmitState(1);
                submitContribution({ name: userName, message: userMessage });
            }
        },
        [submitState, setSubmitState, userName, userMessage, contributions],
    );

    useEffect(() => {
        let timeout = null;
        if (submitState === 2) {
            timeout = setTimeout(setSubmitState, resizeTransitionDuration, 4);
            setInteractiveContainerHeight(contributionsRef.current.offsetHeight);
            setSubmitState(3);
        }

        return () => {
            if (submitState === 3 && timeout !== null) {
                clearTimeout(timeout);
            }
        };
    }, [submitState, setInteractiveContainerHeight, setSubmitState, resizeTransitionDuration]);

    // Title

    const items = [
        <ScreenElement
            key="title"
            placeholder="title"
            emptyLabel={<FormattedMessage defaultMessage="Title" description="Title placeholder" />}
            emptyClassName={styles.emptyTitle}
            isEmpty={!hasTitle}
        >
            {hasTitle ? (
                <Transitions transitions={transitions} playing={current} disabled={!isView}>
                    <Heading {...title} className={styles.title} />
                </Transitions>
            ) : null}
        </ScreenElement>,
    ];

    // Form

    items.push(
        <div
            className={styles.interactiveContainer}
            style={{
                height: submitState < 4 ? interactiveContainerHeight : null,
                transitionDuration: `${resizeTransitionDuration}ms`,
            }}
        >
            <form className={styles.form} onSubmit={onSubmit} ref={formRef}>
                <div className={styles.formContent}>
                    <ScreenElement
                        placeholder="inputText"
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Your name"
                                description="Your name placeholder"
                            />
                        }
                        emptyClassName={styles.emptyInputName}
                        isEmpty={!hasNameLabel}
                    >
                        <Transitions
                            transitions={transitions}
                            playing={current}
                            delay={transitionStagger}
                            disabled={!isView}
                        >
                            <TextInput
                                className={styles.inputName}
                                label={intl.formatMessage({
                                    defaultMessage: 'Your name',
                                    description: 'Your name placeholder',
                                })}
                                {...name}
                                value={userName}
                                onChange={(e) => onNameChange(e)}
                                disabled={isPreview}
                                required
                            />
                        </Transitions>
                    </ScreenElement>
                    <ScreenElement
                        placeholder="inputText"
                        placeholderProps={{ height: '1.5em' }}
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Your message"
                                description="Your message placeholder"
                            />
                        }
                        emptyClassName={styles.emptyInputMessage}
                        isEmpty={!hasMessageLabel}
                    >
                        <Transitions
                            transitions={transitions}
                            playing={current}
                            delay={transitionStagger * 2}
                            disabled={!isView}
                        >
                            <TextInput
                                className={styles.inputMessage}
                                label={intl.formatMessage({
                                    defaultMessage: 'Your message',
                                    description: 'Your message placeholder',
                                })}
                                {...message}
                                value={userMessage}
                                onChange={(e) => onMessageChange(e)}
                                disabled={isPreview}
                                multiline
                                required
                            />
                        </Transitions>
                    </ScreenElement>
                    <ScreenElement
                        placeholder="button"
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Submit"
                                description="Submit placeholder"
                            />
                        }
                        emptyClassName={styles.emptySubmit}
                        isEmpty={!hasSubmit}
                    >
                        <Transitions
                            transitions={transitions}
                            playing={current}
                            delay={transitionStagger * 3}
                            disabled={!isView}
                        >
                            <Button
                                type="submit"
                                className={styles.buttonSubmit}
                                disabled={isPreview}
                            >
                                <Text
                                    body={intl.formatMessage({
                                        defaultMessage: 'Submit',
                                        description: 'Submit placeholder',
                                    })}
                                    {...submit}
                                    inline
                                />
                            </Button>
                        </Transitions>
                    </ScreenElement>
                </div>
                <div className={styles.formLoading}>
                    <FontAwesomeIcon className={styles.loadingIcon} icon={faSpinner} />
                </div>
            </form>
            <div className={styles.contributionsContainer}>
                <div className={styles.contributionsContent}>
                    <div className={styles.contributions} ref={contributionsRef}>
                        {contributions.map((contribution, contributionI) => (
                            <div
                                key={`contribution${contributionI}`}
                                className={styles.contribution}
                            >
                                <Text
                                    className={styles.contributionName}
                                    body={contribution.name}
                                    textStyle={{ fontStyle: 'bold' }}
                                />
                                <Text
                                    className={styles.contributionMessage}
                                    body={contribution.message}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>,
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.submitting]: submitState === 1,
                    [styles.submitted]: submitState > 1,
                    [styles.showContributions]: submitState === 4,
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
            <Container width={width} height={height} maxRatio={maxRatio} withScroll>
                <div
                    className={styles.content}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop: (!landscape && !isPreview ? menuSize : 0) + spacing,
                              }
                            : null
                    }
                >
                    <Scroll verticalAlign={layout} disabled={isPlaceholder || isPreview}>
                        {items}
                    </Scroll>
                </div>
            </Container>
        </div>
    );
};

ContributionScreen.propTypes = propTypes;
ContributionScreen.defaultProps = defaultProps;

export default ContributionScreen;
