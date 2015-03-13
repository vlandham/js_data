// # Summarizing Data
//
// With the data [loaded](read_data.html), we want to take a quick look at what we have. D3 has a number of tools to use for quick data exploration.
//
// To start, let's pretend we have loaded up a csv file - and have a dataset that looks something like:
//
var data = [
  {"city":"seattle", "state":"WA", "population":652405, "land_area":83.9},
  {"city":"new york", "state":"NY", "population":8405837, "land_area":302.6},
  {"city":"boston", "state":"MA", "population":645966, "land_area":48.3},
  {"city":"kansas city", "state":"MO", "population":467007, "land_area":315}
];
//
// ## Min & Max
//
// As it turns out, D3 comes to the rescue again, with [d3.min](https://github.com/mbostock/d3/wiki/Arrays#d3_min) and [d3.max](https://github.com/mbostock/d3/wiki/Arrays#d3_max). Use the callback function to indicate which property (or computed value based on the properties) to access.

var minLand = d3.min(data, function(d) { return d.land_area; });
console.log(minLand);
// ```
//=> 48.3
// ```
// <div class="aside">This code is using d3.js</div>
//
var maxLand = d3.max(data, function(d) { return d.land_area; });
console.log(maxLand);
// ```
//=> 315
// ```
// <div class="aside">This code is using d3.js</div>
//
// If you want both of them at the same time, you can use [d3.extent](https://github.com/mbostock/d3/wiki/Arrays#d3_extent)

var landExtent = d3.extent(data, function(d) { return d.land_area; });
console.log(landExtent);
// ```
//=> [48.3, 315]
// ```
// <div class="aside">This code is using d3.js</div>
//
// This returns an array with the first element the minimum value and the second element the maximum.
//
// ## Summary Statistics
//
// D3 provides a few basic tools to analyze your data, all using the same format as the min and max functions. Simply provide the property you would like to analyze, and you are good to go.
//
// [d3.mean](https://github.com/mbostock/d3/wiki/Arrays#d3_mean)

var landAvg = d3.mean(data, function(d) { return d.land_area; });
console.log(landAvg);
// ```
//=> 187.45
// ```
// <div class="aside">This code is using d3.js</div>
//
// [d3.median](https://github.com/mbostock/d3/wiki/Arrays#d3_median)

var landMed = d3.median(data, function(d) { return d.land_area; });
console.log(landMed);
// ```
//=> 193.25
// ```
// <div class="aside">This code is using d3.js</div>
//
// [d3.deviation](https://github.com/mbostock/d3/wiki/Arrays#d3_deviation) - for standard deviation

var landSD = d3.deviation(data, function(d) { return d.land_area; });
console.log(landSD);
// ```
//=> 140.96553952414519
// ```
// <div class="aside">This code is using d3.js</div>
//
// ## Next Task
//
// [Iterating and Reducing](iterate_data.html)
//
// ## See Also
//
// - [simple statistics](https://github.com/tmcw/simple-statistics) - more JavaScript based stats written in easier to comprehend code.
//
