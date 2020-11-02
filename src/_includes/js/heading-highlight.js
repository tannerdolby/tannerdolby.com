// Get all <h2> , <h3> and <h4> tags for direct links
const headerArr = [...document.getElementsByClassName("post-heading")]; // converting the iterable collection to an array

function uniqueID(id) {
    return id.toLowerCase().split(" ").join("_");
};


headerArr.forEach(heading => {
    const permalink = document.createElement("a");
    permalink.setAttribute("class", "direct-link");
    permalink.innerText = "#";

    switch(heading.tagName) {
        case "H2":
            heading.setAttribute("class", "h2-5");
            break;
        case "H3":
            heading.setAttribute("class", "h3");
            break;
        case "H4":
            heading.setAttribute("class", "h4");
            break;
        default:
            break;
    }

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