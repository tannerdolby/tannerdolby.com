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

Hi there! My name is Tanner Dolby. I'm a Software Engineer and Mathematician based in Roseville, CA. I enjoy working with HTML, CSS, JavaScript, Node, React, Python, Java, C++ and Eleventy. I started programming and learning web development using [freeCodeCamp.org](https://freecodecamp.org) in 2017. Ever since then, I've been hooked on writing code and building things for the web.

I focus on building responsive and fast websites. I spend most of my free time contributing to open source, learning new things, creating illustrations, building side projects, running, and making front-end demos on [CodePen](https://codepen.io/tannerdolby). With the JAMstack movement on the rise, I've taken an interest in Static Site Generators (SSG). In particular [Eleventy](https://11ty.dev), which this website is built with.

<h2>Interests</h2>

I like to write about technology and web development. I'm currently fixated on learning more about Python, C++, and Web performance. If you want to see me write about a specific topic or concept, feel free to message me about it. Lately, I've been interested in creating illustrations using [Vectornator](https://www.vectornator.io/). I may write about these hobbies in future posts.

When I'm not on the computer, you can find me creating illustrations on my iPad, reading, running, traveling, skateboarding and trying to become a better photographer.

## Education
I received my Bachelor of Science in Applied Mathematics from Arizona State University on May 11, 2020. Due to a [global pandemic](https://www.cdc.gov/coronavirus/2019-ncov/index.html), the university didn't conduct an in-person commencement ceremenony. Feel free to take a look at the [virtual ceremonies](https://vgradasu.z4.web.core.windows.net/asu/III/#811351). 

During my time at ASU, I worked as an Undergraduate Researcher and Supplemental Instruction leader for Differential Equations. My passion for mathematics and computing became most apparent to me after completing discrete math and linear algebra. At the moment, I don't have plans for attending grad school but I'm interested in pursuing a graduate degree in Computer Science at some point.

{% img %}{{ headshot.srcSmall }}{% endimg %}

## Need More?

I'm available for all things software related: web development, technical writing, static sites, JAMstack, accessibility, illustration and more. Have a look at my [resume](/resume/resume.pdf) and feel free to [contact me](/contact/) if you'd like to chat!

<div class="social-icons">
{% for icon in socials %}
- [![{{ icon.name }}]({{ icon.src }})]({{ icon.url }})
{% endfor %}
</div>