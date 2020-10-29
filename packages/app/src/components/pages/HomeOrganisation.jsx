/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { useOrganisation } from '../../contexts/OrganisationContext';
import MainLayout from '../layouts/Main';
import Page from '../partials/Page';
import OrganisationBox from '../partials/OrganisationBox';
import AccountBox from '../partials/AccountBox';
import RecentStories from '../partials/RecentStories';

import styles from '../../styles/pages/home.module.scss';

const propTypes = {
    recentStoriesCount: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    recentStoriesCount: 6,
    className: null,
};

const HomeOrganisationPage = ({ recentStoriesCount, className }) => {
    const organisation = useOrganisation();
    return (
        <MainLayout>
            <Page
                title={organisation.name}
                sidebar={
                    <>
                        <section className="mb-4">
                            <h5 className="mb-2">
                                <FormattedMessage
                                    defaultMessage="Organisation"
                                    description="Organisation home sidebar"
                                />
                            </h5>
                            <OrganisationBox organisation={organisation} withoutHeader />
                        </section>
                        <section className="mb-4">
                            <h5 className="mb-2">
                                <FormattedMessage
                                    defaultMessage="Your account"
                                    description="Your account home sidebar"
                                />
                            </h5>
                            <AccountBox withoutHeader />
                        </section>
                    </>
                }
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <RecentStories count={recentStoriesCount} />
            </Page>
        </MainLayout>
    );
};

HomeOrganisationPage.propTypes = propTypes;
HomeOrganisationPage.defaultProps = defaultProps;

export default HomeOrganisationPage;
