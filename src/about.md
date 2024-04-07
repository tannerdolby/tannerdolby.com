---
page_name: About - Tanner Dolby
title: About Me
eleventyExcludeFromCollections: true
permalink: "/about/"
headshot:
    small: "/images/headshot3-small.jpg"
    med: "/images/tanner-casual-medium.jpg"
    oldSrc: "/images/tanner-casual-4.png"
    src: "/images/tanner-asu-grad-headshot.png"
layout: about.njk
pageId: main-about
metadata:
  title: About - tannerdolby.com
  desc: About Tanner Dolby
  url: https://tannerdolby.com/about/
  img: https://tannerdolby.com/images/arch-spiral-large.jpg
  img_alt: An Archimedean Spiral
  twitter_handle: tannerdolby
  name: Tanner Dolby
  generator: eleventy
  comments: true
---

Hi there! My name is Tanner Dolby. I'm a Software Engineer and Mathematician based out of California. My academic background is in Applied Mathematics and I received my degree from ASU. I like working with JavaScript, Python, Node.js, React, 11ty, HTML, and CSS. I'm interested in applying my skills to build performant software and help others. I enjoy contributing to open source projects on GitHub and building fun side projects.

## Experience

<div class="experience-container">
    <div>
        <div class="job-title">Software Engineer at WorkHound</div>
        <p class="job-duration">Aug 2022 - Present</p>
    </div>
</div>

<div class="experience-container">
    <div>
        <div class="job-title">Software Engineer at Tata Consultancy Services</div>
        <p class="job-duration">Jan 2021 - Aug 2022</p>
    </div>
</div>

## Interests

I like to go running, skateboarding, and enjoy the outdoors. I enjoy reading books and learning new things. When I'm not doing something outside, I spend most of my time reading, contributing to open source projects on [GitHub][github], playing Chess, and making fun experiments on [CodePen][codepen]. I've taken an interest in Static Site Generators (SSG). In particular [Eleventy][eleventy], which this website is built with.

### Books
Whether I'm reading for fun or to learn something new, it brings me a lot of happiness because there's always a new story I can dive into. Lately, I've been into fantasy, adventure, and sci-fi books, but I'm always open to book recommendations of any genre!

<h4 class="h3-5">Fun</h4>

<ul class="book-list">
    <li>The Fallen by Ada Hoffmann</li>
    <li>The Outside by Ada Hoffman</li>
    <li>The Eight by Katherine Neville</li>
    <li>The Alchemist by Paulo Coelho</li>
</ul>

<h4 class="h3-5">Tech</h4>

<ul class="book-list">
    <li>Java A Beginner's Guide (Eighth Edition) by Herbert Schildt</li>
    <li>Cracking the Coding Interview by Gayle Laakmann McDowell</li>
    <li>Software Architecture Patterns by Mark Richards</li>
    <li>Introduction to Algorithms by Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein</li>
</ul>

## Education

I received my Bachelor of Science in Applied Mathematics from Arizona State University on May 11, 2020. 

During my time at ASU, I worked as an Undergraduate Researcher and Supplemental Instruction leader for Differential Equations. My passion for mathematics and computing became most apparent to me after completing discrete math and linear algebra. At the moment, I don't have plans for attending grad school but I'm interested in pursuing a graduate degree in Computer Science at some point.

{% img %}{{ headshot.src }}{% endimg %}

## Need More?

I'm interested in all things math or software related: JavaScript, Python, React, and more. Have a look at my [resume][resume] and feel free to [contact me][contact] if you'd like to chat!

<div class="social-icons">
{% for icon in socials %}
    {% if icon.name != "LeetCode" %}
- [![{{ icon.name }}]({{ icon.src }})]({{ icon.url }})
    {% endif %}
{% endfor %}
</div>


[github]: https://github.com/tannerdolby
[codepen]: https://codepen.io/tannerdolby
[eleventy]: https://11ty.dev
[vectornator]: https://www.vectornator.io/
[contact]: /contact/
[resume]: /resume.pdf
[grad ceremony]: https://vgradasu.z4.web.core.windows.net/asu/III/#811351
[pandemic]: https://www.cdc.gov/coronavirus/2019-ncov/index.html