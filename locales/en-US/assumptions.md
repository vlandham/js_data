# Checking Data Assumptions

Data processing is tricky business, full of pitfalls and gotchas. Hopefully the tasks in this guide help with getting started in this process. But you, I, and the entire world will make mistakes. It's natural.

But mistakes in data processing, like all other kinds of mistakes, can be painful. They can result in hours of bug hunting, days of reprocessing, and months of crying. Since we know mistakes happen and will continue to happen, what can we do to take away some of the pain?

In a word, _padding_. We need some padding to protect us from the bumps and bruises of data processing. And I would suggest that this padding come in the form of simple tests that check the assumptions you have about the shape and contents of your data.

Unless there is an extreme performance need, these tests should run in the data processing pipeline. Optimally, they would be easy to turn on and off so that you can disable them if you need to if your code is deployed.

## Assertions

These tests can be created with [assertions](http://en.wikipedia.org/wiki/Assertion_%28software_development%29) - functions that check the truthiness of a statement in code. Typically, they raise an error when an expected truth is not actually true.

JavaScript doesn't have a built assertions, but we can rectify this deficiency with a simple function.

@@ code=assumptions/assumptions.01.js @@

This will output a given message if the input is not true. Typically assertions [throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) errors, but we can just log it for explaining purposes.

## Data Content Assumptions

Now let's use our `assert` function to check some assumptions about the details of our data.

We can use lodash's suite of [type checking functions](https://lodash.com/docs#isBoolean) to take care of performing the checks, passing the result of the check to `assert` to produce our errors.

Let's say our data importing process has made some mistakes:

@@ code=assumptions/assumptions.02.js @@

Our first entry looks ok, where our second entry has some problems. The age parsing for the immortal [Sleepwalker](http://en.wikipedia.org/wiki/Sleepwalker_%28comics%29) has left him with no age. Also, bad input data has left us with a string in `superhuman`, where we expect a boolean.

A simple assumption checking function that could be run on this data could look something like this:

@@ code=assumptions/assumptions.03.js @@

@@ code=assumptions/assumptions.03.out @@

<div class="aside">This code is using lodash</div>


Again, the focus here is on detection of data problems. You want something quick and simple that will serve as an early warning sign.

Unfortunately, the JavaScript primitive `NaN` is indeed a number, and so additional checks need to be made. As more data comes in, this function will need to be updated to add more checks. This might get a bit tedious, but a little bit of checking can go a long way towards maintaining sanity.

## Data Shape Assumptions

Just as you can test your assumptions about the content of your data elements, it can be a good idea to test your assumptions about the _shape_ of your data. Here, shape just refers to the size and structure of your data. Rows and columns.

Something simple to perform this check could look like this:

@@ code=assumptions/assumptions.04.js @@

@@ code=assumptions/assumptions.04.out @@

The two assumption functions could easily be combined into one, but it's important to look at both aspects of your data.

## More Assertions

If this is an approach that appeals to you, and your data might get really complicated (or really messy)
you may want to explore using more complicated assertion code.

One useful library to explore is [Chai](http://chaijs.com/api/assert/) which comes with a great
collection of assertion helpers. These can help you check for more complicated things like whether
two objects are equal or whether an object has or doesn't have a property.

For example:

@@ code=assumptions/assumptions.05.js @@

@@ code=assumptions/assumptions.05.out @@

<div class="aside">This code is using chai's assert library</div>

## Next Task

[Using Node](node.html)

## See Also

- [Parsing raw data](http://www.pgbovine.net/parsing-raw-data.htm) - a great guide that motivated this section
- [Chai](http://chaijs.com/api/assert/) - Chai's assert library
