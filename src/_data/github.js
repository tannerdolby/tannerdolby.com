const Cache = require("@11ty/eleventy-cache-assets");

// maybe create a shortcode for this in .eleventy.js to create a plugin for getting github project data
async function fetchData(url) {
    console.log("Caching Github API request");
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
            stargazers_url: json.stargazers_url,
            homepage: json.homepage,
            repo_url: json.html_url
        }
    }
    catch (e) {
        console.log(`Error caching github API data for ${url}`);
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
        const personalWebsite = await fetchData("https://api.github.com/repos/tannerdolby/tannerdolby.com");
        const whatToWatch = await fetchData("https://api.github.com/repos/tannerdolby/what-to-watch");
        const reactStrTable = await fetchData("https://api.github.com/repos/tannerdolby/react-string-table");

       // return the promise for each project <Promise{ title: ... }>
        return { eleventyGallery, personalWebsite, whatToWatch, reactStrTable };
    } catch (e) {
        console.log("Error returning multiple projects cached API data");
    } 
};