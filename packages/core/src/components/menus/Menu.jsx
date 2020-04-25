/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as MicromagPropTypes from '../../PropTypes';
import Link from '../partials/Link';
import Label from '../partials/Label';
import Dropdown from './Dropdown';

const propTypes = {
    items: MicromagPropTypes.menuItems,
    children: PropTypes.node,
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    linkClassName: PropTypes.string,
    hasSubMenuClassName: PropTypes.string,
    subMenuClassName: PropTypes.string,
    subMenuItemClassName: PropTypes.string,
    subMenuLinkClassName: PropTypes.string,
    hasDropdownClassName: PropTypes.string,
    dropdownClassName: PropTypes.string,
    dropdownItemClassName: PropTypes.string,
    dropdownLinkClassName: PropTypes.string,
};

const defaultProps = {
    items: [],
    children: null,
    className: null,
    itemClassName: null,
    linkClassName: null,
    hasSubMenuClassName: null,
    subMenuClassName: null,
    subMenuItemClassName: null,
    subMenuLinkClassName: null,
    hasDropdownClassName: null,
    dropdownClassName: null,
    dropdownItemClassName: null,
    dropdownLinkClassName: null,
};

const Menu = ({
    items,
    children,
    className,
    itemClassName,
    linkClassName,
    hasSubMenuClassName,
    subMenuClassName,
    subMenuItemClassName,
    subMenuLinkClassName,
    hasDropdownClassName,
    dropdownClassName,
    dropdownItemClassName,
    dropdownLinkClassName,
}) => {
    const [dropdownsVisible, setDropdownsVisible] = useState(items.map(() => false));
    return (
        <ul className={className}>
            {children !== null
                ? children
                : items.map((it, index) => {
                      const {
                          id,
                          className: customClassName = null,
                          linkClassName: customLinkClassName = null,
                          href = null,
                          label,
                          external = false,
                          items: subItems = null,
                          dropdown = null,
                          active = false,
                          onClick: customOnClick = null,
                          ...itemProps
                      } = it;
                      const onClickItem =
                          dropdown !== null
                              ? e => {
                                    e.preventDefault();
                                    setDropdownsVisible([
                                        ...dropdownsVisible.slice(0, index),
                                        !(dropdownsVisible[index] || false),
                                        ...dropdownsVisible.slice(index + 1),
                                    ]);
                                    if (customOnClick !== null) {
                                        customOnClick(e);
                                    }
                                }
                              : customOnClick;
                      const closeDropdown =
                          dropdown !== null
                              ? () => {
                                    setDropdownsVisible([
                                        ...dropdownsVisible.slice(0, index),
                                        false,
                                        ...dropdownsVisible.slice(index + 1),
                                    ]);
                                }
                              : null;
                      return (
                          <li
                              key={`item-${id || index}`}
                              className={classNames({
                                  dropdown: dropdown !== null,
                                  active,
                                  [itemClassName]: itemClassName !== null,
                                  [customClassName]: customClassName !== null,
                                  [hasSubMenuClassName]:
                                      subItems !== null && hasSubMenuClassName !== null,
                                  [hasDropdownClassName]:
                                      subItems !== null && hasDropdownClassName !== null,
                              })}
                          >
                              {href !== null ? (
                                  <Link
                                      {...itemProps}
                                      onClick={onClickItem}
                                      href={href}
                                      external={external}
                                      className={classNames({
                                          [linkClassName]: linkClassName !== null,
                                          'dropdown-toggle': dropdown !== null,
                                          [customLinkClassName]: customLinkClassName !== null,
                                      })}
                                  >
                                      {label}
                                  </Link>
                              ) : (
                                  <Label {...itemProps}>{label}</Label>
                              )}
                              {subItems !== null ? (
                                  <Menu
                                      items={subItems}
                                      className={subMenuClassName}
                                      itemClassName={classNames({
                                          [subMenuItemClassName]: subMenuItemClassName !== null,
                                          [itemClassName]:
                                              subMenuItemClassName === null &&
                                              itemClassName !== null,
                                      })}
                                      linkClassName={classNames({
                                          [subMenuLinkClassName]: subMenuLinkClassName !== null,
                                          [linkClassName]:
                                              subMenuLinkClassName === null &&
                                              linkClassName !== null,
                                      })}
                                  />
                              ) : null}
                              {dropdown !== null ? (
                                  <Dropdown
                                      items={dropdown}
                                      visible={dropdownsVisible[index] || false}
                                      className={dropdownClassName}
                                      itemClassName={classNames({
                                          [dropdownItemClassName]: dropdownItemClassName !== null,
                                          [itemClassName]:
                                              dropdownItemClassName === null &&
                                              itemClassName !== null,
                                      })}
                                      linkClassName={classNames({
                                          [dropdownLinkClassName]: dropdownLinkClassName !== null,
                                          [linkClassName]:
                                              dropdownLinkClassName === null &&
                                              linkClassName !== null,
                                      })}
                                      onClickItem={closeDropdown}
                                      onClickOutside={closeDropdown}
                                  />
                              ) : null}
                          </li>
                      );
                  })}
        </ul>
    );
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;