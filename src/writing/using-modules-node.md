---
title: Using Modules in Node.js
date: 2021-03-24
datetime: 2021-03-24 00:00:00 Z
permalink: "/writing/{{ title | slug }}/"
tags:
  - nodejs
  - javascript
preview: Files can become quite large in a Node.js project. Modules provide developers a "modular" approach by putting related code into separate files and then exporting them to be used elsewhere.
---

{{ preview }}

<h2 class="post-heading">What is a module?</h2>

Modules in Node.js are essentially just files. They provide a place for related code to be stored and exported for reuse throughout the application. Each module will usually have it's own context (ie data, code). The reason why every module has it's own context is because it can't interfere with other modules or pollute the global scope by defining too many variables that are globally accessible.

> If you don't want code in a file to be used elsewhere or shared between files, simply don't use `module.exports` as you don't wish to export any code from that file.

Below is a demo of sorts outlining one large file `server.js`, which will have it's code separated into "modules". These modules will contain related code extracted from `server.js` that can be exported and reused throughout the application. 


```js
    |-----------------------|
    |       server.js       |
    |-----------------------|
    |           |           |
    /           |           \
|---------| |---------| |---------|
| file1.js| | file2.js| | file3.js|
|---------| |---------| |---------|
```

Each of the files connected to `server.js` in the diagram are considered "modules". So what actually goes into each of the `fileX.js` files? Inside each module will be related code to `server.js`. Therefore, `file1.js` could contain code for adding new users to the server by defining an API endpoint for making the POST request. 

Another file, `file2.js` might contain code for authenticating logged in users. This file would have `jsonwebtoken` (JWT) and potentially `bcrypt` to verify users JWT token and compare hashed passwords.

The great thing about developing with Node.js, is that we can make our code "modular" with the help [modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). Instead of having one gigantic server file, create modules containing specific functionalities for the server and then export that module into the giant server file. Potentially reducing the main files size and making your code more modular. 

<h2 class="post-heading">How to create a module</h2>

Creating modules are dead simple. Separate some related code from the main file and place it in a new file which we can export for use later. Below will be an example using one main file `animal.js`, which we can break into modules to reduce the overall file size.

{% filename "animal.js" %}

```js
// define some animal sound functions
function hiss() {}
function bark() {}
function quack() {}

// use the functions to log console output
const dog = "A dog goes " + bark();
const snake = "A snake goes " + hiss();
const duck = "A duck goes " + quack();
```

Instead of defining the `hiss/bark/quack` functions within `animal.js`, let's create a module called `sounds.js` and store the functions.

{% filename "sounds.js" %}

```js
function bark() {
    return "Woof woof woof!";
}
function hiss() {
    return "Sssssssss!";
}
function quack() {
    return "Quack quack!";
}

module.exports = {
    bark,
    hiss,
    quack
}
```

To convert the `sounds.js` file into a module, we must use `module.exports` to store the functions. Once the code has been exported, it can be used anywhere else with the help of `require()`. 

<h2 class="post-heading">Using code from a module</h2>

Now that we have created a module, it's time to use the exported code inside `animal.js` to reduce the file size. First, use the `require` keyword to bring the `sounds.js` module into `animal.js`. Make sure to provide `require` with the relative path to the module.

```js
const sounds = require("./sounds");

const dog = "A dog goes " + sounds.bark();
const snake = "A snake goes " + sounds.hiss();
const duck = "A duck goes " + sounds.quack();

console.log(dog);
console.log(snake);
console.log(duck);
```
Output:

```html
A dog goes Woof woof woof!
A snake goes Ssssssss!
A duck goes Quack Quack
```

<h2 class="post-heading">Conclusion</h2>

There are a few different ways you can use `module.exports` in Node.js, I showed one way above using `module.exports = {}`. You can also use the following:

```js
function greet() {
    return "Hello world!";
}

// Define the property on module.exports and assign it
module.exports.greet = greet;

// Use a comma separated list
module.exports = {
    greet,
    someOtherFunc
}

// Define the function inside the module.exports object
module.exports = {
    greet: function() {
        return "Hello world!";
    }
}
```

Using modules are a great way to keep your code organized and reusable. I'm beginning to realize how modules really do help in writing structured code.