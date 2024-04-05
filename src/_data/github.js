const EleventyFetch = require("@11ty/eleventy-fetch");
const { readFile, writeFile } = require('./util');
const GITHUB_PROFILE_URL = process.env.GITHUB_PROFILE_URL;
const cachedReposPath = __dirname + "/cachedRepos.json";
const repoUrls = [
    "eleventy-plugin-metagen",
    "eleventy-photo-gallery",
    "bug-saves-world",
    "react-pokedex",
    "react-task-board",
    "dsa",
];

// Perform a cache lookup for a GitHub repo object.
function checkCache(cache, projectName) {
    if (!cache) return [];
    let idx = 0;
    const cacheRecord = cache.find((repo, i) => {
        idx = i;
        return repo.title == projectName;
    });
    return [cacheRecord, idx];
}

// Return an object containing a "minimal" github repo response.
function formatResponse(repo) {
    return {
        title: repo.name,
        desc: repo.description,
        stargazers: repo.stargazers_count,
        subscribers: repo.subscribers_count,
        forks: repo.forks_count,
        issues: repo.open_issues,
        stargazers_url: `${repo.html_url}/stargazers/`,
        homepage: repo.homepage,
        repo_url: repo.html_url
    }
}

async function fetchAndStoreData(url, projectName, cache) {
    let cacheUpdated = false;

    /* Search cache for existing repo data.
    - if it exists, update the entry in the cache with new data
    - if it doesn't exist, add new data entry from API to cache
    */
    let [cacheRecord, idx] = checkCache(cache, projectName);

    // Fetch from the GitHub API and update the cache if needed
    try {
        const json = await EleventyFetch(url, {
            duration: "1d",
            type: "json",
        });

        // 1. if the EleventyFetch call was success and returned a repo object
        // then we update the "local" file representing the cache
        if (cacheRecord && json) {
            cacheUpdated = true;
            cache[idx] = formatResponse(json);
        }

        // 2. if the repo name doesn't already exist in the cache, add the new data
        if (!cacheRecord && json) {
            cacheUpdated = true;
            cache.push(formatResponse(json));
        }

        // if the original cache has new records added or updated,
        // write to the cachedRepos.json file representing the "local" cache
        if (cacheUpdated) {
            cache = cache.filter(repo => repoUrls.includes(repo.title));
            const cacheStr = JSON.stringify(cache, null, 4);
            await writeFile(cachedReposPath, cacheStr);
        }

        return formatResponse(json);

    } catch (e) {
        console.error(`Unable to cache request: '${url}'. Checking cache for existing record.`, e);
       
        // if the API call fails - most commonly from too many requests to
        // the GitHub API because of low ceiling for requests per hour,
        // grab existing cache date before ultimately falling back to the "template"
        // repo info 
        const cacheData = checkCache(cache, projectName);

        return cacheData ? cacheData[0] : {
            title: "A Github Project by Tanner",
            desc: "This project was created by @tannerdolby",
            stargazers: 0,
            subscribers: 0,
            forks: 0,
            issues: 0,
            stargazers_url: GITHUB_PROFILE_URL,
            homepage: GITHUB_PROFILE_URL,
            repo_url: GITHUB_PROFILE_URL
        }
    }         
}

module.exports = async function() {
    const cacheFile = await readFile(cachedReposPath)
    const cacheList = cacheFile ? JSON.parse(cacheFile) : [];

    if (process.env.ELEVENTY_ENV === 'dev') {
        return cacheList;
    }

    if (process.env.ELEVENTY_ENV === 'prod') {
        try {
            // Fetch repo object from GitHub API and update existing cache
            // or if API call fails, use existing cached repo data
            const repos = repoUrls.map(async (repo) => {
                return await fetchAndStoreData(`${process.env.GITHUB_API_URL}/${repo}`, repo, cacheList);
            });
    
            return await Promise.all(repos);
        } catch (e) {
            console.error("Error returning cached GitHub repository data", e);
        } 
    }
};
