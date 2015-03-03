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
// ## Mapping
//
// `forEach` provides for a basic way to loop through our data set. We can use this to modify the data in place, generate counts, or perform other manipulations that deal with each piece of data individually. 
//
// This works, but can get clunky and confusing fast. Keeping straight what form the data is in at any given time can be confusing, as can side effects of modifying your data that you might not be aware of.
//
// To combat this confusion, it can be useful to think of the data as _immutable_ (a data structure that cannot be modified once created. Then to make modifications to your data, you **transform** your original dataset into a new data set. This transformation process creates a new immutable data structure that then can be used downstream.
//
// All this to say that JavaScript's [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) can be a very useful tool to keep things functional and keep your data pipeline free of side effects. 
//
// `map` takes an array and produces another array which is the result of the callback function being executed on each element in the array. 

var smallData = data.map(function(d,i) { 
  return {
    name: d.city.toUpperCase(),
    index: i + 1,
    rounded_area: Math.round(d.land_area)
  };
});
console.log(data[0]);
console.log(smallData[0]);
// ```
//=> {city: "seattle", state: "WA", population: 652405, land_area: 83.9}
//   {name: "SEATTLE", index: 1, rounded_area: 84}
// ```
//
// The callback function gets called for each element in the array, and also has access to the index of that element in the array. The result is an array of returned values from the callback.
//
// With plain JavaScript, the immutability of an array is just in the mind of the developer. While `map` does not modify the array, it is easy for your callback method to do so. That is why we return a new object in the callback. lodash's [clone](https://lodash.com/docs#clone) would be another approach to getting a copy of each data element as a starting point for the transformation.
//
//
// ## Filtering
//
// Select a subset of the data using the built in [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method. This creates a new array of data (again see transformation talk above) with only the values that the callback function returns `true` for.

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
// The syntax for [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) is always hard for me to remember, so let's go over it with the classic example: summing up a value.

var landSum = data.reduce(function(sum, d) { 
  return sum + d.land_area; 
}, 0);
console.log(landSum);
// ```
//=> 749.8
// ```

// The first parameter to `reduce` is the callback function that will return the running "total" of the reduction. This function is passed in the previous value returned from the last time the callback was called. Here, that parameter - `sum` provides the running total as we move through the array. The second parameter to the callback `d` is the current value of the array we are working on. 
//
// `reduce` can take an initial value, which is the second parameter to the `reduce` call. For this example, we start the sum at 0. If there is no starting value provided, then for the first execution of the callback (when there is no previous value) the first parameter to the callback will be the value of the first element of the array, and the reduction starts with the second element.
//
// It always makes more sense to me to provide a starting value - unless you know what you are doing. You can also get the current index into the array (and the whole array itself) if that is useful to you

var weirdString = data.reduce(function(str, d, i) { 
  var ending = (i % 2 === 0) ? " is cool." : " sucks." ;
  return str + " " + d.city + ending;
}, "");
console.log(weirdString);
// ```
//=> seattle is cool. new york sucks. boston is cool. kansas city sucks.
// ```

// _And summing over a variable is only used for example. You can always just use [d3.sum](https://github.com/mbostock/d3/wiki/Arrays#d3_sum) for this instead._
//
// ## Chaining Functions
//
//
//
// ## See Also
//
// - [Immutable JS](https://github.com/facebook/immutable-js) - if you want to get serious about immutable data structures in JavaScript 
// - [Making Juice with Reduce](http://www.macwright.org/2015/01/03/reduce-juice.html) - Tom MacWright's intro to the ill-used reduce
//
