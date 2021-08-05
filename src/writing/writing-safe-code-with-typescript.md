---
title: Should I define a type as 'any' in TypeScript?
date: 2021-07-30
datetime: 2021-07-30 00:00:00 Z
tags:
 - typescript
 - javascript
preview: "I've seen time and time again, developers resort to using 'foo: any = bar;' instead of defining an explicit type for the value. Using 'any' is not safe (at all) and that's the whole point of TypeScript, to write safe code."
---

{{ preview }} If your not sure what the data type will be for a value ahead of time. Try not to use `any` (unless you absolutely have to) as your type annotation, simply let TypeScript infer the values type for you through [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html).


I answered a question on StackOverflow describing exactly why we shouldn't be using `any` when defining types and what to do instead. 

> What can I replace 'any' with while declaring an object type in Typescript? [StackOverflow](https://stackoverflow.com/questions/66594670/what-can-i-replace-any-with-while-declaring-an-object-type-in-typescript/66595023#66595023)


<h2 class="post-heading">When in doubt, don't reach for any</h2>

Type inference is a great feature of TypeScript, but when we want to write "safe" code its usually best to explictly define types if you know they will be one of the primitive types:

- string
- number
- boolean
- symbol

If you can't use one of the primitive types, then its time to define some [object types](https://www.typescriptlang.org/docs/handbook/2/objects.html) with an interface or [generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) to better let TypeScript understand the "allowed" values for a certain variable, function etc.


<h2 class="post-heading">Do's and Dont's</h2>

Hopefully its clear that using the `any` type in TypeScript sort of defeats the purpose of writing TS code in the first place. When we use `any`, the TypeScript compiler allows for the type to literally be any data type, which is not "safe" and can lead to unexpected values if you aren't careful. The idea of TypeScript is to provide "strictly-type" JS code so that its durable and safer than plain ole JS which is "loosely-typed".

A few examples of writing type annotations with the primitive types:

```ts
const s: string = "Yo";
const n: number = 5;
const dec: number = 2.32;
const choice: boolean = false;
const strArr: string[] = ["A", "B", "C"];
const numArr: number[] = [1, 2, 3, 4];
const boolArr: boolean[] = [true, false, false];

// You might also see strArr and numArr written this way
// using the non-primitive Object Types
const strArr2: Array<string> = ["A", "B", "C"];
const numArr2: Array<number> = [1, 2, 3, 4];
const boolArr2: Array<boolean> = [true, false, false];
```

You might also need to write a type annotation for a 2D array, that could be done like this:

```ts
const nums: number[][] = [[1,2], [3, 4]];
const words = string[][] = [["a", "b"], ["c", "d"]];
const bools = boolean[][] = [[true, false], [false, true]];
```

Now that we know how to use primitive types and explicitly let TypeScript know the type of a variable through type annotations. Let's look at a bad example which uses `any` and how we can fix it by defining object types using an interface:

```ts
// BAD
const obj: any = {
    colors: ["#f06", "#000"],
    lengths: [1,2,3],
    name: "Foobar"
}
```

Using `any` to define the object type for this `obj` variable is just downright bad practice (unless you need it to not have any type checks, which may sometimes happen). If were going to loosely type an object like this, there really isn't a point in writing it in TypeScript to begin with. Now lets fix this by getting rid of the `any` type and define a more appropriate object type using an interface. This will make our code much safer as TypeScript knows what data types each value is "allowed" and the compile-time checks will be much stricter.

```ts
interface MyObj {
    colors: string[],
    lengths: number[],
    name: string
}

// safe
const obj: MyObj = {
    colors: ["#f06", "#000"],
    lengths: [1,2,3],
    name: "Foobar"
}
```

```ts
// also safe (without explicitly defining an interface)
const myObj: {
    colors: string[],
    lengths: number[],
    name: string
} = {
    colors: ["#f06", "#000"],
    lengths: [1,2,3],
    name: "Foobar"
}
```

If I wanted to write a type annotation for an array of `MyObj` types. It could be done like this:

```ts
const objArr: MyObj[] = [
    {
        colors: ["#f06", "#fff", "#000"],
        lengths: [1,2,3],
        name: "Foobar"
    },
    {
        colors: ["#f06", "#000", "#333"],
        lengths: [4,5,6],
        name: "Foobar"
    }
]
```

<h2 class="post-heading">Closing thoughts</h2>

I usually tend to define an interface anytime there is a variable or function that requires explicit type definitions that cannot be made from the primitive data types. Another option outside of interfaces, is using generics. If you programmed in Java, you might be familiar with generics. They are super powerful and really help us to write safe code. If you want to read more about using Generic Types, head over to the generics [documentation](https://www.typescriptlang.org/docs/handbook/2/generics.html). 

If anything were to stick with you from this article, I hope that it will be: Please don't use type `any` in TypeScript unless its absolutely required (which doesn't happen that often). I like to say, when in doubt, try not to reach for `any` but instead define an interface so TypeScript better understands what types to expect. Generics are also a great option!