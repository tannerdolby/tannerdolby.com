const post = document.querySelector("#post");
// console.log(post);

const headings = [...document.getElementsByClassName("post-heading")];
console.log(headings);

let stack = [];

function getHeadings(collection) {
    let arr = [];
    collection.forEach(heading => {
        let headingData = {
            
        }
    });
}

let help = headings.forEach(item => {
    let data = {
        "title": item.textContent,
        "id": item.id,
        "href": `#${item.id}`
    }
    stack.push(data);
    return stack;
});
// console.log(helper.title);
// stack.push(helper.title);

console.log(headers);
const div = document.createElement("div");
div.setAttribute("class", "table-of-contents");

const ul = document.createElement("ul");

div.appendChild(ul);