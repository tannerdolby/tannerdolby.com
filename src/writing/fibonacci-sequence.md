---
title: Generate a Fibonacci sequence
date: 2021-02-07
datetime: 2021-02-07 00:00:00 Z
tags:
  - javascript
preview: The Fibonacci sequence is a series of numbers where a number in the sequence is the sum of the preceding numbers. This sequence begins with 0 and 1. In mathematics, the Fibonacci numbers form the sequence, where numbers (n) are greater than 1 (n > 1).
---

{{ preview }}

To better understand how the fibonacci numbers are created in the sequence, view the below equation for generating any number in the [fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number).

> F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub>

<h2 class="post-heading">Generate the sequence</h2>

Now that the underlying mathematical equation for generating the Fibonacci sequence is known, let's write a JavaScript function to create it.

```js
function fibonacciSeq(n) {
    let sequence = [0, 1];
    for (var i = 1; i < n; i++) {
        let num = arr[i] + arr[i-1];
        sequence.push(num);
    }
    return num;
}
```

The above function `fibonacciSeq` accepts one parameter, the amount of fibonacci numbers to generate in the sequence and returns an array containing the fibonacci sequence. For example, passing in `n = 7` will generate the following sequence:

```js
console.log(fibonacciSeq(7));
// [0, 1, 1, 2, 3, 5, 8, 13]
```
