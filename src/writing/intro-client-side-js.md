---
title: An Introduction to Client-side JavaScript
shortname: JS Client Side
datetime: 2020-10-06 00:00:00 Z
date: 2020-10-06
tags: 
    - html
    - javascript
preview: Have you ever thought to yourself while building a website, how could I create HTML elements and bind them to the DOM? This article explains some of the fundamentals for interacting with the DOM tree using client-side JavaScript.
permalink: /writing/{{ title | slug }}/
demo_link: https://browserjs-intro.netlify.app/
---

{{ preview }} 

Maybe you've been tasked with writing a function that creates multiple `<li>` list elements. If you wanted to programmaticlly set attributes and apply styles, this is where the power client-side JavaScript really shines! 

Client-side means that the JavaScript code is run on the client machine, which is the browser. Server-side JavaScript means that the code is run on the server which is serving web pages.

<h2 class="post-heading">This post will aim to cover:</h2>

1. Virtually creating HTML elements in JavaScript
2. Creating and setting attributes to HTML DOM elements
3. Binding the created HTML elements to the DOM

<h2 class="post-heading">What is JavaScript?</h2>

[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) is a lightweight, interpreted, compiled programming language with first class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.

<h2 class="post-heading">Why read this article?</h2>

If you're like me, I was (for some reason) afraid of learning to code in JavaScript at first. We just didn't get along. Then I stumbled upon this video titled: [This is truly the only way to learn JavaScript](https://www.youtube.com/watch?time_continue=4&v=HnXmI2UVZlU&feature=emb_logo) by Chris Hawkes.

After watching the video, I was captivated by the fact you could virtually create HTML DOM elements in JavaScript. This essentially took out all the need to ever go into my `.html` files, hypothetically speaking. Other than to include a `script` element for referencing the client side JavaScript containing all of the virtually created DOM elements.

<h2 class="post-heading">So where does HTML fit into the picture?</h2>

[HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) or HyperText Markup Language is the most rudimentary building block in web development. Using HTML allows developers to define the meaning and structure of web content through semantic HTML DOM elements.

<h2 class="post-heading">What is the DOM?</h2>
From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction), The Document Object Model (DOM) is the data representation of the objects that comprise the structure and content of a document on the web. The DOM represents the HTML or XML document so that programming languages can easily connect to the page.

<h2 class="post-heading">Build the DOM Tree</h2>

JavaScript allows for virtually creating HTML elements using the [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) interface and associated [methods](https://developer.mozilla.org/en-US/docs/Web/API/Document#Methods). Below is an example of virtually creating a new `<div>` element using `createElement()` and attaching it to the DOM tree within the `<body>` node of the current document.

{% filename "script.js" %}

```js
const div = document.body.createElement("div");
```

<h2 class="post-heading">Creating HTML attributes</h2>

After virtually creating HTML elements with JavaScript, you can add and remove attributes from them. The `Document` interface provides a method called `createAttribute()` to create HTML element attributes.

```js
var div_att = document.createAttribute("class");
div_att.value = "page-content";
```

This creates a `class` attribute and assigns it the value "page-content", ie `class="page-content"`.

<h2 class="post-heading">Injecting and Setting Element Attributes</h2>

Up until this point, we have virtually created HTML elements using `createElement()` and gave those elements some attributes using `createAttribute()`. Now it's time to inject values into the attributes and set their values using the `setAttributeNode()` method. Putting all the previous steps together:

1. Create the HTML div element.
2. Create class attribute for the newly created element.
3. Inject the class attribute value with the text "page-content".
4. Set the injected attribute values for DOM elements.

```js
const div = document.createElement('div');
const div_class = document.createAttribute("class");
div_class.value = "page-content";
div.setAttributeNode(div_class);
```

<h3 id="quickly-set-attr" class="post-heading">Create and set attributes more efficiently</h3>

The faster way to create and set an attribute for any HTML DOM element, is by using `setAttribute` which takes two arguments. The first being a valid attribute name and the second being a value for that attribute.

```js
const div = document.createElement('div';
div.setAttribute("class", "page-content");
```

This produces the same markup `<div class="page-content"></div>` as the method above. You can also get and set the `class` attribute for a specific HTML element by accessing the `className` property of the [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) interface. 

{% raw %}
```js
HTMLElement.className = "page-content"
```
{% endraw %}

The DOM provides many unique ways to modify the content within HTML nodes or completely alter the document structure. Using the **read-only** `classList` property returns a live [DOMTokenList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) collection of class attributes for the element. 

The DOMTokenList itself is read-only, although you can modify it with the [add()](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add), [remove()](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove), and [toggle()](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle) methods. 

```js
const p = document.createElement("p");
p.setAttribute("class", "first-class"); // <p class="first-class"></p>

p.classList.add("second-class"); // <p class="first-class second-class"></p>
p.classList.remove("first-class"); // <p class="second-class"></p>
```

**Note**: You can quickly see the nodes and objects contained in each DOM element by inspecting the page and navigating to the properties tab.

<h2 class="post-heading">Binding elements to the DOM</h2>

The final step in this low-level workflow is to bind the HTML elements to our DOM tree using `appendChild()`. This step in the process truly improved my overall web content structuring and DOM experience. I highly recommend if you cannot structure a web page with an appropriate DOM tree then practice this low-level JS and in no time you will feel noticeably stronger at understanding each level in your DOM structure.

You can utilize the `appendChild()` method and bind the virtually created HTML element to the DOM within the document as a child of the `body` tag.

```js
document.body.appendChild(div); // binding the div element to DOM tree
```

So far, you've created one HTML `div` element, set its `class` attribute and then finalized the processing by binding it to the DOM tree. Specifically binding the element onto the `<body>` node of the document. Now who said using JavaScript in web development had to be hard? 

<h2 class="post-heading">Setup Browser Testing Environment</h2>

Most browsers will allow you to right click on a webpage and use the `inspect` menu button to inspect the markup within the current page. I recommend installing Chrome [Dev Tools](https://developers.google.com/web/tools/chrome-devtools) or some form of developer tools for the specific browser you are using. You also need a text editor of any flavor. I'm using Visual Studio Code as my IDE (Integrated Development Environment) but feel free to use whichever editor you'd like.

Open up a terminal window and create a new directory named js-tutorial using the `mkdir` command,

```shell
spherical:~ TannerDolby$ mkdir js-tutorial
```

Then change directory into the newly created one name js-tutorial,

```shell
spherical:~ TannerDolby$ cd js-tutorial
```

The directory js-tutorial currently does not contain any content so performing a list command using `ls` will output nothing until we add content to the directory.

Using the `touch` command here creates a file named `index.html` within the root directory of js-tutorial. Let's create the other files needed for this post while we are here.

```shell
spherical:js-tutorial TannerDolby$ touch index.html
spherical:js-tutorial TannerDolby$ touch style.css
spherical:js-tutorial TannerDolby$ touch script.js
spherical:js-tutorial TannerDolby$ ls
index.html script.js style.css
```

<h2 class="post-heading">Lets write some code!</h2>

Now we're ready to start putting code into these newly created files within the js-tutorial directory. Open up the js-tutorial folder in your preferred editor and navigate into the `index.html` file (it will be blank). I suggest using the [html5-boilerplate](https://marketplace.visualstudio.com/items?itemName=sidthesloth.html5-boilerplate) VS Code plugin as I will be using it to generate a template of HTML boilerplate code. But getting familiar with typing out the basic markup for an `.html` page by hand is great practice.

Inside the `index.html` file, include the following HTML.

{% filename "index.html" %}

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Intro to client-side JS</title>
        <meta name="description" content="A demo page">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <script src="script.js"></script>
    </body>
</html>
```

Great! Now that the basic markup for `index.html` page is setup. Make sure you've provided the relevant document metadata inside the `<head>` tag. Ensure to include references to the custom CSS file using a `<link>` and custom JavaScript using a `<script>` tag.

<h2 class="post-heading"> Putting it all together!</h2>

Navigate to the `script.js` file in the home js-tutorial directory and lets start writing JS code for constructing a basic DOM tree. You will be utilizing everything mentioned so far to build a small web page with virtually created HTML elements.

### Step 1
Create the `<main>` and `<section>` HTML elements with a `class` attribute then inject and set a value for each.

{% filename "script.js" %}

```js
const main = document.createElement("main");
main.setAttribute("class", "page-wrapper");

const section = document.createElement("section");
section.setAttribute("class", "page-content");
```

### Step 2
Create the heading and paragraph elements and give them both some inner text.

```js
const h1 = document.createElement("h1");
h1.setAttribute("class", "section-title"); 
h1.innerText = "Hello world!";

const p = document.createElement("p");
p.setAttribute("class", "section-text");
p.innerText = "lorem ipsum dorem dolor.";
```

### Step 3
Create an `<img>` element for the picture I grabbed from [bukk.it](https://bukk.it/)

```js
const img = document.createElement("img");
img.setAttribute("class", "photo");
img.setAttribute("src", "cat-coding.jpg");
img.setAttribute("alt", "Cat, presumably coding a very complex system.");
img.setAttribute("loading", "lazy");
```

### Step 4 
Create a paragraph element for the image description.

```js
const p2 = document.createElement("p");
p2.setAttribute("class", "caption");
p2.innerHTML = `${img.alt}. This photo was found on bukk.it`;
```

### Step 5
Bind virtually created HTML elements to the DOM Tree.

```js
section.appendChild(h1);
section.appendChild(p);
section.appendChild(img);
section.appendChild(p2);
main.appendChild(section);

// Append the first <main> element to the documents body.
document.body.appendChild(main);
```

Start up a local web server or open the `index.html` file using your web browser. If you have provided the proper `<link>` element for CSS, the HTML we created in `script.js` will render on the page with the exact DOM structure that was setup while binding the HTML elements. 

I gave the page a bit more styling within the [stylesheet](https://github.com/tannerdolby/intro-browser-js/blob/master/style.css) if you want to view the code. You could also apply the same styles as those present in the `.css` file by using JavaScript and `element.style.attributeNode = ""`, this will take a bit longer.

<h2 class="post-heading">Conclusion</h2>

If you read this far and followed each step, you should now have a very basic web page with a couple HTML elements built primarily with JS instead of using traditional markup directly inside an `.html` file.

For anyone wanting to start their journey with JavaScript, this is truly some of the best practice to become more familiar with the basics of browser JS. Have a look at the <a href="https://github.com/tannerdolby/intro-browser-js">source code on Github</a>. You can also checkout similar posts in the #javascript or #html categories.

Here's a link to <a href="{{ demo_link }}">the live demo</a>.