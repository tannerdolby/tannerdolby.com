let urlParams = new URLSearchParams(window.location.search); // search?post=splat
let searchBarQuery = urlParams.get("post");

const placeholder = document.querySelector(".result");
const res = document.createElement("p");
const searchMsg = document.createElement("p");
const clearSearch = document.createElement("a");

clearSearch.innerText = "Clear";
clearSearch.setAttribute("class", "clear-filter-btn");
clearSearch.setAttribute("href", "/search/");

// grab blog posts on document and convert HTMLCollection to an Array with the spread operator
const posts = [...document.getElementsByClassName("post")];
const hiddenPosts = [...document.querySelectorAll("article.sr-only")];

// grab search bar to add keyup and click event handlers
const searchBar = document.getElementById("search");

/* Sidebar search functionality */
if (searchBarQuery !== null) {
    console.log(searchBarQuery);
    const posts = [...document.querySelectorAll("article.post")];

    let matchingPosts = posts.filter(p => {
        return p.dataset.postTitle.toLowerCase().includes(searchBarQuery.toLowerCase());
    });

    let nonMatchingPosts = posts.filter(p => {
        return !p.dataset.postTitle.toLowerCase().includes(searchBarQuery.toLowerCase());
    });

    matchingPosts.forEach(p => {
        p.classList.remove("sr-only"); 
        p.removeAttribute("aria-hidden");
    });
    nonMatchingPosts.forEach(p => {
        p.classList.add("sr-only");
        p.setAttribute("aria-hidden", "true");
    });

    if (matchingPosts.length === 1) {
        placeholder.classList.remove("sr-only");
        placeholder.classList.remove("result");
        placeholder.classList.add("search-result");
        res.textContent = `${matchingPosts.length} result for posts matching "${searchBarQuery}"`;
    } else {
        placeholder.classList.remove("sr-only");
        placeholder.classList.add("search-result");
        res.textContent = `${matchingPosts.length} results for posts matching "${searchBarQuery}"`;

    }
    placeholder.appendChild(res);
    placeholder.appendChild(clearSearch);
}

/**
 * Returns the text entered into an input search bar and injects it into an HTML element.
 * @param {Event} e The `input` event to capture user input to search bar.
 * @retun {String} The text content user inputs to search.
 */
function getInput(e) {
    return e.target.value;
}

// handles typing directly into search bar on search page
searchBar.addEventListener("input", (e) => {
    let userInput = getInput(e);

    let searchQuery = [];
    searchQuery.push(userInput.toLowerCase());

    // posts with title that matches each character in search query
    const matchingPost = posts.filter(post => {
        const title = post.dataset.postTitle;
        const tags = post.dataset.tags;
        return title.toLowerCase().includes(searchQuery) || tags.includes(searchQuery);
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
        if (matchingPost.length === 1) {
            res.textContent = `${matchingPost.length} result for posts matching "${userInput}"`;
        } else {
            res.textContent = `${matchingPost.length} results for posts matching "${userInput}"`;
        }
        placeholder.appendChild(res);
        placeholder.appendChild(clearSearch);
    }
});