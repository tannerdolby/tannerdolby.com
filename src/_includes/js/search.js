/* 
*   Attempting to create a search future
* 
*   1. Try out my idea with data tags and window.search
*   2. Use Phil Hawksworths article from the eleventy tutorials section
*
*/

// TODO - Figure out how to compare user input in search bar in .contains("p") for keyup to hide posts
/* ---------- Tanner's Method --------- */

// get the posts on the page
const posts = [...document.getElementsByClassName("post")];

/**
 * 
 * @param {Array} postsArr The array of blog posts <article>'s
 * @return {Object} The data from each article 
 */
function getData(postsArr) {
    postsArr.forEach((post) => {
        // clean up title key for search purposes
        const cleanTitle = post.dataset.postTitle.toLowerCase().replace(/\s+/g, "").split("");
        const data = {
            title: post.dataset.postTitle,
            searchTitle: cleanTitle,
            tags: post.dataset.tags
        };
    });
}
// getData(posts);

/* Use the Location interface to search the URL stored in Location.href
*   grab the URL and search the data-post-title attribute 
*   by using ?filter=Some blog post
*/
const url = location.href;
const query = location.search.slice(location.search.indexOf("=") + 1);

// grab search bar to add keyup and click event handlers
const searchBar = document.querySelector(".search-bar");

function check(a) {
    const posts = [...document.getElementsByClassName("post")];
    posts.forEach((post, index) => {
        const data = {
            title: post.dataset.postTitle,
            searchTitle: post.dataset.postTitle.toLowerCase().replace(/\s+/g, "").split(""),
            tags: post.dataset.tags
        };
        if (a === data.searchTitle[index]) {
            console.log("match" + a);
        }
    });
};

// searchBar.addEventListener("keyup", (e) => {
//     check(e.key);
// });

const log = document.getElementById("log");

function logInput(e) {
    let postsWithMatch = posts.filter(post => {
        return post.dataset.postTitle.toLowerCase().replace(/\s+/g, "").split("").includes(`${log.textContent}`);
    });
    
    let postsWithoutMatch = posts.filter(post => {
        return post.dataset.postTitle.toLowerCase().replace(/\s+/g, "").split("").includes("p") === false;
    });
    return log.innerText += e.key;
}

// keyup event listener
searchBar.addEventListener("keypress", logInput);

const input = log.textContent;
const regex = new RegExp(/[Enter]+/, "gm");

// console.log(log.innerText);

// console.log(postsWithMatch["0"]);
// console.log(postsWithMatch["1"]);
// console.log(postsWithMatch);
// console.log(postsWithoutMatch);

// If search query is used
// if (query) {
//     
// }


/* ---------- END Tanner's Method --------- */

/* --- Method Two by Phil ---- */



/* --- END Phil's Method ----- */

