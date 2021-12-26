---
title: Breaking down the Two Sum problem on Leetcode
tags:
  - leetcode
  - cpp
preview: Given a list of integers and a target integer, find which pair of values in the list sum to equal the target value and then return the indices of the pair.
templateEngineOverride: njk, md
---

{{ preview }}

<h2 class="post-heading">Problem Statement</h2>

The [Two Sum][two-sum] problem description is below:

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

<h3 class="post-heading">First Approach (Brute Force)</h3>

Naturally, my first thought was to reach for loops and traverse the array of integers, more specifically the `vector<int>` data structure representing `nums`. Where I would use one outer for loop with a nested for loop. The outer loop would traverse `nums` at O(n) time and for each element A, we will begin traversing `nums` starting from the position of A and begin comparing the sum of each item B with A until we obtain a sum that equals `target`. This nested looping will create O(A * B) runtimes which gives us O(N^2).

_O(N^2) runtime (96ms) with 10.1mb memory usage_

```cpp
// time complexity = O(N^2) quadratic (not great)
// space complexity = O(1) constant
vector<int> twoNumberSum(vector<int> nums, int target) {
	for (int i = 0; i < nums.size(); i++) {
		for (int j = 0; j < nums.size(); j++) {
			if (array[i] + array[j] == target) {
				return {nums[i], nums[j]};
			}
		}
	}
	return {};
};
```

<h2 class="post-heading">One-pass hash table (Fastest Solution)</h2>

The algorithm can be improved to run at O(N) by performing a single pass of a [hash table][hash-table]. That is, while iterating and inserting elements into the `unordered_map<int, int>`, we check if the current elements [complement][complement] e.g. `target - nums[i]` already exists in the map. If it does exist, the solution has been found and we return the indices of the pair. The improvement from O(N^2) to O(N) is quite a big improvement, going from a 96ms runtime to 4ms runtime. 

{% respimg 
    src="two-sum-submission.png",
    alt="A screenshot of my best performing submission on LeetCode for the Two Sum problem",
    inputDir="./src",
    imgDir="/images/",
    widths=[320, 480, 640, 1024],
    width="100%",
    height="100%",
    sizes="(max-width: 450px) 33.3vw, 100vw",
    className="demo-img"
%}

_O(N) runtime (4ms) with 10.9mb memory usage_

```cpp
class Solution {
public:
    // O(n) time and O(1) space
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> umap;
        for (int i = 0; i < nums.size(); ++i) {
            auto it = umap.find(target - nums[i]);
            if (it != umap.end()) {
                return {i, it->second};
            } else {
                umap[nums[i]] = i;
            }
        }
        return {0, 0};
    }
};
```

[two-sum]: https://leetcode.com/problems/two-sum/
[hash-table]: https://en.wikipedia.org/wiki/Hash_table
[complement]: https://en.wikipedia.org/wiki/Complement_(set_theory)