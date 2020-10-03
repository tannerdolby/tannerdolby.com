// grab .chevron-right selector
const chev_right = document.querySelector(".chevron-right");
const see_more_btn = document.querySelector(".see-more-btn");

see_more_btn.addEventListener("mouseover", () => {
    chev_right.classList.toggle("slide-right");
});

see_more_btn.addEventListener("mouseout", () => {
    chev_right.classList.toggle("slide-right");
});
