--- 
title: Tanner Dolby's Website
about: I'm a software engineer, designer, and mathematician. I enjoy building things for the web that are accessible and performant.
layout: base.njk
eleventyExcludeFromCollections: true
templateEngineOverride: njk, md
---

<header class="welcome-container">
    <div class="home-banner">
        <div class="hero-content">
            <h1>Hi, I'm {{ site.page_info.name }}.</h1>
            <p>{{ about }}</p>
            <a class="reach-me button hero" href="/contact">Work with me</a>
        </div>
    </div>
</header>