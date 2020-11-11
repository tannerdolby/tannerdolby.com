const htmlBlocks = document.getElementsByClassName("language-html");
const yamlBlocks = document.getElementsByClassName("language-yaml");
const jsonBlocks = document.getElementsByClassName("language-json");

/**
 * Returns code snippets with a tabindex added.
 * 
 * @param {HTMLCollection} collection The HTML collection containing pre tags.
 * @returns {HTMLElement} The code snippet with a tabindex=0 attribute added.
 */
function addsTabIndex(collection) {
    var collection = document.getElementsByTagName('pre'); // instead of filtering, pre tags are in nodeList
    Array.prototype.forEach.call(collection, function(item) {
        return item.setAttribute("tabindex", "0");
    });
}

addsTabIndex(htmlBlocks);
addsTabIndex(yamlBlocks);
addsTabIndex(jsonBlocks);