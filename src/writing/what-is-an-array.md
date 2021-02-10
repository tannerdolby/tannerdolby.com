---
title: What is an Array in JavaScript?
date: 2021-02-06
datetime: 2021-02-06 00:00:00 Z
tags:
  - javascript
preview: In JavaScript, arrays are predefined objects, where the indexes are the arrays properties. They can hold a collection of values with differing data types. The array is a go-to data structure for common list related tasks.
---

{{ preview }}

<h2 class="post-heading">Is JavaScript Object Oriented?</h2>

JavaScript is indeed an Object Oriented Programming language, but the one difference between OOP languages like Java or C++ and JavaScript, is the fact the JavaScript doesn't explicitly use classes to define objects. We can define an object inline by simply using `let square = { x: 20, y: 40 };` instead of defining a class like `Class Square { constructor(x, y) {}; };`.

In Java and C++, we create the "template" for objects by using the Class, where we define the objects state (member variables) and behavior (methods). In JavaScript, arrays can more closely resemble a Map with key/value pairs. JavaScript does have a `Class` reserved keyword for creating classes but it's not required to use in creating objects. 

> Arrays are predefined objects, where its indexes are the properties. 

That means the first value of an array at index 0 would be displayed as `0: 15` where the 0th (first index) holds a value of 15. One of my favorite things about JavaScript arrays compared to other languages arrays (like Java) is the fact that JS arrays can hold a collection of values with different data types. Where in Java, a generic array can only hold values of the same data type.

```js
let myArr = [10, "foo", true, { prop: "bar" }]
console.log(ar[0]); // 10 (Number)
console.log(ar[1]); // "foo" (String)
console.log(ar[2]); // true (Boolean)
console.log(ar[3]); // Object { prop: "bar" }
console.log(ar[3].prop) // "bar" (access object properties)
```

There are many [data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) in JavaScript and like shown above, arrays can hold any of the primitive types (undefined, String, Number, Boolean, BigInt, Symbol) and structural types (Objects and functions).

<h2 class="post-heading">How can I create an Array?</h2>

Create an empty array and then assign it's values:

```js
let arr = [];
arr[0] = 1;
arr[1] = 3;
arr[2] = 5;

console.log(arr) // [1, 3, 5]
```

Define the array inline:

```js
let arr = [1, 2, "foo"];
console.log(arr[0]) // 1
console.log(arr[1]) // 2
console.log(arr[2]) // "foo"
```

Use the `new` keyword to create an Array object and then assign its indexes some values:

```js
let arr = new Array();
arr[0] = "foo";
arr[1] = "bar";
console.log(arr); // ["foo", "bar"]
```

The indexes in an array are integer values, therefore you cannot use the dot operator `Object.property` to access values from the array and must use bracket notation `Object["property"]`. The indexes represent the property names for the array object itself so you should only use numeric index values to the array. If you add a non-numeric index to the array, it must be a string literal containing a number in the quotes. You may treat the array more like an object and use `arr["foo"] = "bar"` but the index "foo" will not be counted when calling `arr.length`.

```js
let arr = [1, 2, "foo"];
arr["3"] = "bar";
arr[4] = "fuzz";
console.log(arr); // [1, 2, "foo", "bar", "fuzz"]
```

Because the property names for an array object are it's indexes, when we access or assign an index in the array using bracket notation like `arr[4]`, there is an implicit type coersion happening in the background to cast the value `4` which is a Number to type String.

<h2 class="post-heading">Arrays are objects in JavaScript?</h2>

You might be asking yourself, so are arrays objects in JavaScript? And the answer is **yes**. We discussed at the beginning of the article, arrays are predefined objects. 

It becomes very clear arrays are objects when we use the `length` property of an array like `arr.length` to return the length. The way we access the length property using dot notation is exactly the same as how we would access the property of any object like `Object.property`. 

To further solidify that arrays are objects, the indexes in an array are the properties, so when we access a value such as `arr["2"]` we are accessing the `Object["2"]` value. The value stored at index 2 can be accessed from the array object by using the property `"2"`.

One last interesting note about arrays involves `Array.length`, which is essentially `Object.length`. When you have used the `length` property to count the number of values in an array, you might think it is counting each index that has a value. This is actually not the case. The length property returns the greatest number value index and increments it by one (due to 0-base indexing). Some people might look at this as a flaw, but I think it's a good way for us as developers to define arrays with logical and sequential numeric indexes to make sure when we use `Object.length` it returns the expected array length.

```js
let arr = [1, 2, 3];
arr[7] = 4;
console.log(arr); // [1, 2, 3, undefined, undefined, undefined, undefined, 4]
console.log(arr.length); // 8
```

You might think the above array `arr` would have a length of 4. But it actually has a length of 8. This is because the `arr.length` call returns the highest index in the array (7) and increments it by one (7+1=8). The way this works is that since the indexes `arr[3]-arr[6]` were not provided values, they are simply filled with `undefined`.
