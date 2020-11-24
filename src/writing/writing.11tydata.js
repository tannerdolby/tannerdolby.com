// come back and create table of contents from direct links

module.exports = {
    type: "post",
    eleventyComputed: {
        title: data => data.title,
        subheadings: (data) => {
            const posts = data.collections.posts;

            let arr = [];

            for (const post of posts) {
                // returns markdown file contents
                const markdownContent = post.template.frontMatter.content;
                
                const postData = post.template.frontMatter; // returns an object { content: 'markdown content' and data: { title: ..}

                // match headings 
                const headings = markdownContent.match(/[##]+/gm) || [];
                arr.push({
                    title: postData.data.title,
                    url: postData.data.permalink,
                    heading: [...headings]
                });
                console.log(arr);
                return arr;
            }

            console.log(arr);
            return arr;
            
        }
    }
}