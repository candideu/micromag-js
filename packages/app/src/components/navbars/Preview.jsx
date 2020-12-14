/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Navbar, Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import logo from '../../assets/logo-beta.svg';

const propTypes = {
    story: MicromagPropTypes.story,
    className: PropTypes.string,
};

const defaultProps = {
    story: null,
    className: null,
};

const PreviewNavbar = ({ story, className }) => {
    const url = useUrlGenerator();
    const link =
        story !== null
            ? url('stories.show', {
                  story: story.id,
              })
            : '#';
    return (
        <Navbar
            brand={<img src={logo} height="20" alt="Micromag" />}
            brandLink={link}
            theme="primary"
            withoutCollapse
            noWrap
            compact
            className={className}
        >
            <span className="navbar-text py-0">{story !== null ? story.title : null}</span>
            <form className="form-inline ml-auto">
                <Button
                    href={link}
                    theme="secondary"
                    className="mr-1"
                    size="sm"
                    disabled={story === null}
                >
                    <FormattedMessage defaultMessage="Close" description="Button label" />
                </Button>
            </form>
        </Navbar>
    );
};

PreviewNavbar.propTypes = propTypes;
PreviewNavbar.defaultProps = defaultProps;

export default PreviewNavbar;
