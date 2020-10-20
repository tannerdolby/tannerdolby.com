---

title: Create a Custom Collection in 11ty
desc: styff

---

If you've built sites with Eleventy (11ty) before, you are probably familiar with [collections](). Using collections is a great feature to show blog posts on your site. If your blog posts are written inside of markdown files, you can give each file the `tags` key as front matter data to create a collection. Front matter in 11ty is placed inside opening and closing document seperators `---`. The two markdown files `post-one.md` and `post-two.md` will be the articles contained in the `posts` collection.

{% filename "post-one.md" %}
```
---
title: Blog post one
permalink: "/posts/{{ title | slug }}"
tags: posts
---
```

{% filename "post-two.md" %}
```
---
title: Blog post two
permalink: "/posts/{{ title | slug }}"
tags: posts
---
```

Now that both of the blog posts have been given the `posts` tag. They can be easily accessed from the `posts` collection in the following way,

```html

{% for post in collections.posts %}
    <a href="{{ page.url }}">{{ post.data.title }}</a>
{% endfor %}
```

This would iterate over the `posts` collection and access the front matter data `title` to create a link to each blog post.

- `<a href="/posts/blog-post-one/">Blog post one</a>`
- `<a href="/posts/blog-post-two/">Blog post two</a>`

If you wanted to include markdown from posts in the collection you can use {% raw %}`{{ content | safe }}`{% endraw %}.

## Handling multiple tags

One way to create a new collection is simply by giving a `.md` file some front matter data, particularly the `tags` key. This method has been demonstrated above to access the `posts` collection.

What if you have multiple tags you wish to include for posts, such as `html`, `css`, `js`. You will add each tag to the `tags` key as a list of values. 

```
---
tags: 
    - html
    - css
    - js
---
```

This is where creating a [custom collection]() comes in handy. Instead of including the `posts` tag in the `tags` list for every blog post (which is annoying), just create a custom collection inside the `.eleventy.js` file and omit `posts` from the tags list within front matter data. 


All blog posts in this article are saved as `.md` files within the `/posts/` directory. To create a custom collection within `.eleventy.js` you will utilize the first argument of the config function `eleventyConfig` to call the API and use `addCollection` to create a new custom collection.

{% filename ".eleventy.js" %}
```js
module.exports = function(eleventyConfig) {
    eleventyConfig.addCollection("posts", function(collection) {

    });
}
```