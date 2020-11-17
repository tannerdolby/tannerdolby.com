---
title: Add Search to a Static Site using Custom Data Attributes
date: 2020-11-11
datetime: 2020-11-12 00:00:00 Z
preview: Creating search functionality for a static site isn't always easy. Luckily, using custom data attributes and a bit of JavaScript. You can filter blog posts by comparing the search input to post titles and visually hide posts that don't match the search query.
tags: 
    - javascript
    - eleventy
permalink: "/writing/{{ title | slug }}/"
---

{{ preview }}

Building a minimal search feature like this can seem complex, but the underlying logic is very straightforward. The blog post titles will be stored in a custom [data attribute](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) `data-post-title` to be compared with the user input from the search bar. Using the [Input Event](https://developer.mozilla.org/en-US/docs/Web/API/InputEvent), we can compare the `<input>` elements value against all blog post titles in `post-data-title` everytime the search bar changes. 

The user input inside the search bar (ie search query) will be checked against each blog post title for every new character added or removed to the search. This dynamic search feel is made possible thanks to the `input` event. Below is the HTML for creating a search bar `<input>` and corresponding `<label>`.

{% filename "index.html" %}

```html
<label for="search-bar">Search the Blog</label>
<input id="search-bar" type="text" name="search" placeholder="Search...">
<!-- Blog posts-->
<article class="post" data-post-title="Blog Post">..</article>
```

The blog post titles in `data-post-title` can be accessed from the DOM via `HTMLElement.dataset.dataPostTitle`. After checking the query against post titles, we can then visually hide the posts with titles not matching the search query. I'm using a `sr-only` class and `aria-hidden="true"` attribute to visually hide non-matching posts from the document and accessibility API.

{% filename "style.css" %}

```css
.sr-only {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}
```

_Note: Using a service like [Algolia](https://www.algolia.com/) will provide a more rich search functionality with all the bells and whistles. But if your search needs are minimal (like mine) this implementation could work great for you._

<h2 class="post-heading">Creating the Search</h2>

First, we need a client-side script `search.js` to grab all the blog posts from the document and store them in the variable `posts`. This can be done by using the `getElementsByClassName` method of the `Document` interface, which returns a live HTMLCollection.

You can now iterate over the blog posts in `posts` and compare the search query with each `data-post-title="Some blog post"` custom data attribute. If a post title matches the consecutive characters entered into the `<input>` element then visually hide the non-matching posts by adding the `.sr-only` class. Since the `input` event fires everytime the search bar text changes, we can compare the query with post titles for each change to the search input. 

I'm using an Eleventy Collection to loop over all the posts in my blog and generate `<article>` elements. If your not using a templating language or Eleventy, feel free to omit the Nunjucks {% raw %}`{% for %}`{% endraw %} loop. 

Here is the full code snippet for adding search functionality to your static site.

{% filename "index.html" %}

{% raw %}

```html
<ul class="my-posts">
{% for post in collections.posts | reverse %}
    <li>
        <article class="post" data-post-title="{{ post.data.title }}">
            <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
            <p>Some preview text</p>
        </article>
    </li>
{% endfor %}
</ul>
```
{% endraw %}

{% filename "search.js" %}

{% raw %}

```js
// grab blog posts and convert HTMLCollection to Array with the spread operator
const posts = [...document.getElementsByClassName("post")];

// grab search bar to add keyup and click event handlers
const searchBar = document.getElementById("#search-bar");
const log = document.querySelector(".log");

// capture search input and inject it into an HTML element.
function capture(e, element) {
    return element.textContent = e.target.value;
}

// add input event listener
searchBar.addEventListener("input", (e) => {
    capture(e, log);

    var searchQuery = [];
    searchQuery.push(log.innerHTML.toLowerCase());

    // posts with title that matches each character in search query
    const matchingPost = posts.filter((post) => {
        return post.dataset.postTitle.toLowerCase().includes(searchQuery);
    });

    // posts with title that doesn't match the search query
    const nonMatchingPost = posts.filter((post) => {
        return !post.dataset.postTitle.toLowerCase().includes(searchQuery);
    });

    // if there is a matching post then visually hide non-matching posts
    if (matchingPost) {
        nonMatchingPost.forEach(post => {
            post.classList.add("sr-only");
            post.setAttribute("aria-hidden", "true");
        });
    }

    // if the matching post is hidden from a previous query 
    // and matches search query, show it
    matchingPost.forEach(post => {
        if (post.classList.value.includes("sr-only")) {
            post.classList.remove("sr-only");
            post.removeAttribute("aria-hidden");
        }
    });
});
```
{% endraw %}

<h2 class="post-heading">Conclusion</h2>

I'm using this functionality for my websites [search feature](/search/) if you wanna see it in action. I would like to improve upon this by adding more data attributes to allow the search query to compare text in the blog posts preview or other data. Potentially introducing weights for search queries where if the title and preview text both contain a match, then the logic will place title matches higher than preview text. Stay tuned!