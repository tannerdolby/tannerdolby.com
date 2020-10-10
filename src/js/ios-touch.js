// HTML collections for direct link heading/anchor pairs
let headingList = document.getElementsByClassName("dir-link");
let directLinkList = document.getElementsByClassName("direct-link");

// Iterate over the HTML collection and apply the direct link color change on touchstart event (iOS, safari, iphone)

function touchStart() {
    Array.prototype.forEach.call(headingList, (heading) => {
        var links = heading.childNodes[1];
        links.style.color = "#444 !important";
    });
};

function touchLeave() {
    Array.prototype.forEach.call(headingList, (heading) => {
        var links = heading.childNodes[1];
        links.style.color = "transparent !important";
    });
}

Array.prototype.forEach.call(headingList, (heading) => {
    
    heading.addEventListener("click", touchLeave, false);
    heading.addEventListener("mouseover", touchStart, false);
    heading.addEventListener("mouseleave", touchLeave, false);
    
    // Handling iOS/iPhone :hover for touch event 
    heading.addEventListener("touchstart", touchStart, false);
    heading.addEventListener("touchend", touchLeave, false);
});