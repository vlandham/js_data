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
// ## Max/Min
//
// ## Average
//
// ## Reducing
//
// ## See Also
//
// - [Making Juice with Reduce](http://www.macwright.org/2015/01/03/reduce-juice.html) - Tom MacWright's intro to the ill-used reduce
//
