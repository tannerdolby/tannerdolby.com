---
title: How to use git when contributing to open source
date: 2020-10-12

---



### Fork
Create a fork of this repository to your users organization. The project will be apart of your users account as `your-name/what-to-watch`.

### Clone your fork 
Copy the SSH URL (or HTTPS) of your own organization’s fork of the project and clone the project with:
```
git clone https://github.com/tannerdolby/what-to-watch.git
```

### Setup tracking of remote upstream repository 
This keeps your local copy of the project (the fork) up to date with the original upstream repository.

1. Grab the HTTPS or SSH URL from the original repository (ie https://github.com/tannerdolby/what-to-watch)

2. Add the upstream repository as a remote 
```
git remote add upstream https://github.com/tannerdolby/what-to-watch.git
```

3. Get details about the upstream remote repository. 
```
git fetch upstream
```

4. Point your local copy of the master branch (which is currently pointing to 'origin') to the upstream repository. Once completed, you can easily pull changes from 'master' and get the latest changes from the upstream repository.

#Prototype #3 (Did it.. for single blobs)
```js
const $body = $('body'); // for my testing

// deserialize HTML string to cheerio object $test
const blob = $('<h3>Metadata content</h3>\n<p>Bla bla bla</p>');

blob.each((i, header) => {
    const $header = $(header);
    // bad but works for now
    const h3 = $header.filter('h3');
    const a = $header.filter('a');

    // come back to conditional statement

    // using $header.attr('id', ..) was applying to the <p id="#${id}-${i}"> from its .text() since it is apart of the original HTML string
    var id = uniqueH3ID($header.text()); // mimic generateUniqueH3ID
    h3.attr('id', `#${id}-${i}`);
    a.attr('id', `#${id}-${i}`);

    var link = $(tag('a', {href: `#${id}-${i}`}, $header.text()));
    h3.text(""); // empty textContent for h3 
    h3.prepend(link); // prepend the link to the start of h3

    $body.append($header); // append to <body> or whevever it needs to go
});
```

Raw output
```html
<body>
    <h3 id="#Metadata_content-0"><a href="#Metadata_content-0">Metadata content</a></h3>
<p>Bla bla bla</p>
</body>
```


#PROTOTYPE #2 (Almost there)
```js
subHeading.each((i, header) => {
	const $header = $(header);
  	const tt = $header.text();
  	// come back to if conditional
  	var id = uniqueH3ID($header.text());
  	$header.attr('id', `#${id}-${i}`);
  	var link = $(tag('a', {href: `#${id}-${i}`}, $header.text()));
  	console.log($header.text(""));
  	$header.prepend(link);
});
```
Input HTML
```html
<body>
    <!-- <h2> and stuff above.. -->
    <h3>Metadata Content</h3>\n<p>Bla bla</p>
    <h3>Flow Content</h3>\n<p>Bla Bla</p>
 </body>
```

Raw output
```html
<h3 id="#Metadata_content-0"><a href="#Metadata_content-0">Metadata Content</a></h3><h3 id="#Flow_content-1"><a href="#Flow_content-1">Flow Content</a></h3>
```

## Notes:

```js
$header.text(""); // get rid of text content for h3, textString = ""
$header.prepend(link); // add link as first child of all <h3> tags <h3 id="Metadata_content"><a href="#Metadata_content">Metadata Content</a></h3>
```

## Logs:
```js
console.log($header); // HTML string
console.log($header.text()); // sub heading text content
```


So far for MDN task,

```js
subHeading.each((i, header) => {
	const $header = $(header);
  	console.log($header); // each sub heading is coming out
    console.log($header.text());
  	// come back to if conditional
    if (!$header) {
        return;
    }
  	var id = random(0, 20); // mimic generateUniqueH3ID
  	$header.replaceWith($('<a>').attr('href', `#${id}-${i}`).text($header.text())) // with loop variable i, ie #id-name-1
});
```

## Generate unique h3 id based on current [Yari Content Categories page](https://main.content.dev.mdn.mozit.cloud/en-US/docs/Web/Guide/HTML/Content_categories#Metadata_content)

```js

// mimic generateUniqueH3ID in a questionable one-liner
var uniqueH3ID = (id) => {
    // Title case first letter .. lower case and underscore case the other stuff
    return id.charAt(0).toUpperCase().concat(id.split(" ").join("_").slice(1).toLowerCase()); 
}
uniqueH3ID("METAdata CONteNT"); // Metadata_content 
```

```js
subHeading.each((i, header) => {
	const $header = $(header);
  	// come back to conditional statement
  	var id = uniqueH3ID($header.text()); // mimic generateUniqueH3ID
  	$header.text().replaceWith($('<a>').attr('href', `#${id}-${i}`).text($header.text()));
});

```

using $header.replaceWith($('<a>').attr('href', `#${id}-${i}`).text($header.text())) gives Prototype #1 result 

Prototype #1 START

Working prototype to test 

Input HTML
```html
<body>
    <!-- <h2> and stuff above.. -->
    <h3>Metadata Content</h3>
    <p>Bla bla</p>

    <h3>Flow Content</h3>
    <p>Bla Bla</p>
</body>
```

```js

// mimic generateH3ID (edge case for strings with hypens in between)
var uniqueH3ID = (id) => {
    // Title case first letter .. lower case and underscore case the other stuff
    return id.charAt(0).toUpperCase().concat(id.split(" ").join("_").slice(1).toLowerCase()); 
}
uniqueH3ID("METAdata CONteNT"); // Metadata_content 

subHeading.each((i, header) => {
	const $header = $(header);

  	// come back to if conditional

  	var id = uniqueH3ID($header.text()); // mimic generateUniqueH3ID
  	$header.attr('id', `#${id}-${i}`); // set the id on each h3
  	var link = $(tag('a', {href: `#${id}-${i}`}, $header.text())); // create permalink with href attr and innerText 
  	$header.append(link); // append the link to the h3 sub heading
});
```

Raw output
```html
<h3>Metadata Content<a href="#Metadata_content-0">Metadata Content</a></h3><h3>Flow Content<a href="#Flow_content-1">Flow Content</a></h3>

```

PROTOYPE #1 END

## JOB:

What your job would be is to convert the string

```html
<h3>Sub-header</h3>\n<p>Bla bla</p> 
```

into 

```html
<h3 id="sub-header-0"><a href="#sub-header-0">Sub-header</a></h3>\n<p>Bla bla</p>
```


$('h3').each((i, header) => {
    const $header = $(header); // normal <h3>bla bla</h3>
    // handle if

    var id = generateUniqueH3ID($header.text())
    $header.attr(`id`, `sub-header-${id})
    $header.replaceWith($('<a>').attr('href', `#${id}-${i}`).text($header.text()) // would ${id} already be slugified here? like Section-content or Section_content?
});

<h3 id="sub-header-{{ i }}"><a href="#sub-header-{{ i }}">Sub-header</a></h3>\n<p>Bla Bla

1. Load the html (deserialize from HTML-string to Cheerio object)
const cheerio = require('cheerio');
const $ = cheerio.load(<h3>Sub-header</h3>\n<p>Bla bla</p> into <h3 id="sub-header-0">)

```js
const $body = $('body');
const test = $('<h3>Sub-header</h3>\n<p>Bla bla</p>');

```



ALL FINAL CODE For working prototype
```js
const $body = $('body');
// deserialize HTML string to cheerio object $test
const $blob = $('<h3>Metadata content</h3>\n<p>Bla bla bla</p>');
//console.log(test); // HTML string
//console.log(test.text()); // text content for each node
//console.log(test.contents($('h3').text()));

const subHeading = $('h3');
$body.append(subHeading);

function uppercaseFirstChar(string) {
	return string.charAt(0).toUpperCase().concat(string.slice(1));
}

//uppercaseFirstChar("hello world");
//console.log(uppercaseFirstChar("hello world")); // outputs Hello world

// handle an array of header values since it is in .each() loop, regex more graceful probably
function uniqueH3ID(id) {
  return id.charAt(0).toUpperCase().concat(id.split(" ").join("_").slice(1).toLowerCase()); // Title case first letter .. lower case and underscore case
}

//console.log(uniqueH3ID("HEllo WOrLD")); // Hello_world 


$blob.each((i, header) => {
	const $header = $(header);
  	// using $header.attr('id', ..) was applying to the <p> since it is apart of the original HTML string
    const $h3 = $header.filter('h3');
  	const $a = $header.filter('a'); // bad but works for now
  
  	// come back to if conditional
  	
  
  	var id = uniqueH3ID($header.text()); // mimic generateUniqueH3ID
  	$h3.attr('id', `#${id}-${i}`);
  	$a.attr('id', `#${id}-${i}`);

  	var link = $(tag('a', {href: `#${id}-${i}`}, $header.text()));
  	$h3.text(""); // empty textContent for h3 
  	$h3.prepend(link); // prepend the link to the start of h3

 	$body.append($header); // append to <body>
});
```