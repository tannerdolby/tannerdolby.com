---
title: Using index files when working with Sass and @use rules
date: 2021-08-22
datetime: 2021-08-22 00:00:00 Z
tags:
 - scss
 - css
preview: With @import at-rules slowly being phased out of the main implementation of Sass (dart-sass) and eventually deprecated, its time to learn how to use @use rules and the neat features that come along with it.
---

{{ preview }}

The main implementation of [Sass](https://sass-lang.com/) is [`dart-sass`](https://sass-lang.com/dart-sass) and for the sake of this article, I will be using the `dart-sass` implementation as it gets new features before any of the other implementations. Before jumping into the details of [`@use`](https://sass-lang.com/documentation/at-rules/use) and [index files](https://sass-lang.com/documentation/at-rules/import#index-files). I want to make a note that `@import` rules in Sass are slowly being phased out and will eventually be deprecated in the next few years.

The Sass team discourages the continued use of the [@import](https://sass-lang.com/documentation/at-rules/import) rule. Sass will gradually phase it out over the next few years, and eventually remove it from the language entirely. Prefer the [@use](https://sass-lang.com/documentation/at-rules/use) rule instead. 

> Only Dart Sass currently supports @use. Users of other implementations must use the @import rule instead.

On GitHub, I [helped drive](https://github.com/mdn/mdn-minimalist/pull/712) the transition from `@import` to `@use` at-rules for [`mdn/mdn-minimalist`](https://github.com/mdn/mdn-minimalist) which is the base Sass that powers [MDN Web Docs](https://developer.mozilla.org/en-US/). This conversion required me to study the Sass docs for transitioning from @import to @use and the details in this article are things I think are important when getting started with using `@use` and or working towards replacing your `@import` at-rules.

<h2 class="post-heading">A new way to import</h2>

Before the `@use` at-rule was introduced to Sass, we relied on importing mixins, variables, stylesheets with the `@import` at-rule. Unfortunately, the `@import` rules introduced many serious issues that can be described on the Sass docs. A few are:

- @import makes all variables, mixins, and functions globally accessible. This makes it very difficult for people (or tools) to tell where anything is defined.
- Because everything’s global, libraries must prefix to all their members to avoid naming collisions.
- Each stylesheet is executed and its CSS emitted every time it’s @imported, which increases compilation time and produces bloated output.

Due to all of these flaws, the Sass team introduced a brand new and improved way to import your Sass stylesheets (mixins, functions, and variables) with `@use`. And honestly, it is so darn good. The old `@import` usage made everything globally accessible and now with `@use` the default namespace is the last component of the URL unless otherwise specified.

<h3 class="post-heading">Using @import</h3>

Before `@use` was introduced in `dart-sass`, if we had a directory mixins (or variables, or functions) like this:

{% filename "./mixins_sr-only.scss" %}

```scss
@mixin screen-reader-only() {
    ...
}
```

{% filename "./mixins_invert.scss" %}

```scss
@mixin invert($c) {
    filter: invert(#{$c}); 
}
```

{% filename "./mixins_square.scss" %}

```scss
@mixin square($x, $y, $c) {
    width: $x;
    height: $y;
    background: $c;
}
```

This means the only way of importing the mixins mean't using numerous `@import` at-rules and one-by-one importing the partial files to our main file for compilation.

{% filename "style.scss" %}

```scss
/* Import the mixins */
@import "./mixins/sr-only";
@import "./mixins/invert";
@import "./mixins/square";

.hidden {
    @include sr-only();
} 

.demo {
    @include invert(0.30);
    @include square(20px, 20px, #f06);
}
```

If you only had a few mixins or files to import, this implementation wouldn't be that bad. But if the `mixins` directory had 30-40 or more [partial files](https://sass-lang.com/documentation/at-rules/use#partials), then writing each `@import` line-by-line would start to be overwhelming in large codebases.

<h3 class="post-heading">The power of @use at-rules</h3>

With the introduction of `@use` at-rules, we have the ability to use [index files](https://sass-lang.com/documentation/at-rules/use#index-files). Using these index files allow us to use [`@forward`](https://sass-lang.com/documentation/at-rules/forward) rules in a `_index.scss` file so that when we load the URL of the directory `./mixins/`, all of the partial files will be loaded with it. Giving us access to an entire directory of sass files with a single `@use` at-rule.

{% filename "./mixins/_index.scss" %}

```scss
@forward "./mixins/sr-only";
@forward "./mixins/invert";
@forward "./mixins/square";
```

Building on the example above, instead of writing three separate `@import` calls to load the URLs of the mixins we need. Simply load the URL representing the directory of partial files with a defined index file. Not only is this usage super clean and maintainable but saves quite a bit of time when many partial files need to be loaded. 

Note: The `@use` at-rules must be placed at the top of the file, before any other content.

{% filename "style.scss" %}

```scss
@use "./mixins/";

.hidden {
    @include mixins.sr-only():
}

.demo {
    @include mixins.invert(0.30);
    @include mixins.invert(20px, 20px, #f06);
}
```

Voila! One thing to note is that the "generic" `@use` at-rule usage will define a default namespace for the loaded content as the final component of the URL. So in our case, the namespace for this `@use` rule will be `mixins`. And accessing the loaded members within the directory will simply require you to reference the namespace with dot notation like `mixins.foo()`.

Sometimes you don't want to have a namespace attached to the loaded folder. Sass gives us the flexibility to define a custom namespace with `@use "<URL>" as <namespace>`

```scss
@use "./mixins/" as m;

.hidden {
    @include m.sr-only():
}

.demo {
    @include m.invert(0.30);
    @include m.invert(20px, 20px, #f06);
}
```
or completely disregard a namespace by not defining one with `@use "<URL>" as *`. This makes it so you can reference loaded members without a namespace and dot notation, just as you would if they were defined in the same file. Note: (only do this if you know there won't be any naming conflicts with other loaded members)

```scss
@use "./mixins/" as *;

.hidden {
    @include sr-only():
}

.demo {
    @include invert(0.30);
    @include invert(20px, 20px, #f06);
}
```

Well that's all folks! I hope this article helps you in converting your projects from `@import` to `@use` at-rules since Sass will be phasing out `@import` over the next few years.
