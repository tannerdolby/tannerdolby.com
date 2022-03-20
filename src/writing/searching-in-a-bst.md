---
title: Searching for a value in a Binary Search Tree
preview: Finding a value in a BST can be done iteratively or recursively in an elegant and efficient manner on average because of the properties of a BST.
date: 2022-03-19
datetime: 2022-03-19 00:00:00 Z
tags:
 - cpp
 - trees
---

{{ preview }}

A [Tree](https://en.wikipedia.org/wiki/Tree_(data_structure)) data structure is commonly used to represent hierarchical data. A tree can have up to `n` child nodes, where in a [Binary Tree](https://en.wikipedia.org/wiki/Binary_tree) the maximum number of children is two. Building on this, a [Binary Search Tree](https://en.wikipedia.org/wiki/Binary_search_tree) has the following properties:

1. All of the nodes in the left subtree must be strictly less than the root node.
2. All of the nodes in the right subtree must be greater than or equal to the root node.

Example BST:

```txt
       4
     /   \
   2      6
  / \    / \
 1   3  5   8 
```

Since we will be searching for a value in Binary Search Tree, I thought the above information would be useful if your not familiar with trees, binary trees, and BST's.

<h2 class="post-heading">Searching in a BST</h2>

Given we are provided a BST, searching for a value can be done in O(log(N)) time and O(log(N)) space on average because at each root node we can compare the value to our target value and eliminate half of the tree each time. Using the following BST shown below with a search target of 13:

```txt
       18
     /    \
   10      21
  /  \    /  \
 5   13  16   35 
```

The first step to begin searching for the target value of 13 would be to compare our search value to the root node as we traverse the tree. Since were searching for 13, we would check if the target is less than the root nodes value of 18 i.e. `if (target < root->val)`, and if true we can eliminate the right subtree and only traverse the left subtree because all values in the right subtree are greater than or equal to the root node meaning its not possible for a value less than the root to exist in the right subtree. Repeating this same logic for check if we traverse the right subtree i.e. `else if (target >= root->val)`, if the target is gte to the root value we will eliminate the left subtree and only traverse the right subtree as all values in the left subtree are strictly less than the root node. Repeating this process throughout the traversal until we find the search target or don't find it which will result in NULL

This algorithm on average will eliminate half of the tree at each step, resulting in a logarithmic runtime of O(log(N)) and O(N) in the worst case. Assuming nodes in the tree have the following structure:

```cpp
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
}
```

<h3 class="post-heading">Recursive</h3>

A Depth-first Search (DFS) algorithm to traverse the tree searching for a target value. This approach does add frames to the recursion stack which needs to be kept in mind when working with extremely large BSTs, as you need to make sure the frames on the stack don't result in a stack overflow. The iterative approach would be preferred for larger inputs as it runs in O(1) constant space and doesn't add calls to the recursion stack.

```cpp
// Average: O(log(N)) time and O(log(N)) space
// Worst: O(N) time and O(N) space
TreeNode *searchBST(TreeNode *root, int target) {
    return dfs(root, target);
}
TreeNode *dfs(TreeNode *root, int target) {
    if (root == NULL || root->val == target) return root;
    if (target < root->val) {
        return dfs(root->left, target);
    } else if (target >= root->val) {
        return dfs(root->right, target);
    }
    return nullptr;
}
```

<h3 class="post-heading">Iterative</h3>

This approach is similiar to the recursive logic as it runs in O(log(N)) time, but we only consume constant O(1) space which might make this algorithm the preferred choice when working with extremely large inputs.

```cpp
// Average: O(log(N)) time and O(1) space
// Worst: O(N) time and O(1) space
TreeNode *searchBST(TreeNode *root, int target) {
    while (root != NULL && root->val != target) {
        if (target < root->val) {
            root = root->left;
        } else if (target >= root->val) {
            root = root->right;
        }
    }
    return root;
}
```

<h3 class="post-heading">Notes</h3>

For practice, have a look at [700. Search in a Binary Search Tree](https://leetcode.com/problems/search-in-a-binary-search-tree/) on LeetCode, and to better understand how we traverse the BST when searching for the target value, checkout [Applied CS Skills - Binary Search Tree](https://www.youtube.com/watch?v=YEZo8n2y2v4) by the Google Students channel on YouTube.