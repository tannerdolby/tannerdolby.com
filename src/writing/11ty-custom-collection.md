---

title: Create a Custom Collection with Eleventy
date: 2020-10-31
datetime: 2020-10-31 00:00:00 Z
preview: "If you've built sites using Eleventy, you're probably familiar with collections. Using the Configuration API allows for creating custom collections which can be useful to only show certain posts on your site."
tags: 
    - eleventy
    - nunjucks
    - html
permalink: "/writing/{{ title | slug }}/"
---

If you've built sites using Eleventy before, you're probably familiar with [collections](https://www.11ty.dev/docs/collections/). Collections are a great feature to show blog posts on your site. If your posts are written inside of markdown files, you can give each post the `tags` key as front matter data to create a collection. 

Front matter in 11ty is placed inside opening and closing document seperators `---` and uses YAML syntax. Two markdown files `post-one.md` and `post-two.md` will be the blog posts contained in the `posts` collection.

{% filename "post-one.md" %}

{% raw %}
```yaml
---
title: Blog post one
permalink: "/posts/{{ title | slug }}"
tags: posts
---
Some content in post one
```
{% endraw %}

{% filename "post-two.md" %}

{% raw %}
```yaml
---
title: Blog post two
permalink: "/posts/{{ title | slug }}"
tags: posts
---
Some content in post two
```
{% endraw %}

You might have noticed a `permalink` key in the front matter data. Eleventy's [permalink](https://www.11ty.dev/docs/permalinks/) does some cool stuff to make sure that "Cool URIs don't change". You can use the `permalink` key to remap a templates output to a path other than the default `inputPath`. The output from setting a `permalink` will leave off the file extension.

The two markdown files would be written to the `_site` output as:

```html
/posts/blog-post-one/
/posts/blog-post-two/
```

Using the `slug` filter works nicely to slugify your posts `title` key. The above permalink could also be written as `permalink: "/posts/blog-post-two/"` if you wanted to manually write the equivalent of {% raw %}`{{ title | slug }}`{% endraw %}. 

<h2 class="post-heading">Accessing Collection Data</h2>

Now that both of the blog posts have been given the `posts` tag. They can be easily accessed from the `posts` collection in the following way using a Nunjucks `for` loop.

{% raw %}
```html
{% for post in collections.posts %}
    <a href="{{ page.url }}">{{ post.data.title }}</a>
{% endfor %}
```
{% endraw %}

This would iterate over the `posts` collection and access the front matter data `title` to create a link to each blog post.

```html
<a href="/posts/blog-post-one/">Blog post one</a>
<a href="/posts/blog-post-two/">Blog post two</a>
```

If you wanted to show the markdown from blog posts in another template or layout file, you can use {% raw %}`{{ content | safe }}`{% endraw %}.

<h2 class="post-heading" id="handling-multiple-tags">Handling multiple tags</h2>

One way to create a new collection is simply by giving a `.md` file a new tag within the `tags` key. This method has been demonstrated above to access the `posts` collection.

When you have multiple tags on a blog post, such as `html`, `css`, `js`. You will add each tag to the `tags` key as a list of values. 

```yaml
---
tags: 
    - html
    - css
    - js
---
```

This is where creating a [custom collection](https://www.11ty.dev/docs/collections/) comes in handy. Instead of including the `posts` tag in the `tags` list for every blog post (which might be repetitive), just create a custom collection with the markdown files from `/posts/` inside the `.eleventy.js` file. This way you can omit `posts` from the tags list within front matter data. 

<h2 class="post-heading">Create Custom Collections</h2>

All blog posts in this article are saved as `.md` files in the `/posts/` directory. To create a custom collection, navigate to `.eleventy.js`. You will utilize the first argument of the config function `eleventyConfig` to call the API and use `addCollection` to create a new custom collection. 

You can add the markdown files within `/posts/` to the new collection using `getFilteredByGlob(glob)`, which will match an arbitrary glob or array of globs against the input file's full path (`inputPath`).

{% filename ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
    // Creates custom collection "myPosts"
    eleventyConfig.addCollection("myPosts", function(collection) {
        return collection.getFilteredByGlob("/posts/*.md");
    });
}
```

Now a custom collection called `myPosts` has been created which contains all the markdown files in `/posts/`. You can access this custom collection just like a regular collection.

{% raw %}
```html
{% for article in collections.myPosts %}
    <h2>{{ article.data.title }}</h2>
{% endfor %}
```
{% endraw %}

Another useful method is `getFilteredByTags(tags)` which will retrieve any content that includes all of the tags passed in.

```js
eleventyConfig.addCollection("web", function(collection) {
    return collection.getFilteredByTags("html", "css", "js");
});
```

<h2 class="post-heading">Filter Recent Posts</h2>

If you wanted to dedicate a section of the page for some of your most recent blog posts. You could create a custom sorted collection and perform a `slice` array operation to filter the number of recent posts.

```js
eleventyConfig.addCollection("recentPosts", function(collection) {
    return collection.getAllSorted().reverse().slice(0, 3);
});

```

<h2 class="post-heading">Conclusion</h2>

Custom collections along with the ability to build powerful shortcodes and filters in `.eleventy.js` using the [configuration API](https://www.11ty.dev/docs/config/) is one of the main reasons why #eleventy rocks!