import getArticleTextStyles from './lib/getArticleTextStyles';
import getArticleLayouts from './lib/getArticleLayouts';
import getArticleDocumentStyle from './lib/getArticleDocumentStyle';
import ArticleDefinition from './definitions/ArticleDocument.json';

import { validate } from '../utils';

const Article = (newStory, story, settings) => {
    // console.log('ARTICLE', newStory); // eslint-disable-line
    const { title = 'Article' } = newStory;
    const { identifier = 'testArticle' } = settings || {};

    const content = {
        title,
        version: `${1}.0`.toString(), // Note: for some reason only 1.0 works
        identifier,
        language: 'fr',
        layout: {},
        documentStyle: {},
        components: [],
        componentStyles: {},
        componentTextStyles: {},
        componentLayouts: {},
        ...getArticleDocumentStyle(newStory, story),
        ...getArticleTextStyles(newStory, story),
        ...getArticleLayouts(newStory, story),
    };

    return validate(content, ArticleDefinition);
};

export default Article;
