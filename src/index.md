--- 
pageName: Tanner Dolby - Developer, Mathematician, Designer
about: I'm a front-end developer, designer, and mathematician. I enjoy building things for the web that are accessible and performant.
layout: base.njk
eleventyExcludeFromCollections: true
---

<header class="welcome-container">
    <div class="home-banner">
        <h1>Hi, I'm {{ site.page_info.name }}.</h1>
        <p>{{ about }}</p>
        <a class="reach-me button" href="mailto:{{ site.page_info.email }}">Work with me</a>
    </div>
</header>