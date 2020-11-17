/* 
*   Creating Search Functionality for a static site
* 
*   1. Try out my idea with custom data attributes 
*   2. Use Phil Hawksworths article from the eleventy tutorials section
*
*/

/* ---------- Tanner's Method (turned out really nice :])--------- */

// grab blog posts on document and convert HTMLCollection to an Array with the spread operator
const posts = [...document.getElementsByClassName("post")];

// grab search bar to add keyup and click event handlers
const searchBar = document.getElementById("search");
const log = document.querySelector(".log");

/**
 * Returns the text entered into an input search bar and injects it into an HTML element.
 * @param {Event} e The `input` event to capturecharacters entered into input field.
 * @retun {String} The text content injected into whatever element you choose.
 */
function capture(e, element) {
    return element.textContent = e.target.value;
}

searchBar.addEventListener("input", (e) => {
    // inject user input to HTMLElement to add into search query
    capture(e, log);

    var searchQuery = [];
    searchQuery.push(log.innerHTML.toLowerCase());

    // posts with title that matches each character in search query
    const matchingPost = posts.filter((post) => {
        return post.dataset.postTitle.toLowerCase().includes(searchQuery);
    });

    // posts with title that does not match the search query
    const nonMatchingPost = posts.filter((post) => {
        return !post.dataset.postTitle.toLowerCase().includes(searchQuery);
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
});