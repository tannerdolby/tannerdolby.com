const post = document.querySelector("#post");
// console.log(post);

const headings = [...document.getElementsByClassName("post-heading")];
console.log(headings);

let stack = [];
const helper = headings.forEach(item => {
    let data = {
        "title": item.textContent,
        "id": item.id,
        "href": `#${item.id}`
    }
    return data;
});
// console.log(helper.title);
// stack.push(helper.title);

console.log(stack);

const div = document.createElement("div");
div.setAttribute("class", "table-of-contents");

const ul = document.createElement("ul");

div.appendChild(ul);

// headings.forEach(item => {
//     console.log(item);
//     const li = document.createElement("li");
//     const link = document.createElement("a");
//     ul.appendChild(li);
//     li.appendChild(link);
//     link.appendChild(item);
//     post.appendChild(div);
// });


