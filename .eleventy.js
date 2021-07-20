const CleanCSS = require("clean-css");
const { minify } = require("terser");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const dateFilter = require("nunjucks-date-filter");
const pluginRSS = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const metagen = require("eleventy-plugin-metagen");
const socialImg = require("eleventy-plugin-social-img");
const respimg = require("eleventy-plugin-sharp-respimg");

module.exports = (eleventyConfig) => {

    markdownTemplateEngine: "njk";

    const markdownOptions = {
        html: true,
        breaks: true,
        linkify: true
    };
    
    const md = markdownIt(markdownOptions)
        .use(function(md) {
            md.linkify.add("##", {
                validate: /^[##]+/g,
                normalize: headingLink => {
                    headingLink.url = "/writing/";
                }
            })
        })
        // Recognize # for links to post tags 
        .use(function(md) {
            md.linkify.add("#", {
                validate: /^[\w-]+/g,
                normalize: match => {
                    match.url = "/writing/?filter=".concat(match.raw.slice(1));
                }
            })
        });

    eleventyConfig.setLibrary("md", md);

    // Run manual file passthrough copy
    eleventyConfig.addPassthroughCopy("./src/_includes/css");
    eleventyConfig.addPassthroughCopy("./src/images");
    eleventyConfig.addPassthroughCopy("./src/_includes/js");
    eleventyConfig.addPassthroughCopy("./src/remote");
    eleventyConfig.addPassthroughCopy("./src/social-share/");
    eleventyConfig.addPassthroughCopy("./src/resume/");

    eleventyConfig.addWatchTarget("./src/_includes/sass");

    // Add metadata and social share plugins
    eleventyConfig.addPlugin(metagen);
    eleventyConfig.addPlugin(socialImg);
    eleventyConfig.addPlugin(respimg);
    
    // add RSS feed 11ty plugin
    eleventyConfig.addPlugin(pluginRSS);

    // add PrismJS syntax highlighting with 11ty plugin
    eleventyConfig.addPlugin(syntaxHighlight, {
        templateFormats: ["njk", "md"],
    });

    // Nunjucks date filter ie usage is date('YYYY-MM-DD') 
    eleventyConfig.addFilter("date", dateFilter);

    // Minify CSS with clean-css
    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
    });

    // inclusive min, exclusive max [min, max)
    function random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    // Retrieve 3 of the most recent blog posts
    eleventyConfig.addCollection("recentPosts", function(collection) {
        return collection.getFilteredByGlob("src/writing/*.md").reverse().slice(0, 3);
    });
    
    // create a custom collection "posts"
    eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("src/writing/*.md");
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

    // adding tags to data-tags for search feature
    eleventyConfig.addFilter("stringify", function(tags) {
        let tagsArr = tags;
        for (var i = 0; i < tagsArr.length; i++) {
            var dataTags = [];
            if (tagsArr[i]) {
                dataTags.push(`"${tags[i]}"`);
            }
            if (tagsArr[i+1]) {
                dataTags.push(`"${tags[i+1]}"`);
            }
            if (tagsArr[i+2]) {
                dataTags.push(`"${tags[i+2]}"`);
            }
            if (tagsArr[i+3]) {
                dataTags.push(`"${tags[i+3]}"`);
            }
            return dataTags;
        }
    });

    // Inspired by @zachleat and his code title shortcode - credit: https://github.com/11ty/11ty-website/blob/master/.eleventy.js#L107-L109
    eleventyConfig.addShortcode("filename", function(title, header = "Filename") {
        return `<div class="filename-title"><span><b>${header}</b></span>: <em>${title}</em></div>`;
    });

    // shortcode for creating my headshot <img> in markdown
    eleventyConfig.addPairedShortcode("img", function(src) {
        return `<img width="210" height="210" src="${src}" alt="Headshot of Tanner's face (a bit outdated)" class="about-headshot" loading="lazy">`
    });

    eleventyConfig.addShortcode("getYear", function() {
        const year = new Date().getFullYear();
        return `${year}`;
    });

    eleventyConfig.addFilter("sortRecent", function(arr) {
        return arr.filter(a => a.recent).sort((a,b) => a.order - b.order);
    });

    eleventyConfig.addShortcode("relatedPosts", function(data) {
        const randomNum = random(0, data.tagsArr.length);
        const currentPage = data.currPage;
        const posts = data.arr.filter((post) => {
            return post.data.tags.includes(data.tagsArr[randomNum]) && post.data.title != currentPage;
        });
        const allPosts = data.arr.filter(post => post.data.title != currentPage);

        if (posts.length != 0 && posts.length > 4) {
            return `<ul class="related-posts">${posts.slice(0, 3).map(p => `<li><a href='${p.url}'>${p.data.title}</a></li>`).join("\n")}</ul>`;
        } else if (posts.length != 0 && posts.length >= 3) {
            return `<ul class="related-posts">${posts.slice(0, 3).map(p => `<li><a href='${p.url}'>${p.data.title}</a></li>`).join("\n")}</ul>`;
        } else {
            return `<ul class="related-posts">${allPosts.slice(0, 3).map(p => `<li><a href='${p.url}'>${p.data.title}</a></li>`).join("\n")}</ul>`;
        }
    
    });

    eleventyConfig.addShortcode("taglist", function(collection) {
        let tags = [];
        collection.forEach(item => {
            tags.push(...item.data.tags); 
        });

        const uniqueTags = [...new Set(tags)];
        console.log(uniqueTags);

        return uniqueTags;
    });

    return {
        dir: {
          input: "src",
          output: "_site",
          layouts: "_includes/layouts",
          data: "_data",
          includes: "_includes"
        },
        templateFormats: ["md", "liquid", "njk"],
        passthroughFileCopy: true
    };
}