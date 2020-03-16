/* eslint-disable react/no-array-index-key, jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getSizeWithinBounds } from '@folklore/size';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import VideoControls from './Controls';

import styles from './styles/video.module.scss';

const propTypes = {
    url: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.elementType),
    width: PropTypes.number,
    height: PropTypes.number,
    autoPlay: PropTypes.bool,
    muted: PropTypes.bool,
    controls: MicromagPropTypes.videoControls,
    fit: MicromagPropTypes.objectFit,
    className: PropTypes.string,
};

const defaultProps = {
    url: null,
    players: null,
    width: null,
    height: null,
    autoPlay: false,
    muted: true,
    controls: null,
    fit: null,
    className: null,
};

const Video = ({
    players,
    url,
    width,
    height,
    autoPlay,
    muted: initialMuted,
    controls,
    fit,
    className,
}) => {
    const finalPlayers = players || Video.defaultPlayers;
    const PlayerComponent = url !== null ? finalPlayers.find(it => it.testUrl(url)) || null : null;
    const refPlayer = useRef(null);
    const [playerReady, setPlayerReady] = useState(false);
    const [duration, setDuration] = useState(0);
    const [videoSize, setVideoSize] = useState({
        width,
        height,
    });
    const [currentTime, setCurrentTime] = useState(0);
    const [playerState, setPlayerState] = useState({
        playing: false,
        paused: false,
        ended: false,
        muted: initialMuted,
    });
    const onPlayerReady = useCallback(() => {
        setPlayerReady(true);
        setDuration(refPlayer.current.duration());
        setVideoSize(refPlayer.current.size());
    }, [setPlayerReady, setDuration, setVideoSize]);

    const onPlayerStateChange = useCallback(
        newPlayerState => {
            setPlayerState(newPlayerState);
        },
        [setPlayerState],
    );
    const onPlayerCurrentTimeChange = useCallback(
        newCurrentTime => {
            setCurrentTime(newCurrentTime);
        },
        [setCurrentTime],
    );
    const { size = 'fit' } = fit || {};
    const playerSize =
        size === 'fit'
            ? {
                  width,
                  height,
              }
            : getSizeWithinBounds(videoSize.width, videoSize.height, width, height, {
                  cover: size === 'cover',
              });
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isReady]: playerReady,
                    [className]: className,
                },
            ])}
            style={{
                width,
                height,
            }}
        >
            {PlayerComponent !== null ? (
                <div
                    className={styles.playerContainer}
                    style={{
                        width: playerSize.width,
                        height: playerSize.height,
                        top: (height - playerSize.height) / 2,
                        left: (width - playerSize.width) / 2,
                    }}
                >
                    <PlayerComponent
                        url={url}
                        width={playerSize.width}
                        height={playerSize.height}
                        autoPlay={autoPlay}
                        muted={initialMuted}
                        refPlayer={refPlayer}
                        className={styles.player}
                        onReady={onPlayerReady}
                        onStateChange={onPlayerStateChange}
                        onCurrentTimeChange={onPlayerCurrentTimeChange}
                    />
                </div>
            ) : null}
            {playerReady ? (
                <VideoControls
                    {...refPlayer.current}
                    {...playerState}
                    {...controls}
                    duration={duration}
                    currentTime={currentTime}
                    className={styles.controls}
                />
            ) : null}
        </div>
    );
};

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;
Video.defaultPlayers = [];
Video.registerPlayer = Player => {
    const playerIndex = Video.defaultPlayers.findIndex(it => it === Player);
    if (playerIndex === -1) {
        Video.defaultPlayers = [...Video.defaultPlayers, Player];
    }
};

export default Video;
