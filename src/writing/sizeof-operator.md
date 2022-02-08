---
title: Calculating the size of an array in C++ using the sizeof operator
preview: For a fixed-size array (non-dynamic), calculating the size can seem complicated but it's really quite simple when we think about how the sizeof operator works.
tags:
 - cpp
permalink: "/writing/{{ title | slug }}/"
date: 2022-02-05
datetime: 2022-02-05 00:00:00 Z
---

{{ preview }}

The [sizeof](https://en.cppreference.com/w/cpp/language/sizeof) will yield the size in bytes of a variable or data structure. Given the fact that arrays are linear data structures for sequentially storing elements of the same type, we can get the size of the underlying array data structure and then divide it by the size of a single element in the array.

<h2 class="post-heading">Why does this work?</h2>

The reason we can do this is quite simple and was intended. To break things down lets take the following code:

```cpp
#include <iostream>
int main() {
    // declare an integer array of size 6
    int arr[6] = {1,2,3,4,5,6};

    return 0;
}
```

Since we are not working with a dynamic array which has variable size, the size of the integer array `arr` must be specified at initialization. To avoid simply remebering that number, we can utilize `sizeof()` to calculate the arrays size. For context, typically in computer architecture a `byte` equals 8 or more `bit`'s.

In C++, and when working on a 32/64 bit machine. An `int` is "usually" a signed fixed-width (32-bit) integer which is represented as 4 bytes. Any fixed-width integer value can have its size broken down into bytes and bits based on the definition of a `byte` for your computers architecture.

```text
fixedWidth = numBytes * byteSize
```

Therefore `32 = numBytes * byteSize` and we know a byte equals 8 bits so the equation becomes:

```text
32 = numBytes * 8 
```

Solving for the number of bytes `numBytes`, we can conclude `numBytes = 32 / 8` which equals 4 bytes. For another common fixed-width integer, the 64-bit integer, it would be represented as 8 bytes. Now let's get back to the code and calculate the size of the array to iterate all of the elements:

```cpp
#include <iostream>
using namespace std;
int main() {
    // declare an integer array of size 6
    int arr[6] = {1,2,3,4,5,6};
    // n = 24 bytes / 4 bytes = 6
    int n = sizeof(arr) / sizeof(arr[0]);
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    // 1 2 3 4 5 6
    return 0;
}
```

Because `sizeof` yields the number of bytes a data structure represents, when we use `sizeof(arr)` we get 24 bytes since the array stores 6 values with `int` data type which occupy 4 bytes each. The size we initialized the array with is 6, so that means we have 6 * 4 = 24 bytes represented by `arr` in memory. 

Next, using `sizeof(arr[0])` we can get the size of a given element in the array which will represent the number of bytes each element is represented by (since all the elements are the same data type). I usually grab the first element in the array `arr[0]` but any element would do, or using a pointer to `arr` like `sizeof(*arr)` would also accomplish the same task.

<h3 class="post-heading">Calculating size</h3>

```cpp
int arr[6] = {1,2,3,4,5,6};
// option 1
int size = sizeof(arr) / sizeof(arr[0]);
// option 2
int n = sizeof(arr) / sizeof(*arr);
```