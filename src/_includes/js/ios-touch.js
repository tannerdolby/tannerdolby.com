// HTML collections for direct link heading/anchor pairs
const headingList = [...document.getElementsByClassName("post-heading")];
const links = document.getElementsByClassName("direct-link");

// console.log(headingList);


// headingList.forEach(item => {
//     console.log([...item.getElementsByTagName("a")]);

// });

// Iterate over the HTML collection and apply the direct link color change on touchstart event (iOS, safari, iphone)

// function touchStart() {
//     headingList.forEach(heading => {
//         var links = heading.childNodes[1];
//         links.style.color = "#444 !important";
//     });
// };

// function touchLeave() {
//     headingList.forEach(heading => {
//         var links = heading.childNodes[1];
//         links.style.color = "transparent !important";
//     });
// }

/*
headingList.forEach(heading => {
    
    // Handling iOS/iPhone :hover for touch event 
    heading.addEventListener("touchstart", touchStart, false);
    
    // fixes :hover issue on iPhone/safari for direct links in article (scroll each heading to toggle the link)
    heading.addEventListener("touchmove", touchLeave, false);
    heading.addEventListener("touchend", touchLeave, false);
});
*/