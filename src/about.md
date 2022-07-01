---
page_name: About - Tanner Dolby
title: About Me
eleventyExcludeFromCollections: true
permalink: "/about/"
headshot:
    small: "/images/headshot3-small.jpg"
    med: "/images/tanner-casual-medium.jpg"
    src: "/images/tanner-casual-4.png"
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

Hi there! My name is Tanner Dolby. I'm a Software Engineer and Mathematician based out of California. My academic background is in Applied Mathematics. I like working with Java, Python, JavaScript, HTML, CSS, Node, and C++. I'm interested in applying my skills to build performant software and help others.

I like contributing to open source projects on GitHub and learning new things along the way. I quite often find myself reading technical content, whether it's in book form or documentation on the web and then starting to build things from what I learned. This has proved to be a really surefire way to better understand a topic or concept. Throughout my life I've always liked solving problems, and I think this is why I'm still interested in games like Chess and Sudoku.

I spend most of my free time contributing to open source projects on [GitHub][github], running on a local trail, playing Chess, and making fun experiments on [CodePen][codepen]. With the JAMstack movement on the rise, I've taken an interest in Static Site Generators (SSG). In particular [Eleventy][eleventy], which this website is built with.

## Interests

I enjoy the outdoors and like to go running. I also like writing about programming and technology. I'm currently fixated on learning more about Python, Chess, and Web Performance. If you would like to see me write about a specific topic or concept, feel free to message me on Twitter about it.

### Photography

I have a Sony DSLR camera. This is my first real deal camera with all the bells and whistles so I'm still trying to figure out how exactly to use it. Once I do, the photos taken will be added to a gallery here on the site.

<div class="pg-row">
    <div class="camera-block">
        <h4>Specifications</h4>
        <div class="camera-info">
            <p><span>📷</span>Camera: Sony A7s II</p>
            <p><span>🔍</span>Lens: Sony FE 50mm F1.8</p>
        </div>
    </div>
</div>

### Good Reads

- Java A Beginner's Guide (Eighth Edition) by Herbert Schildt

- Cracking the Coding Interview by Gayle Laakmann McDowell.

- Software Architecture Patterns by Mark Richards.

- Introduction to Algorithms by Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein.

## Education

I received my Bachelor of Science in Applied Mathematics from Arizona State University on May 11, 2020. Due to a [global pandemic][pandemic], the university didn't conduct an in-person commencement ceremenony. Feel free to take a look at the [virtual ceremonies][grad ceremony]. 

During my time at ASU, I worked as an Undergraduate Researcher and Supplemental Instruction leader for Differential Equations. My passion for mathematics and computing became most apparent to me after completing discrete math and linear algebra. At the moment, I don't have plans for attending grad school but I'm interested in pursuing a graduate degree in Computer Science at some point.

{% img %}{{ headshot.src }}{% endimg %}

## Need More?

I'm interested in all things math or software related: Python, Web Development, Open Source, Technical Writing, Static Sites, System Design, and more. Have a look at my [resume][resume] and feel free to [contact me][contact] if you'd like to chat!

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