---
title: Add search to a static site by leveraging custom data attributes
date: 2020-11-11
datetime: 2020-11-12 00:00:00 Z
preview: Creating search functionality for a static site isn't always easy. Using custom data attributes and a bit of JavaScript allows for a neat way to filter and visually hide blog posts that don't match the search query.
tags: 
    - javascript
permalink: "/writing/{{ title | slug }}/"
eleventyExcludeFromCollections: true
---

{{ preview }} You can quickly add a minimal search functionality to your [static site](https://en.wikipedia.org/wiki/Static_web_page) with a bit of JavaScript and custom data attributes. The goal is to filter blog posts by title, which is stored in the custom attribute `data-post-title`. Then visually hide those posts that don't match the search input.

I use the [Keyboard Event](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) and specifically a `keydown` [event](https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event) for comparing the text inside the `<input>` element (ie search query) with all blog post titles. The nice part about this, is that the search query (user input to search bar) will be compared with post titles on each new character added to the search thanks to the `keydown` event. Blog post titles are stored in a custom attribute `data-post-title` which I access with `HTMLElement.dataset.dataPostTitle` and then visually hide the posts with titles not matching the search query. 

Using a service like [Algolia](https://www.algolia.com/) will provide a more rich search functionality with all the bells and whistles. But if your search needs are minimal (like mine) this implementation could work great for you.

The DOM represents the document as nodes and objects. This allows programming languages, such as JavaScript to connect to the page and manipulate DOM nodes. W