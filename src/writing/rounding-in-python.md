---
title: Rounding floating point numbers with Python
date: 2021-07-13
datetime: 2021-07-13 00:00:00 Z
tags:
 - python
desc:
preview: Rounding numbers in Python is quite common. There might be a situation where values must only be rounded to 3 decimals or some arbitrary number. Using the built-in function round() is handy but changes the original value.
---

{{ preview }} 

During chemistry class in college, I frequently heard and used the term "significant figures". Which essentially referred to rounding off a large decimal number so that we only include the most relevant digits.

> Significant figures of a number in positional notation are digits in the number that are reliable and absolutely neccessary to indicate the quantity of something. [Wikipedia](https://en.wikipedia.org/wiki/Significant_figures)

Outside of "sig figs", rounding decimal values to a certain precision and determining the type of rounding that occurs is quite important for extremely precise calculations like those in banking/financial software.

<h2 class="post-heading h2-5">How does Python handle floating point numbers?</h2>

Python at the lowest level, is built on top of C. That means that when floating point values undergo operations, the values that are being calculated by C (for Python) are converted to binary fractions and not floating point numbers. Unfortunately, the fractions are not as accurate as floating point numbers. When you see a floating point value, remember it is indeed a fraction (or two). 

Somewhere within the calculations done by C, we realize that some floating points are being lost, which is not ideal for highly accurate financial software or other applications. Python gives us the built-in `round()` function to round floating point numbers (but this does change the original value and is not the most accurate). For ultimate accuracy, we can use packages like [decimal](https://docs.python.org/3/library/decimal.html) to ensure floating point numbers are extremely precise.

One way to quickly test this for yourself, is to try performing some operations on two decimal value literals. Jump into REPL or your favorite text editor to follow along.

```python
>>> 4.6 + 3.3
7.8999999999999995
```

As we would expect, the type of `value` is indeed a `float`. But what is intriguing is that instead of 7.9 being calculated, somewhere along the way when C calculates the binary fractions, we lose roughly 5 points and are given the value `7.8999999999999995`.

<details>
<summary>Basic Terminology</summary>

 - 4.6 + 3.3 is an expression
 - 4.6 and 3.3 are float literals (operands)
 - `/` is the division operator 

</details>

Using the built-in [`round()`](https://docs.python.org/3/library/functions.html#round) function, we can make sure the value is rounded to `n` decimals. Remeber this is not extremely accurate and does change the original value, so the floating points truncated are no longer stored in `value` and the new value is `7.9`.

```python
>>> round(4.6 + 3.3, 1)
7.9
```

<h2 class="post-heading h2-5">Rounding without changing original value</h2>

If we don't want to change the original value with `round()`, a great alternative for formatting output is [`format()`](https://docs.python.org/3/library/functions.html#format). It allows us to format the output string without changing the original floating point number like `round()` does. This is handy when you just need to display the decimal output rounded to `n` decimal places without altering the original value. 

This example demonstrates how to display the rounded/formatted decimal number output:

```python
value = 4.652 + 3.321
print('The formatted/rounded value is {:0.2f}'.format(value))
# The formatted/rounded value is 7.97
```

_Note: Read more about rounding/formatting decimals on [StackOverflow](https://stackoverflow.com/questions/20457038/how-to-round-to-2-decimals-with-python)_

You could also use [f-strings](https://realpython.com/python-f-strings/) which is a much quicker way to format strings as an alternative to the longhand `format()` usage. Simply place the letter `f` before your string and use curly braces `{}` to interpolate variables inside a string just as we would do with backticks and string interpolation syntax `${}` in JavaScript.

```python
name = "Root"
size = 250
print(f"I Am {Root}. I have {size} GB of storage.")
# I am Root. I have 250 GB of storage.
```

<h2 class="post-heading h2-5">Extreme precision rounding</h2>

If your building a complex financial system or application that requires very precise calculations, using the [decmimal](https://docs.python.org/3/library/decimal.html) module will be the recommended course of action. The Python docs provide a great quick start example for anyone interested in using this module for precise floating point calculations.

```python
from decimal import *

# View the current context
ctx = getcontext()
print(ctx) # Context(prec=28, rounding=ROUND_HALF_EVEN, Emin=-999999999, Emax=999999999, capitals=1, flags=[], traps=[Overflow, DivisionByZero, InvalidOperation])

# Alter precision
ctx.prec = 10

# Construct some new decimal objects
a = Decimal(3.14)
print(a) # 3.140000000000000124344978758017532527446746826171875

b = Decimal((0, (5, 1, 5), -2))
print(b) # 5.15
```

The significance of a new Decimal is determined solely by the number of digits input. Context precision and rounding only come into play during arithmetic operations.

Keep the above in mind when setting specific `prec` values for the decimal module context `getcontext()`. We create new `Decimal` values in the code snippet above and the significance is determined by the number digits used as input. When arithmetic operations are performed, the context precision and rounding come into play.

```python
# Arithmetic operations (where precision and rounding come into play)
val = Decimal(5.05362) + Decimal(2.61589)
print(val) # 7.66951

# Change rounding in context to round up (from default ROUND_HALF_EVEN)
ctx.rounding = ROUND_DOWN
val = Decimal(5.05362) + Decimal(2.61589)
print(val) # 7.66950
```

There is much more to be discovered in the [decimal](https://docs.python.org/3/library/decimal.html) module, but I will leave that up to you. I hope this article shed some light on floating point numbers in Python and the options you have for dealing with extremely precise decimal calculations.
