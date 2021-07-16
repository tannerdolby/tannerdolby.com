const fetch = require("node-fetch");

// Fetch some data from the GitHub API
async function getData(url) {
    try {
        repo = await fetch(url).then(data => data.json());
        return {
            ...repo,
            title: repo.name,
            desc: repo.description,
            stars: repo.stargazers_count,
            issues: repo.open_issues
        }
    } catch (err) {
        console.error(err);
    }
}


function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min)
}

module.exports = async function() {
    try {
        const apiData = await getData("https://api.github.com/repos/tannerdolby/eleventy-photo-gallery");
        return {
            title: "My custom blog post",
            metadata: {
                date: "2021-03-16",
                tags: [
                    "11ty",
                    "JavaScript"
                ]
            },
            trending: random(1, 10) > 7 ? true : false,
            apiData: apiData
        }
    } catch (err) {
        console.log(err);
    }
}