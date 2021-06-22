const subheadingArr = [...document.querySelectorAll(".toc-process")];
const tocWrap = document.querySelector(".toc");
const ul = document.createElement("ul");
const h2 = document.createElement("h2");
const showBtn = document.createElement("button");
const postTitle = document.getElementById("post-title");
const postDate = document.querySelector("#post-content .date");
const sidebar = document.querySelector(".post-sidebar");
const wrapper = document.createElement("div");

wrapper.setAttribute("class", "row");
ul.setAttribute("class", "toc-links");
showBtn.setAttribute("class", "unfold-toc");
h2.setAttribute("class", "toc-heading");
h2.textContent = "Table of contents";
showBtn.textContent = "+";

subheadingArr.forEach(heading => {
    const link = document.createElement("a");
    const li = document.createElement("li");
    li.setAttribute("class", "toc-link");
    link.textContent = heading.textContent.substr(0, heading.textContent.length - 1);
    link.setAttribute("href", `#${heading.id}`);
    li.appendChild(link);
    ul.appendChild(li);
});

wrapper.appendChild(h2);
wrapper.appendChild(showBtn);
tocWrap.appendChild(wrapper);
tocWrap.appendChild(ul);

// Unfolding TOC
const plusBtn = document.querySelector(".unfold-toc");
const tocList = document.querySelector(".toc ul");

// If toc is super long just hide it and let 
// users choose to display it, I wasn't very 
// aware in my first blog posts of how many section headings
// exist so this will help clean up things when that happens
const tocLinks = [...document.querySelectorAll(".toc-links li")];

if (tocLinks.length >= 9) {
    sidebar.querySelector(".toc-links").classList.add("hide");
    plusBtn.style.visibility = "visible";
}

function unfold() {
    if (!tocList.classList.contains("show-toc")) {
        plusBtn.style.transform = "rotate(45deg)";
        tocList.classList.add("show-toc");
    } else {
        plusBtn.style.transform = "rotate(0)";
        tocList.classList.remove("show-toc");
    }
}
plusBtn.addEventListener("click", unfold);
