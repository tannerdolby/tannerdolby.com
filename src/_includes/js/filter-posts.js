// convert iterable object (NodeList) to array using the ... spread operator
const allPosts = [...document.querySelectorAll(".post")];

// search the location (broswer window) to search the URL for ?filter=tag 
// use slice to grab only the characters after the equal sign ie (=nunjucks)
const postTag = location.search.slice(location.search.indexOf("=") + 1);

const postList = document.querySelector(".my-posts");
const filterMsg = document.createElement("p");
const clearBtn = document.createElement("a");
const listItem = document.createElement("li");

filterMsg.setAttribute("class", "filter-msg")
clearBtn.innerText = "Clear";
clearBtn.setAttribute("class", "clear-filter-btn");
clearBtn.setAttribute("href", "/writing/");

if (postTag) {

    // filter the posts nodelist for posts without the searched tag
    let postsWithoutTag = allPosts.filter(post => {
        return JSON.parse(post.dataset.tags).includes(postTag) === false;
    });

    // posts with tag (no use for now)
    let postsWithTag = allPosts.filter(post => {
        return JSON.parse(post.dataset.tags).includes(postTag);
    });

    // visually hide the elements not meeting tag query and 
    // hide them from the accessibility API with aria-hidden=true
    // so screen readers don't read content that should be hidden
    postsWithoutTag.forEach(post => {
        post.setAttribute("aria-hidden", "true");
        post.setAttribute("class", "sr-only");
    });

    if (postsWithTag && postsWithTag.length === 1) {
        filterMsg.innerText = `${postsWithTag.length} post tagged "${postTag}"`;
    } else {
        filterMsg.innerText = `${postsWithTag.length} posts tagged "${postTag}"`;
    }
    
    listItem.append(filterMsg);
    filterMsg.append(clearBtn);
    postList.prepend(listItem);
}