---
title: Whats the difference between a NodeList and HTMLCollection?
date: 2020-11-10
datetime: 2020-11-10 00:00:00 Z
preview: When selecting multiple DOM nodes from a document, you might encounter an HTMLCollection or NodeList. Understanding the differences between these two interfaces can help you determine what methods will be available and the type of nodes contained.
tags: 
    - javascript
    - html
permalink: "/writing/{{ title | slug }}/"
eleventyExcludeFromCollections: true
---

{{ preview }}

The DOM represents the document as nodes and objects. This allows programming languages, such as JavaScript to connect to the page and manipulate DOM nodes. Using `document.getElementsByClassName` returns a live [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) interface.

You can think of the `HTMLCollection` as an array-like object, but to be clear it is not a generic array. This means it will not have access to generic array methods such as: `filter` or `forEach` like a normal array would. 

You can still use array methods by utilizing `Array.prototype.filter` but simply calling `HTMLCollection.filter` will not work since the data type is a `HTMLCollection` and not a `Array`.


```js
Array.prototype.filter.call(HTMLCollection, (item) => {}); // ok for HTMLCollection

HTMLCollection.filter(post => {}); // not ok 
``` 

