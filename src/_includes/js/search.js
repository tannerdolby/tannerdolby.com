/* 
*   Creating Search Functionality for a static site
* 
*   1. Try out my idea with custom data attributes (works!)
*   2. Try Phil Hawksworths article from the eleventy tutorials section (haven't read yet)
*
*/

const placeholder = document.querySelector(".result");
const res = document.createElement("p");
const searchMsg = document.createElement("p");
const clearSearch = document.createElement("a");

clearSearch.innerText = "Clear search";
clearSearch.setAttribute("class", "clear-filter-btn");
clearSearch.setAttribute("href", "/search/");

// grab blog posts on document and convert HTMLCollection to an Array with the spread operator
const posts = [...document.getElementsByClassName("post")];

// grab search bar to add keyup and click event handlers
const searchBar = document.getElementById("search");

/**
 * Returns the text entered into an input search bar and injects it into an HTML element.
 * @param {Event} e The `input` event to capture user input to search bar.
 * @retun {String} The text content user inputs to search.
 */
function getInput(e) {
    return e.target.value;
}

searchBar.addEventListener("input", (e) => {
    let userInput = getInput(e);

    let searchQuery = [];
    searchQuery.push(userInput.toLowerCase());

    // posts with title that matches each character in search query
    const matchingPost = posts.filter(post => {
        const title = post.dataset.postTitle;
        return title.toLowerCase().includes(searchQuery);
    });

    // posts with title that does not match the search query
    const nonMatchingPost = posts.filter(post => {
        const title = post.dataset.postTitle;
        return !title.toLowerCase().includes(searchQuery);
    });
    
    // if there is a matching post then hide non-matching posts
    if (matchingPost) {
        nonMatchingPost.forEach(post => {
            post.classList.add("sr-only");
            post.setAttribute("aria-hidden", "true");
        });
    }

    // if the matching post is hidden from a previous query 
    // and matches search query, show it
    matchingPost.forEach(post => {
        if (post.classList.value.includes("sr-only")) {
            post.classList.remove("sr-only");
            post.removeAttribute("aria-hidden");
        }
    });

    if (userInput === "") {
        placeholder.setAttribute("class", "sr-only");
    } else {
        placeholder.classList.remove("sr-only");
        placeholder.classList.add("search-result");
        res.innerText = `${matchingPost.length} result for posts matching "${userInput}"`;
        placeholder.appendChild(res);
        placeholder.appendChild(clearSearch);
    }
});