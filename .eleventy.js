const CleanCSS = require("clean-css");
const { minify } = require("terser");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = (eleventyConfig) => {
    
    eleventyConfig.setTemplateFormats([
        "md",
        "njk"
    ]);

    markdownTemplateEngine: "njk";

    // Run manual file passthrough copy
    eleventyConfig.addPassthroughCopy("./src/css");
    eleventyConfig.addPassthroughCopy("./src/images");
    eleventyConfig.addPassthroughCopy("./src/js");

    eleventyConfig.addPlugin(syntaxHighlight, {
        templateFormats: ["njk", "md"],
    });

    // Minify CSS with clean-css
    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
    });

    // Minify JS with terser
    eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
        code,
        callback
    )   {
        try {
            const minified = await minify(code);
            callback(null, minified.code);
        } catch (err) {
            console.log(`Terser error: ${err}`);
        }
    });

    // Inspired by @zachleat and his code title shortcode - credit: https://github.com/11ty/11ty-website/blob/master/.eleventy.js#L107-L109
    eleventyConfig.addShortcode("codetitle", function(title, header = "Filename") {
        return `<div class="filename-title" style="font-size: 14px;><b style="font-size: 14px;">${header}</b> <code style="font-size: 14px;">${title}</code></div>`;
    });

    // shortcode for centering post title/date
    eleventyConfig.addPairedShortcode("center", function(content) {
        return `<div class="center">${content}</div>`
    });

    // shortcode for creating my headshot <img> in markdown
    eleventyConfig.addPairedShortcode("img", function(src) {
        return `<img src="${src}" alt="Headshot of Tanner's face (a bit outdated)" class="about-headshot" loading="lazy">`
    });

    return {
        dir: {
          input: "src",
          output: "_site"
        },
    };
}