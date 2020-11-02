const headerCollection = document.getElementsByTagName("h2"); // an iterable HTML collection

// Get all <h2> , <h3> and <h4> tags for direct links
const headerArr = [...document.getElementsByClassName("post-heading")]; // converting the iterable collection to an array

function uniqueID(id) {
    return id.toLowerCase().split(" ").join("_");
};


headerArr.forEach(heading => {
    const permalink = document.createElement("a");
    permalink.setAttribute("class", "direct-link");
    permalink.innerText = "#";
    heading.setAttribute("class", "h2-5");

    if (heading.id) {
        var id = uniqueID(heading.id);
        permalink.setAttribute("href", `#${id}`);
        heading.append(permalink);
    } else {
        var id = uniqueID(heading.innerText);
        heading.setAttribute("id", `${id}`);
        permalink.setAttribute("href", `#${id}`);
        heading.append(permalink);
    }
});