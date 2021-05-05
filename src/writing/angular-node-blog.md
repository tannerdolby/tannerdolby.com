---
title: Creating a blog template with Angular and Node.js
date: 2021-04-02
datetime: 2021-04-02 00:00:00
permalink: "/writing/{{ title | slug }}/"
tags:
  - angular
  - nodejs
  - javascript
preview: I wanted to use Angular and Node.js for creating a blog template similar to how I would do things in Eleventy. Create one base template that each of the blog posts content can be displayed on. 
---

{{ preview }} It showcases Angular Material, GitHub REST API, Netlify lambda functions and Netlify for hosting.

<h2 class="post-heading">How does it work?</h2>

Coming from a background of using Static Site Generators (Eleventy), I've missed being able to write a bunch of blog posts and put their contents in a *single* post template. Where you have one directory of blog posts, could be Markdown files, HTML files, etc. Then those pages are fed to a "layout", which is essentially just an HTML page which acts as a template or base layout for content that will be added to the page.

With Angular, I thought it wouldn't make much sense to create a component for every blog post, that just seems like unecessary work as the only part that really matters is the Markup or `name.component.html` template file. Unless you needed the HTML files to have specific metadata then it might make sense to have each post be a full blown component. 

The `/assets/pages` directory in the Angular project is where all the blog post `.html` files are stored and post metadata lives in `/assets/blog.json`. 

The `/pages` directory will hold every blog posts `.html` file. If you were thinking about writing a new post, you would first create the file in `/assets/pages` as `some-new-post.html` and give the file some content,

```html
<h1>Welcome to my post!</h1>
<p>This is some text</p>
```

and provide metadata for that post in `/assets/blog.json` by creating a new post object:

```json
[
    {
        "title": "Some New Post",
        "date": "3/29/2021",
        "tags": [
            "mongodb",
            "nosql"
        ],
        "template": "some-post.html",
        "image": "./assets/images/mongodb.jpeg",
        "preview": "Some post preview"
    }
]

```

Now you can sit back and let Node.js do the work of reading the blog post files in `/assets/pages` to extract the HTML content. Then send the metadata and post HTML to the Angular service to be rendered on the page. The [GitHub REST API](https://docs.github.com/en/rest) is used to grab the `blog.json` metadata file and blog posts in the `/pages` directory. This file reading job was originally handled by the File System Module but since Netlify lambda functions don't bring along static assets with them in the `functions` folder, I was forced to fallback to fetching files and their contents using the GitHub API endpoints.

Using a service within the Angular code, we can fetch data from the API endpoints created by the lambda functions which store the responses from hitting the GitHub REST API.

<h2 class="post-heading">Updating API endpoints</h2>

When you deploy your own site using this template on Netlify, you must update the `/assets/endpoints.ts` file which holds all of the API endpoint URLs. The `prod` fields take the highest priority where the other two can be left out in terms of the app running in production after deployment.

{% filename "endpoints.ts" %}

{% raw %}
```ts
export const endpoints = {
    "prod": {
        "post": "https://anodeblog.netlify.app/.netlify/functions/post",
        "postsMetadata": "https://anodeblog.netlify.app/.netlify/functions/metadata",
        "recentPosts": "https://anodeblog.netlify.app/.netlify/functions/metadata",
        "postsByTag": "https://anodeblog.netlify.app/.netlify/functions/tagged"
    },
    "lambda-dev": {
        "post": "http://localhost:9000/.netlify/functions/app/blog/",
        "recentPosts": "http://localhost:9000/.netlify/functions/app/recent",
        "postsMetadata": "http://localhost:9000/.netlify/functions/app/blog",
        "postsByTag": "http://localhost:9000/.netlify/functions/app/blog/topics"
    },
    "express-dev": {
        "post": "http://localhost:4000/blog/",
        "recentPosts": "http://localhost:4000/recent",
        "postsByTag": "http://localhost:4000/blog/topics"
    }
};
```
{% endraw %}

<h2 class="post-heading">What endpoints are available?</h2>

Each of the Netlify lambda functions will be deployed as an API endpoint. That means the following endpoints exist:

| Endpoint | Method | Desc |
|----------|--------|------|
| /.netlify/functions/metadata | GET | Get all of the blog post metadata |
| /.netlify/functions/post?name=some-slug | GET |Get a single blog post by slug. |
| /.netlify/functions/recent | GET | Get three of the most recent blog posts, sorted by creation date. |
| /.netlify/functions/tagged?tag=sometag | GET| Get posts by tag. |

<h2 class="post-heading">Defining Redirects</h2>

Angular projects are usually single page applications (SPAs). Essentially, this means that the page shouldn't really ever be reloaded. Your just visiting different routes in the single page view which serve different content. For example, `my-website.com/blog` would be serving a different component than `my-website/about`. The router outlet is placed in the root components template and this allows the components that correspond with the requested route to be served on the page, all without any page reloading, just re-routing. The `path` keys in `app-routing.module.ts` are where each route will be defined in Angular projects.

That being said, when serving the static files from an Angular project by using `res.sendFile` in Node.js/Express endpoints. I usually only send the `index.html` file from the Angular build files at the `/` root endpoint since the router will handle all the SPA routing. Since Angular focuses on not reloading the page, this can lead to the static file not rendering when the page is refreshed and only showing whatever data was being served as a response to that specific endpoint. This same situation happens on Netlify (as expected). To handle this, Netlify allows us to define some [redirects](https://docs.netlify.com/routing/redirects/) in the `netlify.toml` configuration file. Specifying a `from` and `to` URL string, along with an optional HTTP status code with `status`.

```toml
[build]
    command = "functions"
    publish = "dist/blog-client"

    [[redirects]]
        from = "https://anodeblog.netlify.app/*"
        to = "https://anodeblog.netlify.app"
        status = 200
```

I want to redirect any path that is prefixed with `https://anodeblog.netlify.app` by using the `*` asterisk. This means any route on the website will be redirected to the `to` URL. Therefore, if I refresh the page on `https://anodeblog.netlify.app/blog` the same page will be rendered because we are redirecting `anodeblog.netlify.app/blog` back to `https://anodeblog.netlify.app` which contains the `index.html` from Angular build files where the Router lives and can correctly route to the corresponding component based on the request URL. If the `[[redirects]]` content was not defined in `netlify.toml` then when you attempt to refresh the page on `/blog` it will return a "404 not found" as it can't find or doesn't recognize static files being served at this route.

<h2 class="post-heading">Future work</h2>

It would be really nice to add some sort of Caching mechanism to this template. That way, the GitHub REST API could only be hit once when the site is deployed or on some other event. Then we can use the API data to supply the Angular services and render the content on the page. Currently the API is being called on every page, this is not ideal as the GitHub REST API does have rate limiting built in. Bringing in state management with NgRx would be a good way to keep track of the cached posts in the "store".

<h2 class="post-heading">Closing remarks</h2>

The GitHub REST API does have a limited rate for hitting the endpoints. This causes a small problem as the app relies on the REST API's endpoints for fetching file data. The rate is relatively high per hour but if your site was quite busy this would lead to a problem. I think one way around this is caching the first API requests for metadata and the posts directory then simply reuse that data throughout the app. Making only 1-2 API calls no matter the traffic instead of a call for everytime the a new page is navigated too. Using NgRx for state management would be nice to update the intial store state with the cached API response.

Netlify starter accounts provide really great features for hosting your own website or blog. I've usually only used [Netlify](https://netlify.com) for hosting static sites, but since they introduced [Netlify Lambda functions](), which are essentially AWS Lambda functions. We are now able to host full stack applications through Netlify. The netlify functions we create are deployed as API endpoints which is really cool.

[Pricing is metered](https://www.netlify.com/blog/2018/03/20/netlifys-aws-lambda-functions-bring-the-backend-to-your-frontend-workflow/) for the Netlify Lambda functions so keep that in mind if you choose to host this full stack app with Netlify. Unless you expect alot of site traffic, the Netlify starter account limits are plenty for a personal website.

You can view the [source code](https://github.com/tannerdolby/angular-node-blog) over on GitHub.

Thanks for reading! 🚀