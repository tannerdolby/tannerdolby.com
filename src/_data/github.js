const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
    console.log("Fetching Github API data...");

    try {
        let json = await Cache("https://api.github.com/repos/tannerdolby/eleventy-photo-gallery", {
            duration: "1d",
            type: "json"
        });
        return {
            repoName: json.name,
            githubHandle: json.owner.login,
            homepage: json.homepage,
            stargazers: json.stargazers_count,
            watchers: json.watchers_count
        }
    } catch (e) {
        console.log("Failed getting Github Repo data from API, returning 0");
        return {
            repoName: "Refresh to see Github Repository",
            githubHandle: "Refresh to see Github handle",
            homepage: "https://github.com",
            stargazers: 0,
            watchers: 0,
        }
    }
};