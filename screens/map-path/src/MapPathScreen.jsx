/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Screen from '@micromag/element-screen';
import MapComponent from '@micromag/element-map';
import TextComponent from '@micromag/element-text';
import ImageComponent from '@micromag/element-image';
import ButtonComponent from '@micromag/element-button';

import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import PreviewBackground from './preview.jpg';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

const propTypes = {
    map: MicromagPropTypes.map,
    markers: MicromagPropTypes.markers,
    background: MicromagPropTypes.backgroundElement,
    align: PropTypes.string,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    map: null,
    markers: [],
    background: null,
    align: 'bottom',
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const MapPathScreen = ({
    map,
    markers: mapMarkers,
    background,
    align,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const [index, setIndex] = useState(0);
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple, isEditor } = getRenderFormat(renderFormat);
    const isEmpty = isEditor && map === null;

    const { map: { center: mapCenter = null } = {} } = map || {};

    const markers = mapMarkers || []; // .map((m, i) => ({ ...m })) : [];
    const center = mapCenter || markers.find((m, i) => i === index) || null;

    const onClickMarker = useCallback(
        (i) => {
            setIndex(i);
        },
        [setIndex],
    );

    const onClickNext = useCallback(() => {
        if (index < markers.length - 1) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    }, [markers, index, setIndex]);

    const onClickPrevious = useCallback(() => {
        if (index > 0) {
            setIndex(index - 1);
        } else {
            setIndex(markers.length - 1);
        }
    }, [markers, index, setIndex]);

    const element = isEmpty ? (
        <Empty className={styles.empty}>
            <FormattedMessage {...messages.schemaTitle} />
        </Empty>
    ) : (
        <ImageComponent
            {...{
                image: { url: PreviewBackground },
                maxWidth: width,
                maxHeight: height,
            }}
        />
    );

    const preview = isPlaceholder ? (
        <Placeholders.MapPath className={styles.placeholder} />
    ) : (
        element
    );

    const containerClassNames = classNames([
        styles.container,
        {
            [styles[align]]: align !== null,
            [className]: className !== null,
        },
    ]);

    return (
        <Screen
            size={{ width, height }}
            renderFormat={renderFormat}
            background={background}
            visible={visible}
            active={active}
            className={containerClassNames}
        >
            {isSimple || isEmpty ? (
                preview
            ) : (
                <>
                    <MapComponent
                        {...map}
                        {...(center && center.lat && center.lng ? { center } : null)}
                        markers={markers}
                        withLine
                        onClickMap={null}
                        onClickMarker={onClickMarker}
                    />
                    <div className={styles.cards}>
                        {markers.map((marker, i) => (
                            <div
                                key={`marker-${i + 1}`}
                                className={classNames([
                                    styles.card,
                                    {
                                        [styles.active]: i === index,
                                    },
                                ])}
                            >
                                <div className={styles.background}>
                                    <TextComponent
                                        className={styles.text}
                                        body={marker.text ? marker.text : null}
                                    />
                                    <ImageComponent
                                        className={styles.image}
                                        image={marker.image ? marker.image : null}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.controls}>
                        <ButtonComponent className={styles.previous} onClick={onClickPrevious}>
                            Previous
                        </ButtonComponent>
                        <ButtonComponent className={styles.next} onClick={onClickNext}>
                            Next
                        </ButtonComponent>
                    </div>
                </>
            )}
        </Screen>
    );
};

MapPathScreen.propTypes = propTypes;
MapPathScreen.defaultProps = defaultProps;

export default React.memo(MapPathScreen);
