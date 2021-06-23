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


// Use IntersectionObserver for table of contents progress
// window.addEventListener("DOMContentLoaded", () => {
//     const link = document.querySelector(".toc li a");
//     const observer = new IntersectionObserver(headings => {
//         headings.forEach(heading => {
//             const id = heading.target.getAttribute("id");

//             console.log(heading.intersectionRatio);
//             console.log(heading.isIntersecting);
//             if (heading.intersectionRatio > 0) {
//                 //console.log(heading, "GOT ME");
//                 var e = document.querySelector(`.toc-link a[href="#${id}"]`);
//                 e.classList.add("section-active");
//             } else if (heading.isIntersecting) {
//                 console.log("ha");
//             } else {
//                 var e = document.querySelector(`.toc-link a[href="#${id}"]`);
//                 //e.classList.remove("section-active");
//             }
//         })
//     })
//     // track all headings on posts layout with an id attribute
//     const el = document.querySelectorAll(".post-heading[id]");
//     el.forEach(heading => {
//         observer.observe(heading);
//     });
// });

// window.addEventListener('DOMContentLoaded', () => {

//     const observer = new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         const id = entry.target.getAttribute('id');
//         if (entry.intersectionRatio > 0) {
//           document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active');
//         } else {
//           document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active');
//         }
//       });
//     });
  
