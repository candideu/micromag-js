/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FormPanel } from '@micromag/core/components';
import { useRoutePush, useUrlGenerator } from '@micromag/core/contexts';
import { useParams } from 'react-router';
import { useStory } from '@micromag/data';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import StoryDuplicateForm from '../../forms/StoryDuplicate';

import BackLinks from '../../partials/BackLinks';

import styles from '../../../styles/pages/stories/create.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryDuplicatePage = ({ className }) => {
    const url = useUrlGenerator();
    const push = useRoutePush();
    const { story: storyId } = useParams();
    const { story, loading } = useStory(storyId);

    const onComplete = useCallback(() => {
        push(url('home'));
    }, [push, url]);

    return (
        <MainLayout contentAlign="middle">
            <Page
                title={
                    <FormattedMessage
                        defaultMessage="Duplicate story"
                        description="Duplicate story page title"
                    />
                }
                small
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <FormPanel loading={loading}>
                    <div className="form-group">
                        {story ? (
                            <StoryDuplicateForm story={story} onComplete={onComplete} />
                        ) : (
                            <FormattedMessage
                                defaultMessage="Cannot find story"
                                description="Cannot find story message"
                            />
                        )}
                    </div>
                    <BackLinks />
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

StoryDuplicatePage.propTypes = propTypes;
StoryDuplicatePage.defaultProps = defaultProps;

export default StoryDuplicatePage;