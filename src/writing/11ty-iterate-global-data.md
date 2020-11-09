---
title: Generate Page Content From a Global Data File Using Eleventy
shortname: 11ty Iterate Global Data
date: 2020-10-08
datetime: 2020-10-08 00:00:00 Z
preview: There are many great features to choose from when building websites with Eleventy. One feature in particular that I find very useful is the ability to iterate over a global data file and generate page content using Nunjucks.
tags: 
    - eleventy
    - nunjucks
    - html
permalink: "/writing/{{ shortname | slug }}/"
---

{{ preview }} 

In 11ty, when you create [global data files](https://www.11ty.dev/docs/data-global/) they are placed inside the `_data` directory. The data files can be accessed by any template in the project structure. Global data files can be stored as JSON `.json` or values from `module.exports` in a JavaScript `.js` file.

<h2 class="post-heading">Use Cases</h2>
I think its safe to say when building a website, you might be faced with creating a large grid of repeating card elements (with different data) or a long listing column of values. This could be menu items on a restaurant menu, profiles on a main page, the list goes on and on. 

Why sit there and type out 30 different `.card` containers when you can store each card elements data inside a global data file. To then iterate through that global card data and generate 30 elements from only one card containers markup. This could be data fetched from an API and stored in a `.json` file or by simply typing in the data needed by hand into a `_data/*.json` file. 

<h2 id="cascade-note" class="post-heading">The Data Cascade</h2>

Before going any further, I should mention that when building webpages using the Static Site Generator (SSG) Eleventy. Data is being merged from multiple sources before making its way to the template file that gets rendered in the site output directory `_site`. This is what Eleventy calls the [Data Cascade](https://www.11ty.dev/docs/data-cascade/) and its really neat.

<h2 id="data-sources" class="post-heading">Data Sources</h2>

One of my favorite things about Eleventy is the fact that there isn't a prescribed way of merging data within the cascade. There is an [order of priority](https://www.11ty.dev/docs/data-cascade/#sources-of-data) for sources of data in the cascade but that data can defined however you would like. 

Here are a few options for data sources:
- [Computed Data](https://www.11ty.dev/docs/data-computed/)
- [Front Matter Data](https://www.11ty.dev/docs/data-frontmatter/)
- [Template and Directory](https://www.11ty.dev/docs/data-template-dir/)

<h2 id="create-global-data" class="post-heading">Creating a Global Data File</h2>

The global data folder in Eleventy is decided by the [dir.data](https://www.11ty.dev/docs/config/#directory-for-global-data-files) configuration. For this article I will only focus on `.json` global data but you can read more about [other global data](https://www.11ty.dev/docs/data-global/) available to templates if you'd like.

The example below creates an array of objects inside the `cards.json` global data file. Each employee card object in the array has some filler data to mimic a large page of profile cards or something of that nature.

Let's say company XYZ has many employees and you don't want to sequentially write out the HTML for each employee profile card. You can create a layout `profiles.njk` inside a new directory called `_includes/layouts/` and begin iterating over the array of card objects in cards.json. You could also just create a `profiles.html` file to iterate over the global data and not use any `.md` files.

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

<h2 id="using-global-data" class="post-heading">Using Global Data</h2>

Below is an example of the `for` loop syntax in Nunjucks.

{% raw %}
```html
{% for item in sequence %}
    {{ item }}  
{% endfor %}
```
{% endraw %}

This way, you only write a small amount of template HTML for one profile container. Allowing the `for` loop to generate the rest of the card containers markup from your global data. 

I'm using [Nunjucks](https://mozilla.github.io/nunjucks/) as the templating language for examples in this article, but everything could be done in a `.liquid` template as well. Liquid is the default templating engine for sites created with Eleventy. 

To create a loop or conditional statement use {% raw %}`{% code %}`{% endraw %}. If you simply want to access data from front matter or in global data, use {% raw %}`{{ variable }}`{% endraw %}. 

{% raw %}
```html
{% for card in cards %}
    <h2>{{ card.title }}</p>
    <p>Hi, my name is {{ card.name }}</p>
{% endfor %}
```
{% endraw %}

You can access global data files in a markdown file or within a template by using the filename without its file extension. When you have a global data file thats an object, you can access the content by using {% raw %}`{{ cards.title }}`{% endraw %} without any `for` loop. If you wanted to iterate over the array of card objects in `_data/cards.json`, you would use the code below.

{% filename "profiles.liquid" %}

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
        <ol>
            <li>Sunday: {{ card.scheduled.sunday }}</li>
            <li>Monday: {{ card.scheduled.monday }}</li>
            <li>Tuesday: {{ card.scheduled.tuesday }}</li>
            <li>Wednesday: {{ card.scheduled.wednesday }}</li>
            <li>Thursday: {{ card.scheduled.thursday }}</li>
            <li>Friday: {{ card.scheduled.friday }}</li>
            <li>Saturday: {{ card.scheduled.saturday }}</li>
        </ol>
    </div>
{% endfor %}
</main>
```
{% endraw %}
</div>

<h2 id="using-markdown" class="post-heading">Using Markdown</h2>

Let's say you wanted to write an introduction paragraph in markdown underneath the main page title. To start, you would create a `.md` file and add some [front matter data](https://www.11ty.dev/docs/data-frontmatter/) at the top of `cardBanner.md` inside the opening and closing document seperators, `---`. 

Front matter in 11ty uses [YAML](https://yaml.org/spec/1.2/spec.html) syntax. The `permalink` is called a [quoted scalar](https://yaml.org/spec/1.2/spec.html#id2760844) where the `title` and `layout` are scalars in the plain style. All the content outside of the document seperators within a `.md` file are rendered as regular Markdown. 

Including a [permalink](https://www.11ty.dev/docs/permalinks/) in front matter data when using 11ty allows for URIs to leave out filename extensions. The page `cardBanner.md` will be written to the sites output as `/employees-page/index.html` and accessible from the `/employees-page/` URI.

{% filename "cardBanner.md" %}

{% raw %}
```yaml
---
title: XYZ Company Employee Profile Page
layout: layouts/profiles.njk
permalink: "/employees-page/"
---

Welcome to the employee home page for company XYZ. The employee cards contain the data fields: name, position, interests and weekly schedule. If you are a new employee and don't see your name on this list, please contact the HR department.

```
{% endraw %}

To include the markdown in `cardBanner.md`, we can reference it inside the template file `profiles.njk` using {% raw %}`{{ content }}`{% endraw %} and the `safe` filter. 

<h2 id="conclusion" class="post-heading">Conclusion</h2>

This is just one method of merging data in Eleventy and if you'd like to learn more. I suggest taking a look at some of the great features Eleventy has to offer such as [Collections](https://www.11ty.dev/docs/collections/), [Pagination](https://www.11ty.dev/docs/pagination/) and [Pages from Data](https://www.11ty.dev/docs/pages-from-data/). 

Here is a link to <a href="{{ page.url }}demo/">the live demo</a>.