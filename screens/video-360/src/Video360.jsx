/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderVideo, Transitions } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { useAnimationFrame } from '@micromag/core/hooks';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import ClosedCaptions from '@micromag/element-closed-captions';
import MediaControls from '@micromag/element-media-controls';
import Video from '@micromag/element-video';

import { 
    Scene,
    PerspectiveCamera,
    SphereBufferGeometry,
    VideoTexture,
    MeshBasicMaterial,
    Mesh,
    WebGLRenderer,
    MathUtils,
} from 'three';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['full']),
    video: MicromagPropTypes.videoElement,
    closedCaptions: MicromagPropTypes.closedCaptionsMedia,
    withSeekBar: PropTypes.bool,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'full',
    video: null,
    closedCaptions: null,
    withSeekBar: false,
    background: null,
    current: true,
    active: true,
    transitions: null,
    className: null,
};

const Video360Screen = ({
    layout,// eslint-disable-line
    video,
    closedCaptions,
    withSeekBar,
    background,
    current,
    active,
    transitions,
    className,
}) => {
    
    // Media API --------------------------

    const apiRef = useRef();
    const { togglePlay, toggleMute, seek } = apiRef.current || {};    

    const [currentTime, setCurrentTime] = useState(null);
    const [duration, setDuration] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);

    const onTimeUpdate = useCallback((time) => {
        setCurrentTime(time);
    }, []);

    const onDurationChanged = useCallback((dur) => {
        setDuration(dur);
    }, []);

    const onPlayChanged = useCallback((isPlaying) => {
        setPlaying(isPlaying);
    }, []);

    const onMuteChanged = useCallback((isMuted) => {
        setMuted(isMuted);
    }, []);

    // ------------------------------------

    const { width, height } = useScreenSize();
    const { isEdit, isPlaceholder, isView, isPreview } = useScreenRenderContext();

    const withVideo = video !== null;
    const withVideoSphere = withVideo && (isView || isEdit);
    const [ready, setReady] = useState(!withVideo);
    const transitionPlaying = current && ready;

    useEffect(() => {
        setReady(false);
    }, [video, setReady]);

    const onVideoReady = useCallback(() => {
        setReady(true);
    }, [setReady]);

    // 3D layer  --------------------------

    const canvasRef = useRef(null);
    const camera = useRef(null);
    const scene = useRef(null);
    const renderer = useRef(null);
    const lon = useRef(0);
    const lat = useRef(0);
    const phi = useRef(0);
    const theta = useRef(0);
    const distance = useRef(50);
    const pointerDown = useRef(false);
    const pointerX = useRef(0);
    const pointerY = useRef(0);
    const pointerLon = useRef(0);
    const pointerLat = useRef(0);

    // render 3D frame

    const render3D = useCallback( () => {
        lat.current = Math.max( - 85, Math.min( 85, lat.current ) );
        phi.current = MathUtils.degToRad( 90 - lat.current );
        theta.current = MathUtils.degToRad( lon.current );

        camera.current.position.x = distance.current * Math.sin( phi.current ) * Math.cos( theta.current );
        camera.current.position.y = distance.current * Math.cos( phi.current );
        camera.current.position.z = distance.current * Math.sin( phi.current ) * Math.sin( theta.current );

        camera.current.lookAt( 0, 0, 0 );

        renderer.current.render( scene.current, camera.current );
    }, []);

    // Init 3D layer

    useEffect( () => {
        if (withVideoSphere) {
            const { offsetWidth: canvasWidth, offsetHeight: canvasHeight} = canvasRef.current;
            camera.current = new PerspectiveCamera( 75, canvasWidth / canvasHeight, 1, 1100 );
            scene.current = new Scene();

            const geometry = new SphereBufferGeometry( 500, 60, 40 );
            geometry.scale( - 1, 1, 1 );

            const { mediaRef: videoMediaRef = null } = apiRef.current || {};
            const { current: videoMedia = null } = videoMediaRef || {};

            const videoTexture = new VideoTexture( videoMedia );
            
            const videoMaterial = new MeshBasicMaterial( { map: videoTexture } );

            const mesh = new Mesh( geometry, videoMaterial );
            scene.current.add( mesh );

            renderer.current = new WebGLRenderer({ canvas: canvasRef.current });
            renderer.current.setPixelRatio( window.devicePixelRatio );
            renderer.current.setSize( canvasWidth, canvasHeight );
            render3D();
        }

        return () => {
            if (withVideoSphere) {
                camera.current = null;
                scene.current = null;
                renderer.current = null;
            }
        }
    }, [withVideoSphere, render3D]);

    useAnimationFrame(render3D, { disabled: !withVideoSphere });

    // Resize 3D layer

    useEffect( () => {
        if (camera.current !== null && renderer.current !== null) {
            camera.current.aspect = width / height;
            camera.current.updateProjectionMatrix();
            renderer.current.setSize( width, height );
        }
    }, [width, height, render3D]);

    // Pointer interaction

    const onPointerDown = useCallback( (e) => {
        pointerDown.current = true;
        pointerX.current = e.clientX;
        pointerY.current = e.clientY;
        pointerLon.current = lon.current;
        pointerLat.current = lat.current;
    }, []);

    const onPointerMove = useCallback( (e) => {
        if (pointerDown.current) {
            lon.current = ( pointerX.current - e.clientX ) * 0.2 + pointerLon.current;
            lat.current = ( pointerY.current - e.clientY ) * 0.2 + pointerLat.current;
        }
    }, []);

    const onPointerUp = useCallback( () => {
        pointerDown.current = false;
    }, []);

    // Building elements ------------------

    const items = [];

    if (isPlaceholder) {
        items.push(<PlaceholderVideo className={styles.placeholder} width="100%" height="100%" />);
    } else if (withVideo) {
        items.push(
            <Transitions playing={transitionPlaying} transitions={transitions} disabled={!isView} fullscreen>
                <canvas ref={canvasRef} className={styles.canvas} />
                <button className={styles.canvasButton} type="button" aria-label="canvas-interaction" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} />
            </Transitions>,
        );
        items.push(
            <div className={styles.bottomContent}>
                {closedCaptions !== null ? (
                    <ClosedCaptions
                        className={styles.closedCaptions}
                        media={closedCaptions}
                        currentTime={currentTime}
                    />
                ) : null}
                <MediaControls
                    className={styles.mediaControls}
                    withSeekBar={withSeekBar}
                    playing={playing}
                    muted={muted}
                    currentTime={currentTime}
                    duration={duration}
                    onTogglePlay={togglePlay}
                    onToggleMute={toggleMute}
                    onSeek={seek}
                />
            </div>,
        );
    }

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEdit && active)}
            />
            <Container width={width} height={height}>
                <div className={styles.content}>{items}</div>
                { withVideo ?
                    <Video
                        {...video}
                        autoPlay={isPreview ? false : video.autoPlay}
                        ref={apiRef}
                        className={styles.video}
                        onReady={onVideoReady}
                        onPlayChanged={onPlayChanged}
                        onMuteChanged={onMuteChanged}
                        onTimeUpdate={onTimeUpdate}
                        onDurationChanged={onDurationChanged}
                    />
                : null }
            </Container>
        </div>
    );
};

Video360Screen.propTypes = propTypes;
Video360Screen.defaultProps = defaultProps;

export default React.memo(Video360Screen);