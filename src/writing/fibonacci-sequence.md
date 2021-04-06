---
title: Generate a Fibonacci sequence
date: 2021-02-07
datetime: 2021-02-07 00:00:00 Z
tags:
  - javascript
preview: The Fibonacci sequence is a series of numbers where each number in the sequence is the sum of the two preceding numbers. This sequence begins with 0 and 1.
---

{{ preview }} In mathematics, the Fibonacci numbers form the sequence, where numbers (n) are greater than 1 (n > 1).

To better understand how the fibonacci numbers are created in the sequence, view the below equation for generating any number in the [fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number).

> F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub>

<h2 class="post-heading">Generate the sequence</h2>

Now that the underlying mathematical equation for generating the Fibonacci sequence is known, let's write a JavaScript function to create it.

```js
function fibonacciSeq(n) {
    let arr = [0, 1];
    let num = 0;
    for (var i = 1; i < n; i++) {
        num = arr[i] + arr[i-1];
        arr.push(num);
    }
    return arr;
}
```

The above function `fibonacciSeq` accepts one parameter, the amount of fibonacci numbers to generate in the sequence and returns an array containing the fibonacci sequence. For example, passing in `n = 7` will generate the following sequence:

```js
console.log(fibonacciSeq(7));
// [0, 1, 1, 2, 3, 5, 8, 13]
```

<h3 class="post-heading">Sum the sequence</h3>

You can sum the values in a fibonacci sequence fairly quickly with [`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce). Using a `for` loop would also work (and in some cases is more performant than `reduce`).

```js
function fibonacciSum(n) {
    let arr = [0, 1];
    let num = 0;
    for (var i = 1; i < n; i++) {
        num = arr[i] + arr[i-1];
        arr.push(num);
    }
    return arr.reduce((a, b) => a + b);
}
```