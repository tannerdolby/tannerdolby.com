---
title: "Create Objects From an Array of Key and Value like Strings"
date: 2020-12-31
datetime: 2020-12-31 00:00:00 Z
tags: 
  - javascript
  - advent-of-code
preview: Have you ever had an array of values that you needed to convert to an object? I've run into this scenario quite a few times and wanted to write about it.
---

{{ preview }}

While working on the [Day 4](https://adventofcode.com/2020/day/4) challenge for this years [Advent of Code](https://adventofcode.com/2020/). I came across the need to transform a large string of key and value like inputs from the challenges input data. To give a little bit of context, the Day 4 challenge provided passport input data and asked us to verify whether each passport had the *required* fields. The data looked like this:

{% filename "input.txt" %}

```markup
ecl:#eef340 eyr:2023 hcl:#c0946f pid:244684338 iyr:2020 cid:57 byr:1969 hgt:152cm

pid:303807545 cid:213 ecl:gry hcl:#fffffd
eyr:2038 byr:1951
hgt:171cm iyr:2011

hcl:#c0946f byr:1933 eyr:2025 pid:517067213 hgt:173cm
ecl:hzl
iyr:2018
```

Where each piece of passport data is separated by empty space newlines (`\n`). The input file contained 257 entries, but I only showed a few for readability. Some of the data is formatted all in one line where others span multiple lines but ultimately each entry is separated by the empty space new line.

<h2 class="post-heading">Formatting Input Data</h2>

If your input data is in need of transformation, to format the string into a single line. The following steps may prove useful to you. To start handling a large `.txt` file like the file shown above, `input.txt`. Start by creating a template literal by wrapping the input text in opening and closing backticks.

```js
const input = 
`ecl:#eef340 eyr:2023 hcl:#c0946f pid:244684338 iyr:2020 cid:57 byr:1969 hgt:152cm

pid:303807545 cid:213 ecl:gry hcl:#fffffd
eyr:2038 byr:1951
hgt:171cm iyr:2011`;
```

Now since the input is a `String` data type, we have access to `String.prototype` methods such as `.split`. This way, it's going to be much easier to put the data from the text file into a data structure, such as an `Array` for manipulation. 

{% filename "passports.js" %}

```js
const passportData = input.split("\n\n");
```

The above code separates each passport entry from the text file by two consecutive newlines and creates an array of strings. Remember, some of the inputs are multi-line entries. Therefore, separating the entries by only one newline entity using `.split("\n")` will create an array of strings with each entry separated by a newline. This isn't ideal as we want every full passport entry to be its own string as a value in the array.

```js
0: "ecl:#eef340 eyr:2023 hcl:#c0946f pid:244684338 iyr:2020 cid:57 byr:1969 hgt:152cm"
1: ""
2: "pid:303807545 cid:213 ecl:gry hcl:#fffffd"
3: "eyr:2038 byr:1951"
4: "hgt:171cm iyr:2011"
```

Using `.split("\n\n")` is the more efficient method for transforming the input data in `input.txt`. This way, each passports data is stored as an array of passport strings. The multi-line entries still contain `\n` entities so the formatting work is not yet complete.

```js
0: "ecl:#eef340 eyr:2023 hcl:#c0946f pid:244684338 iyr:2020 cid:57 byr:1969 hgt:152cm"
1: "pid:303807545 cid:213 ecl:gry hcl:#fffffd↵eyr:2038 byr:1951↵hgt:171cm iyr:2011"
2: "hcl:#c0946f byr:1933 eyr:2025 pid:517067213 hgt:173cm↵ecl:hzl↵iyr:2018"
```

Since not all the values in the input data were single line entries, they still contain a `↵` which is equivalent to the `Enter` key or more commonly, a newline `\n`. To handle this last formatting task, I thought it would be best to use `Array.prototype.map` since the underlying data structure is an array after using `.split()`.

```js
const passportData = input.split("\n\n");
const cleanData = passportData.map(p => p.split("\n").join(" "));
```

Now all the formatting is done and all passport data is stored as an array of single line strings containing key/value like data.

```js
0: "ecl:#eef340 eyr:2023 hcl:#c0946f pid:244684338 iyr:2020 cid:57 byr:1969 hgt:152cm"
1: "pid:303807545 cid:213 ecl:gry hcl:#fffffd eyr:2038 byr:1951 hgt:171cm iyr:2011"
2: "hcl:#c0946f byr:1933 eyr:2025 pid:517067213 hgt:173cm ecl:hzl iyr:2018"
```

<h2 class="post-heading">Convert an array of strings to an object</h2>

I created a helper function to handle the converting. It accepts one parameter, a string, or an array of strings and splits the incoming string by a colon `:`. Then using a [for..of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) statement it's quite straightforward to assign the key and value chunks to variables. The utility function looks like this:

```js
function convertToObj(arr) {
  const obj = {};

  for (const s of arr) {
    const data = s.split(":");
    let key = data[0];
    let value = data[1].trim();
    obj[key] = value;
  }

  return obj;
}
```

The function could use some testing and refined logic to handle more use-cases, but to demonstrate how the utility works for an array of strings:

```js
const converted = convertToObj(["key1: red", "key2: yellow", "key3: purple"]);
```

The output of `console.log(converted)` would be:

```js
{
  key1: "red", 
  key2: "yellow", 
  key3: "purple"
}
```

In order to utilize the full potential of this helper function (specifically for the Day 4 challenge). We can use another `for..of` loop to invoke `converToObj` for each passport string in the array of strings from our formatted data.

```js
const passportData = input.split("\n\n");
const cleanData = passportData.map(p => p.split("\n").join(" "));

for (str of cleanData) {
    const inputs = str.split(" ");
    const data = convertToDict(inputs);
    console.log(isValid(data)); // 206 valid passports :)
}
```
The output of `data` would be each passport string converted to a well defined object.

```js
{ecl: "#eef340", eyr: "2023", hcl: "#c0946f", pid: "244684338", iyr: "2020", …}
{pid: "303807545", cid: "213", ecl: "gry", hcl: "#fffffd", eyr: "2038", …}
{hcl: "#c0946f", byr: "1933", eyr: "2025", pid: "517067213", hgt: "173cm", …}
```

To finish solving Day 4 part one, I wrote an `isValid` function to check each of the required passport fields.

```js
function isValid(obj) {
    var byr = Object.keys(obj).includes("byr");
    var iyr = Object.keys(obj).includes("iyr");
    var eyr = Object.keys(obj).includes("eyr");
    var hcl = Object.keys(obj).includes("hcl");
    var ecl = Object.keys(obj).includes("ecl");
    var hgt = Object.keys(obj).includes("hgt");
    var pid = Object.keys(obj).includes("pid");

    return byr && iyr && eyr && hcl && ecl && hgt && pid ? obj : false;
}
```

Well! I may have talked about many things in this article, but hopefully the helper function for converting key and value like strings to a well defined object was clear. This article will also help you to solve part one of the Advent of Code Day 4 challenge. The source code for this can be found at [tannerdolby/advent-of-code](https://github.com/tannerdolby/advent-of-code/blob/master/js/day-four.js) on GitHub.