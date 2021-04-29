---
title: Build a Node.js application
tags:
  - nodejs
  - javascript
preview: Creating applications with Node.js begins with a web server, request, router, and request handler. Frameworks like Express.js speed up development by providing a robust set of features to build web applications and APIs.
permalink: "/writing/{{ title | slug }}/"
date: 2021-04-14
datetime: 2021-04-14 00:00:00 Z
---

{{ preview }}

Building Node.js applications doesn't have to be scary. Sure, large applications will have much greater complexity than a simple Node app but the underlying logic of how Node apps work won't change. You need a web server to allow web clients to make requests to, a view or page to display the servers response, routers to handle specific request, and lastly request handlers to handle requests sent to the server which have been routed by the router.

<h2 class="post-heading">What is a Node.js app?</h2>

The first thing you need to implement in a Node.js application, is a server. The web server will allow users to make requests. The HTTP protocol is used for handling transmission of data on the Web (ie client/server model). This means that information exchange between the client and server is half-duplex. Since the HTTP protocol is half-duplex, it can only allow one way information exchange. For example, if a web client makes a request to the server, the server cannot send back a response until that request is received and "completed". Below is a small example of how information is sent using the HTTP protocol.

```text
             (Request)
|--------| ------------> |--------|
| Client |               | Server |
|--------| <------------ |--------|
             (Response)               
```

<h3 class="post-heading">Create a basic server</h3>

Creating a basic HTTP server only takes a few steps. Require the HTTP module and then call the `createServer` function on the HTTP module to create the server. This function returns an object which has a method called `listen` that allows us to specify the port which the server should run on.

The `createServer` function takes one argument, an anonymous or "named" function that handles requests and responses. This callback function allows us to utilize the asynchronous event driven model in Node.js by handling requests when they arrive and continue executing other code when waiting for a request in a non-blocking fashion.

Why use callbacks? Well, we don't want the web server to be started and then pause or stop executing in between requests. When multiple requests come, we also don't want the server to wait to execute the second request until the first is complete in a blocking way. The idea of the callback function helps us to avoid these synchronous and blocking scenarios and really utilize the async event driven paradigm in Node.

{% filename "server.js" %}

{% raw %}

```js
const http = require('http');
const port = process.env.PORT || 8080;

http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Hello World!</h1>");
    res.end();
}).listen(port, () => {
    console.log(`App is running on port ${port}`);
});
```

{% endraw %}

The above code will create an HTTP server listening on port 8080 and define the response for any incoming requests. The `req` object has a property `url` that holds the request URL value, e.g. a request on http://localhost:8080 would have a `req.url = "/"`.

The `writeHead` method on the response object defines an HTTP status code and headers for a response. Next, we send some HTML in the response and finally end the response with `res.end()`. 

Since we haven't defined a router, all requests on `http://localhost:8080/*` will be handled the same way and send the `text/html` response:
 
```
<h1>Hello world!</h1>
```

<h2 class="post-heading">

<h2>Blah</h2>

We also need a view or template to display the response from the server. When we make a request to the server, it will send a response back with a payload of information.


