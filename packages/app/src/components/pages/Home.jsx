/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import MainLayout from '../layouts/Main';
import Page from '../partials/Page';

import AllStories from '../partials/AllStories';
import UserStoriesMenubar from '../menubars/UserStories';

import styles from '../../styles/pages/home.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const HomePage = ({ className }) => {
    return (
        <MainLayout>
            <Page
                title={
                    <FormattedMessage
                        defaultMessage="My Projects"
                        description="Micromag no org home page title"
                    />
                }
                sidebar={null}
                menubar={
                    <>
                        <hr className="border border-light" />
                        <UserStoriesMenubar />
                    </>
                }
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <AllStories />
            </Page>
        </MainLayout>
    );
};

HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;

export default HomePage;
