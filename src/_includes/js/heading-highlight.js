// Get all <h2>, <h3> and <h4> tags for direct links
const headers = [...document.getElementsByClassName("post-heading")]; // converting the iterable collection to an array

/**
 * Returns a unique ID string.
 * 
 * @param {String} id The string used to generate a unique ID.
 * @returns {String} The unique ID string.
 */
function uniqueID(id) {
    return id.toLowerCase().split(" ").join("_");
};

/**
 * Removes any whitespace or non-word characters from 
 * manually created id attributes for a sub heading.
 * 
 * @param {String} id The manually created id value from HTML element. 
 * @returns {String} The ID with unwanted characters removed.
 */
function removeChars(id) {
    const regex = new RegExp(/[\s\W]+/, "gm");
    return regex.test(id) ? id.replace(regex, " ") : id;
}

/**
 * Adds a direct permalink to sub heading tags.
 * 
 * @param {Array} headerArr The array of sub headings.
 * @returns The highlighted sub headings and creates a direct permalink.
 */
function headingHighlight(headerArr) {
    headerArr.forEach(heading => {
        const permalink = document.createElement("a");
        permalink.setAttribute("class", "direct-link");
        permalink.innerText = "#";
    
        if (heading.id) {
            var id = uniqueID(removeChars(heading.id));
            heading.setAttribute("id", `${id}`);
            permalink.setAttribute("href", `#${id}`);
            heading.append(permalink);
        } else {
            var id = uniqueID(heading.innerText);
            heading.setAttribute("id", `${id}`);
            permalink.setAttribute("href", `#${id}`);
            heading.append(permalink);
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
            default:
                break;
        }
    });
}

headingHighlight(headers);

// module.exports = {
//     headingHighlight,
//     uniqueID,
//     removeChars
// }