// HTML collections for direct link heading/anchor pairs
let headingList = document.getElementsByClassName("dir-link");
let directLinkList = document.getElementsByClassName("direct-link");

// iterate the HTML collection and apply the direct link color change for touchstart event (iOS, safari, iphone)


function touchStart() {
    // Iterate over the heading HTML collection
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


// add touchstart event to headings 
Array.prototype.forEach.call(headingList, (heading) => {
    heading.addEventListener("touchstart", () => {
        touchStart();
    });
    heading.addEventListener("touchend", () => {
        touchLeave();
    });
});

