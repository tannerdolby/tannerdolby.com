const closeBtn = document.querySelector(".pop-over .close");
const popover = document.querySelector(".pop-over");

function close() {
    popover.setAttribute("aria-hidden", "true");
    popover.classList.add("hide");
}

closeBtn.addEventListener("click", close);