import { useState, useEffect } from 'react';
import isObject from 'lodash/isObject';
import WebFont from 'webfontloader';

const fontsMap = {
    loading: [],
    active: [],
};

const isFontLoading = (name) => fontsMap.loading.indexOf(name) !== -1;
const isFontActive = (name) => fontsMap.active.indexOf(name) !== -1;
const addFontLoading = (name) => {
    fontsMap.active = fontsMap.active.filter((it) => it !== name);
    fontsMap.loading = [...fontsMap.loading, name];
};
const removeFontLoading = (name) => {
    fontsMap.loading = fontsMap.loading.filter((it) => it !== name);
};
const addFontActive = (name) => {
    fontsMap.loading = fontsMap.loading.filter((it) => it !== name);
    fontsMap.active = [...fontsMap.active, name];
};

const useLoadedFonts = (fonts) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const config = fonts.reduce((newConfig, font) => {
            const { type, name } = isObject(font)
                ? font
                : {
                      type: 'system',
                      name: font,
                  };
            if (
                (type === 'google' || type === 'custom') &&
                !isFontLoading(name) &&
                !isFontActive(name)
            ) {
                return {
                    ...newConfig,
                    [type]: {
                        families: [
                            ...(newConfig !== null ? (newConfig[type] || {}).families || [] : []),
                            name,
                        ],
                    },
                };
            }
            return newConfig;
        }, null);
        if (config !== null) {
            WebFont.load({
                ...config,
                active: () => setLoaded(true),
                fontloading: (name) => addFontLoading(name),
                fontactive: (name) => addFontActive(name),
                fontinactive: (name) => removeFontLoading(name),
            });
        }
    }, [fonts]);
    return { loaded };
};

export default useLoadedFonts;