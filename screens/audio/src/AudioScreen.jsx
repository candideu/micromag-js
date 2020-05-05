/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AudioElement from '@micromag/element-audio';
import TextElement from '@micromag/element-text';
import ImageElement from '@micromag/element-image';
import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Box from '@micromag/element-box';

import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    audio: MicromagPropTypes.audioElement,
    text: MicromagPropTypes.textElement,
    image: MicromagPropTypes.imageElement,
    box: MicromagPropTypes.boxElement,
    background: MicromagPropTypes.backgroundElement,
    maxWidth: PropTypes.number,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    audio: {
        src: null,
        track: null,
        trackLng: null,
        controls: true,
        loop: false,
        autoPlay: false,
        muted: false,
    },
    image: null,
    text: null,
    box: null,
    background: null,
    maxWidth: 300,
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const AudioScreen = ({
    audio,
    image,
    text,
    box,
    background,
    maxWidth,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple, isEditor, isView } = getRenderFormat(renderFormat);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.disabled]: isSimple,
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
            >
                <Frame width={width} height={height} visible={visible}>
                    <Box {...box} withSmallSpacing={isSimple} className={styles.box}>
                        {isPlaceholder && image !== null ? (
                            <Placeholders.MediumImage className={styles.placeholder} />
                        ) : (
                            <ImageElement
                                {...image}
                                maxWidth={image !== null ? Math.min(width, maxWidth) : null}
                                maxHeight={image !== null ? Math.min(width, maxWidth) : null}
                                fit={{ size: 'cover' }}
                                contain
                                className={styles.image}
                            />
                        )}
                        {isPlaceholder ? (
                            <Placeholders.Audio className={styles.placeholder} />
                        ) : (
                            <AudioElement
                                className={styles.audio}
                                {...(isSimple ? { ...audio, src: null } : audio)}
                            />
                        )}
                        {isPlaceholder && text !== null ? (
                            <Placeholders.Text className={styles.placeholder} />
                        ) : (
                            <TextElement {...text} className={styles.text} />
                        )}
                    </Box>
                </Frame>
            </Background>
        </div>
    );
};

AudioScreen.propTypes = propTypes;
AudioScreen.defaultProps = defaultProps;

export default React.memo(AudioScreen);
