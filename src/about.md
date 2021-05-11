---
page_name: About - Tanner Dolby
title: About Me
eleventyExcludeFromCollections: true
permalink: "/about/"
headshot: 
    src: "/images/headshot3.png"
    srcSmall: "/images/headshot3-small.jpg"
layout: about.njk
---

Hi there! My name is Tanner Dolby. I'm a Software Engineer and Mathematician based in Sacramento, CA. I enjoy working with HTML, CSS, JavaScript, Angular, Node.js, Java, Go, MongoDB, and Eleventy. I started to learn web development using [freeCodeCamp.org](https://freecodecamp.org) in 2017. Ever since then, I've been hooked on building things for the web.

I focus on building responsive and fast websites. Recently, I've been learning about Cloud computing and how to develop applications using the MEAN stack. I spend my free time building side-projects, reading, creating fun CSS illustrations or making front-end demos on [CodePen](https://codepen.io/tannerdolby). With the JAMstack movement on the rise, I've taken an interest in Static Site Generators (SSG). In particular [Eleventy](https://11ty.dev), which this website is built with.

<h2 style="margin-top: .5rem;">Interests</h2>

I like to write about technology and web development. I'm currently fixated on learning more about the MEAN stack, JavaScript, Go Lang, Cloud computing, and Web performance. If you want to see me write about a specific topic or concept, feel free to message me about it. Lately, I've been very interested in CSS illustrations and SVG. I may write about these hobbies in future posts.

## Education
I received my Bachelor of Science in Applied Mathematics from Arizona State University on May 11, 2020. Due to a [global pandemic](https://www.cdc.gov/coronavirus/2019-ncov/index.html), the university didn't conduct an in-person commencement ceremenony. Feel free to take a look at the [virtual ceremonies](https://vgradasu.z4.web.core.windows.net/asu/III/#811351). 

During my time at ASU, I worked as an Undergraduate Researcher and Supplemental Instruction leader for Differential Equations. My passion for mathematics and computing became most apparent to me after completing discrete math and linear algebra. At the moment, I don't have plans for attending grad school but I'm interested in learning about [Knot Theory](https://en.wikipedia.org/wiki/Knot_(mathematics)).

{% img %}{{ headshot.srcSmall }}{% endimg %}

## Need More?

I'm available for all things web related: web development, technical writing, static sites, JAMstack, accessibility, UI design and more. Feel free to [contact me](/contact/) if you'd like to chat!

<div class="social-icons">
{% for icon in socials %}
- [![{{ icon.name }}]({{ icon.src }})]({{ icon.url }})
{% endfor %}
</div>