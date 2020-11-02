/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FormPanel } from '@micromag/core/components';

import { useOrganisations } from '@micromag/data';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationPreview from '../../partials/OrganisationPreview';
import AccountMenu from '../../menus/Account';
import ProfileForm from '../../forms/AccountProfile';
import DeleteForm from '../../forms/AccountDelete';

import styles from '../../../styles/pages/account/account.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const AccountProfilePage = ({ className }) => {
    const { organisations: userOrganisations } = useOrganisations();
    const organisations = userOrganisations || [];
    const hasOrganisations = organisations.length > 0;

    return (
        <MainLayout>
            <Page
                section={
                    <FormattedMessage defaultMessage="Account" description="Account page section" />
                }
                title={
                    <FormattedMessage
                        defaultMessage="Update your profile"
                        description="Update your profile page title"
                    />
                }
                sidebar={<AccountMenu asList />}
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <FormPanel>
                    <ProfileForm />
                </FormPanel>
                <div className={styles.separator} />
                <FormPanel
                    description={
                        <div className={styles.description}>
                            <h4>
                                <FormattedMessage
                                    defaultMessage="Delete profile"
                                    description="Delete profile section title"
                                />
                            </h4>
                            {hasOrganisations ? (
                                <>
                                    <div className={styles.description}>
                                        <FormattedMessage
                                            defaultMessage="You cannot delete your profile because you are part of the following organisations:"
                                            description="Cannot delete profile description"
                                        />
                                    </div>
                                    {organisations.map((organisation) => (
                                        <OrganisationPreview
                                            organisation={organisation}
                                            withoutHeader
                                        />
                                    ))}
                                </>
                            ) : (
                                <FormattedMessage
                                    defaultMessage="Are you sure you want to delete your profile? This action cannot be reversed."
                                    description="Delete your profile description"
                                />
                            )}
                        </div>
                    }
                >
                    {!hasOrganisations ? <DeleteForm /> : null}
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

AccountProfilePage.propTypes = propTypes;
AccountProfilePage.defaultProps = defaultProps;

export default AccountProfilePage;
