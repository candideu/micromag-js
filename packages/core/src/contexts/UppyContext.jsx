/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import { v1 as uuid } from 'uuid';
import { useIntl } from 'react-intl';

import useUppyCore from '../hooks/useUppyCore';
import useUppyLocale from '../hooks/useUppyLocale';
import useUppyTransport from '../hooks/useUppyTransport';
import useUppySources from '../hooks/useUppySources';
import getTransloaditMediasFromResponse from '../utils/getTransloaditMediasFromResponse';

export const UppyContext = React.createContext(null);

export const useUppy = ({
    onComplete = null,
    onFail = null,
    getFileName = ({ extension = null }) => `${uuid()}${extension !== null ? `.${extension}` : ''}`,
    meta = null,
    maxNumberOfFiles = 30,
    allowedFileTypes = null,
    autoProceed = false,
} = {}) => {
    const { buildUppy, transport } = useContext(UppyContext) || null;

    const uppy = useMemo(
        () =>
            buildUppy !== null
                ? buildUppy({
                      meta,
                      restrictions: { maxNumberOfFiles, allowedFileTypes },
                      autoProceed,
                  })
                : null,
        [buildUppy, meta, maxNumberOfFiles, allowedFileTypes, autoProceed],
    );

    useEffect(() => {
        if (uppy === null) {
            return () => {};
        }
        const onUppyComplete = (response) => {
            const { successful = [], failed = null } = response;
            const finalSuccessful =
                transport === 'transloadit'
                    ? getTransloaditMediasFromResponse(response)
                    : successful;
            if (onComplete !== null) {
                onComplete(finalSuccessful);
            }
            if (onFail !== null) {
                onFail(failed);
            }
        };
        uppy.on('complete', onUppyComplete);
        return () => {
            uppy.off('complete', onUppyComplete);
        };
    }, [uppy, transport, onComplete]);

    useEffect(() => {
        if (uppy === null) {
            return () => {};
        }
        const onUpload = ({ fileIDs: ids = [] }) => {
            ids.forEach((id) => {
                const file = uppy.getFile(id);
                const newName = getFileName(file);
                if (newName !== null) {
                    uppy.setFileMeta(id, {
                        name: newName,
                    });
                }
            });
        };
        uppy.on('upload', onUpload);
        return () => {
            uppy.off('upload', onUpload);
        };
    }, [uppy]);

    useEffect(
        () => () => {
            if (uppy !== null) {
                uppy.close();
            }
        },
        [uppy],
    );

    return uppy;
};

const propTypes = {
    children: PropTypes.node.isRequired,
    transport: PropTypes.oneOf(['xhr', 'transloadit', 'tus']),
    locale: PropTypes.string,
    sources: PropTypes.arrayOf(
        PropTypes.oneOf(['webcam', 'facebook', 'instagram', 'dropbox', 'google-drive']),
    ),
    transloadit: PropTypes.shape({
        key: PropTypes.string.isRequired,
        templateId: PropTypes.string,
        waitForEncoding: PropTypes.bool,
    }),
    companion: PropTypes.shape({
        url: PropTypes.string.isRequired,
        allowedHosts: PropTypes.string.isRequired,
    }),
    tus: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            endpoint: PropTypes.string.isRequired,
        }),
    ]),
    xhr: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            endpoint: PropTypes.string.isRequired,
        }),
    ]),
};

const defaultProps = {
    transport: null,
    locale: null,
    sources: null,
    transloadit: null,
    companion: null,
    tus: null,
    xhr: null,
};

export const UppyProvider = ({
    children,
    transport: providedTransport,
    locale: providedLocale,
    sources: providedSources,
    transloadit: providedTransloadit,
    companion: providedCompanion,
    tus: providedTus,
    xhr: providedXhr,
}) => {
    const { locale: intlLocale } = useIntl();

    const {
        transport: contextTransport = null,
        locale: contextLocale = null,
        sources: contextSources = null,
        transloadit: contextTransloadit = null,
        companion: contextCompanion = null,
        tus: contextTus = null,
        xhr: contextXhr = null,
    } = useContext(UppyContext) || {};

    const transport = providedTransport || contextTransport || 'xhr';
    const locale = providedLocale || contextLocale || intlLocale;
    const sources = providedSources ||
        contextSources || ['webcam', 'facebook', 'instagram', 'dropbox', 'google-drive'];
    const transloadit = providedTransloadit || contextTransloadit;
    const companion = providedCompanion || contextCompanion;
    const tus = providedTus || contextTus;
    const xhr = providedXhr || contextXhr;

    const Uppy = useUppyCore();
    const uppyTransport = useUppyTransport(transport);
    const uppySources = useUppySources(sources);
    const uppyLocale = useUppyLocale(locale || intlLocale);

    const buildUppy = useMemo(() => {
        if (
            Uppy === null ||
            uppyLocale === null ||
            uppyTransport === null ||
            uppySources === null
        ) {
            return null;
        }
        return (opts = {}) => {
            const { sources: customSources = sources, ...uppyOpts } = opts || {};
            const newUppy = new Uppy({
                locale: uppyLocale,
                ...uppyOpts,
            });
            if (transport === 'transloadit') {
                const { key, templateId, waitForEncoding = true, ...transloaditOpts } = transloadit;
                newUppy.use(uppyTransport, {
                    params: {
                        auth: { key },
                        template_id: templateId,
                        ...transloaditOpts,
                    },
                    waitForEncoding,
                });
            } else if (transport === 'tus') {
                newUppy.use(uppyTransport, {
                    endpoint: '/tus',
                    resume: true,
                    retryDelays: [0, 1000, 3000, 5000],
                    ...tus,
                });
            } else if (transport === 'xhr') {
                newUppy.use(uppyTransport, {
                    endpoint: isString(xhr) ? xhr : '/upload',
                    ...(isObject(xhr) ? xhr : null),
                });
            }

            if (transport === 'transloadit' || companion !== null) {
                return customSources.reduce((currentUppy, sourceId) => {
                    const source = uppySources[sourceId] || null;
                    if (source === null) {
                        return currentUppy;
                    }
                    const {
                        url: companionUrl,
                        allowedHosts: companionAllowedHosts,
                    } = companion || {
                        url: uppyTransport.COMPANION || null,
                        allowedHosts: uppyTransport.COMPANION_PATTERN || null,
                    };
                    return newUppy.use(source, {
                        id: sourceId,
                        companionUrl,
                        companionAllowedHosts,
                    });
                }, newUppy);
            }

            return newUppy;
        };
    }, [
        Uppy,
        uppyLocale,
        uppyTransport,
        uppySources,

        transport,
        sources,
        transloadit,
        companion,
        tus,
        xhr,
    ]);

    return (
        <UppyContext.Provider
            value={{
                transport,
                locale,
                sources,
                transloadit,
                companion,
                tus,
                xhr,

                Uppy,
                uppyTransport,
                uppySources,
                uppyLocale,
                buildUppy,
            }}
        >
            {children}
        </UppyContext.Provider>
    );
};

UppyProvider.propTypes = propTypes;
UppyProvider.defaultProps = defaultProps;
