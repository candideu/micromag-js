/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';

import { FormPanel } from '@micromag/core/components';
import { useRoutePush, useUrlGenerator } from '@micromag/core/contexts';
import { useStory } from '@micromag/data';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import StoryDeleteForm from '../../forms/StoryDelete';
import BackLinks from '../../partials/BackLinks';

import styles from '../../../styles/pages/stories/create.module.scss';

const propTypes = {
    location: MicromagPropTypes.location.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryDeletePage = ({ location: { pathname }, className }) => {
    const url = useUrlGenerator();
    const push = useRoutePush();
    const { story: storyId } = useParams();
    const { story, loading } = useStory(storyId);

    const parent = story !== null ? story.title : null;
    const parentUrl = story !== null ? url('stories.show', { story: story.id }) : null;
    const title = <FormattedMessage defaultMessage="Delete" descrition="Page title" />;

    const onComplete = useCallback(() => {
        push(url('home'));
    }, [push, url]);

    return (
        <MainLayout
            contentAlign="middle"
            nav={[
                { label: parent, url: parentUrl },
                { label: title, url: pathname },
            ]}
        >
            <Page
                title={title}
                small
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <FormPanel loading={loading}>
                    {story ? (
                        <StoryDeleteForm story={story} onComplete={onComplete} />
                    ) : (
                        <FormattedMessage
                            defaultMessage="Cannot find story"
                            description="Cannot find story message"
                        />
                    )}
                    <BackLinks />
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

StoryDeletePage.propTypes = propTypes;
StoryDeletePage.defaultProps = defaultProps;

export default StoryDeletePage;
