// come back and create table of contents from direct links

module.exports = {
    layout: "post.njk",
    type: "post",
    eleventyComputed: {
        title: data => data.title
    }
}