const subheadingArr = [...document.querySelectorAll(".toc-process")];
const tocWrap = document.querySelector(".toc");
const ul = document.createElement("ul");
const h2 = document.createElement("h2");
const showBtn = document.createElement("button");

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

tocWrap.appendChild(h2);
tocWrap.appendChild(showBtn);
tocWrap.appendChild(ul);

// Unfolding TOC
const plusBtn = document.querySelector(".unfold-toc");
const tocList = document.querySelector(".toc ul");

function unfold() {
    tocList.classList.toggle("show-toc");
    if (plusBtn.textContent === "-") {
        plusBtn.textContent = "+";
    } else {
        plusBtn.textContent = "-";
    }
}
plusBtn.addEventListener("click", unfold);