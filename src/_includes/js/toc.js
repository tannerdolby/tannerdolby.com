const plusBtn = document.querySelector(".unfold-toc");
const tocList = document.querySelector(".toc-links");
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