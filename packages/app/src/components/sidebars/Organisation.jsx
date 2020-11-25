/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Card } from '@micromag/core/components';

import OrganisationMenu from '../menus/Organisation';
import { useOrganisation as useContextOrganisation } from '../../contexts/OrganisationContext';

import styles from '../../styles/partials/organisation-box.module.scss';

const messages = defineMessages({
    title: {
        id: 'organisation-box.title',
        defaultMessage: 'Organisation',
    },
    profile: {
        id: 'organisation-box.profile',
        defaultMessage: 'Profile',
    },
    settings: {
        id: 'organisation-box.settings',
        defaultMessage: 'Settings',
    },
});

const propTypes = {
    withoutHeader: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    withoutHeader: true,
    className: null,
};

const OrganisationSidebar = ({ withoutHeader, className }) => {
    const organisation = useContextOrganisation();
    return (
        <Card
            header={!withoutHeader ? messages.title : null}
            afterBody={<OrganisationMenu asList flush />}
            theme="dark"
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            bodyClassName={styles.body}
        >
            <h5 className="mb-0">{organisation.name}</h5>
        </Card>
    );
};

OrganisationSidebar.propTypes = propTypes;
OrganisationSidebar.defaultProps = defaultProps;

export default OrganisationSidebar;