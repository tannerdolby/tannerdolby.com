---
title: Solving the Diagonal Difference Problem
date: 2021-01-31
datetime: 2021-01-31 00:00:00 Z
tags:
  - javascript
  - hackerrank
permalink: "/writing/{{ title | slug }}/"
preview: This article will discuss how to solve the "diagonal difference" problem which involves calculating the diagonal difference of a n x n size square matrix.
---

{{ preview }} This problem can be found on [HackerRank](https://www.hackerrank.com/), a website for practicing common technical interview algorithm questions. 

<h2 class="post-heading">Getting Started</h2>

To begin, we are given a n x n square matrix as input. We're asked to create a function that returns the diagonal difference of the matrix. To understand what "diagonal" means in this context, think of a diagonal line starting from the top left corner within the matrix and running to the bottom right corner. This would be the "left diagonal" and the "right diagonal" would start at the top right corner and run to the bottom left, spanning each of the numbers in its path. 

For a more visual representation, consider this 4 x 4 square matrix:

```js
2 4 5 6
8 3 1 3
7 9 4 2
5 8 3 6
```

If we start at the top left corner (the first index, 2) and move to the right one unit and down one unit we end up at `3`. Continuing along this "diagonal" path, we end up with the values (2, 3, 4, 6) for the left diagonal. Following the same logic to find the "right diagonal", we start in the right corner (the last index of the first row, 6) and move left one unit and down one unit. Do this until you reach the bottom left corner and you will have the values (6, 1, 9, 5) for the right diagonal.

<h2 class="post-heading">Writing Code</h2>

Now that we have better understanding of how to find the "diagonal" values in a square matrix, let's write some JavaScript code and solve the problem. To begin, the sample input will be a two-dimensional Array. If your not familiar with 2D arrays, they look like this:

```js
[[2, 4, 5, 6], [8, 3, 1, 3], [7, 9, 4, 2], [5, 8, 3, 6]]
```

Where one array holds many other arrays inside of it, hence the "two-dimensional" array definition. If we were to write a iteration statement, like a `for` loop on the outer array. It would iterate over each of the "inner" arrays. Here is an example:

```js
let arr = [[2, 4, 5, 6], [8, 3, 1, 3], [7, 9, 4, 2]];
for (var i = 0; i < arr.length; i++) {
    console.log(arr[i], `(equals arr[${i}])`);
}
// [2, 4, 5, 6] (equals arr[0])
// [8, 3, 1, 3] (equals arr[1])
// [7, 9, 4, 2] (equals arr[2])
```

Each of the inner arrays would be output using the following iteration statement and a `console.log` call to print the arrays to the console. To access the inner array values, we will need to use two indexes, `arr[firstIndex][secondIndex]`. The `firstIndex` will access the inner array from the outer "parent" array and the `secondIndex` will be the index within the inner array that we retreive a value for. 

To better understand working with 2D arrays, we will use another nested iteration statement to understand where the `secondIndex` comes into play.

```js
let arr = [[2, 4, 5, 6], [8, 3, 1, 3], [7, 9, 4, 2], [5, 8, 3, 6]];
let n = arr.length; // equals 4 (4 inner arrays)
for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
        console.log(`(${i}, ${j})`);
    }
}
```
The above code will output each index of the 2D array. Each output to the console is separated by a newline but I will format it into a 4 x 4 matrix for better visualization.

```js
(0, 0) (0, 1) (0, 2) (0, 3) // [2, 4, 5, 6]
(1, 0) (1, 1) (1, 2) (1, 3) // [8, 3, 1, 3]
(2, 0) (2, 1) (2, 2) (2, 3) // [7, 9, 4, 2]
(3, 0) (3, 1) (3, 2) (3, 3) // [5, 8, 3, 6]
```

Now we have a good grasp of what the 2D array looks like in terms of the array indexes, let's write some logic to calculate the "diagonal difference". That is, the absolute value of the left diagonal minus the right diagonal `|(2 + 3 + 4 + 6) - (6 + 1 + 9 + 5)|`.

<h2 class="post-heading">Calculate the Diagonal Difference</h2>

If you study the above square matrix, you will notice the left diagonal values occur when the first index equals the second index. That is, when `i == j` (if you use i and j as loop control variables). Each value within the left diagonal occurs at (0, 0), (1, 1), (2, 2), (3, 3). Now that we have an idea of how to sum each of the left diagonal values, let's move onto to finding the right diagonal (which is a bit more involved). 

> Remember this 4 x 4 square matrix is a 2D array and holds 4 inner arrays within the outer array. 

Therefore, the length of the outer array is `4` like we stated earlier. If you look closely, each of the indexes in the right diagonal sum to 3. 

```js
(0, 3) = 0 + 3 = 3
(1, 2) = 1 + 2 = 3
(2, 1) = 2 + 1 = 3
(3, 0) = 3 + 0 = 3
```

To find the values within the right diagonal, we just need to extract the values from the 2D array where the sum of index i + j equals 3. Remember, the outer array has a length of n = 4. Therefore, we can simply write a conditional statement where `i + j == n - 1`. After summing the two diagonals, we can have the function return the diagonal difference of any square matrix.

{% filename "script.js" %}

```js
function diagonalDiff(arr) {
    let n = arr.length;
    let leftDiag = 0,
        rightDiag = 0;

    for (var i = 0; i < n; i++) {
        for (var j = 0; i < n; j++) {
            // get left diagonal values
            if (i == j) {
                leftDiag += arr[i][j];
            }
            // get right diagonal values
            if (i + j == n - 1) {
                rightDiag += arr[i][j];
            }
        }
    }
    // return the absolute value of the diagonal difference
    return Math.abs(leftDiag - rightDiag);
}
```
