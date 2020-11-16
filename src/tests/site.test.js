const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const buildRoot = path.join("..",  "tests");

test("does heading highlight work on test page?", () => {
    expect(buildRoot).toBeTruthy();

    const buildFolder = path.join(buildRoot, "foo");
    expect(buildFolder).toBeTruthy();

    const htmlFile = path.join(buildFolder, "index.html");
    const html = fs.readFileSync(htmlFile, "utf-8");

    // cheerio object
    const $ = cheerio.load(html);
    expect($).toBeTruthy();

    $('h3').each((i, element) => {
        // test heading highlight for sub heading + direct permalinks in blog posts
    });

});