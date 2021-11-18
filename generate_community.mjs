import { parse } from 'node-html-parser';
import { readFileSync } from 'fs';

const test = readFileSync('./export_npm.html'); // get list from here https://www.npmjs.com/org/capacitor-community
const root = parse(test);

root.firstChild.childNodes.forEach(element => {
    if (element.rawTagName === 'li') {
        const href = element.querySelector('a').attributes.href.trim().replace('/package/@', '')
        const title = element.querySelector('h3').structuredText.trim()
        const description = element.querySelector('p').structuredText.trim()
        const res = `- [${title}](https://github.com/${href}) ${description}`
        if (title[0] === '@') {
            console.log(res)
        }
    }
});