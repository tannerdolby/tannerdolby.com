// come back and create table of contents from direct links

module.exports = {
    type: "post",
    eleventyComputed: {
        title: data => data.title,
        subheadings: (data) => {
            // to be continued (using client-side js for this now)
            const posts = data.collections.posts;

            let arr = [];

            for (const post of posts) {
                // returns markdown file contents
                const markdownContent = post.template.frontMatter.content;
                
                const postData = post.template.frontMatter; // returns an object { content: 'markdown content' and data: { title: ..}

                arr.push({
                    title: post.data.title,
                    url: postData.data.permalink,
                    heading: "test"
                });

                return arr;
            }
        }
    }
}