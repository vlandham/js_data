# Combining Data

_Note: This task was very generously contributed by [Timo Grossenbacher](http://timogrossenbacher.ch/) - Geographer and Data Specialist extraordinaire. Thanks very much Timo!_

Often, you have to combine two or more different data sets because they contain complementary information. Or, for example, the data come in chunks from the server and need to be reassembled on the client side.

Combining or _merging_ data may involve one of the following tasks:

* Combine data sets by one or more common attributes
* Add together rows from different data sets
* Combine attributes from different data sets

## Combine data sets by one or more common attributes

Let's say we have a list of the following articles:

@@ code=combine_data/combine_data.01.js @@

And of the following brands:

@@ code=combine_data/combine_data.02.js @@

As you can see, in each article, `brand_id` points to a particular brand, whose details are saved in another data set - which can be considered a *lookup table* in this case. This is often how separate data schemes are stored in a server-side database. Also note that the last article in the list has a `brand_id` for which no brand is stored in `brands`.

What we want to do now is to combine both datasets, so we can reference the brand's `name` directly from an article. There are several ways to achieve this.

### Using native `Array` functions

We can implement a simple join (*left outer join* in database terms) using native, i.e., already existing `Array` functions as follows. The method presented here modifies the `articles` array *in place* by adding a new key-value-pair for `brand`.

@@ code=combine_data/combine_data.03.js @@

@@ code=combine_data/combine_data.03.out @@

First, we loop over each `article`, where we take its `brand_id` to look up the corresponding `brand` using the native `filter` function. Note that this function returns an array and we expect it to have only one element. In case there is no corresponding `brand`, `result[0]` will be `undefined`, and in order to prevent an error (something like `result[0] is undefined`), we use the ternary operator.

Also, as we no longer need `brand_id` after the lookup has been done, we can safely delete it.

If we want to join by more than one attribute, we can modify the filter function to achieve this. Hypothetically, this might look something like:

```js
innerArray.filter(function(innerArrayItem) {
    return innerArrayItem.idA === outerArrayItem.idA &&
        innerArrayItem.idB === outerArrayItem.idB;
});
```

### Using a generic and more efficient approach

A more generic, and also more performant version of a join is proposed below (abbreviated from [this StackOverflow answer](http://stackoverflow.com/questions/17500312/is-there-some-way-i-can-join-the-contents-of-two-javascript-arrays-much-like-i/17500836#17500836)). Its output is equivalent to the one of the above method.

@@ code=combine_data/combine_data.04.js @@

Because above defined function creates an index for the `lookupTable` (in our case `brands`) in the first iteration, it runs considerably faster than the previously shown method. Also, via a callback, it allows us to directly define which keys (or "attributes") we want to retain in the resulting, joined array (`output`). It is used like so:

@@ code=combine_data/combine_data.05.js @@

@@ code=combine_data/combine_data.05.out @@

Note that we don't modify `articles` *in place* but create a new array.

## Add together rows from different data sets

Let's say we want to load a huge data set from the server, but because of network performance reasons, we load it in three chunks and reassemble it on the client side. Using Queue.js, as illustrated in [reading in data](read_data.html), we get the data and immediately combine it. For this, we can use D3's `merge` to combine the single arrays one after another. In database terms, this operation is called "union".

@@ code=combine_data/combine_data.06.js @@

@@ code=combine_data/combine_data.06.out @@

<div class="aside">This code is using d3.js</div>

Note that the argument passed to `d3.merge` must be an array itself, which is why we use the square brackets.

## Combine attributes from different data sets

In the last case, we have two or more data sets that contain attributes describing the same observations, or conceptual entities, and they need to be combined. This implies that all data sets have the same length. For example, `dataset_1` below contains two observations of attribute `type` and attribute `model`, while `dataset_2` contains the same two entities, but observed through attributes `price` and `weight`.

@@ code=combine_data/combine_data.07a.js @@

So in both data sets we essentially have separate information about the same conceptual entities, thus it makes sense to "merge" them, for which we can use  lodash's `merge` function:

@@ code=combine_data/combine_data.07b.js @@

@@ code=combine_data/combine_data.07.out @@
<div class="aside">This code is using lodash</div>

## Next Task

[Summarizing Data](summarize_data.html)
