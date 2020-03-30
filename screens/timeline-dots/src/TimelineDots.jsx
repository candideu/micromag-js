/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextComponent from '@micromag/component-text';
import Image from '@micromag/component-image';
import Heading from '@micromag/component-heading';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import { Placeholders, PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    // props from fields
    title: MicromagPropTypes.textComponent,
    items: PropTypes.arrayOf(MicromagPropTypes.textComponent),
    background: MicromagPropTypes.backgroundComponent,
    isPreview: PropTypes.bool,
    isPlaceholder: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    // props from fields
    title: null,
    items: null,
    background: null,
    isPreview: true,
    isPlaceholder: false,
    className: null,
};

const TimelineDots = ({ title, items, background, isPreview, isPlaceholder, className }) => {
    const { width, height } = useScreenSize();

    const titleValue = title !== null ? title.text : null;

    const titleType = isPlaceholder ? (
        <Placeholders.Text className={styles.placeholder} />
    ) : (
        <TextComponent {...titleValue} />
    );

    return (
        <div
            className={classNames([
                styles.container,
                // screens.map(screenName => styles[`screen-${screenName}`]),
                {
                    [styles.isPreview]: isPreview,
                    [styles.isPlaceholder]: isPlaceholder,
                    [className]: className !== null,
                },
            ])}
        >
            <Background {...background} width={width} height={height}>
                <Frame withScroll width={width} height={height}>
                    <div className={styles.inner}>
                        <div className={styles.title}>{titleType}</div>
                        <div className={styles.timelineContainer}>
                            {items !== null
                                ? items.map(({ text, image, heading }, index) => {
                                      return isPlaceholder ? (
                                          <div className={styles.timelineBlock}>
                                              <div className={styles.dot} />
                                              <div className={styles.mainContent}>
                                                  {heading !== null ? (
                                                      <Placeholders.Heading
                                                          key={`item-heading-${index + 1}`}
                                                          className={styles.placeholder}
                                                      />
                                                  ) : null}
                                                  {image !== null ? (
                                                      <Placeholders.Image
                                                          key={`item-image-${index + 1}`}
                                                          className={styles.placeholder}
                                                      />
                                                  ) : null}
                                                  <Placeholders.Text
                                                      key={`item-${index + 1}`}
                                                      className={styles.placeholder}
                                                  />
                                              </div>
                                          </div>
                                      ) : (
                                          <div className={styles.timelineBlock}>
                                              <div className={styles.dot} />
                                              <div className={styles.mainContent}>
                                                  {heading !== null ? (
                                                      <Heading
                                                          key={`item-heading-${index + 1}`}
                                                          className={styles.heading}
                                                          {...heading}
                                                      />
                                                  ) : null}
                                                  {image !== null ? (
                                                      <Image
                                                          key={`item-image-${index + 1}`}
                                                          className={styles.image}
                                                          {...image}
                                                      />
                                                  ) : null}
                                                  <TextComponent
                                                      key={`item-${index + 1}`}
                                                      className={styles.item}
                                                      {...text}
                                                  />
                                              </div>
                                          </div>
                                      );
                                  })
                                : null}
                        </div>
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

TimelineDots.propTypes = propTypes;
TimelineDots.defaultProps = defaultProps;

export default TimelineDots;
