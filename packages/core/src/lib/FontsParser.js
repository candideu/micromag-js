import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

class FontsParser {
    constructor({ fieldsManager, screensManager }) {
        this.fieldsManager = fieldsManager;
        this.screensManager = screensManager;
    }

    // Convert medias object to path
    parse(story) {
        if (story === null) {
            return story;
        }
        const { components = [] } = story || {};
        const fonts = components.reduce((currentFonts, screen) => {
            const { type } = screen;
            const { fields = [] } = this.screensManager.getDefinition(type) || {};
            const fieldsPattern = this.getFieldsPattern(fields);
            const newFonts = FontsParser.extractFontsWithPaths(screen, fieldsPattern);
            return newFonts.length > 0 ? [...currentFonts, ...newFonts] : currentFonts;
        }, []);
        return {
            ...story,
            fonts,
        };
    }

    getFieldsPattern(fields, namePrefix = null) {
        return fields.reduce((patterns, field) => {
            const { name = null, type = null } = field;
            const path = [namePrefix, name].filter((it) => it !== null).join('\\.');
            const fieldDefinition = {
                ...(type !== null ? this.fieldsManager.getDefinition(type) : null),
                ...field,
            };

            // also check settings fields
            const { fields: subFields = [], itemsField = null, settings = [] } = fieldDefinition;

            return [
                ...patterns,
                ...(FontsParser.fieldIsFontFamily(fieldDefinition)
                    ? [new RegExp(`^${path}$`)]
                    : []),
                ...this.getFieldsPattern(subFields, path),
                ...this.getFieldsPattern(settings, path),
                ...(itemsField !== null
                    ? this.getFieldsPattern([itemsField], `${path}\\.[0-9]+`)
                    : []),
            ];
        }, []);
    }

    static fieldIsFontFamily({ id = null }) {
        return id === 'font-family';
    }

    static valueIsFont({ type = null }) {
        return type === 'custom' || type === 'google';
    }

    static extractFontsWithPaths(data, patterns, keyPrefix = null) {
        const dataIsArray = isArray(data);
        const keys = dataIsArray ? [...data.keys()] : Object.keys(data);
        return keys.reduce((currentFonts, key) => {
            const path = [keyPrefix, key].filter((it) => it !== null).join('.');
            const patternMatch = patterns.reduce(
                (found, pattern) => found || pattern.test(path),
                false,
            );
            const value = data[key];
            let font = null;
            let subFonts = null;
            if (patternMatch && isObject(value) && FontsParser.valueIsFont(value)) {
                font = value;
            } else if (isObject(value) || isArray(value)) {
                subFonts = FontsParser.extractFontsWithPaths(value, patterns, path);
            }
            return subFonts !== null || font !== null
                ? [...currentFonts, ...(subFonts || []), ...(font !== null ? [font] : [])]
                : currentFonts;
        }, []);
    }
}

export default FontsParser;