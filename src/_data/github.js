const EleventyFetch = require("@11ty/eleventy-fetch")

// todo: update caching logic here with EleventyFetch
async function fetchData(url) {
    console.log(`Caching: ${url}`);
    try {
        const json = await EleventyFetch(url, {
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
    } catch (e) {
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
    const apiUrl = "https://api.github.com/repos/tannerdolby";

    try {
        let repos = [
            "eleventy-plugin-metagen",
            "eleventy-photo-gallery",
            "bug-saves-world",
            "pydetails",
            "frametools",
            "randoma11y-chrome-extension"
        ];

        repos = repos.map(async (repo) => {
            return await fetchData(`${apiUrl}/${repo}`);
        });

        return await Promise.all(repos);

    } catch (e) {
        console.log("Error returning multiple projects cached API data", e);
    } 
};
