---
title: Generate a Fibonacci sequence
date: 2022-03-17
datetime: 2022-03-17 00:00:00 Z
tags:
  - cpp
permalink: "/writing/{{ title | slug }}/"
preview: The Fibonacci sequence is a series of numbers where each number in the sequence is the sum of the two preceding numbers, with the sequence beginning with 0 and 1.
---

{{ preview }} In mathematics, the Fibonacci numbers form the sequence, where numbers (n) are greater than 1 (n > 1).

To better understand how the fibonacci numbers are created in the sequence, view the below equation for generating any number in the [fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number).

> F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub>

<h2 class="post-heading">Generate the sequence</h2>

Now that the underlying mathematical equation is known, let's write an iterative solution that generates a `vector<int>` containing the fibonacci sequence.

```cpp
#include <vector>
using namespace std;
// O(n) time and O(n) space
vector<int> fibonacciSequence(int n) {
    if (n == 1) return {0};
    if (n == 2) return {0,1};
    vector<int> nums = {0,1};
    for (int i = 2; i <= n; i++) {
        nums.push_back(nums[i-1] + nums[i-2]);
    }
    return nums;
}
```

The above function `fibonacciSequence` accepts one parameter, the amount of fibonacci numbers to generate in the sequence and returns an array containing the fibonacci sequence from (0, n). For example, passing in `n = 7` will generate the following sequence:

```cpp
vector<int> sequence = fibonacciSequence(7);
int lastFib = sequence[7];
cout << "F(7) = " << lastFib << endl;
// F(7) = 13
for (auto num : sequence) {
    cout << num << " ";
}
cout << endl;
// 0 1 1 2 3 5 8 13
```

Using a recursive approach to generate the sequence:

```cpp
vector<int> fibonacciSeq(int n) {
    if (n == 1) return {0};
    if (n == 2) return {0,1};
    vector<int> sequence = fibonacciSeq(n-1);
    sequence.push_back(sequence[n-2] + sequence[n-3]);
    return sequence;
}
```

<h2 class="post-heading">Returning the Nth fibonacci number</h2>

To provide a more efficient algorithm. We can take a dynamic programming approach as this problem is easily broken into smaller subproblems. The recursive calls will be added to the recursion stack, which occupies O(n) space in memory as the depth of the tree will determine the number of recursive calls on the stack at a given time.

```cpp
// recursive fibonacci sequence (without memoization)
// O(2^n) time and O(n) space
int fib(int n) {
	if (n == 0) {
		return 0;
	} else if (n == 1) {
		return 1;
	}
	return fib(n-1) + fib(n-2);
}
```

Using a tree to better visualize how the recursive calls are happening when we attempt to call `fib(n)`.

```txt
// 2^n operations as we recompute the same values many times
// for example fib(2) is computed twice and fib(1) computed three times
// Ex.
// 			     fib(4)
//  		    /      \
// 		    fib(3)     fib(2)
//           /  \	    /   \
//      fib(2) fib(1) fib(1) fib(0)
//        /  \
//    fib(1) fib(0)
//
```

Instead of recomputing values throughout the tree of recursive calls we can instead use memoization to compute the values once and store them in a hash table. That way, when we need to compute the value again, we instead return the stored value from table and greatly improve the time complexity of the recursive algorithm.

```cpp
// improving time complexity from O(2^n) to O(n) time
// O(n) time and O(n) space
int fib(int n) {
	unordered_map<int,int> memo;
	if (n == 0) {
		return 0;
	} else if (n == 1) {
		return 1;
	} else if (!memo[n]) {
		memo[n] = fib(n-1) + fib(n-2);
	}
	return memo[n];
}
```

If you're having trouble understanding the recursive algorithms, go ahead and watch [Algorithms: Memoization and Dynamic Programming](https://www.youtube.com/watch?v=P8Xa2BitN3I) by the HackerRank channel on Youtube. Gayle Laakmann McDowell (author of Cracking the Coding Interview) does an incredible job of explaining recursion, dynamic programming and memoization.