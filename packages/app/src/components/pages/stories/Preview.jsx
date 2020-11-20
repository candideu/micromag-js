import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { useParams } from 'react-router';

import { useUrlGenerator } from '@micromag/core/contexts';
import { useStory } from '@micromag/data';
import Viewer from '@micromag/viewer';

import { useApp } from '../../../contexts/AppContext';
import MainLayout from '../../layouts/Main';
import PreviewNavbar from '../../navbars/Preview';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryPreviewPage = ({ className }) => {
    const url = useUrlGenerator();
    const { story: storyId } = useParams();
    const { memoryRouter } = useApp();

    const { story } = useStory(storyId);
    return (
        <MainLayout fullscreen navbar={<PreviewNavbar story={story} />}>
            <div className={className}>
                {story !== null ? (
                    <Viewer
                        story={story}
                        memoryRouter={memoryRouter}
                        basePath={url('stories.preview', {
                            story: story.id,
                        })}
                        fullscreen
                    />
                ) : null}
            </div>
        </MainLayout>
    );
};

StoryPreviewPage.defaultProps = defaultProps;
StoryPreviewPage.propTypes = propTypes;

export default StoryPreviewPage;
