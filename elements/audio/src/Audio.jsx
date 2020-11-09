/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign, react/no-array-index-key */
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import AudioWave from './AudioWave';

import styles from './styles.module.scss';

const propTypes = {
    media: MicromagPropTypes.audioMedia,
    apiRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any,
        }),
    ]),
    // track: PropTypes.string,
    initialMuted: PropTypes.bool,
    initialVolume: PropTypes.number,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    className: PropTypes.string,
    onReady: PropTypes.func,
};

const defaultProps = {
    media: null,
    apiRef: null,
    // track: null,
    initialMuted: false,
    initialVolume: 1,
    autoPlay: false,
    loop: false,
    className: null,
    onReady: null,
};

const Audio = ({
    media,
    apiRef,
    // track,
    initialMuted,
    initialVolume,
    autoPlay,
    loop,
    className,
    onReady,
}) => {
    const { url = null } = media || {};

    const audioRef = useRef(null);

    const [muted, setMuted] = useState(initialMuted);
    const [volume, setVolume] = useState(initialVolume);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(null);
    const [playing, setPlaying] = useState(false);
    const paused = !playing;

    const [canPlayThrough, setCanPlayThrough] = useState(false);
    const [seekbarReady, setSeekbarReady] = useState(false);

    // create and expose api

    const playerApi = useMemo(() => {
        const audioEl = audioRef.current;
        return {
            play: () => {
                if (audioEl !== null) {
                    audioEl.play();
                }
            },
            pause: () => {
                if (audioEl !== null) {
                    audioEl.pause();
                }
            },
            playPause: () => {
                if (audioEl !== null) {
                    if (playing) {
                        audioEl.pause();
                    } else {
                        audioEl.play();
                    }
                }
            },
            stop: () => {
                if (audioEl !== null) {
                    audioEl.pause();
                    audioEl.currentTime = 0;
                }
            },
            seek: (time) => {
                if (audioEl !== null) {
                    audioEl.currentTime = time;
                }
            },
            mute: () => {
                if (audioEl !== null) {
                    audioEl.muted = true;
                }
            },
            unMute: () => {
                if (audioEl !== null) {
                    audioEl.muted = false;
                }
            },
            muteUnmute: () => {
                if (audioEl !== null) {
                    audioEl.muted = !muted;
                }
            },
            setVolume: (vol) => {
                if (audioEl !== null) {
                    audioEl.volume = vol;
                }
            },
            duration,
            currentTime,
            volume,
            muted,
            playing,
            paused,
        };
    }, [muted, volume, currentTime, duration, playing, paused]);

    if (apiRef !== null) {
        apiRef.current = playerApi;
    }

    // Audio events handlers

    useEffect(() => {
        const audio = audioRef.current;

        const onTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const onDurationChange = () => {
            setDuration(audio.duration);
        };

        const onVolumeChange = () => {
            setMuted(audio.muted);
            setVolume(audio.volume);
        };

        const onPlay = () => {
            setPlaying(true);
        };

        const onPause = () => {
            setPlaying(false);
        };

        const onEnded = () => {
            audio.currentTime = 0;
        };

        const onCanPlayThrough = () => {
            setCanPlayThrough(true);
        };

        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('durationchange', onDurationChange);
        audio.addEventListener('volumechange', onVolumeChange);
        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('canplaythrough', onCanPlayThrough);

        return () => {
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('durationchange', onDurationChange);
            audio.removeEventListener('volumechange', onVolumeChange);
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('canplaythrough', onCanPlayThrough);
        };
    }, [setCurrentTime, setDuration, setMuted, setVolume, setPlaying]);

    useEffect(() => {
        if (canPlayThrough && seekbarReady && onReady !== null) {
            onReady();
        }
    }, [canPlayThrough, seekbarReady, onReady]);

    useEffect(() => {
        setCanPlayThrough(false);
        setSeekbarReady(false);
    }, [url, setCanPlayThrough, setSeekbarReady]);

    // User events

    const onPlayPauseClick = useCallback(() => {
        playerApi.playPause();
    }, [playerApi]);

    const onMuteUnmuteClick = useCallback(() => {
        playerApi.muteUnmute();
    }, [playerApi]);

    const onSeekbarReady = useCallback(() => {
        setSeekbarReady(true);
    }, [setSeekbarReady]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.paused]: paused,
                    [styles.muted]: muted,
                },
            ])}
        >
            <audio ref={audioRef} src={url} autoPlay={autoPlay} loop={loop} />
            <AudioWave
                media={media}
                currentTime={currentTime}
                duration={duration}
                playing={playing}
                onSeek={playerApi.seek}
                onReady={onSeekbarReady}
            />
            <div className={styles.controls}>
                <button type="button" className={styles.playPauseButton} onClick={onPlayPauseClick}>
                    <FontAwesomeIcon className={styles.icon} icon={playing ? faPause : faPlay} />
                </button>
                <button type="button" className={styles.muteButton} onClick={onMuteUnmuteClick}>
                    <FontAwesomeIcon className={styles.icon} icon={faVolumeUp} />
                </button>
            </div>
        </div>
    );
};

Audio.propTypes = propTypes;
Audio.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <Audio apiRef={ref} {...props} />);
