--- 
title: Tanner Dolby's Website
about: I'm a software engineer and mathematician. I enjoy solving problems and building things for the web.
layout: index.njk
eleventyExcludeFromCollections: true
templateEngineOverride: njk, md
metadata:
  title: Tanner Dolby
  desc: Hi, I'm Tanner. A software engineer and mathematician with a passion for building things for the web.
  url: https://tannerdolby.com
  img: https://tannerdolby.com/images/arch-spiral-large.jpg
  img_alt: An Archimedean Spiral generated with JavaScript
  twitter_card_type: summary_large_image
  twitter_handle: tannerdolby
  name: Tanner Dolby
  generator: eleventy
  comments: true
---

<div class="welcome-container">
    <div class="home-banner">
        <div class="hero-content">
            <h1>Hi, I'm {{ site.page_info.name }}.</h1>
            <p>{{ about }}</p>
            <a class="reach-me button hero" href="/contact">Work with me</a>
        </div>
    </div>
</div>