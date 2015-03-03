// # Iterating Over, Filtering, and Summarizing Data
//
// Now that we have [loaded some data](read_data.html), let's look at it! This task will focus on basic explorations of the data. 
//
// To start, let's pretend we have loaded up a csv file - and have a dataset that looks something like:
//
var data = [
  {"city":"seattle", "state":"WA", "population":652405, "land_area":83.9},
  {"city":"new york", "state":"NY", "population":8405837, "land_area":302.6},
  {"city":"boston", "state":"MA", "population":645966, "land_area":48.3},
  {"city":"kansas city", "state":"MO", "population":467007, "land_area":315}
];

// ## Iterating

// First some basic iteration. We already saw this in the data loading task, but a common way to process each data object is by using [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

var count = 0;

data.forEach(function(d) {
  count += 1;
});

console.log(count);
// ```
//=> 4
// ```

// _Of course, data also has the property `length` which would be the actual way to get the number of data elements in `data` - but this is just an example._
//
console.log(data.length);
// ```
//=> 4
// ```
//
// ## Filtering
//
// Select a subset of the data using the built in [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method. This creates a new array of data with only the values that the callback function returns `true` for.

var large_land = data.filter(function(d) { return d.land_area > 200; });
console.log(JSON.stringify(large_land));
// ```
//=> [{"city":"new york","state":"NY","population":8405837,"land_area":302.6},
//    {"city":"kansas city","state":"MO","population":467007,"land_area":315}]
// ```

//
// ## Min & Max
//
// With `forEach` it would be possible to laboriously calculate metrics such as min, and max. But, its typically better to work smart, not hard.
//
// As it turns out, D3 comes to the rescue again, with [d3.min](https://github.com/mbostock/d3/wiki/Arrays#d3_min) and [d3.max](https://github.com/mbostock/d3/wiki/Arrays#d3_max). Use the callback function to indicate which property (or computed value based on the properties) to access.

var minLand = d3.min(data, function(d) { return d.land_area; });
console.log(minLand);
// ```
//=> 48.3
// ```

var maxLand = d3.max(data, function(d) { return d.land_area; });
console.log(maxLand);
// ```
//=> 315
// ```

// If you want both of them at the same time, you can use [d3.extent](https://github.com/mbostock/d3/wiki/Arrays#d3_extent)

var landExtent = d3.extent(data, function(d) { return d.land_area; });
console.log(landExtent);
// ```
//=> [48.3, 315]
// ```
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
// [d3.median](https://github.com/mbostock/d3/wiki/Arrays#d3_median)

var landMed = d3.median(data, function(d) { return d.land_area; });
console.log(landMed);
// ```
//=> 193.25
// ```
// [d3.deviation](https://github.com/mbostock/d3/wiki/Arrays#d3_deviation) - for standard deviation

var landSD = d3.deviation(data, function(d) { return d.land_area; });
console.log(landSD);
// ```
//=> 140.96553952414519
// ```
//
// ## Reducing
//
// These functions all take an array and reduce it down to a single number. But what if that number isn't the one you want? Well, you can take this reduction into your own hands with `reduce`!
//
// ## See Also
//
// - [Making Juice with Reduce](http://www.macwright.org/2015/01/03/reduce-juice.html) - Tom MacWright's intro to the ill-used reduce
//
