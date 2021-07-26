// Get all <h2>, <h3> and <h4> .. <h6> tags for direct links
const headers = [...document.getElementsByClassName("post-heading")]; // converting the iterable collection to an array

/**
 * Returns a slugified unique ID string.
 * 
 * @param {String} id The string used to generate a unique ID.
 * @returns {String} The unique slug.
 */
function uniqueId(id) {
    return removeChars(id).toLowerCase().split(" ").join("-");
};

/* Grab <code><a>..</a></code> */
function grabCodeLinks() {
    [...document.querySelectorAll("#post a")].filter(node => {
        return node.childNodes[0].nodeName === "CODE";
    }).map(node => {
        node.setAttribute("class", "code-link") 
        return node;
    });
}

grabCodeLinks();

/**
 * Removes any whitespace or non-word characters from 
 * manually created id attributes for a subheading.
 * 
 * @param {String} id The manually created id value from HTML element. 
 * @returns {String} The ID with unwanted characters removed.
 */
function uniqueId(id) {
    const regex = new RegExp(/[\s\W]+/, "gm");
    let unique = id.toLowerCase().replace(regex, " ").split(" ").join("-");
    if (unique[unique.length - 1] === "-") {
        unique = unique.substr(0, unique.length - 1);
    }
    return regex.test(id) ? unique : id.toLowerCase();
}

function headingHighlight(headerArr) {
    headerArr = headerArr.map(heading => {
        const permalink = document.createElement("a");
        let id = "";
        permalink.setAttribute("class", "direct-link");
        permalink.textContent = "#";

        if (heading.id) {
            id = uniqueId(heading.id);
            heading.setAttribute("id", `${id}`);
            permalink.setAttribute("href", `#${id}`);
            heading.append(permalink);
        } else {
            id = uniqueId(heading.textContent);
            heading.setAttribute("id", `${id}`);
            permalink.setAttribute("href", `#${id}`);
            heading.append(permalink);
        }

        // add class to signal highlighting has started
        // and ready for toc.js to grab the subheadings from DOM
        heading.classList.add("toc-process");

        let dupeIds = [...document.querySelectorAll(`#${uniqueId(id)}`)];

        if (dupeIds.length > 1) {
            dupeIds = dupeIds.map((node, index) => {
                if (index !== 0) {
                    node.setAttribute("id", `${id}-${index}`);
                    permalink.setAttribute("href", `#${id}-${index}`);
                }
                return node;
            });
        }

        // Set class names to handle font-sizing
        switch(heading.tagName) {
            case "H2":
                heading.classList.add("h2-5");
                break;
            case "H3":
                heading.classList.add("h3");
                break;
            case "H4":
                heading.classList.add("h4");
                break;
            case "H5":
                heading.classList.add("h5");
            default:
                break;
        }
        return heading;
    });
}

headingHighlight(headers);
