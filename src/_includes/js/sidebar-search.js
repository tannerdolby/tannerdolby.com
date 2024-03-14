let searchInput = document.querySelector(".side-search");
let search = "";

function isActive(element) {
    return element === document.activeElement;
}

searchInput.addEventListener("input", (e) => {
    search = e.target.value;
    if (isActive(searchInput)) {
        searchInput.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                window.location.href = `/search/?post=${search}`;
            }
        });
    }
});