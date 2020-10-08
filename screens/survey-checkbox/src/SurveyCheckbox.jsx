/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import TextComponent from '@micromag/element-text';
import Image from '@micromag/element-image';
import Checkbox from '@micromag/element-checkbox';
import Button from '@micromag/element-button';

import {
    PlaceholderTitle,
    PlaceholderSubtitle,
    PlaceholderButton,
    PropTypes as MicromagPropTypes,
} from '@micromag/core';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

export const layouts = ['normal'];

const propTypes = {
    question: MicromagPropTypes.textElement,
    options: PropTypes.arrayOf(MicromagPropTypes.textElement),
    result: PropTypes.shape({
        image: MicromagPropTypes.image,
        text: MicromagPropTypes.textElement,
    }),
    background: MicromagPropTypes.backgroundElement,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    question: null,
    options: null,
    result: null,
    background: null,
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const SurveyCheckbox = ({
    question,
    options,
    result,
    background,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isEditor, isView } = getRenderFormat(renderFormat);

    const [value, setValue] = useState('');
    const [answered, setAnswered] = useState(false);
    const { image, text: resultText } = result || {};

    const onClickSubmit = () => {
        setAnswered(true);
    };
    const onChange = useCallback((newValue) => setValue(newValue), [value]);

    const containerClassNames = classNames([
        styles.container,
        {
            [className]: className !== null,
        },
    ]);

    return (
        <div className={containerClassNames}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
            />
            <div className={styles.content}>
                <Container width={width} height={height} visible={visible}>
                    <div className={styles.inner}>
                        {answered ? (
                            <div className={styles.resultContainer}>
                                <Image className={styles.image} {...image} />
                                <TextComponent className={styles.result} {...resultText} />
                            </div>
                        ) : (
                            <>
                                {renderFormat !== 'placeholder' ? (
                                    <div className={styles.choices}>
                                        {options !== null && options.length > 0 ? (
                                            <>
                                                {question !== null ? (
                                                    <TextComponent
                                                        className={styles.question}
                                                        {...question}
                                                    />
                                                ) : null}

                                                {options.map((item, i) => (
                                                    <Checkbox
                                                        className={styles.choice}
                                                        onChange={onChange}
                                                        key={`checkbox-${i + 1}`}
                                                        option={<TextComponent {...item} />}
                                                        value={value}
                                                    />
                                                ))}
                                                <Button
                                                    className={styles.button}
                                                    onClick={onClickSubmit}
                                                >
                                                    soumettre
                                                </Button>
                                            </>
                                        ) : null}
                                    </div>
                                ) : (
                                    <>
                                        <PlaceholderTitle className={styles.questionPlaceholder} />
                                        <Checkbox
                                            className={styles.placeholder}
                                            option={<PlaceholderSubtitle />}
                                        />
                                        <Checkbox
                                            className={styles.placeholder}
                                            option={<PlaceholderSubtitle />}
                                        />
                                        <Checkbox
                                            className={styles.placeholder}
                                            option={<PlaceholderSubtitle />}
                                        />
                                        <PlaceholderButton
                                            className={styles.submitButtonPlaceholder}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </Container>
            </div>
        </div>
    );
};

SurveyCheckbox.propTypes = propTypes;
SurveyCheckbox.defaultProps = defaultProps;

export default SurveyCheckbox;
