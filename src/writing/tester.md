---
title: My blog page
tags:
    - green
---

## {{ title }}

{% for post in collections.posts %}
- [{{ post.data.title }}]({{ post.url }})
{% endfor %}
