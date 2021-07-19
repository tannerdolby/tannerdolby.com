const Cache = require("@11ty/eleventy-cache-assets");

async function fetchData(url) {
    console.log(`Caching: ${url}`);
    try {
        let json = await Cache(url, {
            duration: "1d",
            type: "json",
        });
        return {
            title: json.name,
            desc: json.description,
            stargazers: json.stargazers_count,
            subscribers: json.subscribers_count,
            forks: json.forks_count,
            issues: json.open_issues,
            stargazers_url: json.html_url.concat("/stargazers/"),
            homepage: json.homepage,
            repo_url: json.html_url
        }
    }
    catch (e) {
        console.log(`Error caching: ${url}`, e);
        return {
            title: "A Github Project by Tanner",
            desc: "This project was created by @tannerdolby",
            stargazers: 0,
            subscribers: 0,
            forks: 0,
            issues: 0,
            stargazers_url: "https://github.com/tannerdolby",
            homepage: "https://github.com/tannerdolby",
            repo_url: "https://github.com/tannerdolby"
        }
    }
}

module.exports = async function() {
    try {
        const eleventyGallery = await fetchData("https://api.github.com/repos/tannerdolby/eleventy-photo-gallery");
        const pluginMetaGen = await fetchData("https://api.github.com/repos/tannerdolby/eleventy-plugin-metagen");
        const pluginSharpRespImg = await fetchData("https://api.github.com/repos/tannerdolby/eleventy-plugin-sharp-respimg");
        const whatToWatch = await fetchData("https://api.github.com/repos/tannerdolby/what-to-watch");
        const cipherNews = await fetchData("https://api.github.com/repos/tannerdolby/cipher-news");
        const sassVarConverter = await fetchData("https://api.github.com/repos/tannerdolby/sass-variable-converter");

        return [ 
            eleventyGallery, 
            pluginMetaGen, 
            pluginSharpRespImg, 
            whatToWatch, 
            cipherNews, 
            sassVarConverter 
        ];
    } catch (e) {
        console.log("Error returning multiple projects cached API data", e);
    } 
};