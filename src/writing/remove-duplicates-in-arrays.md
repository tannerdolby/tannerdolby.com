---
title: Remove duplicates in Arrays
date: 2021-02-17
datetime: 2021-02-17 00:00:00 Z
tags:
  - javascript
preview: Removing duplicate values from an array is quite a common task in programming. Sometimes, specific scenarios require a collection of data to only store unique values. That is, no repeated values.
---

{{ preview }}

A [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) data structure is commonly used in programming languages to store unique values. The `Set` object in JavaScript allows you to store "unique" values of any data type. For a value in the `Set` to be unique, it may only occur once, otherwise duplicate values are removed from the collection. This makes removing duplicate values from an array trivial by transferring the array values into a `Set`.

Below is an example of removing duplicate values from an array by converting the `Array` to a `Set`.

```js
const arr = [2, 4, 6, 8, 2, 4]; 
const unique = [...new Set(arr)];
console.log(set);
```

Output:

```js
[2, 4, 6, 8]
```

There is quite a bit going on in the above code block. We declare an array `arr` with two duplicate values. To remove those duplicate values, we add the array values into a `Set` called `unique`. Next, we can convert the `Set` into an `Array` by wrapping the `new Set()` instance inside brackets `[]` and using the (`...`) [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax). 

<h2 class="post-heading">Other Options</h2>

Using a `Set` is my go-to way of removing duplicate values in an Array, but there is also a few other options for this task. Utilizing `Array.prototype.indexOf` and the `Array.prototype.filter` method allows us to filter an Array for duplicate values and return the filtered array which only contains unique values.

```js
const arr = ["a", "b", "c", "b", "a"];
const unique = arr.filter((item, index) => {
  return arr.indexOf(item) == index;
});
console.log(unique);
```

Output:

```js
["a", "b", "c"]
```

Using [Array.prototype.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) returns the first index at which a given element can be found in the array. If the element isn't present it returns `-1`. The way the above logic works for removing duplicates is by iterating over the array `arr` and checking each value to see if the `arr.indexOf(item)` index matches the position of the element being processed in the `filter()` method. 

Using [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) creates and returns a new array with all values that pass the test provided in the callback function. Similar to a `forEach()` method, the `filter()` method calls the provided callback function once for each element in the array. The difference between `forEach` and `filter` is that `filter()` creates a new array with all the values for which the callback function returns a ["truthy"](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value.

To better understand the logic, the first iteration would look something like:

```js
arr.indexOf("a"); // 0 (first index)
index = 0; // first element being processed
0 == 0 // true, add "a" to the new filtered array
...
arr.indexOf("c"); // 2 (third index)
index = 2; // third element being processed
2 == 2 // true

// (4th index & first repeat) returns 1 since "b" appears in the array at index 1 first ie 2nd element
arr.indexOf("b"); // 1
index = 3; // fourth element being processed
1 == 3 // false (don't add second occurrence of "b" to filtered array)
```

And the same logic is applied to the remaining elements to be processed, if they return true after being processed by the callback function, the values are added to the constructed filtered array. Hopefully the above examples explain how using `indexOf` and `filter` to remove duplicates from an array is clear. 

Lastly, you could use `Array.prototype.forEach` and `Array.prototype.includes` to check for duplicate values and then push the unique values into a new array. Using [forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) performs similiar to `filter()` by performing the callback function for each element in the array. The [includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) method returns `true` or `false` depending on the value exists in the array or not.

```js
const arr = [1, 2, 4, 4, 2, 6];

// create empty array to store values after conditional checks
const unique = [];

arr.forEach(item => {
  if (!unique.includes(item)) {
    unique.push(item);
  }
});

console.log(unique);
```

Output:

```js
[1, 2, 4, 6]
```
The above works by iterating over the original array and performing the callback function on each element to check if the the unique array `unique` doesn't already have the value. If the unique array (which starts as empty) doesn't include the element in `arr` then add it to the unique array with `unique.push(item)`. Therefore, to start the first 3 values added to `unique` will be `[1, 2, 4]` and then it checks to see that the next 4 is a duplicate and therefore doesn't add it to the array along with 2 and finally adds 6 since it doesn't currently exist in `unique`.

That's all folks. Feel free to read more about removing duplicates in arrays from this great [resource](https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/).