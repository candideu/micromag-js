import PropTypes from 'prop-types';
import { snakeCase } from 'snake-case';

/**
 * Core
 */
export const history = PropTypes.shape({
    listen: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
});

export const intl = PropTypes.shape({
    locale: PropTypes.string.isRequired,
    formatMessage: PropTypes.func.isRequired,
});

export const message = PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string.isRequired,
    description: PropTypes.string,
});

export const text = PropTypes.oneOfType([message, PropTypes.string]);

export const label = PropTypes.oneOfType([message, PropTypes.node]);

export const statusCode = PropTypes.oneOf([401, 403, 404, 500]);

export const ref = PropTypes.oneOfType([
    PropTypes.shape({
        current: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    }),
    PropTypes.func,
]);

export const target = PropTypes.oneOf(['_blank', '_self', '_parent']);

export const interaction = PropTypes.oneOf(['tap', 'swipe']);

export const interactions = PropTypes.arrayOf(interaction);

/**
 * Site
 */
export const user = PropTypes.shape({
    id: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    birthdate: PropTypes.string,
});

export const menuItem = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label,
    url: PropTypes.string,
    external: PropTypes.bool,
    active: PropTypes.bool,
});
export const menuItems = PropTypes.arrayOf(menuItem);

export const device = PropTypes.shape({
    id: PropTypes.string.isRequired,
});
export const devices = PropTypes.arrayOf(device);

export const modal = PropTypes.shape({
    id: PropTypes.string.isRequired,
});
export const modals = PropTypes.arrayOf(modal);

export const panel = PropTypes.shape({
    id: PropTypes.string.isRequired,
});
export const panels = PropTypes.arrayOf(panel);

export const button = PropTypes.shape({
    label,
    onClick: PropTypes.func,
});
export const buttons = PropTypes.arrayOf(button);

export const buttonTheme = PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
    'outline-primary',
    'outline-secondary',
    'outline-success',
    'outline-danger',
    'outline-warning',
    'outline-info',
    'outline-light',
    'outline-dark',
    'outline-link',
    null,
]);

export const buttonSize = PropTypes.oneOf(['lg', 'sm', null]);

export const dropdownAlign = PropTypes.oneOf(['left', 'right']);

export const componentNames = (Components) =>
    PropTypes.oneOf(Object.keys(Components).map((it) => snakeCase(it)));

export const component = PropTypes.oneOfType([PropTypes.object, PropTypes.func]);
export const components = PropTypes.objectOf(component);

/**
 * Forms
 */
export const errors = PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]);
export const formErrors = PropTypes.objectOf(errors);

export const selectOption = PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.node,
});
export const selectOptions = PropTypes.arrayOf(selectOption);

export const formField = PropTypes.shape({
    name: PropTypes.string,
    component: PropTypes.string,
});
export const formFields = PropTypes.arrayOf(formField);

/**
 * Style
 */
export const textAlign = PropTypes.oneOf(['left', 'right', 'center']);

export const textStyle = PropTypes.shape({
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    fontStyle: PropTypes.shape({
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
        upperCase: PropTypes.bool,
    }),
    textAlign,
});

export const color = PropTypes.shape({
    color: PropTypes.string,
    alpha: PropTypes.number,
});

export const margin = PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
});

export const gridLayout = PropTypes.arrayOf(
    PropTypes.shape({
        rows: PropTypes.number,
        columns: PropTypes.arrayOf(PropTypes.number),
    }),
);

export const objectFit = PropTypes.shape({
    fit: PropTypes.oneOf(['cover', 'contain', null]),
    horizontalPosition: PropTypes.oneOf(['left', 'center', 'right']),
    verticalPosition: PropTypes.oneOf(['top', 'center', 'bottom']),
});

/**
 * Medias
 */
const mediaMetadataShape = {
    filename: PropTypes.string,
    size: PropTypes.number,
};

const mediaShape = {
    id: PropTypes.string,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    thumbnail_url: PropTypes.string,
    name: PropTypes.string,
    metadata: PropTypes.shape({
        ...mediaMetadataShape,
    }),
};

export const media = PropTypes.shape(mediaShape);
export const medias = PropTypes.arrayOf(media);

export const imageMedia = PropTypes.shape({
    ...mediaShape,
    type: PropTypes.oneOf(['image']),
    metadata: PropTypes.shape({
        ...mediaMetadataShape,
        width: PropTypes.number,
        height: PropTypes.number,
    }),
});
export const imageMedias = PropTypes.arrayOf(imageMedia);

export const videoMedia = PropTypes.shape({
    ...mediaShape,
    type: PropTypes.oneOf(['video']),
    metadata: PropTypes.shape({
        ...mediaMetadataShape,
        width: PropTypes.number,
        height: PropTypes.number,
        duration: PropTypes.number,
    }),
});
export const videoMedias = PropTypes.arrayOf(videoMedia);

export const audioMedia = PropTypes.shape({
    ...mediaShape,
    type: PropTypes.oneOf(['audio']),
    metadata: PropTypes.shape({
        ...mediaMetadataShape,
        duration: PropTypes.number,
    }),
});
export const audioMedias = PropTypes.arrayOf(audioMedia);

export const closedCaptionsMedia = PropTypes.shape({
    ...mediaShape,
    type: PropTypes.oneOf(['closed-captions']),
});

/**
 * Elements
 */
export const headingElement = PropTypes.shape({
    body: PropTypes.string,
    textStyle,
});

export const textElement = PropTypes.shape({
    body: PropTypes.string,
    textStyle,
});

export const imageElement = PropTypes.shape({
    media: imageMedia,
});

export const videoElement = PropTypes.shape({
    media: videoMedia,
});

export const audioElement = PropTypes.shape({
    media: audioMedia,
});

export const closedCaptionsElement = PropTypes.shape({
    media: closedCaptionsMedia,
});

export const backgroundElement = PropTypes.shape({
    color,
    image: imageMedia,
    video: videoMedia,
});

export const imageElementWithLegend = PropTypes.shape({
    image: imageMedia,
    legend: textElement,
});

export const imageElementsWithLegend = PropTypes.arrayOf(imageElementWithLegend);

export const stackDirection = PropTypes.oneOf(['horizontal', 'vertical']);
export const stackAlign = PropTypes.oneOf(['start', 'center', 'end']);
export const stackSpacing = PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['between', 'evenly', 'around']),
]);

export const stackElement = PropTypes.shape({
    direction: stackDirection,
    align: stackAlign,
    width: PropTypes.number,
    height: PropTypes.number,
    spacing: stackSpacing,
    reverse: PropTypes.bool,
});

export const gridElement = PropTypes.shape({
    layout: PropTypes.arrayOf(PropTypes.string),
    spacing: PropTypes.number,
});

/**
 * Definitions
 */
export const field = PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: text,
});

export const fields = PropTypes.arrayOf(field);

export const screenDefinition = PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['screen']).isRequired,
    title: text.isRequired,
    layouts: PropTypes.arrayOf(PropTypes.string),
    fields,
});

export const screenDefinitions = PropTypes.arrayOf(screenDefinition);

/**
 * Story
 */
export const storyComponent = PropTypes.shape({
    type: PropTypes.string.isRequired,
});
export const storyComponents = PropTypes.arrayOf(storyComponent);

export const story = PropTypes.shape({
    id: PropTypes.string,
    components: storyComponents,
});

export const deviceScreen = PropTypes.shape({
    name: PropTypes.string.isRequired,
    mediaQuery: PropTypes.string,
});

export const deviceScreens = PropTypes.arrayOf(deviceScreen);

export const screenSize = PropTypes.shape({
    screen: PropTypes.string,
    screens: PropTypes.arrayOf(PropTypes.string),
    width: PropTypes.number,
    height: PropTypes.number,
});

export const renderContext = PropTypes.oneOf(['view', 'placeholder', 'edit', 'preview']);

/**
 * Screens
 */

export const adFormats = PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
});

export const adFormat = PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    url: PropTypes.string,
    target,
    iframe: PropTypes.string,
    image: imageMedia,
});

export const audioComponent = PropTypes.shape({
    src: PropTypes.string,
    track: PropTypes.string,
    trackLng: PropTypes.number,
    controls: PropTypes.bool,
});

export const slide = PropTypes.shape({
    image: imageMedia,
    text: PropTypes.string,
});

export const slides = PropTypes.arrayOf(slide);

// export const imageStyle = PropTypes.shape({
//     alt: PropTypes.string,
//     fit: PropTypes.object,
// });

export const containerStyle = PropTypes.shape({});

/**
 * Transitions
 */

export const transitionName = PropTypes.oneOf(['fade', 'scale', 'slide']);

const transitionParams = {
    duration: PropTypes.number,
    easing: PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']),
};

export const transition = PropTypes.oneOfType([
    transitionName.isRequired,
    PropTypes.shape({
        name: transitionName.isRequired,
        ...transitionParams,
    }),
]);

export const transitions = PropTypes.shape({
    in: transition,
    out: transition,
});

/**
 * Search
 */

export const searchFilter = PropTypes.shape({
    type: PropTypes.string,
    value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
});

export const searchFilters = PropTypes.arrayOf(searchFilter);

/**
 * Payments
 */

export const paymentItem = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    date: PropTypes.string,
    type: PropTypes.string,
    invoice_link: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

export const paymentItems = PropTypes.arrayOf(paymentItem);
