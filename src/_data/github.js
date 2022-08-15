const EleventyFetch = require("@11ty/eleventy-fetch");
const fs = require("fs");

const cachedReposPath = __dirname + "/cachedRepos.json";
const githubUrl = "https://github.com/tannerdolby";
const repoUrls = [
    "eleventy-plugin-metagen",
    "eleventy-photo-gallery",
    "bug-saves-world",
    "break0ut",
    "eleventy-plugin-sharp-respimg",
    "randoma11y-chrome-extension"
];


function updateLastCacheEntryTime(cache) {
    cache[0]["cacheSize"] = cache.length;
    return cache[0]["timeUpdated"] = new Date().toUTCString();
}

/**
 * Perform a lookup in the cache for a GitHub repo object.
 * @param {Array<Object>} cache an array of objects representing a cache.
 * @param {String} projectName a GitHub repo name
 */
function checkCache(cache, projectName) {
    let idx = 0;
    const cacheRecord = cache.find((repo, i) => {
        idx = i;
        return repo.title == projectName;
    });
    return cacheRecord ? [cacheRecord, idx] : [];
}

/**
 * Return an object containing a "minimal" repo object.
 * @param {Object} repo an object representing the GitHub repo response from GitHub API
 */
function pruneGitHubResponse(repo) {
    return {
        title: repo.name,
        desc: repo.description,
        stargazers: repo.stargazers_count,
        subscribers: repo.subscribers_count,
        forks: repo.forks_count,
        issues: repo.open_issues,
        stargazers_url: repo.html_url.concat("/stargazers/"),
        homepage: repo.homepage,
        repo_url: repo.html_url
    }
}

async function fetchAndStoreData(url, projectName, cache) {
    let cacheUpdated = false;
    cache[0]["cacheSize"] = cache.length;

    console.log(`Caching: ${url}`);

    /* Search cache for existing repo data.
    - if it exists, update the entry in the cache with new data
    - if it doesn't exist, we will add new data entry from API to cache
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
            updateLastCacheEntryTime(cache);
            cache[idx] = pruneGitHubResponse(json);
        }

        // 2. if the repo name doesn't already exist in the cache, add the new data
        if (!cacheRecord && json) {
            cacheUpdated = true;
            updateLastCacheEntryTime(cache);
            cache.push(pruneGitHubResponse(json));
        }

        // if the original cache has new records added or updated,
        // write to the cachedRepos.json file representing the "local" cache
        if (cacheUpdated) {
            fs.writeFile(cachedReposPath, JSON.stringify(cache, null, 2), (err) => {
                if (err) throw err;
            });
        }

        return pruneGitHubResponse(json);

    } catch (e) {
        console.log(`Unable to cache: '${url}'. Checking cache for existing record.`, e);
        /* 
        if the API call fails - most commonly from too many requests to
        the GitHub API because of low ceiling for requests per hour,
        grab existing cache date before ultimately falling back to the "template"
        repo info 
        */
        const cacheData = checkCache(cache, projectName);

        return cacheData ? cacheData[0] : {
            title: "A Github Project by Tanner",
            desc: "This project was created by @tannerdolby",
            stargazers: 0,
            subscribers: 0,
            forks: 0,
            issues: 0,
            stargazers_url: githubUrl,
            homepage: githubUrl,
            repo_url: githubUrl
        }
    }         
}

module.exports = async function() {
    const apiUrl = "https://api.github.com/repos/tannerdolby";

    try {
        let repos = repoUrls;
        // Read the existing local file cache
        let cache = JSON.parse(fs.readFileSync(cachedReposPath, "utf8"));

        // Fetch repo object from GitHub API and update existing cache
        // or if API call fails, use existing cached repo data
        repos = repos.map(async (repo) => {
            return await fetchAndStoreData(`${apiUrl}/${repo}`, repo, cache);
        });

        return await Promise.all(repos);

    } catch (e) {
        console.log("Error returning multiple projects cached API data", e);
    } 
};
