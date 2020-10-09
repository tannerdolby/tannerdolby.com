---
title: An Introduction to Client-side JavaScript
shortname: JS Client Side
date_created: October 6, 2020
datetime: 2020-10-06 00:00:00 Z
tag: web
post_tags:
    - JavaScript
    - HTML
preview: Have you ever thought to yourself while building a website, It sure would be nice to change the background color of an element upon being clicked? Well now you can by using client-side JavaScript!
permalink: /writing/{{ tag }}/{{ shortname | slug }}/
demo_link: https://browserjs-intro.netlify.app/
demo_image: 
    alt: "Live demo of the code produced in this article"
    large: 
        src: /images/browser-js-demo-large.webp
        width: 1024w
    med: 
        src: "/images/browser-js-demo-med.webp"
        width: 640w
    small:
        src: "/images/browser-js-demo-small.webp"
        width: 320w
    fallback:
        src: "/images/browser-js-demo-large.jpg"
---

{{ preview }} Client-side means that the JavaScript code is run on the client machine, which is the browser. Server-side JavaScript means that the code is run on the server which is serving web pages.

<h2 id="main-topics" class="dir-link">This post will aim to cover: {% directlink "main-topics" %}</h2>

1. Virtually creating HTML elements in JavaScript
2. Creating and setting attributes to HTML DOM elements
3. Binding the created HTML elements to the DOM

<h3 id="what-is-javascript" class="dir-link">What is JavaScript? {% directlink "what-is-javascript" %}</h3>

[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) is a lightweight, interpreted, compiled programming language with first class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.

<h2 id="why-read-this" class="dir-link">Why read this article? {% directlink "why-read-this" %}</h2>

If you're like me, I was (for some reason) afraid of learning to code in JavaScript at first. It felt so abstract and nothing like the previous experience I had programming with [R/Rstudio](https://www.r-project.org/). Here is a little more backstory, so I was browsing the web and came across a video titled, [This is truly the only way to learn JavaScript](https://www.youtube.com/watch?time_continue=4&v=HnXmI2UVZlU&feature=emb_logo) by Chris Hawkes. Quite a catchy video title. 

That being said, after watching the video I was captivated at the fact we could virtually create HTML elements in JavaScript. Then bind them to the DOM while also having the ability to add any valid attributes on these newly created HTML elements. This essentially took out all the need to ever go into my `.html` files, hypotethically speaking. Other than to include a `script` element for referencing the client side JavaScript containing all of the virtually created DOM elements.

Hours later after re-writing the HTML for one of my current side project homepages entirely in JavaScript. I realized, "you just structured an entire web page and functional DOM that looks exactly the same as one you would write in HTML, but all with JavaScript. It was a refreshing feeling.

<h3 id="wheres-the-html" class="dir-link">So where does HTML fit into the picture? {% directlink "wheres-the-html" %}</h3>

[HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) or HyperText Markup Language is the most rudimentary building block in web development. Using HTML allows us as developers to define the meaning and structure of web content through semantic HTML DOM elements.

<h2 id="create-elements" class="dir-link">Creating HTML elements and building the DOM using JavaScript {% directlink "create-elements" %}</h2>

JavaScript allows us the ability as developers to virtually create HTML elements using the [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) interface and associated [methods](https://developer.mozilla.org/en-US/docs/Web/API/Document#Methods). Below is an example of virtually creating a new `div` element using `createElement()` and attaching it to the DOM tree within the `<body>` node of the current document.

{% filename "script.js" %}

```js
const div = document.body.createElement("div");
```

A further break down of the above code: 
1. Create a read only reference value `const` named `div`. 
2. Assigns the div variable a value of a HTML element created on the document in this case a `div` element. 

<h3 id="creating-attributes">Creating HTML attributes {% directlink "creating-attributes" %}</h3>

After virtually creating HTML elements with JavaScript, you can add and remove attributes from them. This step in my workflow is usually done before binding elements to the DOM; but could be done after setting the DOM tree if you are inclined to do so. The `Document` interface provides us with a method called `createAttribute()` to create HTML element attributes.

```js
var div_att = document.createAttribute("class");
div_att.value = "page-content";
```

This creates a `class` attribute and assigns it the value "page-content".

<h3 id="inject-set-attr" class="dir-link">Injecting and Setting Element Attributes {% directlink "inject-set-attr" %}</h3>

Up until this point, we have virtually created HTML elements using `createElement()` and gave those elements some attributes using `createAttribute()`. Now it's time to inject values into the attributes and set their values using the `setAttributeNode()` method. Putting all the previous steps together:

1. Create the HTML div element.
2. Create class attribute for the newly created element.
3. Inject the class attribute value with the text "page-content".
4. Set the injected attribute values for DOM elements.

```js
const div = document.createElement('div');
var div_att = document.createAttribute('class');
div_att.value = 'page-content';
div.setAttributeNode(div_att);
```

<h3 id="bind-elements-dom" class="dir-link">Binding elements to the DOM {% directlink "bind-elements-dom" %}</h3>

The final step in this low-level workflow is to bind the HTML elements to our DOM tree using `appendChild()`. This step in the process truly improved my overall web content structuring and DOM experience. I highly recommend if you cannot structure a web page with an appropriate DOM tree then practice this low-level JS and in no time you will feel noticeably stronger at understanding each level in your DOM structure.

You can utilize the `appendChild()` method and bind the virtually created HTML element to the DOM within the document as a child of the `body` tag.

```js
document.body.appendChild(div); // binding the div element to DOM tree
```

So far, you've created one HTML `div` element, set its `class` attribute and then finalized the processing by binding it to the DOM tree. Specifically binding the element onto the `<body>` node of the document. Now who said using JavaScript in web development had to be hard? 

<h2 id="setup-dev-env" class="dir-link">Setup Browser Testing Environment {% directlink "setup-dev-env" %}</h2>

Most browsers will allow you to right click on a webpage and click the `inspect` menu button to inspect the markup within the current page. I recommend installing Chrome [Dev Tools](https://developers.google.com/web/tools/chrome-devtools) or some form of developer tools for the specific browser you are using. You also need a text editor of any flavor. I'm using Visual Studio Code as my IDE (Integrated Development Environment) but feel free to use whichever editor you'd like.

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

<h2 id="code-it" class="dir-link">Lets write some code! {% directlink "code-it" %}</h2>

Now we're ready to start putting code into these newly created files within the js-tutorial directory. Open up the js-tutorial folder in your preferred editor and navigate into the `index.html` file (it will be blank). I suggest using the [html5-boilerplate](https://marketplace.visualstudio.com/items?itemName=sidthesloth.html5-boilerplate) VS Code plugin as I will be using it to generate a template of HTML boilerplate code. But getting familiar with typing out the basic markup for an `.html` page by hand is great practice.

Inside the `index.html` file, entering `html5-boilerplate` with the specified plugin installed will provide you with the following:

{% filename "index.html" %}

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="">
    </head>
    <body>
        <script src=""></script>
    </body>
</html>
```

Great! Now that the basic markup for `index.html` page is setup. Make sure to provide the relevant document metadata inside the `<head>` tag. Ensure to include references to the custom CSS file using a `<link>` and custom JS `<script>` so the document page can reference that code like the example shows above.

<h2 id="finalize" class="dir-link"> Putting it all together! {% directlink "finalize" %}</h3>

Navigate to the `script.js` file in the home js-tutorial directory and lets start writing JS code for constructing a basic DOM tree. You will be utilizing everything mentioned so far to build a small web page with virtually created HTML elements.

#### 1. Create the `<main>` and `<section>` HTML elements with a `class` attribute then inject and set a value for each.

{% filename "script.js" %}

```js
// Create <main> landmark element
var main = document.createElement("main");
var main_attr = document.createAttribute("class");
main_attr.value = "page-wrapper";
main.setAttributeNode(main_attr);

// Create <section> landmark element
var section = document.createElement("section");
var section_attr = document.createAttribute("class");
section_attr.value = "page-content";
section.setAttributeNode(section_attr);
```
#### 2. Create the heading and paragraph elements and give them both some inner text.

```js
// Create <h1> element
var h1 = document.createElement("h1");
var h1_att = document.createAttribute("class");
h1_att.value = "section-title";
h1.setAttributeNode(h1_att);

// Create <p> element
var p = document.createElement("p");
var p_att = document.createAttribute("class");
p_att.value = "section-text";
p.setAttributeNode(p_att);

// Give the <h1> and <p> element some inner text!
h1.innerText = "Hello world!";
p.innerText = "lorem ipsum dorem dolor.";
```

#### 3. Create an `<img>` element for the picture I grabbed from [bukk.it](https://bukk.it/)

```js
const img = document.createElement("img");
var img_attr = document.createAttribute("class");
var img_src = document.createAttribute("src");
var img_alt = document.createAttribute("alt");
var img_loading = document.createAttribute("loading");
img_attr.value = "photo";
img_src.value = "cat-coding.jpg";
img_alt.value = "Cat, presumably coding a very complex system on mini macbook pro.";
img_loading.value = "lazy";
img.setAttributeNode(img_attr);
img.setAttributeNode(img_src);
img.setAttributeNode(img_alt);
img.setAttributeNode(img_loading);
```

#### 4. Create a paragraph element for the image description.

```js
var p2 = document.createElement("p");
var p2_att = document.createAttribute("class");
p2_att.value = "caption";
p2.innerHTML = `${img_alt.value} This photo was found on bukk.it`
p2.setAttributeNode(p2_att);
```

#### 5. Bind the virtually create HTML elements to the DOM Tree.

```js
section.appendChild(h1);
section.appendChild(p);
section.appendChild(img);
section.appendChild(p2);
main.appendChild(section);

// Append the first <main> element to the documents body.
document.body.appendChild(main);
```

Start up your local web server or simply open the `index.html` from your file system into the web browser. If you have provided the proper `<link>` element for CSS, the HTML we created in `script.js` will render on the page with the exact DOM structure that was setup while binding the HTML elements. I gave the page a bit more styling within the [stylesheet](https://github.com/tannerdolby/intro-browser-js/blob/master/style.css) if you want to view the code. You could apply the same styles as those present in the CSS file by using JavaScript and `element.style.attributeNode = ""`, this will take a bit longer but again is great practice.

<h3 id="live-demo" class="dir-link">Check out the live demo {% directlink "live-demo" %}</h3>

It's always nice to see the outcome after someone shows a bunch of code, so below is a screen shot of the demo page we've built in this article. With a link to the live demo page as well. 

<picture>
    <source 
        type="image/webp" 
        srcset="{{ demo_image.large.src }} {{ image_demo.large.width }},
                {{ demo_image.med.src }} {{ image_demo.med.width }},
                {{ demo_image.small.src }} {{image_demo.small.width }}" 
        sizes="(min-width: 400px) 33.3vw, 100vw">
    <img 
        src="{{ demo_image.fallback.src }}" 
        alt="{{ demo_image.alt }}" 
        loading="lazy"
        style="border: 1px solid lightgray;">
</picture>

<a href="{{ demo_link }}">Link to the demo &RightArrow;</a>

<h2 id="conclusion" class="dir-link">Conclusion {% directlink "conclusion" %}</h2>

If you read this far and followed each step, you should now have a very basic web page with a couple HTML elements built primarily with JS instead of using traditional markup directly inside an `.html` file.

For those wanting to start the journey with JavaScript, this is truly some of the best practice to become more familiar with the basics of browser JavaScript. I went from someone who hated JavaScript and had no idea how to use it. Now I utilize the power of JavaScript in my own websites and applications.

<a href="https://github.com/tannerdolby/intro-browser-js">View the source code on Github <span>&RightArrow;</span></a>

## References
* [Chris Hawkes](https://www.codehawke.com/)
* [Mozilla Developer Network](https://developer.mozilla.org/en-US/)
* [StackOverflow](https://stackoverflow.com/)