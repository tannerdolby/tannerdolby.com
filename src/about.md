---
page_name: About - Tanner Dolby
title: About Me
eleventyExcludeFromCollections: true
permalink: "/about/"
headshot: 
    src: "/images/headshot3.png"
    srcSmall: "/images/headshot3-small.jpg"
layout: about.njk
pageId: main-about
---

Hi there! My name is Tanner Dolby. I am a software engineer and mathematician based out of California. I enjoy working with HTML, CSS, JavaScript, Node, Python, Java, and C++. I'm interested in applying my skills to build software that positvely impacts the lives of others. I started programming in 2018 with Swift and began learning web development using [freeCodeCamp.org](https://freecodecamp.org) in 2019. Ever since then, I've been hooked on writing code and building things for the web. 

My academic background is in mathematics, that is I'm a self taught programmer. I like reading books and technical documentation then going and building things. This has proved to be a really surefire way to fully understand a topic or concept. Throughout my life I've always been a problem solver and enjoyed puzzles or logic games like Sudoku. I like to think of programming as a lifelong journey where there is always something more to learn or become better at.

I spend most of my free time contributing to open source projects on [GitHub][github], learning new things, creating illustrations, building side projects, running, and making front-end demos on [CodePen][codepen]. With the JAMstack movement on the rise, I've taken an interest in Static Site Generators (SSG). In particular [Eleventy][eleventy], which this website is built with.

## Interests

I like to write about programming and technology. I'm currently fixated on learning more about game development with Phaser, Java, Chrome extensions, and Web performance. If you would like to see me write about a specific topic or concept, feel free to message me on Twitter about it. Lately, I've been spending most of my free time learning about Phaser, developing Chrome Extensions and creating illustrations using [Vectornator][vectornator]. I enjoy writing documentation (and referencing it) so when I'm learning new content, I tend to take notes and write a blog post or something to document and reinforce what I learned. 

When I'm not on the computer, you can find me creating illustrations on my iPad, reading a good book, running, skateboarding, finding the best slice of pizza, and trying to become a better photographer.

### Photography

I'm currently using a Sony A7s II camera with a Sony FE 50mm lens. This is my first real deal camera with all the bells and whistles so I'm still trying to figure out how exactly to use it. Once I do, the photos taken will be added to a gallery here on my website to document my journey as a photographer.

<div class="pg-row">
    <div class="camera-block">
        <h4>Specifications</h4>
        <p><span>📸</span> Camera: Sony A7s II</p>
        <p><span>🔍</span> Lens: Sony FE 50mm F1.8</p>
    </div>
</div>

### Good Reads

- Cracking the Coding Interview by Gayle Laakmann McDowell.

- Software Architecture Patterns by Mark Richards.

- Introduction to Algorithms by Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein.

## Education

I received my Bachelor of Science in Applied Mathematics from Arizona State University on May 11, 2020. Due to a [global pandemic][pandemic], the university didn't conduct an in-person commencement ceremenony. Feel free to take a look at the [virtual ceremonies][grad ceremony]. 

During my time at ASU, I worked as an Undergraduate Researcher and Supplemental Instruction leader for Differential Equations. My passion for mathematics and computing became most apparent to me after completing discrete math and linear algebra. At the moment, I don't have plans for attending grad school but I'm interested in pursuing a graduate degree in Computer Science at some point.

{% img %}{{ headshot.srcSmall }}{% endimg %}

## Need More?

I'm interested in all things software related: web development, C++ or Java applications, chrome extensions, technical writing, static sites, JAMstack, system design, illustration and more. Have a look at my [resume][resume] and feel free to [contact me][contact] if you'd like to chat!

<div class="social-icons">
{% for icon in socials %}
- [![{{ icon.name }}]({{ icon.src }})]({{ icon.url }})
{% endfor %}
</div>

[github]: https://github.com/tannerdolby
[codepen]: https://codepen.io/tannerdolby
[eleventy]: https://11ty.dev
[vectornator]: https://www.vectornator.io/
[contact]: /contact/
[resume]: /resume/resume.pdf
[grad ceremony]: https://vgradasu.z4.web.core.windows.net/asu/III/#811351
[pandemic]: https://www.cdc.gov/coronavirus/2019-ncov/index.html