---
title: Solving the Diagonal Difference and Sum Problem
date: 2023-04-09
datetime: 2023-04-09 00:00:00 Z
tags:
  - java
permalink: "/writing/{{ title | slug }}/"
preview: This article will discuss how to calculate the diagonal difference and sum for a n x n square matrix.
---

{{ preview }} The diagonal difference problem can be found on [HackerRank](https://www.hackerrank.com/challenges/diagonal-difference/problem) and the diagonal sum problem can be found on LeetCode [1572. Matrix Diagonal Sum](https://leetcode.com/problems/matrix-diagonal-sum/).

<h2 class="post-heading">Getting Started</h2>

To begin, we are given a n x n square matrix as input. We're asked to create a function that returns the diagonal difference or sum of the matrix. To understand what "diagonal" means in this context, think of a diagonal line starting from the top left corner running to the bottom right corner. This would be the "left diagonal" and the "right diagonal" would start at the top right corner and run to the bottom left, spanning each of the numbers in its path. 

For a more visual representation, consider this 4 x 4 square matrix:

```js
2 4 5 6
8 3 1 3
7 9 4 2
5 8 3 6
```

If we start at the top left corner (first index of the first row) and move to the right one unit and down one unit we end up at `3`. Continuing along this "diagonal" path, we end up with the values (2, 3, 4, 6) for the left diagonal. Following the same logic to find the "right diagonal", we start in the right corner (last index of the first row) and move left one unit and down one unit. Repeating this movement until reaching the bottom left corner and we will have the values (6, 1, 9, 5) for the right diagonal.

<h2 class="post-heading">Writing The Algorithms</h2>

Now that it's clear how to find the "diagonal" values in a square matrix, let's write algorithms to calculate the diagonal difference or sum. To begin, the sample input will be a two-dimensional integer array. If your not familiar with 2D arrays, they look like this:

```java
[
  [2, 4, 5, 6],
  [8, 3, 1, 3],
  [7, 9, 4, 2],
  [5, 8, 3, 6]
]
```

Where an outer array holds inner arrays within it, hence the "two-dimensional" array definition. If we were to write an iteration statement, like a `for` loop on the outer array. It would iterate over each of the "inner" arrays. Here is an example:

{% raw %}
```java
int[][] arr = new int[][]{
    {2, 4, 5, 6},
    {8, 3, 1, 3},
    {7, 9, 4, 2},
    {5, 8, 3, 6}
};

for (int i=0; i < arr.length; i++) {
    System.out.println(Arrays.toString(arr[i]));
}
// [2, 4, 5, 6]
// [8, 3, 1, 3]
// [7, 9, 4, 2]
// [5, 8, 3, 6]
```
{% endraw %}

To access the inner array values, we will need to use two index values, `arr[firstIndex][secondIndex]`. The `firstIndex` will access the inner array from the outer "parent" array and the `secondIndex` will be the index within the inner array that we retreive a value for.

To better understand working with 2D arrays, we can use another nested `for` loop to understand where the `secondIndex` comes into play.

{% raw %}
```java
int[][] arr = new int[][]{
    {2, 4, 5, 6},
    {8, 3, 1, 3},
    {7, 9, 4, 2},
    {5, 8, 3, 6}
};

int n = arr.length;

for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        System.out.print("(" + i + "," + j + ") ");
    }
    System.out.println();
}
```
{% endraw %}

The above code will output each index of the 2D array.

```js
(0, 0) (0, 1) (0, 2) (0, 3) // [2, 4, 5, 6]
(1, 0) (1, 1) (1, 2) (1, 3) // [8, 3, 1, 3]
(2, 0) (2, 1) (2, 2) (2, 3) // [7, 9, 4, 2]
(3, 0) (3, 1) (3, 2) (3, 3) // [5, 8, 3, 6]
```

Now that we have a good grasp of what the 2D array looks like in terms of array structure, let's write some logic to calculate the diagonal difference and sum. That is, the absolute value of the left diagonal minus the right diagonal `|(2 + 3 + 4 + 6) - (6 + 1 + 9 + 5)|` or the sum of the diagonals.

<h2 class="post-heading">Calculate the Diagonal Difference</h2>

If you study the above square matrix, you will notice the left diagonal values occur when the first index equals the second index. That is, when `i == j` (if you use i and j as loop control variables). Each value within the left diagonal occurs at (0, 0), (1, 1), (2, 2), (3, 3). Now that we have an idea of how to obtain each of the left diagonal values, let's move onto to finding the right diagonal.

> Remember this 4 x 4 square matrix is a 2D array and holds 4 inner arrays within the outer array. 

Therefore, the length of the outer array and each inner array is `4` due to the "square" nature of these matrices. If you look closely, each of the indexes in the right diagonal sum to 3 which is the length of the array minus one. Using a single control variable `i`, this can be simplified as we are simply moving forward a single row and column at each iteration.

To find the values within the right diagonal, we find the values where the sum of index i + j equals `array.length-1`. To write it out more clearly, using a single index `i`, we can find values along the right diagonal using `n-1-i`, where `n` equals `array.length`.

As we increment `i` by one while iterating the matrix, we first start at row zero where `i=0` so `n-1-i = 4-1-0 = 3` that is, the top-right corner at `(0,3)` which is represented by `(i, n-1-i)`. Following this logic we can move to the next row where `i=1` and see `n-1-1 = 4-1-1 = 2` which represents the cell one unit to the left and one unit down `(1, 2)`. Continuing along this path until reaching the bottom-left corner.

```js
(0, 3) = 0 + 3 = 3
(1, 2) = 1 + 2 = 3
(2, 1) = 2 + 1 = 3
(3, 0) = 3 + 0 = 3
```

After summing both diagonals, the function can return the absolute difference of the diagonals to reach our desired solution. The logic below passes the HackerRank test cases.

{% filename "Matrix.java" %}

```java
public class Matrix {
    // O(n) time | O(1) space
    public static int diagonalDiff(int[][] arr) {
        int n = arr.length;
        int leftDiagonal = 0, rightDiagonal = 0;
        for (int i = 0; i < n; i++) {
            leftDiagonal += arr[i][i];
            rightDiagonal += array[i][n-1-i];
        }
        return Math.abs(leftDiag - rightDiag);
    }
}
```

The question could also use a [`List`](https://docs.oracle.com/javase/8/docs/api/java/util/List.html) interface to maintain the sequence of integers. The function signature would look different as it will use `List<List<Integer>> arr` and accessing elements in a 2D list looks like: `arr.get(i).get(j)`. The same algorithm can be used, its just a slightly different data structure than `int[][]` to hold the input matrix.

<h2 class="post-heading">Calculate the Diagonal Sum</h2>

Given a square matrix, return the sum of the matrix diagonals.

Only include the sum of all the elements on the primary diagonal and all the elements on the secondary diagonal that are not part of the primary diagonal.

```java
public class Matrix {
    // O(n) time | O(1) space
    public static int diagonalSum(int[][] arr) {
        int n = arr.length;
        int sum = 0;
        for (int i = 0; i < n; i++) {
            // if the indexes are equal, only add the value from one diagonal
            if (i == n-1-i) {
                sum += arr[i][i];
            } else {
                sum += arr[i][i] + arr[i][n-1-i];
            }
        }
        return sum;
    }
}
```

<h3 class="post-heading">Outro</h2>

This article should prepare you for finding the diagonals of any square matrix and calculating the diagonal difference or sum. Thanks for reading!

> Linear algebra 101: When a square matrix has its left diagonal values equaling `1` and the other values (everything but the left diagonal) equaling `0`, the matrix is said to be Linearly Independent. To obtain only 1s and 0s in your square matrix, you will need to perform row-reduction which is outside the scope of this article but food for thought!
