/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FormPanel, Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';

import styles from '../../../styles/pages/organisation/billing.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationBillingPage = ({ className }) => {
    const url = useUrlGenerator();

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
                    <FormattedMessage defaultMessage="Billing" descrition="Billing page title" />
                }
                sidebar={<OrganisationMenu asList />}
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <FormPanel>
                    <p>Billing</p>
                    <p>
                        <Link href={url('organisation.billing_info')}>Billing info</Link>
                    </p>
                    <p>
                        <Link href={url('organisation.billing_history')}>Billing history</Link>
                    </p>
                    <p>
                        <Link href={url('organisation.billing_plan')}>Billing plan</Link>
                    </p>
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

OrganisationBillingPage.propTypes = propTypes;
OrganisationBillingPage.defaultProps = defaultProps;

export default OrganisationBillingPage;
