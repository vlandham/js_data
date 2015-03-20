# Combining Data

Often, you have to combine two or more different data sets because they contain complementary information. Or, for example, the data come in chunks from the server and need to be reassembled on the client side. 

Combining (or "merging") data may thus involve one of the following tasks:

* Join data sets by one or more common attributes (also called "join" in common data manipulation languages)
* Combine rows from different data sets (also called "union" in common data manipulation languages)
* Combine columns from different data sets

## Join data sets by one or more common attributes

Let's say we have a list of the following articles: 

@@ code=combine_data/combine_data.01.js @@

And of the following brands: 

@@ code=combine_data/combine_data.02.js @@

As you can see, in each article, `brand_id` points to a particular brand, whose details are saved in another data set. This is often how separate data schemes are stored in a server-side database. Also note that the last article in the list has a `brand_id` for which no brand is stored in `brands`. 

What we want to do now is to combine both datasets, so we can reference the brand's `name` directly from an article. There are several ways to achieve this. 

### Using native `Array` functions

We can implement a simple, (*left*) join using native, i.e., already existing `Array` functions as follows. The method presented here modifies the `articles` array *in place* by adding a new key-value-pair for `brand`.  

@@ code=combine_data/combine_data.03.js @@

@@ code=combine_data/combine_data.03.out @@

First, we loop over each `article`, where we take its `brand_id` to look up the corresponding `brand` using the native `filter` function. Note that this function returns an array and we expect it to have only one element. In case there is no corresponding `brand`, `result[0]` will be `undefined`, and in order to prevent an error (something like `result[0] is undefined`), we use the ternary operator. 

Also, as we no longer need `brand_id` after the lookup has been done, we can safely delete it. 

### Using a generic and more efficient approach 

A more generic, and also more performant version of an *inner* join is proposed in [this Stackoverflow answer](http://stackoverflow.com/questions/17500312/is-there-some-way-i-can-join-the-contents-of-two-javascript-arrays-much-like-i/17500836#17500836).

@@ code=combine_data/combine_data.04.js @@

Because above defined function creates an index for the primary array (in our case `articles`) in the first iteration, it runs considerably faster than the previously shown method. Also, via a callback, it allows us to directly define which keys (or "attributes") we want to retain in the resulting, joined array (`output`). It is used like so: 

@@ code=combine_data/combine_data.05.js @@
@@ code=combine_data/combine_data.05.out @@

Note that we don't modify `articles` *in place* but create a new array. 



