---
title: Solving the Diagonal Difference Problem
date: 2021-07-30
datetime: 2021-07-30 00:00:00 Z
tags:
  - javascript
  - hackerrank
permalink: "/writing/{{ title | slug }}/"
preview: This article will discuss how to solve the "diagonal difference" problem which involves calculating the diagonal difference of a n x n size square matrix.
---

{{ preview }} This problem can be found on [HackerRank](https://www.hackerrank.com/challenges/diagonal-difference/problem), a website for practicing common technical interview algorithm questions. 

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
let arr = [[2, 4, 5, 6], [8, 3, 1, 3], [7, 9, 4, 2], [5, 8, 3, 6]];
for (var i = 0; i < arr.length; i++) {
    console.log(arr[i], `(equals arr[${i}])`);
}
// [2, 4, 5, 6] (equals arr[0])
// [8, 3, 1, 3] (equals arr[1])
// [7, 9, 4, 2] (equals arr[2])
// [5, 8, 3, 6] (equals arr[3])
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

To find the values within the right diagonal, we just need to extract the values from the 2D array where the sum of index i + j equals 3. Remember, the outer array has a length of n = 4. Therefore, we can simply write a conditional statement where `i + j == n - 1`. After summing the two diagonals, we can have the function return the diagonal difference of any square matrix. The logic below passes the Hackerrank test cases as its expecting `n` lines of space separated numeric values representing the square matrix. In the wild, it won't neccessarily be in this format. It will be a 2D array with `n` rows and columns while maintaining "square" which means the number of rows = cols, ie 3 rows x 3 cols is a 3x3 square matrix.

{% filename "script.js" %}

```js
function diagonalDiff(arr) {
    let n = arr.length;
    let leftDiag, rightDiag = 0;
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
    return Math.abs(leftDiag - rightDiag);
}
```

```js
// Hackerrank result for first test case (passes all of them):
3
11 2 4
4 5 6
10 8 -12
// Your Output (stdout)
15

```

<h2 class="post-heading">More realistic implementation</h2>

If we wanted to pass in a 2D array to the above `diagonalDiff` function and have it return the diagonal difference, it wouldn't play nicely as the inputs for test cases on Hackerrank are not array data types. The following function should be used for calculating the diagonal difference of a square matrix when the argument passed into the function is a 2D array representing a square matrix.

This actually is far less code to write, which is pretty cool considering its handling what you would actually see "in the wild", a 2D array representing a square matrix. 

Instead of two iteration statements, like used in the HackerRank solution. We can utilize a single `for` loop with two control variables defined. Then we iterate over the 2D array representing a square matrix and "pluck" out the diagonal values to perform arithmetic. This same logic I used in a Matrix calculator side project I'm working on. We start at the first index in the first inner array, and then jump to the next inner array while also jumping to the right a position. 

In short, move down one and right one position and we can traverse the diagonal values in a 2D array. Start at (0, 0) then jump to (1, 1) and (2, 2) and so on. This logic is pretty sturdy as long as the 2D array represents a square matrix, meaning the outer arrays length equals the length of each inner array.

_Linear algebra 101: When a square matrix has its left diagonal values equaling `1` and the other values (everything but the left diagonal) equaling `0`, the matrix is said to be Linearly Independent. To obtain only 1s and 0s in your square matrix, you will need to perform row-reduction which is outside the scope of this article but food for thought!_

<h3 class="post-heading">Plain JavaScript Implementation</h3>

Although the code in the TypeScript section is much safer and more sturdy, here is a the basic JavaScript implementation (without defined types) for calculating the diagonal difference of any square matrix. Where the function accepts a single argument, which is a 2D array. For a 2D array to be considered a "square" matrix, the length of the outer array must equal the length of each inner array like 3x3, 4x4 etc.

```js
function diagonalDiff(arr) {
    const n = arr.length;
    let { left, right, diff } = {
      left: {
        list: [],
        sum: 0
      },
      right: {
        list: [],
        sum: 0
      },
      diff: 0
    }
    // instead of writing two for loops (2D array), utilize the control variables
    for (
        var i = 0, j = 0, k = n-1; 
        i < n, j < n, k >= 0; 
        i++, j++, k--
        ) {
        if (arr[i].length > arr.length) {
            throw new Error("Function argument is not a square matrix");
        }
        left.list.push(arr[i][j]);
        right.list.push(arr[i][k]);
    }

    left.list.map(num => left.sum += num);
    right.list.map(num => right.sum += num);
    
    diff = Math.abs(left.sum - right.sum);
    return diff;
}
```

If the matrix isn't square, then an error will be thrown. 

<div class="error">

```js
Uncaught Error: diagonalDiff argument is not a square matrix
```

</div>

<h3 class="post-heading">TypeScript Implementation</h3>

TypeScript will always provide "safer" code than plain JavaScript as it catches errors at compile-time rather than at run-time (when its sometimes too late and the damage is already done). This is because JavaScript is "loosely-typed" where TypeScript is "strictly-typed" so any mismatched types or syntax errors are immediately noticed and errors will be thrown when the TypeScript code is compiled. TypeScript is honestly super nice and if you've programmed in JavaScript, it won't be very hard to get up to speed and start writing "safe" code.

{% filename "types.ts" %}

```ts
interface Diagonals {
  left: {
    list: number[],
    sum: 0
  },
  right: {
    list: number[],
    sum: 0,
  },
  diff: number
}
```

On a side note, I'm using [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) and specifically [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring) so I don't have to write `diagonals.someProp` a bunch (I know this is lazy, but for the current use case, I don't need access to the entire object just certain properties)

{% filename "diagonal-diff.ts" %}

```ts
function diagonalDiff(arr): number {
    const n: number = arr.length;
    let { left, right, diff }: {
      left: Diagonals.left,
      right: Diagonals.right,
      diff: Diagonals.diff
    } = {
      left: {
        list: [],
        sum: 0
      },
      right: {
        list: [],
        sum: 0
      },
      diff: 0
    }
    for (
        var i = 0, j = 0, k = n-1; 
        i < n, j < n, k >= 0; 
        i++, j++, k--
        ) {
        // Check if matrix is square before adding data to object
        if (arr[i].length > arr.length) {
            throw new Error("Function argument is not a square matrix");
        }
        // populate object properties with data
        left.list.push(arr[i][j]);
        right.list.push(arr[i][k]);
    }

    // add up each of the diagonal arrays
    left.list.map(num => left.sum += num);
    right.list.map(num => right.sum += num);
    
    // Calculate diagonal difference
    diff = Math.abs(left.sum - right.sum);
    return diff;
}
```
and the usage for both TypeScript and JavaScript code snippets looks like this:

```js
// 3x3 square matrix
let el = [
  [1, 5, 6],
  [3, 2, 7],
  [8, 5, 1]
];
let result = diagonalDiff(el)); 
// |(1+2+1) - (6+2+8)| = 4 - 16 = -12 = |-12| or Math.abs(-12) = 12
console.log(result); 
// 12
```

and just for the heck of it, lets test a 4x4 square matrix:

```js
// 4x4 square matrix
let el = [
  [1, 5, 6, 2],
  [3, 2, 7, 9],
  [8, 5, 1, 3],
  [2, 6, 8, 9]
];
let result = diagonalDiff(el);
// |(1+2+1+9) - (2+7+5+2)| = 13 - 16 = -3 = |-3| = 3
console.log(result);
// 3
```

This article ended up being a bit more about creating a "sturdy" utility for calculating the diagonal difference of any square matrix and not so much about the HackerRank challenge, but I digress. Thanks for reading!
