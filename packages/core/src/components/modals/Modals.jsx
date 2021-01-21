/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '../../lib';
import { withModals } from '../../contexts';

import styles from '../../styles/modals/modals.module.scss';

const propTypes = {
    modals: MicromagPropTypes.modals.isRequired,
    setModalsContainer: PropTypes.func.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const ModalsContainer = ({ modals, setModalsContainer, className }) => {
    const containerRef = useRef(null);
    useEffect(() => {
        setModalsContainer(containerRef.current);
    }, []);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            <div
                className={classNames([
                    styles.modals,
                    {
                        [styles.hasModals]: modals.length > 0,
                    },
                ])}
                ref={containerRef}
            />
        </div>
    );
};

ModalsContainer.propTypes = propTypes;
ModalsContainer.defaultProps = defaultProps;

export default withModals(ModalsContainer);
