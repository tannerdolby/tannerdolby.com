const headingList = [...document.getElementsByClassName("post-heading")];
const links = document.getElementsByClassName("direct-link");

function touch(color) {
    headingList.forEach(heading => {
        var links = heading.childNodes[1];
        links.style.color = color;
    });
}

headingList.forEach(heading => {
    // Handling iOS/iPhone :hover for touch event 
    heading.addEventListener("touchstart", touch("#444 !important"), false);
    // fixes :hover issue on iPhone/safari for direct links in article (scroll each heading to toggle the link)
    heading.addEventListener("touchmove", touch("transparent !important"), false);
    heading.addEventListener("touchend", touch("transparent !important"), false);
});
