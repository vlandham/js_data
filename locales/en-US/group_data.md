# Grouping Data

Grouping data is an important capability to have when doing data analysis. Often times, you will want to break apart the data by a categorical variable and look at statistics or details for each group.

D3 includes the powerful [d3.nest](https://github.com/mbostock/d3/wiki/Arrays#-nest) functionality to produce these groupings with a minimal amount of code.

## Nest Basics

Fundamentally, `d3.nest` is about taking a flat data structure and turning it into a nested one. The user gets to decide how the nesting should occur, and how deep to nest. This is a bit different then many group_by concepts, where only a single level of nesting is allowed.

Let's say we have the following CSV file of "expenses":

```
name,amount,date
jim,34.0,11/12/2015
carl,120.11,11/12/2015
jim,45.0,12/01/2015
stacy,12.00,01/04/2016
stacy,34.10,01/04/2016
stacy,44.80,01/05/2016
```

And that has been converted to a nice array of objects via our [data reading powers](read_data.html) into something like this:

@@ code=group_data/group_data.01.js @@

And now we want to slice up this data in different ways.

First, let's use nest to group by `name`:

@@ code=group_data/group_data.02.js @@

<div class="aside">This code is using d3.js</div>

Which results in a nested data structure:

@@ code=group_data/group_data.03.js @@

`expensesByName` is an array of objects. Each object has a `key` property - which is what we used as the grouping value using the `key` function. Here, we used the values associated with the `name` property as the key.

The `values` property of these entries is an array containing all the original data objects that had that key.

## Summarizing Groups

The nested structure can be great for visualizing your data, but might be a little underwhelming for analytical applications. Never fear! [d3.rollup](https://github.com/mbostock/d3/wiki/Arrays#nest_rollup) is here!

With `rollup`, you provide a function that takes the array of values for each group and it produces a value based on that array. This provides for some very flexible _group by_ functionality.

Here is a simple one to get back the counts for each name:

@@ code=group_data/group_data.04.js @@

@@ code=group_data/group_data.04.out @@

<div class="aside">This code is using d3.js</div>

The individual records are gone (for better or worse) and in their place are the values returned by our rollup function. The naming stays the same (_key_ and _values_) but the content is yours to specify. Note that the value passed into the `rollup` callback is the array of values for that key.

Here is another example where we get the average amount per person:

@@ code=group_data/group_data.05.js @@

@@ code=group_data/group_data.05.out @@

<div class="aside">This code is using d3.js</div>

Pretty cool right? Any roll-up function you can think of, you can make happen. And you don't need to stop at just one. `rollup` can return an object, so you can easily produce multiple metrics on your groups.

@@ code=group_data/group_data.06.js @@

@@ code=group_data/group_data.06.out @@

<div class="aside">This code is using d3.js</div>

## Map Output

The array output can be useful for using `map` or `forEach` as discussed in the [iteration and summation task](https://github.com/mbostock/d3/wiki/Arrays#nest_sortValues). But you can also have `d3.nest` return an object (or [d3.map]()) of the results, for direct access. Note the use of [nest.map](https://github.com/mbostock/d3/wiki/Arrays#nest_map) below.

@@ code=group_data/group_data.07.js @@

@@ code=group_data/group_data.07.out @@

<div class="aside">This code is using d3.js</div>

## Multi-Level Nesting

And you thought that single-level nesting was cool. Wait till you try multiple levels!

By adding more keys, you can sub-divide your data even further. Here is expense sums by name and then by date:

@@ code=group_data/group_data.08.js @@

@@ code=group_data/group_data.08.out @@

<div class="aside">This code is using d3.js</div>

Now the `rollup` callback is called for each of our smaller subgroups.

The order of the `nest.key` calls determines the order of the grouping. If we reverse our keys, we get the totals by date and then by name:

@@ code=group_data/group_data.09.js @@

@@ code=group_data/group_data.09.out @@

<div class="aside">This code is using d3.js</div>

Here the values are the same, but the mapping might be more convenient, depending on the questions you are trying to answer.

## Derived Key Values

Remember, we are specifying our key value using a function. This gives us the power to group on derived or otherwise on-the-fly keys.

For example, if we wanted to find out totals for all expenses for each year, we would just do some [basic string manipulation](strings.html) on the date string:

@@ code=group_data/group_data.10.js @@

@@ code=group_data/group_data.10.out @@

<div class="aside">This code is using d3.js</div>

All this flexibility provides for a powerful toolkit for exploring your data.

## Next Task

[Working with Strings](strings.html)

## See Also

- [Mister Nester](http://bl.ocks.org/shancarter/raw/4748131/) - a `d3.nest` power tool!
- [Phoebe Bright Nest Tutorial](http://bl.ocks.org/phoebebright/raw/3176159/) - lots more nest examples
