/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FormPanel } from '@micromag/core/components';
import { useOrganisation, useOrganisationContact } from '@micromag/data';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';
import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';
import OrganisationSettingsForm from '../../forms/OrganisationSettings';

import styles from '../../../styles/pages/organisation/settings.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationSettingsPage = ({ className }) => {
    const currentOrganisation = useContextOrganisation();
    const { organisation } = useOrganisation(currentOrganisation.id);
    const { contact, loading: contactLoading } = useOrganisationContact(
        currentOrganisation.id,
        'main',
    );
    console.log(currentOrganisation, organisation);
    return (
        <MainLayout>
            <Page
                section={
                    <FormattedMessage
                        defaultMessage="Organisation"
                        descrition="Organisation section title"
                    />
                }
                title={
                    <FormattedMessage defaultMessage="Settings" descrition="Settings page title" />
                }
                sidebar={<OrganisationMenu asList />}
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                {organisation !== null ? (
                    <FormPanel>
                        {!contactLoading ? (
                            <OrganisationSettingsForm
                                organisation={organisation}
                                mainContact={contact}
                            />
                        ) : null}
                    </FormPanel>
                ) : null}
            </Page>
        </MainLayout>
    );
};

OrganisationSettingsPage.propTypes = propTypes;
OrganisationSettingsPage.defaultProps = defaultProps;

export default OrganisationSettingsPage;
