import program from 'commander';
import fs from 'fs';
import { StoryParser } from '@micromag/core';
import ScreensManager from '@micromag/screens';
import FieldsManager from '@micromag/fields';
import readJSON from '../utils/readJSON';
import transformStory from '../utils/transformStory';
import captureStory from '../utils/captureStory';
import getStoryHtml from '../utils/getStoryHtml';
import getStoryHtmlSSR from '../utils/getStoryHtmlSSR';
import getOutputPath from '../utils/getOutputPath';

let story = null;
let stdin = null;
program
    .arguments('<path>')
    .description({
        path: 'Path to story JSON file',
    })
    .requiredOption('-f, --format <format>', 'Format of the export')
    .option('-o, --output <output>', 'Output path')
    .option('-s, --settings <settings>', 'Settings')
    .option('-k, --keys <keys>', 'Keys')
    .action((jsonPath) => {
        story = jsonPath === '-' ? JSON.parse(stdin) : readJSON(jsonPath);
    });

const exportStory = async (format, output, jsonSettings, jsonKeys) => {
    // eslint-disable-next-line
    const settings = jsonSettings !== null ? JSON.parse(jsonSettings) : {};
    const keys = jsonKeys !== null ? JSON.parse(jsonKeys) : {};
    const storyParser = new StoryParser({
        fieldsManager: FieldsManager,
        screensManager: ScreensManager,
    });
    const storyParsed = storyParser.parse(story);

    switch (format) {
        case 'html': {
            const html = await getStoryHtml(storyParsed, keys);
            const destination = getOutputPath(output, 'story.html');
            console.log('destination', destination);
            fs.writeFileSync(destination, html, 'utf-8');
            break;
        }
        case 'html-ssr': {
            const html = getStoryHtmlSSR(storyParsed, keys);
            const destination = getOutputPath(output, 'story-ssr.html');
            fs.writeFileSync(destination, html, 'utf-8');
            break;
        }
        case 'images': {
            captureStory(storyParsed, output, keys);
            break;
        }
        default: {
            const newStory = transformStory(storyParsed, format, settings);
            // const mediaDestination = getOutputPath(output);
            const fileDestination = getOutputPath(output, 'article.json');
            fs.writeFileSync(fileDestination, JSON.stringify(newStory), 'utf-8');
            break;
        }
    }
};

const startProgram = (prog) => {
    prog.parse();
    const { format, output = null, settings = null, keys = null } = prog.opts();
    exportStory(format, output, settings, keys);
};

// Read stdin for the story
if (process.stdin.isTTY) {
    startProgram(program);
} else {
    process.stdin.on('readable', () => {
        const chunk = process.stdin.read();
        if (chunk !== null) {
            if (stdin === null) {
                stdin = '';
            }
            stdin += chunk;
        }
    });
    process.stdin.on('end', () => {
        startProgram(program);
    });
}