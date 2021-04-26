const searchInput = document.querySelector(".side-search");
let search = "";

function isActive(element) {
    return element === document.activeElement;
}

searchInput.addEventListener("input", (e) => {
    search = e.target.value;
    if (isActive(searchInput)) {
        searchInput.addEventListener("keyup", (e) => {
            if (e.keyCode === 13) {
                window.location.href = `/search?post=${search}`;
            }
        });
    }
});