---
title: Generate a Fibonacci sequence
date: 2022-02-08
datetime: 2022-02-08 00:00:00 Z
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
vector<int> fibSeq(int n) {
    if (n == 0) return 0;
    if (n <= 2) return 1;
    vector<int> nums = {0,1};
    for (int i = 2; i <= n; i++) {
        nums.push_back(nums[i-1] + nums[i-2]);
    }
    return nums;
}
```

The above function `fibonacciSeq` accepts one parameter, the amount of fibonacci numbers to generate in the sequence and returns an array containing the fibonacci sequence from (0, n). For example, passing in `n = 7` will generate the following sequence:

```cpp
vector<int> seq = fibSeq(7);
int lastFib = seq[7];
cout << "F(7) = " << lastFib << endl;
// F(7) = 13
for (auto num : seq) {
    cout << num << " ";
}
cout << endl;
// 0 1 1 2 3 5 8 13
```

Using a recursive approach to generate the sequence:

```cpp
vector<int> fibonacciSeq(n) {
    if (n == 1) return {0};
    if (n == 2) return {0,1};
    vector<int> sequence = fibonacciSeq(n-1);
    sequence.push_back(sequence[n-2] + sequence[n-3]);
    return sequence;
}
```

<h2 class="post-heading">Returning the Nth fibonacci number</h2>

Now that we know how to generate a fibonacci sequence from the above functions. In order to get the Nth fibonacci, we can get the last value from the generated sequence.

```cpp
// O(n) time and O(n) space
int nthFib(int n) {
    if (n == 0) return 0;
    if (n <= 2) return 1;
    vector<int> nums = {0,1};
    for (int i = 2; i <= n; i++) {
        nums.push_back(nums[i-1] + nums[i-2]);
    }
    return nums[n];
}
cout << "F(4) = " << nthFib(4) << endl;
// F(4) = 3
```

The above code iterates the inclusive range `(i, n)` which takes O(n) time and stores each fibonacci number in a resultant vector, then we simply index the last value. 

We can also take a recursive approach to avoid creating a resultant `vector<int>` data structure. The recurisve calls will be added to the call stack, which occupies O(n) space in memory but we avoid using any other variables.

```cpp
// // O(n^2) time and O(n) space
int recursiveNthFib(int n) {
    if (n == 0) return 0;
    if (n <= 2) return 1;
    return recursiveNthFib(n-1) + recursiveNthFib(n-2);
}
cout << "F(7) = " << nthFib(7) << endl;
// F(7) = 13
```