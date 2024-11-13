---
page_name: About - Tanner Dolby
title: About Me
eleventyExcludeFromCollections: true
permalink: "/about/"
headshot:
    small: "/images/headshot3-small.jpg"
    med: "/images/tanner-casual-medium.jpg"
    oldSrc: "/images/tanner-casual-4.png"
    src: "/images/TannerGradPhotos.jpg"
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
templateEngineOverride: njk, md
---

Hi there! My name is Tanner Dolby. I'm a Software Engineer with a background in Applied Math. I like working with JavaScript, HTML, CSS, Node.js, React, Next.js, Python, and Java. I'm interested in building performant systems and helping others through software. I enjoy being creative, contributing to open source projects on GitHub, and learning new things.

## Experience

{% jobInfo "Software Developer at IBM", "Aug 2024 - Present" %}
{% jobInfo "Software Engineer at WorkHound", "Aug 2022 - Aug 2024" %}
{% jobInfo "Software Engineer at Tata Consultancy Services", "Jan 2021 - Aug 2022" %}

## Interests

I like reading books, mountain biking, running, skateboarding, playing golf, and finding the best coffee shops. I enjoy learning new things and I'm always tinkering on some sort of project. When I'm not doing something outside, I spend most of my time reading, contributing to open source projects on [GitHub][github], playing Chess, and making fun experiments on [CodePen][codepen].

I've taken an interest in Static Site Generators (SSGs), specifically [Eleventy][eleventy], which this website is built with.

### Books
Whether I'm reading for fun or to learn something new, it brings me a lot of happiness because there's always a new story I can become immersed in. Lately, I've been into fantasy, adventure, and sci-fi books, but I'm always open to book recommendations of any genre!

Follow along on [Goodreads](https://www.goodreads.com/user/show/174342604-tanner-dolby).

<h4 class="h3-5">Tech</h4>

<ul class="book-list">
  <li>Java A Beginner's Guide (Eighth Edition) by Herbert Schildt</li>
  <li>Cracking the Coding Interview by Gayle Laakmann McDowell</li>
  <li>Software Architecture Patterns by Mark Richards</li>
  <li>Introduction to Algorithms by Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein</li>
</ul>

## Education

I received my Bachelor of Science in Applied Mathematics from Arizona State University on May 11, 2020. 

During my time at ASU, I worked in the Academic Success Center as a Supplemental Instruction leader for Differential Equations. I also worked as an Undergraduate Researcher in a lab focusing on dynamic systems with applications in life and social science. I've always been intrigued by numbers and how systems work.

## Need More?

{% img
  src="tanner-graduation-headshot.jpeg",
  alt="ASU graduation photo",
  widths=[400],
  cls="headshot-img",
  id="graduation-headshot"
%}

I'm interested in all things math or software related. Have a look at my [resume][resume] and feel free to [contact me][contact] if you'd like to chat!

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
[nextjs]: https://nextjs.org/
[vectornator]: https://www.vectornator.io/
[contact]: /contact/
[resume]: /resume.pdf
[grad ceremony]: https://vgradasu.z4.web.core.windows.net/asu/III/#811351
[pandemic]: https://www.cdc.gov/coronavirus/2019-ncov/index.html
