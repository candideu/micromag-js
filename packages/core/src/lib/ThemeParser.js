import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

class ThemeParser {
    constructor({ screensManager }) {
        this.screensManager = screensManager;
    }

    parse(story) {
        if (story === null) {
            return story;
        }
        const { theme = null, components = null } = story || {};
        if (theme === null || components === null) {
            return story;
        }
        const {
            components: themeComponents = [],
            background: themeBackground = null,
            colors: themeColors = {},
            textStyle: themeTextSyle = null,
        } = theme;

        const newComponents = components.reduce((currentComponents, screen, index) => {
            const { type } = screen;
            const definition = this.screensManager.getDefinition(type) || {};
            const themeScreen = themeComponents.find((it) => it.type === type) || null;
            const newScreen = this.parseScreen(
                definition,
                screen,
                themeScreen,
                themeBackground,
                themeColors,
                themeTextSyle,
            );

            // Only switch screen if it has changed
            return newScreen !== screen || themeScreen !== null
                ? [
                      ...currentComponents.slice(0, index),
                      {
                          ...themeScreen,
                          ...newScreen,
                      },
                      ...currentComponents.slice(index + 1),
                  ]
                : currentComponents;
        }, components);

        return newComponents !== components
            ? {
                  ...story,
                  components: newComponents,
              }
            : story;
    }

    parseScreen(definition, value, themeValue, themeBackground, themeColors, themeTextSyle) {
        const { fields = [] } = definition;

        const newThemeValue = themeValue === null && themeBackground !== null ? {} : themeValue;

        if (typeof newThemeValue.background !== 'undefined' && themeBackground !== null) {
            newThemeValue.background = {
                ...themeBackground,
                ...newThemeValue.background,
            };
        } else if (themeBackground !== null) {
            newThemeValue.background = themeBackground;
        }

        const newScreenValue = Object.keys(value).reduce((currentValue, key) => {
            const fieldDefinition = fields.find((it) => it.name === key) || {};
            const fieldValue = value[key];
            const fieldThemeValue = newThemeValue !== null ? newThemeValue[key] || null : null;
            const newFieldValue = this.parseField(
                key,
                fieldDefinition,
                fieldValue,
                fieldThemeValue,
                themeColors,
                themeTextSyle,
            );

            // Only switch field if it has changed
            return newFieldValue !== fieldValue
                ? {
                      ...currentValue,
                      [key]: newFieldValue,
                  }
                : currentValue;
        }, value);

        return newThemeValue !== null ? {
            ...newThemeValue,
            ...newScreenValue,
        } : newScreenValue;
    }

    // eslint-disable-next-line class-methods-use-this
    parseField(key, definition, value, themeValue, themeColors, themeTextStyles) {
        const { theme: fieldTheme = {} } = definition;

        if (isObject(value) && !isArray(value)) {
            const { textStyle: fieldTextStyleName = null, color: fieldColorName = null } =
                fieldTheme || {};

            // Color
            const fieldColor =
                fieldColorName !== null && themeColors !== null
                    ? themeColors[fieldColorName] || null
                    : null;
            const colorValue =
                fieldColor !== null
                    ? {
                          color: fieldColor,
                      }
                    : null;

            // Text style
            const fieldTextStyle =
                fieldTextStyleName !== null && themeTextStyles !== null
                    ? themeTextStyles[fieldTextStyleName] || null
                    : null;
            const fieldThemeComponentTextStyle =
                themeValue !== null ? themeValue.textStyle || null : null;
            const textStyleValue =
                fieldTextStyle !== null || fieldThemeComponentTextStyle !== null
                    ? {
                          textStyle: {
                              ...fieldTextStyle,
                              ...fieldThemeComponentTextStyle,
                              ...(value.textStyle || null),
                          },
                      }
                    : null;

            // Only change value if something is overrided
            return colorValue !== null || themeValue !== null || textStyleValue !== null
                ? {
                      ...colorValue,
                      ...themeValue,
                      ...value,
                      ...textStyleValue,
                  }
                : value;
        }

        return value;
    }
}

export default ThemeParser;
