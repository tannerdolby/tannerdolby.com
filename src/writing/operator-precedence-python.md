---
title: Expressions and operator precedence in Python
date: 2021-07-25
datetime: 2021-07-25 00:00:00 Z
tags:
 - python
preview: The order of operations in an expression is very important to understand. With more complex expressions, operator precedence isn't always straightforward and if not used correctly leads to unexpected values.
---

{{ preview }} Understanding which operators and groups take the highest precedence in an expression will help tremendously.

As someone with a background in mathematics, the acronym "PEMDAS" was spoken quite often. Not as much in my higher level math studies (Differential Equations & Linear Algebra) as we were expected to have memorized or fully understood which operations would "happen first" in complex algebraic expressions. Understanding which operators take the highest precedence in an expression is extremely important regardless of the level of math. 

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

The order of operations can be described by the table below. Where the operator precedence goes from highest (parentheses) to lowest (addition & subtraction). If you have to compare two operators in the same group, the precedence goes from left (highest) to right (lowest). This is called left-to-right associativity. For the exponents group, the associativity is right-to-left. All precedence rules can be overridden by explicitly placing parentheses around a part of the expression.

When two operators share an operand like `2 - 5 * 3`, the operator with the highest precedence will take place first. Therefore, `2 - 5 * 3` could be rewritten as `2 - (5 * 3)` where the parentheses now take highest precedence and `5 * 3` occurs first leaving us with `2 - 15 = -13`.

Something to keep in mind. When a division operator appears before multiplication, division goes first.


| Name | Operator(s) | Mnemonic |
|------|-------------|--------------|
| Parentheses | `(expression)` | <strong>P</strong>lease |
| Exponents | `**` | <strong>E</strong>xcuse |
| Multiplication & Division | `*`, `/`, `//`, `%` | <strong>M</strong>y <strong>D</strong>ear |
| Addition & Subtraction | `+`, `-` | <strong>A</strong>unt <strong>S</strong>ally |

<h3 class="post-heading">Basic examples</h3>

Now that we have the above table to reference and [Python docs](https://docs.python.org/3/reference/expressions.html), lets look at a few expressions. I will start off with a few "basic" expressions where the order of operations is straightforward, then the difficulty will increase and it will take a moment to scan the expression and make a note of which operations will occur first.

_Note: An expression can be represented as `2 + 5 - 2` where the operators are `+`, `-` and the operands (or values) are `2`, `5`, `2`._

```python
a = 5 + 4 - 3 + 2 + 1
print(a) # 9
```

Since two operators share an operand like `+ 4 -` where 4 is surrounded by two operators, addition and subtraction. We can apply parentheses to the operator that takes the highest precedence (addition here) and continue evaluating the expression. Therefore, `5 + 4 - 3` can be written as `(5 + 4) - 3` which equals `9 - 3 = 6`.

This can be verified by checking the table above and seeing the `+` is the leftmost operator in the Addition & Subtraction group and when comparing operators in the same group, the operator closest to the left has the higher precedence.

Now for something a bit more involved:

```python
b = 30 / 2 * 5 + (10 + 5) - 3
```

<details>
    <summary>Show explanation</summary>
    <pre class="language-python"><code class="language-python"><span class="token keyword">print</span>(b) <span class="token comment"># 87</span></code></pre>
    <div>
        <ol>
            <li> Parentheses first (10 + 5) = 15 where the expression is rewritten as <code>30 / 2 * 5 + 15 - 3</code></li>
            <li>Next, we can see the operand <code>2</code> shares two operators, multiplication takes the highest precedence but since the division comes before the multiplication the division goes first so <code>30 / 2 * 5</code> can be rewritten as <code>(30 / 2) * 5</code>. Which evaluates to <code>15 * 5 = 75</code>. The initial expression is now <code>75 + 15 - 3</code></li>
            <li>Lastly do addition and subtraction, since the operand 15 shares two operators <code>+ 15 -</code> the addition goes first and can be rewritten as <code>(75 + 15) - 3 = 90 - 3 = 87</code></li>
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

1. Parentheses first: `(20 / 2) = 10` where the expression is rewritten as `2 ** 4 + 11 % 5 - 10 + 13 // 2 * 3`
2. Exponents next: The exponents take the next highest precedence so `2 ** 4 = 16` and the initial expression will be `16 + 11 % 5 - 10 + 13 // 2 * 3`
3. Now we look at the `2` operand which shares two operators `// 2 *`, the multiplication operator has higher precedence but if division occurs before multiplication the division comes first ([see above](#operator-precedence-table)). So we can rewrite `13 // 2 * 3` as `(13 // 2) * 3` which equals `6 * 3 = 18`. Now the original expression can be written as `16 + 11 % 5 - 10 + 18`.
4. The operand 5 shares two operators `% 5 -` and the modulo operator takes higher precedence so things can be rewritten as `(11 % 5) - 10` which equals `1 - 10 = -9`. Updating the original expression to be `16 - 9 + 18`
5. Lastly handle the addition and subtraction, the operand `9` shares two operators and the subtraction appears first in the expression (even though addition takes higher precedence) so we can write `(16 - 9) + 18` which equals `7 + 18 = 25`

_Note: Typically, in everyday programming you won't encounter such expressions but they could potentially show up from time to time._

<h2 class="post-heading">Conclusion</h2>

I hope the few examples shown within this article help you to better understand the order of operations in Python. Feel free to make up your own expressions and quiz yourself to see if you calculate the expected final answer after performing the correct order of operations. The expressions can be verified by entering them into REPL, Jupyter Notebook or a text editor of your choosing.

After practicing with a few expressions, you will start to become more comfortable with complex expressions and determining the order of operations will become second-nature.
