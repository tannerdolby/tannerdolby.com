const pre = document.querySelectorAll("pre[class*=language-]");

console.log(pre);

pre.forEach((pre, index) => {
    const text = pre.childNodes[0].innerHTML;
    
});

function isClipboardSupported() {
    // Clipboard Web API (Supported everywhere but IE)
    const clipboard = navigator.clipboard;

    if (!clipboard) {
        console.log("Error! Clipboard Web API is not supported in your current browser.");
        return;
    }

    
}
