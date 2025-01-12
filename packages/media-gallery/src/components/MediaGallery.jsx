import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Spinner, UploadModal } from '@micromag/core/components';
import { useStory } from '@micromag/core/contexts';
import { useMediaAuthors, useMediaCreate, useMedias, useMediaTags } from '@micromag/data';
// import list from '../_stories/list.json';
import styles from '../styles/media-gallery.module.scss';
import Gallery from './lists/Gallery';
import MediaMetadata from './partials/MediaMetadata';
import Navbar from './partials/Navbar';

const videoTypes = ['video', 'image/gif'];

const propTypes = {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    source: PropTypes.string,
    isPicker: PropTypes.bool,
    isSmall: PropTypes.bool,
    withoutTitle: PropTypes.bool,
    withoutSource: PropTypes.bool,
    withoutType: PropTypes.bool,
    medias: MicromagPropTypes.medias,
    selectedMedia: MicromagPropTypes.media,
    className: PropTypes.string,
    navbarClassName: PropTypes.string,
    onClickMedia: PropTypes.func,
    onClearMedia: PropTypes.func,
};

const defaultProps = {
    type: null,
    source: 'all',
    isPicker: false,
    isSmall: false,
    withoutTitle: false,
    withoutSource: false,
    withoutType: true,
    medias: null,
    selectedMedia: null,
    className: null,
    navbarClassName: null,
    onClickMedia: null,
    onClearMedia: null,
};

function MediaGallery({
    type,
    source,
    isPicker,
    isSmall,
    withoutTitle,
    withoutSource,
    withoutType,
    medias: initialMedias,
    selectedMedia,
    className,
    navbarClassName,
    onClickMedia,
    onClearMedia,
}) {
    // Base state for filters
    const defaultFilters = {
        type,
        source,
    };

    // Filters
    const throttle = useRef(null);
    const [queryValue, setQueryValue] = useState(defaultFilters);
    const [filtersValue, setFiltersValue] = useState(defaultFilters);

    const story = useStory();
    const { id: storyId = null } = story || {};
    const { tags } = useMediaTags();
    const { authors } = useMediaAuthors();

    const onFiltersChange = useCallback(
        (value) => {
            if (throttle.current !== null) {
                clearTimeout(throttle.current);
            }
            throttle.current = setTimeout(() => {
                setQueryValue(value);
                throttle.current = null;
            }, 500);
            setFiltersValue(value);
        },
        [setFiltersValue, setQueryValue, throttle],
    );

    // Items
    const { allMedias: loadedMedias, loading = false } = useMedias(queryValue, 1, 100, {
        ...(initialMedias !== null ? { items: initialMedias } : null),
    });

    // Temporary type filter
    const [addedMedias, setAddedMedias] = useState([]);
    const medias = useMemo(() => {
        const allMedias = [...addedMedias, ...(loadedMedias || [])];
        return allMedias.length > 0 ? allMedias : null;
    }, [loadedMedias, addedMedias]);

    // Medias
    const [metadataMedia, setMetadataMedia] = useState(null);
    const onClickItem = useCallback(
        (media) => {
            if (!isPicker) {
                setMetadataMedia(media);
            } else if (onClickMedia !== null) {
                onClickMedia(media);
            }
        },
        [isPicker, setMetadataMedia, onClickMedia],
    );
    const onClickItemInfo = useCallback((media) => setMetadataMedia(media), [setMetadataMedia]);
    const onMetadataClickClose = useCallback(() => setMetadataMedia(null), [setMetadataMedia]);

    // Navigation
    const onClickBack = useCallback(() => setMetadataMedia(null), [setMetadataMedia]);

    // Reset all filters except source
    const onClickCancel = useCallback(
        () => setFiltersValue({ ...defaultFilters, source: filtersValue.source || null }),
        [defaultFilters, filtersValue, setFiltersValue],
    );

    // Upload modal
    const [uploading, setUploading] = useState(false);
    const [uploadModalOpened, setUploadModalOpened] = useState(false);
    const { create: createMedia } = useMediaCreate();
    const onClickAdd = useCallback(() => setUploadModalOpened(true), [setUploadModalOpened]);
    const onUploadCompleted = useCallback(
        (newMedias) => {
            setUploading(true);
            Promise.all(newMedias.map(createMedia)).then((newAddedMedias) => {
                setUploading(false);
                return setAddedMedias([...addedMedias, ...newAddedMedias]);
            });
        },
        [createMedia, addedMedias, setAddedMedias],
    );
    const onUploadRequestClose = useCallback(
        () => setUploadModalOpened(false),
        [setUploadModalOpened],
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.metadataOpened]: metadataMedia !== null,
                    [className]: className,
                },
            ])}
        >
            <Navbar
                filters={filtersValue}
                media={metadataMedia !== null ? metadataMedia : null}
                selectedMedia={selectedMedia}
                onFiltersChange={onFiltersChange}
                onClickAdd={onClickAdd}
                onClickItem={onClickItem}
                onClickItemInfo={onClickItemInfo}
                onClickBack={onClickBack}
                onClickClear={onClearMedia}
                withoutTitle={withoutTitle}
                withoutSource={withoutSource}
                withoutType={withoutType}
                storyId={storyId}
                authors={authors}
                tags={tags}
                className={navbarClassName}
            />
            <div className={styles.content}>
                <div className={styles.gallery}>
                    {medias !== null && !uploading ? (
                        <Gallery
                            items={medias}
                            selectedItem={selectedMedia}
                            selectedFirst
                            withInfoButton={isPicker}
                            isSmall={isSmall}
                            onClickItem={onClickItem}
                            onClickItemInfo={onClickItemInfo}
                        />
                    ) : null}
                    {loading || uploading ? <Spinner className={styles.loading} /> : null}
                </div>
                <div className={styles.mediaMetadata}>
                    <MediaMetadata
                        media={metadataMedia}
                        tags={tags}
                        onClickClose={onMetadataClickClose}
                    />
                </div>
            </div>
            {createPortal(
                <UploadModal
                    type={type === 'video' ? videoTypes : type}
                    opened={uploadModalOpened}
                    onUploaded={onUploadCompleted}
                    onRequestClose={onUploadRequestClose}
                />,
                document.body,
            )}
        </div>
    );
}

MediaGallery.propTypes = propTypes;
MediaGallery.defaultProps = defaultProps;

export default MediaGallery;
