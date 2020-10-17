const allPosts = document.querySelectorAll(".post");
console.log(allPosts); // Nodelist of article.post elements

/* Get the post tag from the location interface using .search
console.log(location.host);
console.log(location.href);
console.log(allPosts["0"].dataset.tags); // gets the tags ["html", "javascript"] from the dataset stringmap
*/

// search the location (broswer window) to search the URL for filter?=tag 
// use slice to grab only the characters after the equal sign ie (=nunjucks)
const postTag = location.search.slice(location.search.indexOf("=") + 1);

const postList = document.querySelector(".my-posts");
const searchMsg = document.createElement("p");
const clear = document.createElement("a");

if (postTag) {
    // filter the posts nodelist for posts without the searched tag
    let postsWithoutTag = Array.prototype.filter.call(allPosts, function(post) {
        return JSON.parse(post.dataset.tags).includes(postTag) === false;
    });

    // posts with tag (no use for now)
    let postsWithTag = Array.prototype.filter.call(allPosts, function(post) {
        return JSON.parse(post.dataset.tags).includes(postTag);
    });

    if (postsWithTag.length === 1) {
        searchMsg.innerText = `${postsWithTag.length} post tagged with ${postTag}`;
    } else {
        searchMsg.innerText = `${postsWithTag.length} posts tagged with ${postTag}`;
    }

    //searchMsg.innerText = `${postsWithTag.length} posts tagged with ${postTag}`;
    postList.prepend(searchMsg);

    // visually hide the elements not meeting tag query
    postsWithoutTag.forEach(post => {
        post.setAttribute("hidden", true);
    });
}