/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Link from '../partials/Link';
import Button from '../buttons/Button';

const propTypes = {
    brand: PropTypes.node,
    brandLink: PropTypes.string,
    theme: PropTypes.oneOf(['light', 'dark', 'primary']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    compact: PropTypes.bool,
    noWrap: PropTypes.bool,
    withoutCollapse: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
};

const defaultProps = {
    brand: null,
    brandLink: null,
    theme: 'light',
    size: 'md',
    compact: false,
    noWrap: false,
    withoutCollapse: false,
    children: null,
    className: null,
};

const Navbar = ({
    brand,
    brandLink,
    theme,
    size,
    compact,
    noWrap,
    withoutCollapse,
    children,
    className,
}) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const onClickMenu = useCallback(() => setMenuVisible(!menuVisible), [
        setMenuVisible,
        menuVisible,
    ]);
    return (
        <nav
            className={classNames([
                'navbar',
                `bg-${theme}`,
                `navbar-${theme === 'light' ? 'light' : 'dark'}`,
                `text-${theme === 'light' ? 'dark' : 'light'}`,
                {
                    [`navbar-expand-${size}`]: !withoutCollapse,
                    'py-2': compact,
                    'px-2': compact,
                    'flex-nowrap': noWrap,
                    [className]: className !== null,
                },
            ])}
        >
            {brand !== null && brandLink !== null ? (
                <Link className="navbar-brand" to={brandLink}>
                    {brand}
                </Link>
            ) : null}
            {brand !== null && brandLink === null ? (
                <span className="navbar-brand">{brand}</span>
            ) : null}
            {!withoutCollapse ? (
                <Button
                    className="navbar-toggler"
                    onClick={onClickMenu}
                    withoutTheme
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </Button>
            ) : null}
            {!withoutCollapse ? (
                <div
                    className={classNames([
                        'navbar-collapse',
                        'collapse',
                        {
                            show: menuVisible,
                        },
                    ])}
                >
                    {children}
                </div>
            ) : (
                children
            )}
        </nav>
    );
};

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
