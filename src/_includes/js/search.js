/* 
*   Creating Search Functionality for a static site
* 
*   1. Try out my idea with custom data attributes 
*   2. Use Phil Hawksworths article from the eleventy tutorials section
*
*/

// did it :) 
/* ---------- Tanner's Method --------- */

// get the posts on the page
const posts = [...document.getElementsByClassName("post")];

// grab search bar to add keyup and click event handlers
const searchBar = document.querySelector(".search-bar");
const log = document.querySelector(".log");
var count = false;

/**
 * Returns the specific key from keyboard event.
 * 
 * @param {Event} e The keyboard event.
 * @returns {String} The keyboard character pressed.
 */
function logInput(e) {
    const data = {
        which: e.which,
        keyCode: e.keyCode,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        key: e.key
    }
    // Switch statement to sanitize user input for search query
    switch (data.which) {
        // Backspace key (delete on macOS keyboard)
        case 8: {
            data.key = "";
            break;
        }
        // Shift key
        case 16: {
            data.key = data.key.slice(5);
            break;
        }
        // Control Key
        case 17: {
            data.key = data.key.slice(7);
            break;
        }
        // Alt key
        case 18: {
            data.key = data.key.slice(3);
            break;
        }
        // Tab key
        case 9: {
            data.key = "";
            break;
        }
        // Enter key
        case 13: {
            data.key = "";
            break;
        }
        // Command key
        case 91: {
            data.key = "";
            break;
        }
        default: {
            data.key;
            break;
        }
    }

    return log.textContent += data.key;
}

function capture(e) {
    return log.textContent = e.target.value;
}
/*
searchBar.addEventListener("keyup", (e) => {
    // inject user input to search query
    logInput(e);

    var searchQuery = [];
    searchQuery.push(log.textContent.toLowerCase());

    const posts = [...document.getElementsByClassName("post")];

    // posts with title that matches a character in search input
    const matchingPost = posts.filter((post) => {
        return post.dataset.postTitle.toLowerCase().includes(searchQuery["0"]);
    });
    const nonMatchingPost = posts.filter((post) => {
        return post.dataset.postTitle.toLowerCase().includes(searchQuery["0"]) === false;
    });
    
    if (matchingPost) {
        nonMatchingPost.forEach(post => post.classList.toggle("sr-only"));
    } else {
        nonMatchingPost.forEach(post => post.classList.add("sr-only"));
    }

    // If backspace pressed, remove character from end of query string
    if (e.which === 8) {
        searchQuery["0"], log.textContent = searchQuery["0"].slice(0, searchQuery["0"].length - 1);
    } 

    console.log(searchQuery["0"]);
});
*/
searchBar.addEventListener("input", (e) => {
    // Grab blog posts on document and convert HTMLCollection to an Array with the spread operator
    const posts = [...document.getElementsByClassName("post")];

    // inject user input to search query
    log.innerHTML = e.target.value;

    var searchQuery = [];
    searchQuery.push(log.innerHTML.toLowerCase());

    // posts with title that matches each characte in search query
    const matchingPost = posts.filter((post) => {
        return post.dataset.postTitle.toLowerCase().includes(searchQuery);
    });
    const nonMatchingPost = posts.filter((post) => {
        return post.dataset.postTitle.toLowerCase().includes(searchQuery) === false;
    });
    
    if (matchingPost) {
        nonMatchingPost.forEach(post => post.classList.add("sr-only"));
    }

    if (!matchingPost) {
        nonMatchingPost.forEach(post => post.classList.remove("sr-only"));
    }

    // If post hidden for previous query, show it
    matchingPost.forEach(post => {
        if (post.classList.value.includes("sr-only")) {
            post.classList.remove("sr-only");
        }
    });
});