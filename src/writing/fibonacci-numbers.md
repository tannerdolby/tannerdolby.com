---
title: Generate Fibonacci Numbers
date: 2024-04-06
datetime: 2024-04-06 00:00:00 Z
tags:
  - python
  - recursion
  - memoization
permalink: "/writing/{{ title | slug }}/"
preview: The Fibonacci sequence is a series of numbers where each number in the sequence is the sum of the two preceding numbers, with the sequence beginning with F(1) = 0 and F(2) = 1.
---

{{ preview }} In mathematics, the Fibonacci numbers form the sequence where numbers (n) are greater than 1 (n > 1).

To better understand how the numbers are calculated in the sequence, view the below equation for generating a [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

> F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub>

<h2 class="post-heading">Calculating the Nth Fibonacci Number</h2>

To calculate F(N), we can reach for a simple to understand brute force recursive algorithm which runs in O(2^n) time and O(n) space that can be optimzed to O(n) time and O(n) space using memoization. Last but not least, an iterative algorithm using dynamic programming for acheiving constant space complexity with O(n) time and O(1) space.

```python
# O(2^n) time and O(n) space
def fib(n: int) -> int:
	if n == 1:
        return 0
	if n == 2:
        return 1
	return fib(n-1) + fib(n-2)
```

Using a tree to better visualize how the recursive calls are happening when we attempt to call `fib(n)`, view the example below. At each root node, the algorithm requires two operations in order to compute the `fib(n-1)` and `fib(n-2)` values. That is, if there is `n` nodes in the tree, we will require `2^n` operations to compute each root nodes left and right child node.

```js
// 2^n operations - at each F(n) we do F(n-1) + F(n-2)
// for example fib(2) is computed twice and fib(1) and fib(3) computed thrice

			  fib(4)
 		  	/       \
		  fib(3)     fib(2)
          /  \	     /   \
     fib(2) fib(1) fib(1) fib(0)
       /  \
   fib(1) fib(0)
    /
 fib(0)
```


<h3 class="post-heading">Optimized Approaches</h3>

To provide a more efficient algorithm than the brute force recusive. We can take a dynamic programming approach and achieve linear time complexity as this problem is easily broken into smaller subproblems. Instead of recomputing values throughout the tree of recursive calls we can instead use memoization to compute the values once and store them in a hash table. That way, when we need to compute the value again, we instead return the stored value from table and greatly improve the time complexity of the recursive algorithm.

The recursive calls will still be added to the recursion stack, which occupies O(n) space in memory as the depth of the tree will determine the number of recursive calls on the stack at a given time.

<h4 class="post-heading">Memoized Recursive</h4>

```python
# O(n) time and O(n) space
def fib(n: int) -> int:
    memo = {1: 0, 2: 1}
	return fibHelper(n, memo)

def fibHelper(n: int, memo: dict) -> int:
	if n not in memo:
        memo[n] = fibHelper(n-1, memo) + fibHelper(n-2, memo)

	return memo[n]

```
Recursion visualization:

```js
			  fib(4)
 		  	/       \
		 fib(3)     m[2]
          /  \	    /   \
     fib(2)  m[1]  m[1]  m[0]
       /  \
   fib(1) m[0]
    /
 fib(0)
```

If you're having trouble understanding the recursive algorithms, go ahead and watch [Algorithms: Memoization and Dynamic Programming](https://www.youtube.com/watch?v=P8Xa2BitN3I) by the HackerRank channel on Youtube. Gayle Laakmann McDowell (author of Cracking the Coding Interview) does an incredible job of explaining recursion, dynamic programming and memoization.


<h4 class="post-heading">Iterative Constant Space</h4>

If you need an algorithm with constant space complexity. Checkout this iterative dynamic programming approach which utilizes an array of length two and only keeps track of two fibonacci numbers at a time, swapping them into the two available array slots as we calculate the next Nth fib using the array.

```python
# O(n) time and O(1) space
def fib(n: int) -> int:
    if n == 1:
        return 0
    if n == 2:
        return 1
    a = 0
    b = 1
    for i in range(2, n+1):
        nthFib = b + a
        a = b
        b = nthFib
    return b
```
