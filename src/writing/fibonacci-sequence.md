---
title: Generate a Fibonacci sequence
date: 2021-08-13
datetime: 2021-08-13 00:00:00 Z
tags:
  - javascript
permalink: "/writing/{{ title | slug }}/"
preview: The Fibonacci sequence is a series of numbers where each number in the sequence is the sum of the two preceding numbers. This sequence begins with 0 and 1.
---

{{ preview }} In mathematics, the Fibonacci numbers form the sequence, where numbers (n) are greater than 1 (n > 1).

To better understand how the fibonacci numbers are created in the sequence, view the below equation for generating any number in the [fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number).

> F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub>

<h2 class="post-heading">Generate the sequence</h2>

Now that the underlying mathematical equation for generating the sequence is known, let's write a solution using an iterative approach.

```js
function fibonacciSeq(n) {
    if (n == 1) return [0];
    if (n == 2) return [0,1];
    let arr = [0, 1];
    for (let i = 2; i < n; i++) {
        arr.push(arr[i-1] + arr[i-2]);
    }
    return arr;
}
```

The above function `fibonacciSeq` accepts one parameter, the amount of fibonacci numbers to generate in the sequence and returns an array containing the fibonacci sequence from (0, n). For example, passing in `n = 7` will generate the following sequence:

```js
console.log(fibonacciSeq(7));
// [0, 1, 1, 2, 3, 5, 8]
```

Using a recursive approach we can accomplish the same:

```js
function recursiveFibSeq(n) {
    if (n == 2) return [0,1];
    if (n == 1) return [0];
    let arr = recursiveFibSeq(n-1);
    arr.push(arr[n-2] + arr[n-3]);
    return arr;
}
```