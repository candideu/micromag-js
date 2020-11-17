import React from 'react';
import PropTypes from 'prop-types';

import { Screen } from '@micromag/core/components';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from '../styles/screen.module.scss';

const propTypes = {
    screen: MicromagPropTypes.screenType,
    renderContext: MicromagPropTypes.renderContext,
    current: PropTypes.bool,
    active: PropTypes.bool,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
};

const defaultProps = {
    screen: null,
    renderContext: null,
    current: false,
    active: true,
    onPrevious: null,
    onNext: null,
};

const ViewerScreen = ({ screen, renderContext, active, current, onPrevious, onNext }) => {
    return screen !== null ? (
        <div className={styles.container}>
            <Screen
                screen={screen}
                renderContext={renderContext}
                active={active}
                current={current}
                onPrevious={onPrevious}
                onNext={onNext}
            />
        </div>
    ) : null;
};

ViewerScreen.propTypes = propTypes;
ViewerScreen.defaultProps = defaultProps;

export default ViewerScreen;
