---
title: What is an Array in JavaScript?
date: 2021-02-06
datetime: 2021-02-06 00:00:00 Z
tags:
  - javascript
permalink: "/writing/{{ title | slug }}/"
preview: In JavaScript, arrays are predefined objects, where the indexes are the arrays properties. They can hold a collection of values with differing data types. The array is a go-to data structure for common list related tasks.
---

{{ preview }}

<h2 class="post-heading">Is JavaScript Object Oriented?</h2>

JavaScript is [prototype based](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model#class-based_vs._prototype-based_languages), multi-paradigm, single threaded, dynamic language which supports object oriented, imperative, and declarative styles. 

The one difference between other OOP languages like Java or C++ and JavaScript, is the fact that JavaScript isn't class based, its prototype based and doesn't require explicit use classes to define objects. It uses prototype based object constructions. Within a prototype based language like JavaScript, the prototypical object is an object used as a template to get the initial properties for a new object. 

Instead of defining a class for every object like we would in Java: 

```java
public class Shape { 
  public int x;
  public int y;
  public string currShape;

  constructor(x: int, y: int, currShape: string) {
    this.x = x;
    this.y = y;
    this.currShape = currShape;
  };
};
```

the equivalent in JavaScript would look like this:

```js
function Shape() {
  this.x = 0;
  this.y = 0;
  this.currShape = "";
}
```

If you want to specify the "next" object in the inheritance chain. Like we would by defining a class as a child of some superclass `class Foo extends Bar`. We add a prototypical instance as the value of the `prototype` property within the constructor, then simply override the prototypes constructor to the constructor function.

```js
function Square() {
  Shape.call(this);
  this.currShape = "Square";
};
// Pass in the prototypical instance to Object.create()
// and assign it to the prototype property of Square defintion
Square.prototype = Object.create(Shape.prototype);
// Override the constructor with our constructor function Shape
Square.prototype.constructor = Square;
```

Now we have a inheritance chain, where the `Shape` definition descends from `Square`. The hierarchy would look like this in Java:

```java
public class Square extends Shape {
  public string currShape = "Square";
}
```

If your coming from a C or Java background which is class-based, it might take a little bit of practice and reading to get the hang of prototype-based languages and Object model along with the inheritance chain. You can read more on [MDN - Details of the Object model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model#class-based_vs._prototype-based_languages).

<h2 class="post-heading">Defining Objects</h2>

We can define an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) in multiple ways:

```js
// Create an object literal 
let obj = { x: 20, y: 40 };

// Create an empty object and assign its properties/values (key value pairs)
let someObj = {};
someObj.prop1 = "hello"; 

// Create an object using the new keyword
let myObj = new Object();
myObj.foo = "bar";
```

We can also utilize `Object.create()` to create a new object from an existing object by using it as the prototype for our newly created object.

```js
const Human = {
  name: "",
  isHungry: false,
  about: () => {
    console.log(`My name is ${this.name}. Am I hungry? ${this.isHungry}`);
  }
}

const tanner = Object.create(Human);
tanner.name = "Tanner";
tanner.isHungry = true;
tanner.about();
// My name is Tanner. Am I hungry? true
```

You can create a normal empty object simply by using `Object.create({})`.

In Java and C++, we create the "template" for objects by using the `class` keyword as these are "class-based" languages, where we define the objects state (member variables) and behavior (methods). JavaScript does have a [`Class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) reserved keyword for creating classes but it's usually best to use functions and prototypical objects to build out the inheritance chain like we would define a superclass and child classes in Java.

<h3 class="post-heading">Now back to Arrays!</h3>

In JavaScript, arrays can more closely resemble a Map with name/value pairs.

> Arrays are predefined objects, where its indexes are the properties. 

That means the first value of an array at index 0 would be displayed as `0: 15` where the 0th (first index) holds a value of 15. One of my favorite things about JavaScript arrays compared to other languages arrays (like Java) is the fact that JavaScript arrays can hold a collection of values with different data types and grow dynamically. 

In Java, a generic array can only hold values of the same data type and cannot grow dynamically. This is where an [`ArrayList`](https://www.geeksforgeeks.org/arraylist-in-java/) in Java comes in handy because it's size can be dynamic and doesn't need to be "predefined".

```js
let myArr = [10, "foo", true, { prop: "bar" }]
console.log(ar[0]); // 10 (Number)
console.log(ar[1]); // "foo" (String)
console.log(ar[2]); // true (Boolean)
console.log(ar[3]); // Object { prop: "bar" }
console.log(ar[3].prop) // "bar" (access object properties)
```

There are many [data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) in JavaScript and like shown above, arrays can hold any of the primitive types (undefined, String, Number, Boolean, BigInt, Symbol) and structural types.

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

You might be asking yourself, so are arrays objects in JavaScript? And the answer is **yes**. We discussed at the beginning of the article, arrays are predefined objects. It becomes very clear arrays are objects when we use the `length` property of an array like `arr.length` to return the length. The way we access the length property using dot notation is exactly the same as how we would access the property of any object like `Object.property`. 

To further solidify that arrays are objects, the indexes in an array are the properties, so when we access a value such as `arr["2"]` we are accessing the `Object["2"]` value. The value stored at index 2 can be accessed from the array object by using the property `"2"`.

One last interesting note about arrays involves [`Array.prototype.length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length), which is essentially `Object.length`. When you have used the `length` property to count the number of values in an array, you might think it is counting each index that has a value. This is actually not the case. The length property returns the greatest number value index and increments it by one (due to 0-base indexing). Some people might look at this as a flaw, but I think it's a good way for us as developers to define arrays with logical and sequential numeric indexes to make sure when we use `Object.length` it returns the expected array length.

```js
let arr = [1, 2, 3];
arr[7] = 4;
console.log(arr); // [1, 2, 3, undefined, undefined, undefined, undefined, 4]
console.log(arr.length); // 8
```

You might think the above array `arr` would have a length of 4. But it actually has a length of 8. This is because the `arr.length` call returns the highest index in the array (7) and increments it by one (7+1=8). The way this works is that since the indexes `arr[3]-arr[6]` were not provided values, they are simply filled with `undefined`.
