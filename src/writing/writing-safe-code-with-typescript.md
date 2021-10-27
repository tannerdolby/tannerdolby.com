---
title: Should I define a type as 'any' in TypeScript?
date: 2021-08-12
datetime: 2021-08-12 00:00:00 Z
tags:
 - typescript
 - javascript
preview: "The 'any' type isn't something I use very often in my own development. But I have seen it occasionally used out in the wild."
---

{{ preview }} A good rule is, if your unsure of a data type for a variable, its best to let TypeScript infer the variables type for you through [type inference][type inference] rather than using type `any`. Only resort to using `any` if you absolutely have to.

When you can, try using a type annotation to explicitly tell the compiler what data type to expect. But when your unsure what the data type will be ahead of time, this is where type inference is quite nice.

> What can I replace 'any' with while declaring an object type in Typescript? [StackOverflow][2]

<h2 class="post-heading">When in doubt, don't reach for any</h2>

Type inference is a great feature of TypeScript, but its also perfectly fine to explictly define types if you know they will be one of the primitive types:

- string
- number
- boolean
- symbol

If you can't use one of the primitive types, then its time to define some [object types][3] with an interface, a `type` or [generics][4] to better let TypeScript understand the "allowed" values for a certain variable, function etc.

<h2 class="post-heading">Do's and Dont's</h2>

Hopefully its clear that using the `any` type in TypeScript sort of defeats the purpose of writing TS code in the first place. When we use `any`, the TypeScript compiler allows for the type to literally be any data type, which is not "safe" and can lead to unexpected values if you aren't careful. The idea of TypeScript is to provide "strictly-typed" JS code so that its durable and safer than plain ole JS which is "loosely-typed".

A few examples of writing type annotations with the primitive types:

{% filename "types.ts" %}

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

{% filename "types.ts" %}

```ts
interface MyObj {
    colors: string[];
    lengths: number[];
    name: string;
}

// or using a type annotation
type MyObject = {
    colors: string[];
    lengths: number[];
    name: string;
}

// safe
const obj: MyObj = {
    colors: ["#f06", "#000"],
    lengths: [1,2,3],
    name: "Foobar"
}
```

```ts
// also safe
const myObj: {
    colors: string[];
    lengths: number[];
    name: string;
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

I usually tend to define an interface or use a `type` annotation anytime there is a variable or function that could benefit from explicit type definitions. Another option outside of interfaces, is using generics. If you programmed in Java, you might be familiar with generics. They are super powerful and really help us to write safe code. If you want to read more about using Generic Types, head over to the generics [documentation][4]. 

If anything were to stick with you from this article, I hope that it will be: Please don't use type `any` in TypeScript unless its absolutely required (which doesn't happen that often). I like to say, when in doubt, try not to reach for `any` but instead define an interface so TypeScript better understands what types to expect. Generics are also a great option!

[type inference]: https://www.typescriptlang.org/docs/handbook/type-inference.html
[2]: https://stackoverflow.com/questions/66594670/what-can-i-replace-any-with-while-declaring-an-object-type-in-typescript/66595023#66595023
[3]: https://www.typescriptlang.org/docs/handbook/2/objects.html
[4]: https://www.typescriptlang.org/docs/handbook/2/generics.html							