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
    let apiUrl = "https://api.github.com/repos/tannerdolby";
    try {
        const eleventyGallery = await fetchData(`${apiUrl}/eleventy-photo-gallery`);
        const pluginMetaGen = await fetchData(`${apiUrl}/eleventy-plugin-metagen`);
        const pluginSharpRespImg = await fetchData(`${apiUrl}/eleventy-plugin-sharp-respimg`);
        const openLibrary = await fetchData(`${apiUrl}/openlibrary`);
        const cipherNews = await fetchData(`${apiUrl}/cipher-news`);
        const randoma11yExtension = await fetchData(`${apiUrl}/randoma11y-chrome-extension`);

        return [ 
            eleventyGallery, 
            pluginMetaGen, 
            pluginSharpRespImg, 
            openLibrary, 
            cipherNews, 
            randoma11yExtension
        ];
    } catch (e) {
        console.log("Error returning multiple projects cached API data", e);
    } 
};