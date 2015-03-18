# Summarizing Data

With the data [loaded](read_data.html), we want to take a quick look at what we have. D3 has a number of tools to use for quick data exploration.

To start, let's pretend we have loaded up a csv file - and have a dataset that looks something like:

@@ code=summarize_data/summarize_data.01.js @@

## Min & Max

As it turns out, D3 comes to the rescue again, with [d3.min](https://github.com/mbostock/d3/wiki/Arrays#d3_min) and [d3.max](https://github.com/mbostock/d3/wiki/Arrays#d3_max). Use the callback function to indicate which property (or computed value based on the properties) to access.


@@ code=summarize_data/summarize_data.02.js @@

@@ code=summarize_data/summarize_data.02.out @@

<div class="aside">This code is using d3.js</div>

@@ code=summarize_data/summarize_data.03.js @@

@@ code=summarize_data/summarize_data.03.out @@

<div class="aside">This code is using d3.js</div>

If you want both of them at the same time, you can use [d3.extent](https://github.com/mbostock/d3/wiki/Arrays#d3_extent)

@@ code=summarize_data/summarize_data.04.js @@

@@ code=summarize_data/summarize_data.04.out @@

<div class="aside">This code is using d3.js</div>

This returns an array with the first element the minimum value and the second element the maximum.

## Summary Statistics

D3 provides a few basic tools to analyze your data, all using the same format as the min and max functions. Simply provide the property you would like to analyze, and you are good to go.

[d3.mean](https://github.com/mbostock/d3/wiki/Arrays#d3_mean)

@@ code=summarize_data/summarize_data.05.js @@

@@ code=summarize_data/summarize_data.05.out @@

<div class="aside">This code is using d3.js</div>

[d3.median](https://github.com/mbostock/d3/wiki/Arrays#d3_median)

@@ code=summarize_data/summarize_data.06.js @@

@@ code=summarize_data/summarize_data.06.out @@

<div class="aside">This code is using d3.js</div>

[d3.deviation](https://github.com/mbostock/d3/wiki/Arrays#d3_deviation) - for standard deviation

@@ code=summarize_data/summarize_data.07.js @@

@@ code=summarize_data/summarize_data.07.out @@

<div class="aside">This code is using d3.js</div>

## Next Task

[Iterating and Reducing](iterate_data.html)

## See Also

- [simple statistics](https://github.com/tmcw/simple-statistics) - more JavaScript based stats written in easier to comprehend code.

