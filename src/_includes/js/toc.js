const post = document.querySelector("#post");
const headings = [...document.getElementsByClassName("post-heading")];
let stack = [];

let help = headings.forEach(item => {
    let data = {
        "title": item.textContent,
        "id": item.id,
        "href": `#${item.id}`
    }
    stack.push(data);
    return stack;
});

const div = document.createElement("div");
div.setAttribute("class", "table-of-contents");

const ul = document.createElement("ul");

div.appendChild(ul);