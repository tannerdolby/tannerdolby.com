---
title: Expressions and operator precedence in Python
date: 2021-07-25
datetime: 2021-07-25 00:00:00 Z
tags:
 - python
preview: The order of operations in an expression is extremely important to understand. With more complex expressions, operator precedence isn't always extremely straightforward and if not used correctly leads to unexpected values.
---

{{ preview }} and understanding which operators and groups take the highest precedence in an expression will help tremendously.

As someone with a background in mathematics, the term "PEMDAS" was spoken quite often. Not as often in my higher level math studies (Differential Equations & Linear Algebra) as you were expected to have memorized or fully understood which operations would "happen first" in complex expressions. Understanding which operators take the highest precedence in an expression is extremely important regardless of the level of math. 

Some basic mathematical operators are:

- Addition: `+`
- Subtraction: `-`
- Multiplication: `*`
- Division: `/`
- Modulus: `%`

and specific to Python:

- Power of: `**`
- Floor division: `//`

<h2 class="post-heading">Operator Precedence Table</h2>

The PEMDAS acronynm has a common mnemonic device to help remember the acronymn: <strong>P</strong>lease <strong>E</strong>xcuse <strong>M</strong>y <strong>D</strong>ear <strong>A</strong>unt <strong>S</strong>ally.

> When two operators share an operand, the operator with the higher precedence goes first.

The order of operations can be described by the table below. Where the operator precedence goes from highest (parentheses) to lowest (addition & subtraction). If you have to compare two operators in the same group to see which has the higher precedence, the precedence goes from left (highest) to right (lowest). This is called left-to-right associativity.


| Name | Operator(s) | Mnemonic |
|------|-------------|--------------|
| Parentheses | `(expression)` | <strong>P</strong>lease |
| Exponents | `**` | <strong>E</strong>xcuse |
| Multiplication & Division | `*`, `/`, `//`, `%` | <strong>M</strong>y <strong>D</strong>ear |
| Addition & Subtraction | `+`, `-` | <strong>A</strong>unt <strong>S</strong>ally |

<h3 class="post-heading">Basic examples</h3>

Now that we have the above table and [Python docs](https://docs.python.org/3/reference/expressions.html) to reference, lets look at a few expressions. I will start off with a few "basic" expressions where the order of operations is straightforward, then the difficulty will increase and it will take a moment to scan the expression and make a note of which operations will occur first.

_Note: An expression can be represented as `2 + 5 - 2` where the operators are `+`, `-` and the operands (or values) are `2`, `5`, `2`._

```python
a = 5 + 4 - 3 + 2 + 1
print(a) # 9
```

Explanation: This expression is quite simple, we are simply adding and subtracting values. The addition operations happen first and then subtraction. This can be verified by checking the table above and seeing the `+` is the leftmost operator in the Addition & Subtraction group and when comparing operators in the same group, the operator closest to the left has the higher precedence.

Now for something a little more involved:

```python
b = 30 / 2 * 5 + (10 + 5) - 3
```

<details>
    <summary>Show explanation</summary>
    <pre class="language-python"><code class="language-python"><span class="token keyword">print</span>(b) <span class="token comment"># 15</span></code></pre>
    <div>
        <ol>
            <li> Parentheses first (10 + 5) = 15 - <code>30 / 2 * 5 + 15 - 3</code></li>
            <li> Next multiplication & division, since the left operand in `2 * 5` is being divided it can be thought of as (30 / 2) * 5 so the parentheses come first and we have `15 * 5 = 75` - <code>75 + 15 - 3</code></li>
            <li>Lastly do addition and subtraction - <code>90 - 3 = 87</code></li>
            <li>Final answer: <code>87</code></li>
        </ol>
    </div>
</details>

<h3 class="post-heading">Complex expressions</h3>

Ok, so the above examples used parentheses, multiplication, division, addition, and subtraction. Lets do one more example that utilizes exponents to fully understand the order of operations in more complex expressions.

```python
c = 2 ** 4 + 11 % 5 - (20 / 2) + 13 // 2 * 3
print(c) # 25
```

There is alot going in the above expression. Lets break down the order of operations:

1. Parentheses first - `(20 / 2) = 10` where the expression is `2 ** 4 + 11 % 5 - 10 + 13 // 2 * 3`
2. Exponents next - `2 ** 4 = 2^4 = 16` where the expression is `16 + 11 % 5 - 10 + 13 // 2 * 3`
3. Multiplication first, then the floor division, lastly the modulus operator 
    - Multiply & floor division since the left operand is the same precedence group so left-to-right associativity takes place: `(13 // 2) * 3 = 6 * 3 = 18`
    - Resulting expression: `16 + 11 % 5 - 10 + 18`
4. Handle the modulus: `11 % 5 = 1` where the expression is now `16 + 1 - 10 + 18` 
5. Perform the final addition & subtraction: 
    - `(1 - 10) + 18 = -9 + 18 = 9`
    - Which leaves us with `16 + 9`
6. Final answer: `25`

_Note: Typically, in everyday programming you won't encounter such expressions but they could potentially show up from time to time._

I hope the few examples shown within this article help you to better understand the order of operations in Python. Feel free to make up your own expressions and quiz yourself to see if you calculate the expected final answer after performing the correct order of operations. The expressions can be verified by entering them into REPL, Jupyter Notebook or a text editor of your choosing.

After practicing with a few expressions, you will start to become more comfortable with complex expressions and determining the order of operations will become second-nature.
