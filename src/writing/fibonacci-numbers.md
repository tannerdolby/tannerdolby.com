---
title: Generate Fibonacci Numbers
date: 2023-10-31
datetime: 2023-10-31 00:00:00 Z
tags:
  - javascript
  - recursion
permalink: "/writing/{{ title | slug }}/"
preview: The Fibonacci sequence is a series of numbers where each number in the sequence is the sum of the two preceding numbers, with the sequence beginning with 0 and 1.
---

{{ preview }} In mathematics, the Fibonacci numbers form the sequence, where numbers (n) are greater than 1 (n > 1).

To better understand how the fibonacci numbers are created in the sequence, view the below equation for generating any number in the [fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number).

> F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub>

<h2 class="post-heading">Generate the Nth Fibonacci Number</h2>

To calculate the F(N), we can reach for a simple to understand naive recursive algorithm which runs in O(2^n) time and O(n) space that can be optimzed to O(n) time and O(n) space using memoization. Last but not least, an iterative algorithm using dynamic programming for acheiving constant space complexity with O(n) time and O(1) space.

```js
// O(2^n) time and O(n) space
function fib(int n) {
	if (n < 0) return 0;
	if (n < 2) return n;
	return fib(n-1) + fib(n-2);
}
```

Using a tree to better visualize how the recursive calls are happening when we attempt to call `fib(n)`, view the example below. At each root node, the algorithm requires two operations in order to compute the `fib(n-1)` and `fib(n-2)` values. That is, if there is `n` nodes in the tree, we will require `2^n` operations to compute each root nodes left and right child node.

```js
// 2^n operations
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


### Optimized Approaches

To provide a more efficient algorithm than the naive recusive. We can take a dynamic programming approach and achieve linear time complexity as this problem is easily broken into smaller subproblems. Instead of recomputing values throughout the tree of recursive calls we can instead use memoization to compute the values once and store them in a hash table. That way, when we need to compute the value again, we instead return the stored value from table and greatly improve the time complexity of the recursive algorithm.

The recursive calls will still be added to the recursion stack, which occupies O(n) space in memory as the depth of the tree will determine the number of recursive calls on the stack at a given time.

```js
// O(n) time and O(n) space
function fib(n) {
    const memo = {};
    memo[0] = 0;
    memo[1] = 1;
	return fibHelper(n, memo);
}

function fibHelper(n, memo) {
	if (n < 0) return 0;
	if (n < 2) return n;
	if (!Object.hasOwn(memo, n)) {
		// F(n) value doesn't exist in table yet, 
		// so we compute it and store it in the table
		memo[n] = fibHelper(n-1, memo) + fibHelper(n-2, memo);
	}
	// otherwise we have stored the value already in table
	// so simple return the stored value instead of recomputing
	return memo[n];
}
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

If you need an algorithm with constant space complexity. Checkout this iterative dynamic programming approach which utilizes an array of length two and only keeps track of two fibonacci numbers at a time, swapping them into the two available array slots as we calculate the next Nth fib using the array.

```js
// O(n) time and O(1) space
function fib(n) {
    if (n < 2) return n;
    const dp = [0, 1];
    for (let i=2; i <= n; i++) {
        const nthFib = dp[1] + dp[0];
        dp[0] = dp[1];
        dp[1] = nthFib;
    }
    return dp[1];
}
```

<h2 class="post-heading">Generate the Fibonacci sequence</h2>

Now that the underlying mathematical equation is known for calculating Fibonacci numbers, let's write an iterative solution that generates an array containing the fibonacci sequence.

```js
// O(n) time and O(n) space
function fibSequence(n) {
    if (n < 0) return [0];
    if (n < 2) return [0,1];
    const nums = {0,1};
    for (int i = 2; i <= n; i++) {
        nums[i] = nums[i-1] + nums[i-2];
    }
    return nums;
}
```

The above function `fibSequence` accepts one parameter, the Nth fibonacci number where the sequence should end at and returns an array containing the fibonacci sequence from (0, n). For example, passing in `n = 7` will generate the following sequence:

```js
const sequence = fibSequence(7);
const lastFib = sequence[7];
console.log(`F(7) = ${lastFib}`);
// F(7) = 13

for (let i=0; i < sequence.length; i++) {
    console.log(sequence[i] + " ");
}
// 0 1 1 2 3 5 8 13
```

Using a recursive approach to generate the sequence:

```js
function fibSequence(n) {
    if (n < 0) return [0];
    if (n < 2) return [0,1];
    const sequence = fibSequence(n-1);
    sequence.push(sequence[n-1] + sequence[n-2]);
    return sequence;
}
```
