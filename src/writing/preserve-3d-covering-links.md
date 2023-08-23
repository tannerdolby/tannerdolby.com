---
title: How transform-style made links unreachable on my website
author: Tanner Dolby
datetime: 2023-07-18 00:00:00 Z
date: 2023-07-18
tags:
    - css
    - firefox
preview: "I discovered some nested links weren't working on my site. After sifting through each page, I finally noticed that there was a CSS rule applying transform-style: preserve-3d to the entire home page instead of only the element that needed it, which caused unexpected rendering of nested links."
permalink: "/writing/{{ title | slug }}/"
---

{{ preview }}

<h2 class="post-heading">How to spot this?</h2>

I only noticed this behavior happening on Firefox, but the warning signs could probably be applied to all browsers.

- nested links not being hoverable or clickable
- inspecting an element in DevTools and being directed to the parent container for which your link is nested inside instead of taking you directly to the corresponding element

Why did this happen? Essentially, I had applied [`transform-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style) to all the elements on the page with:

```css
*,
*::before,
*::after {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
```

and this caused nested content to be rendered in a way where the top-level parent container appeared "above" or at the top of some stacking context (not z-index, but how nested elements are rendered in 3D space). Thus covering and essentially rendering the nested links useless as they couldn't be interacted with.

I'd recommend not applying `transform-style` to the whole page like I mistakenly had done, unless you are keeping track or defining how all nested elements are rendered in 3D space.

<h2 class="post-heading">The Fix</h2>

The resolution was simply applying the `transform-style` to only the elements on the page that needed it, instead of applying it to the whole page. In my case, there was a single element (3D cube CSS drawing) that required `transform-style: preserved-3d;`, after updating the selectors to only target the cube drawing, all my nested links started working again.

If you ever find yourself in a situation where nested links aren't rendering in the browser as expected, try looking for a `transform-style` declaration in the CSS as that could be what's causing rendering issues with nested links.
