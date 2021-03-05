---
title: Understanding CSS Combinators
date: 2020-11-13
datetime: 2020-11-13 00:00:00 Z
tags:
  - css
  - html
preview: Sometimes you need to select elements from the page for styling but don't want to write the class or ID selector many times in your stylesheet. This is where CSS combinators come into play.
---

{{ preview }}

I'm guilty of not using combinators as often as I should in my own web applications and I bet some of you are too. Well, I use the descendant combinator quite often but I wasn't actually fully aware of it. I thought I was just selecting the child elements of the specified element like `article p` where all `<p>` tags nested in an `<article>` would be selected. This in fact, is an example of the descendant combinator selector.

<h2 class="post-heading">What are the four Combinators?</h2>

1. Descendant Combinator - specified element target element
2. Child Combinator - specified element > target element
3. Adjacent Sibiling Combinator - specified element + target element
4. General Sibiling Combinator - specified element ~ target element

<h3 class="post-heading">Descendant combinator</h3>

The first combinator selector is the Descendant Combinator. It selects all HTML elements that are descendants of the specific element. The specified element is followed by a space and then by the descendant elements to be selected.

`div img` selects all `<img>` tags that are children of a `<div>`.

```html
<style>
div a {
  color: #f06;
}
</style>

<div>
  <p>Hello World!</p>
  <a>View a map of the world.</a>
</div>
```

The descendant selector only styles the `<a>` element here and makes it's color a reddish pink color. Although the `<p>` tag is a descendant of `<div>`, it is not the target element which are anchor tags.

<h3 class="post-heading">Child combinator</h3>

The second combinator selector is the Child Combinator. This combinator selects all HTML elements that are direct children of the specified element. The specified element is followed by a `>` symbol and then the child elements to be selected.

`div > p` selects all `<p>` tags that are direct children of a `<div>`.

```html
<style>
div > p {
  color: #f06;
}
</style>

<div>
  <p>lorem ipsum</p>
  <p>some text</p>
</div>
```

The first `<p>` tag will take the `color: #f06` and the second `<p>` won't be targeted with the styling. This combinator only selects *direct* children of the specified element.

<h3 class="post-heading">Adjacent Sibiling Combinator</h3>

The third combinator selector is the Adjacent Sibiling Combinator. This combinator selects all HTML elements that are a direct adjacent sibiling to the specified element. The specified element is followed by a `+` sign. To better understand how this combinator works, elements that are sitting right next to eachother (not nested) on the page are considered adjacent sibilings.

`h2 + p` selects all `<p>` tags that are adjacent sibilings of `<h2>` tags.

```html
<style>
div + h2 {
  color: #f06;
}
</style>

<div>
  <h2>Some heading</h2>
  <p>Some text</p>
  <article>
    <h2>Some other heading</h2>
  </article>
</div>
```

The first `<h2>` subheading will be be styled with `color: #f06` and the nested `<h2>` tag within the `<article>` is not targeted by the styling because it is not a direct child of a `<div>`. It would be styled by the descendant operator `div h2` but since it's more deeply nested in the article, the child combinator doesn't target the second `<h2>` tag.

<h3 class="post-heading">General sibiling combinator</h3>

The fourth and final combinator selector is the General Sibiling Combinator. This combinator selects all HTML elements that come after the specified element.

`h2 ~ p` selects all `<p>` tags that come after an `<h2>` tag.

```html
<style>
h2 ~ p {
  color: #f06;
}
</style>

<h1>Some heading</h1>
<p>lorem ipsum</p>
<h2>Some other heading</h2>
<p>dolor etum</p>
<p>ipsum etal</p>
<h3>Another heading</h3>
<p>lorem ipsum dolor</p>
```

Every `<p>` element that comes after an `<h2>` element will be targeted by the general sibiling combinator.

<h2 class="post-heading">Conclusion</h2>

That wraps up this quick overview of CSS Combinators. I hope these examples help you to better understand how and when to use combinators when styling web pages.
