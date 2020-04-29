/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { useLocation } from 'react-router';
import { parse as parseQuery, stringify as stringifyQuery } from 'query-string';
import { Pagination, Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useStories } from '@micromag/data';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import StoriesList from '../../lists/Stories';

import styles from '../../../styles/pages/stories/stories.module.scss';

const messages = defineMessages({
    title: {
        id: 'pages.stories.title',
        defaultMessage: 'Stories',
    },
    create: {
        id: 'pages.stories.create',
        defaultMessage: 'Create a new story',
    },
});

const propTypes = {
    count: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    count: 12,
    className: null,
};

const StoriesPage = ({ count, className }) => {
    const url = useUrlGenerator();
    const { search } = useLocation();
    const { page = 1, ...query } = useMemo(
        () => (search !== null && search.length > 0 ? parseQuery(search) : null),
        [search],
    );
    const finalQuery = Object.keys(query).length > 0 ? query : null;
    const { stories, total } = useStories(finalQuery, page, count);
    const paginationUrl = `${url('stories')}${
        finalQuery !== null ? `?${stringifyQuery(finalQuery)}` : ''
    }`;
    return (
        <MainLayout>
            <Page
                title={messages.title}
                sidebar={
                    <div className={styles.actions}>
                        <Button
                            href={url('stories.create')}
                            theme="primary"
                            className={styles.button}
                        >
                            {messages.create}
                        </Button>
                    </div>
                }
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                {stories !== null ? (
                    <>
                        <StoriesList items={stories} />
                        <Pagination page={parseInt(page, 10)} total={total} url={paginationUrl} />
                    </>
                ) : null}
            </Page>
        </MainLayout>
    );
};

StoriesPage.propTypes = propTypes;
StoriesPage.defaultProps = defaultProps;

export default StoriesPage;
