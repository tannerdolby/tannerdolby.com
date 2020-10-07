---
title: Generate Page Content from a Global Data File using 11ty
shortname: 11ty Iterate Global Data
permalink: "/writing/web/{{ shortname | slug }}/"
dateCreated: 2020-10-05 00:00:00 Z
preview: There are many great features to choose from when building websites with Eleventy (11ty). One thing in particular that I find very useful is the ability to iterate a global data file to generate page content.
---

{{ preview }}

While learning about [11ty](https://11ty.dev) and building sites. I've really enjoyed the ability to have [Global Data files](https://www.11ty.dev/docs/data-global/), which can be accessed by any template in the project structure. I think its safe to say we've all encountered that moment when faced with creating a large grid of repeating card elements (with different data) or a long listing column of values. 

Why sit there and type out 30 different `.card` containers when you can store each card elements data inside a global `.json` data file. To then iterate through that global card data and generate 30 elements from only one `.card` containers markup within a layout or markdown file. This could be data fetched from an API and stored in a `.json` file or by simply typing in the data needed by hand into a `_data/*.json` file. 

Before going any further, I should mention that when building webpages using the Static Site Generator (SSG) Eleventy. Data is being merged from multiple sources before making its way to the actually template file that gets rendered in the site output directory `_site`. This is what Eleventy calls the [Data Cascade](https://www.11ty.dev/docs/data-cascade/) and its really neat.

<h3>Choices for Data Sources</h3>

One of my favorite things about Eleventy is the fact that there isn't a prescribed way of merging data within the cascade. There is an [order of priority](https://www.11ty.dev/docs/data-cascade/#sources-of-data) for sources of data in the cascade but that data can defined however you would like. It could be stored as [Computed Data](https://www.11ty.dev/docs/data-computed/), [Front Matter Data](https://www.11ty.dev/docs/data-frontmatter/) in a template or layout file, [template and directory](https://www.11ty.dev/docs/data-template-dir/) data files and lastly global data files.

<h2>Creating a Global Data File</h2>

The global data folder in Eleventy is decided by [dir.data](https://www.11ty.dev/docs/config/#directory-for-global-data-files) configuration. For this article I will only focus on `.json` global data but you can read more about [other global data](https://www.11ty.dev/docs/data-global/) available to templates if you'd like.

The example below creates an array of objects inside the `cardData.json` global data file. Each employee card object in the array has some filler data to mimic a large page of profile cards or something of that nature.

{% filename "cardData.json" %}

```json
[
    {
        "cardOne": {
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
    }
]
```

Let's say there were 20 employees at this company and you didn't want to sequentially write out the HTML for each employee profile card. You can create a template file `profiles.njk` inside a new directory called `_includes/layouts/` and save a chunk of time by iterating through the array of card objects in `cardData.json`. This way, you only write a small bit of template HTML for one profile container and let a for loop generate the rest from your global data. Also, this {% raw %}`{% code %}`{% endraw %} and {% raw %}`{{ variable }}`{% endraw %} syntax is the templating language [Nunjucks](https://mozilla.github.io/nunjucks/).

{% filename "profiles.njk" %}
{% raw %}
```html
<body>
    <h1>XYZ Company Employee Profile Page</h1>
    <main>
        <div class="card-grid">
            {% for card in cards %}
                <h2>{{ card.title }} - #{{ card.id }}</h2>
                <p>Hi, I'm {{ card.name }} and I work in {{ card.position }}.</p>
                <h3>Interests</h3>
                <ul>
                    {% for interest in card.interests %}
                    <li>{{ interest }} &nbsp;</li>
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
            {% endfor %}
        </div>
    </main>
</body>
```
{% endraw %}

<h3>Full page Markup</h3>

{% filename "profiles.njk" %}
{% raw %}
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Employee Profiles page</title>
        <link rel="stylesheet" src="style.css">
    </head>
    <body>
        <h1>XYZ Company Employee Profile Page</h1>
        <main>
            <div class="card-grid">
                {% for card in cards %}
                    <h2>{{ card.title }} - #{{ card.id }}</h2>
                    <p>Hi, I'm {{ card.name }} and I work in {{ card.position }}.</p>
                    <h3>Interests</h3>
                    <ul>
                        {% for interest in card.interests %}
                        <li>{{ interest }} &nbsp;</li>
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
                {% endfor %}
            </div>
        </main>
    </body>
</html>
```
{% endraw %}

<h3>Concluding Remarks</h3>

This is just one method of merging data in Eleventy and if you'd like to learn more. I suggest taking a look at some of the great features Eleventy has to offer such as [Collections](https://www.11ty.dev/docs/collections/), [Pagination](https://www.11ty.dev/docs/pagination/) and [Pages from Data](https://www.11ty.dev/docs/pages-from-data/). 

