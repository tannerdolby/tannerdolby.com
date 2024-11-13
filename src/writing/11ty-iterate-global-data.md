---
title: Generate Page Content From a Global Data File Using Eleventy
shortname: 11ty Iterate Global Data
date: 2021-07-29
datetime: 2021-07-29 00:00:00 Z
preview: There are many great features to choose from when building websites with Eleventy. One feature in particular that I find very useful is the ability to iterate over a global data file and generate page content using a templating language of your choice.
tags: 
    - eleventy
    - nunjucks
    - html
permalink: "/writing/{{ title | slug }}/"
templateEngineOverride: njk, md
---

{{ preview }} 

You can create [global data files](https://www.11ty.dev/docs/data-global/) in 11ty by placing them inside the `_data` directory. Global data files can be stored as JSON `.json` or as data from `module.exports` in a `.js` custom data file. The data files can then be accessed by any template in the project structure. If you need to do any complex computation outside of your `.eleventy.js` logic, the possibilites with global data files are endless.

<h2 class="post-heading">Use Cases</h2>

I think its safe to say when building a website, you might be faced with creating a large grid of repeating card elements (with different data) or a long listing column of values. This could be menu items on a restaurant menu, profiles on a main page, the list goes on and on. CSS grid provides a way to style nice looking grids, but the underlying HTML still needs to be added one way or another.

Why sit there and type out 100+ different `.card` containers when you can store each card elements data inside a global data file. To then iterate over that global card data and generate multiple elements from only one card containers markup. This could be data fetched from an API and stored in a `.js` file or by simply typing in the data needed by hand into a `_data/*.json` file. 

<h2 id="cascade-note" class="post-heading">The Data Cascade</h2>

Before going any further, I should mention that when building webpages using the Static Site Generator (SSG) Eleventy. Data is being merged from multiple sources before making its way to the template file that gets rendered in the site output directory `_site`. This is what Eleventy calls the [Data Cascade](https://www.11ty.dev/docs/data-cascade/) and its really neat.

<h2 id="data-sources" class="post-heading">Data Sources</h2>

One of my favorite things about Eleventy is the fact that there isn't a prescribed way of merging data within the cascade. There is an [order of priority](https://www.11ty.dev/docs/data-cascade/#sources-of-data) for sources of data in the cascade but that data can defined however you would like. 

Here are a few options for data sources:
- [Global data files](https://www.11ty.dev/docs/data-global/)
- [Computed Data](https://www.11ty.dev/docs/data-computed/)
- [Front Matter Data](https://www.11ty.dev/docs/data-frontmatter/)
- [Template and Directory](https://www.11ty.dev/docs/data-template-dir/)

<h2 id="create-global-data" class="post-heading">Creating a Global Data File</h2>

The global data folder in Eleventy is decided by the [dir.data](https://www.11ty.dev/docs/config/#directory-for-global-data-files) configuration. For this article I will only focus on `.json` global data but you can read more about [other global data](https://www.11ty.dev/docs/data-global/) available to templates if you'd like. The example below creates an array of objects inside the `cards.json` global data file. Each employee object in the array has some filler data to mimic a large page of profile cards or something of that nature.

Let's say company XYZ has 500+ employees and you don't want to sequentially write out the HTML for each employee profile card. If there was an internal data source or API endpoint that contained the data, you could populate a global data file `cards.js` with some JavaScript code to fetch data and export it to be used just as you would `.json` data file. Otherwise, manually inserting data to `cards.json` without performing any data fetching or computing will work just as well.

Next, we need a place where all this employee data can be utilized and rendered. You can create a layout `profiles.njk` inside a new directory called `_includes/layouts/` and begin iterating over the array of card objects in cards.json. You could also just create a `profiles.html` file to iterate over the global data and not use any `.md` files, as the templates are being transformed to HTML at build time.

<h3 class="post-heading">JavaScript files</h3>

When using `.js` global data files, you have the option to export an object or a function using `module.exports`. If you have worked with modules before or have exposed the public API of a Node package on npm, your probably familiar with exporting. Whatever is exported from a `.js` global data file is globally accessible anywhere in your project just as it would with JSON. Here is a short example:

{% filename "card.js" %}

```js
module.exports = {
    name: "11ty Fan Club",
    labels: [
        "11ty",
        "is",
        "cool"
    ],
    members: 11
}
```

The data exported from `card.js` would then have the following template usage. Using the global data filename and accessing properties within the exported object using dot notation:

{% filename "index.njk" %}

{% raw %}

```html
<h1>{{ card.name }}</h1>
<p>Current members: {{ card.members }}</p>

<ul>
    {% for label in card.labels %}
    <li>{{ label }}</li>
    {% endfor %}
</ul>
```

{% endraw %}

If you wanted more freedom to pull in data from another source, or compute it. Then using a custom `.js` global data file will be what you want. Any data that is exported using `module.exports` will be available in the same fashion as data from a `.json` global data file. Below is a basic example of creating a custom global data file for use in templates.

{% filename "customData.js" %}

```js
const fetch = require("node-fetch");

// Fetch some data from the GitHub API
async function getData(url) {
    try {
        repo = await fetch(url).then(data => data.json());
        return {
            ...repo,
            title: repo.name,
            desc: repo.description,
            stars: repo.stargazers_count,
            issues: repo.open_issues
        }
    } catch (err) {
        console.log(err);
    }
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}
```

Then at the end of the file, you can either export an object like `module.exports = {}` or export a function and return the object or data you wish to use globally.

```js
module.exports = async function() {
    try {
        const apiData = await getData("https://api.github.com/repos/tannerdolby/eleventy-photo-gallery");
        return {
            title: "My custom blog post",
            metadata: {
                date: "2021-03-16",
                tags: [
                    "11ty",
                    "JavaScript"
                ]
            },
            trending: random(1, 10) > 7 ? true : false,
            repo: apiData
        }
    } catch (err) {
        console.log(err);
    }
}
```

This is a contrived example, but the sky is the limit with global data files. They provide a blank "data" canvas for you to do whatever you want with your data, which is another reason why 11ty is really cool. You can use the custom global data universally in your project either in a template or markdown file just as you would with a `.json` data file. By using the global data filename like {% raw %}`{{ customData }}`{% endraw %} and then accessing the object properties as necessary.

<details>
<summary>Using Nunjucks in Markdown Files</summary>

{% raw %}

```yml
---
title: Some title
date: 2021-07-08
templateEngineOverride: njk, md
items:
 - 1
 - 2
 - 3
---

{{ title }}

Now using a shortcode in Markdown like this is fine

{% someShortCode "11ty is fast" %}

or using an iteration statement

{% for item in items %}
  {{ item }}
{% endfor %}
```

{% endraw %}

Anything you can do in a template like `.html`, `.njk`, `.liquid` files, can be done in Markdown once you add the `templateEngineOverride` field in frontmatter. 

If you intend on using templating language syntax like liquid or nunjucks in a Markdown file, make sure to set `templateEngineOverride: njk, md` in front matter to allow nunjucks to be handled first then markdown.

</details>

<h3 class="post-heading">JSON files</h3>

If you wanted to only use JSON in your global data file, you could do something like:

{% filename "cards.json" %}

```json
[
    {
        "title": "Card One",
        "name": "Larry",
        "id": 1,
        "posititon": "Systems",
        "scheduled": {
            "monday": true,
            "tuesday": true,
            "wednesday": true,
            "thursday": true,
            "friday": false,
            "saturday": false,
            "sunday": false
        },
        "interests": [
            "Some rad stuff",
            "reading rad blog posts",
            "eleventy"
        ]
    }
]
```

and using the data in a template would look like this:

{% raw %}

```html
<body>
  <h1>{{ customData.title }}</h1>
  <p>{{ customData.metadata.date }}</p>
  <ul>
    {% for tag in customData.metadata.tags %}
    <li>{{ tag }}</li>
    {% endfor %}
  </ul>
  <p>{{ customData.trending }}</p>

  <div class="github">
    <p>GitHub Repostory: {{ customData.repo.name }}</p>
    <p>Stars: {{ customData.repo.stars }}</p>
    <p>Issues: {{ customData.repo.issues }}</p>
  </div>
</body>
```

{% endraw %}

<h2 id="using-global-data" class="post-heading">Iterating Global Data</h2>

Below is an example of the `for` loop syntax in Nunjucks.

{% raw %}
```html
{% for item in sequence %}
    {{ item }}  
{% endfor %}
```
{% endraw %}

Using an iteration statement like the `for` loop, you only have to write a small amount of template HTML for one profile container. Allowing the loop to generate the rest of the card containers markup from your global data. I'm using [Nunjucks](https://mozilla.github.io/nunjucks/) as the templating language for examples in this article, but everything could be done in a `.liquid` template as well. 

> Liquid is the default templating engine in Eleventy. 

To create a loop or conditional statement in [Nunjucks](https://mozilla.github.io/nunjucks/) use {% raw %}`{% code %}`{% endraw %}. If you simply want to access data from front matter or in global data, use {% raw %}`{{ variable }}`{% endraw %}. 

{% raw %}
```html
{% for card in cards %}
    <h2>{{ card.title }}</p>
    <p>Hi, my name is {{ card.name }}</p>
{% endfor %}
```
{% endraw %}

You can access global data files in a markdown file or within a template by using the filename without its file extension. When you have a global data file thats an object, you can access the content by using {% raw %}`{{ cards.title }}`{% endraw %} without any `for` loop. 

If you wanted to iterate over the array of card objects in `_data/cards.json` and generate HTML for a nice grid of employee cards. You can inject global data into a template file using {% raw %}`{{ item }}`{% endraw %} and access the objects we have defined in global data.

{% filename "profiles.njk" %}

{% raw %}
```html
<main class="card-grid">
{% for card in cards %}
    <div class="card">
        <h2>{{ card.title }} - #{{ card.id }}</h2>
        <p>Hi, I'm {{ card.name }} and I work in {{ card.position }}.</p>
        <h3>Interests</h3>
        <ul>
            {% for interest in card.interests %}
            <li>{{ interest }}</li>
            {% endfor %}
        </ul>
        <h3>Schedule</h3>
        <p>On call: {{ card.on-call }}</p>
    </div>
{% endfor %}
</main>
```
{% endraw %}

<h2 id="using-markdown" class="post-heading">Using Markdown</h2>

Let's say you wanted to write an introduction paragraph in markdown underneath the main page title. To start, you would create a `.md` file and add some [front matter data](https://www.11ty.dev/docs/data-frontmatter/) at the top of `cardBanner.md` inside the opening and closing document separators, `---`. 

Front matter in 11ty uses [YAML](https://yaml.org/spec/1.2/spec.html) syntax. The `permalink` is called a [quoted scalar](https://yaml.org/spec/1.2/spec.html#id2760844) where the `title` and `layout` are scalars in the plain style. All the content outside of the document separators within a `.md` file are rendered as regular Markdown. 

Including a [permalink](https://www.11ty.dev/docs/permalinks/) in front matter data when using 11ty allows for URIs to leave out filename extensions. The page `cardBanner.md` will be written to the sites output as `/employees-page/index.html` and accessible from the `/employees-page/` URI.

{% filename "cardBanner.md" %}

{% raw %}
```yaml
---
title: XYZ Company Employee Profile Page
layout: layouts/profiles.njk
permalink: "/employees-page/"
---

Welcome to the employee home page for company XYZ.

The employee cards contain the data fields: 
 - name
 - position 
 - interests
 - weekly schedule

```
{% endraw %}

To include the markdown in `cardBanner.md` within the layout file `global-data-demo.njk`, we can reference it inside the template file `profiles.njk` using {% raw %}`{{ content }}`{% endraw %} and the `safe` filter. 

{% filename "profiles.njk" %}

{% raw %}
```liquid
<body>
    <main>
        <h1>{{ title }}</h1>
        {{ content | safe }}
        <div class="card-grid">
        {% for card in cards %}
            <div class="card">
                <h2>{{ card.title }} - #{{ card.id }}</h2>
                <p>Hi, I'm {{ card.name }} and I work in {{ card.position }}.</p>
                <h3>Interests</h3>
                <ul>
                    {% for interest in card.interests %}
                    <li>{{ interest }}</li>
                    {% endfor %}
                </ul>
                <h3>Schedule</h3>
                <!-- Extra: Index the card.scheduled days -->
            </div>
        {% endfor %}
        </div>
    </main>
</body>
```
{% endraw %}

Now that everything is setup, build with `eleventy` and then serve the app locally using `eleventy --serve`. The employee grid should look like this:

{% img 
   src="profile-grid-demo.png",
   alt="Employee Grid demo page",
   widths=[320, 480, 640, 1024],
   sizes="(max-width: 400px) 33.3vw, 100vw",
   cls="demo-img"
%}

<h2 id="conclusion" class="post-heading">Conclusion</h2>

This is just one method of merging data in Eleventy and if you'd like to learn more, I suggest taking a look at some of the great features Eleventy has to offer such as [Collections](https://www.11ty.dev/docs/collections/), [Pagination](https://www.11ty.dev/docs/pagination/) and [Pages from Data](https://www.11ty.dev/docs/pages-from-data/). The sky is the limit with global data files.

Here is a link to <a href="{{ page.url}}demo/">the live demo</a>

<details>
<summary>View the Source Code</summary>

- [cards.json](https://github.com/tannerdolby/tannerdolby.com/blob/master/src/_data/cards.json) (Global data file)
- [customData.js](https://github.com/tannerdolby/tannerdolby.com/blob/master/src/_data/testData.js) (Custom global data file)
- [cardBanner.md](https://github.com/tannerdolby/tannerdolby.com/blob/master/src/iterate-global-data-demo.md) (Markdown)
- [profiles.njk](https://github.com/tannerdolby/tannerdolby.com/blob/master/src/_includes/layouts/global-data-demo.njk) (Layout)
</details>