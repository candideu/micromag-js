/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import MenuIcon from './MenuIcon';

import styles from '../../styles/menus/menu-dots.module.scss';

const propTypes = {
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    withShadow: PropTypes.bool,
    items: MicromagPropTypes.menuItems,
    current: PropTypes.number,
    onClickItem: PropTypes.func,
    colorAccent: PropTypes.string,
    colorBackground: PropTypes.string,
    closeable: PropTypes.bool,
    onClose: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    direction: 'horizontal',
    withShadow: false,
    items: [],
    current: 0,
    onClickItem: null,
    colorAccent: 'rgba(255, 255, 255, 1)',
    colorBackground: 'rgba(200, 200, 200, 0.5)',
    closeable: false,
    onClose: null,
    className: null,
};

const ViewerMenuDots = ({
    direction,
    withShadow,
    items,
    current,
    onClickItem,
    colorAccent,
    colorBackground,
    closeable,
    onClose,
    className,
}) => {
    const intl = useIntl();

    return (
        <nav
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.vertical]: direction === 'vertical',
                    [styles.withShadow]: withShadow,
                },
            ])}
        >
            <ul className={styles.items}>
                {items.map((item, index) => (
                    <li
                        className={classNames([
                            styles.item,
                            {
                                [styles.active]: current === index,
                            },
                        ])}
                        key={`item-${index}`}
                    >
                        <button
                            type="button"
                            className={styles.button}
                            onClick={() => {
                                if (onClickItem !== null) {
                                    onClickItem(index);
                                }
                            }}
                            aria-label={intl.formatMessage(
                                {
                                    defaultMessage: 'Screen {index}',
                                    description: 'Button ARIA label',
                                },
                                { index },
                            )}
                        >
                            <span
                                className={styles.dot}
                                style={{
                                    backgroundColor:
                                        index <= current ? colorAccent : colorBackground,
                                }}
                            />
                        </button>
                    </li>
                ))}
                <li className={styles.menu}>
                    <MenuIcon className={styles.menuIcon} color={colorAccent} />
                    <button
                        type="button"
                        aria-label="menu"
                        className={styles.menuButton}
                        onClick={() => {
                            if (onClickItem !== null) {
                                onClickItem(null);
                            }
                        }}
                    />
                </li>
                {closeable ? (
                    <li className={styles.closeButton} style={{ color: colorAccent }}>
                        <button
                            type="button"
                            className={styles.closeButton}
                            onClick={onClose}
                            aria-label={intl.formatMessage({
                                defaultMessage: 'Close',
                                description: 'Button ARIA label',
                            })}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </li>
                ) : null}
            </ul>
        </nav>
    );
};
ViewerMenuDots.propTypes = propTypes;
ViewerMenuDots.defaultProps = defaultProps;

export default ViewerMenuDots;
