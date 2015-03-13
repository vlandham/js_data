// # Iterating Over and Reducing Data
//
// Most of the functions we used to [summarize](summarize_data.html) our data had to iterate over the entire dataset to generate their results - but the details were hidden behind the function. Now let's look at how we might perform this iteration ourselves for other metrics and manipulations!
//
// Again, we start with a basic data set already loaded:
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
// ## Immutability
//
// Let me sidetrack this task just a bit to talk about
//
// `forEach` provides for a basic way to loop through our data set. We can use this to modify the data in place, generate counts, or perform other manipulations that deal with each piece of data individually.
//
// This works, but can get clunky and confusing fast. Keeping straight what form the data is in at any given time can be confusing, as can side effects of modifying your data that you might not be aware of.
//
// To combat this confusion, it can be useful to think of the data as _immutable_. Immutable data cannot be modified once created. Immutability seems a bit counterintuitive for a task where we want to coerce our data into the form we want - but it comes together with the concept of **transformations**.
//
// The idea is simple: each immutable dataset can be _transformed_ into another immutable dataset through the use of a transformation function that works on each component of the data.
//
// This process helps simplify the data flow, but if you have to make a copy of your data object each time, it can make code a bit brittle as you have to keep track of every attribute of your dataset.
//
// ## Cloning
//
// To help with this issue of brittle transformations, lodash provides the [clone](https://lodash.com/docs#clone) function.
//
// This function takes an object and returns a copy of that object. That copy is now a separate data object that you can edit without effecting the original object.
//
var dataObject = {"name":"Carl", "age":"48", "salary":"12300"};
var copyOfData = _.clone(dataObject);
copyOfData.age = +copyOfData.age;
copyOfData.salary = +copyOfData.salary;
console.log(dataObject);
// ```
//=> {name: "Carl", age: "48", salary: "12300"}
// ```
// <div class="aside">This code is using lodash</div>
//
console.log(copyOfData);
// ```
//=> {name: "Carl", age: 48, salary: 12300}
// ```
//
// By default, the `clone` function will not copy over nested objects. Instead these nested objects are simply passed by referenced - meaning the original and the copy will still share them.
var dataObject = {"name":"Saul", "stats":{"age":"55"}};
var shallowCopy = _.clone(dataObject);
shallowCopy.stats.age = +shallowCopy.stats.age;
console.log(dataObject);
// ```
//=> {"name":"Saul","stats":{"age":55}}
// ```
// <div class="aside">This code is using lodash</div>
//
console.log(shallowCopy);
// ```
//=> {"name":"Saul","stats":{"age":55}}
// ```
// Note that because `stats` is a nested object the modification happened in both spots!
//
// To prevent this "feature", we can pass `true` as the second parameter to `clone` to indicate that the copy should be deep and copy nested objects as well.
var dataObject = {"name":"Saul", "stats":{"age":"55"}};
var deepCopy = _.clone(dataObject, true);
deepCopy.stats.age = +deepCopy.stats.age;
console.log(dataObject);
// ```
//=> {"name":"Saul","stats":{"age":"55"}}
// ```
// <div class="aside">This code is using lodash</div>
//
console.log(deepCopy);
// ```
//=> {"name":"Saul","stats":{"age":55}}
// ```
//
// lodash also has a [cloneDeep](https://lodash.com/docs#cloneDeep) that can be used to make the deep-ness more explicit.
//
// ## Mapping
//
// JavaScript's [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) can be a very useful tool to implement this concept of a transformation on immutable data.
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
// With plain JavaScript, the immutability of an array is just _in the mind of the developer_. While `map` does not modify the array, it is easy for your callback method to do so. That is why we return a new object in the callback. lodash's [clone](https://lodash.com/docs#clone) would be another approach to getting a copy of each data element as a starting point for the transformation.
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
// ## Sorting
//
// Similar to filtering, sorting data based on attributes is something you'll want to do frequently.
//
// The built in [sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) for arrays can do this. A caveat to this function is that, unlike filter, map, and other functions, this _modifies the array you are sorting in place_, instead of returning a new array with the objects sorted.
//
// To sort an array, you need a comparator function. This is a function that takes two pieces of data and indicates which one you want higher in the list. The comparator-function-way to do this is to return a negative value if the first value should go higher then the second value, and a positive value if the second value should go higher. If they are equal, and you don't care, then return a 0.
//
// Let's see it in action. Here is a way to sort by population in a descending order (larger populations come first).
//
//

data.sort(function(a,b) {
  return b.population - a.population;
});
console.log(JSON.stringify(data));
// ```
// => [{"city":"new york","state":"NY","population":8405837,"land_area":302.6},
//     {"city":"seattle","state":"WA","population":652405,"land_area":83.9},
//     {"city":"boston","state":"MA","population":645966,"land_area":48.3},
//     {"city":"kansas city","state":"MO","population":467007,"land_area":315}]
// ```
//
// This `b - a` thing is a pretty common way to generate this kind of sort. But you could also do it more explicitly. Thinking through it, if b's population is larger then a's, then the value returned by `b.population - a.population` will be positive - so b will be sorted toward the top of the array. If the reverse is true, then the result will be negative, and a will be sorted first.
//
// Note again, that the sort happened _on the original data_, which I'm not a big fan of.
//
// D3 also has a few helper functions to implement ascending and descending comparator functions - but (as far as I can tell) they only accept arrays of raw numbers instead of objects. So to use [d3.ascending](https://github.com/mbostock/d3/wiki/Arrays#d3_ascending) or [d3.descending](https://github.com/mbostock/d3/wiki/Arrays#d3_descending) you would have to do something like this:
//

var populations = data.map(function(d) { return d.population; });
console.log(populations);
// ```
// => [652405, 8405837, 645966, 467007]
// ```
populations.sort(d3.descending);
console.log(populations);
// ```
// => [8405837, 652405, 645966, 467007]
// ```
//
// I'm usually looking to keep my data objects together, so I shy away from using these methods, but they might be great for what you are trying to do.
//
// A **big gotcha** with sorting that you should watch out for is that if you do not pass a comparator function, the default function sorts _alphabetically_. So, the array:
var nums = [3,1,10,20];
// Would be sorted to:
console.log(nums.sort());
// ```
//=> [1, 10, 20, 3]
// ```
// This is never what you want for data sorting. For this reason, you should never use sort without a comparator function.
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
// It always makes more sense to me to provide a starting value - unless you know what you are doing. You can also get the current index into the array (and the whole array itself) if that is useful to you.

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
// One of the great things about these more _functional_ functions is that it is possible to chain them together into one big data wrangling pipeline!
//
var bigCities = data.filter(function(d) { return d.population > 500000; })
  .sort(function(a,b) { return a.population - b.population; })
  .map(function(d) { return d.city; });
console.log(bigCities);
// ```
//=> ["boston", "seattle", "new york"]
// ```
//
// Since we are using `sort` after `filter`, sort is working on the returned array from `filter`. The sort function at least is nice enough to also return the array, so chaining is still possible.
//
// ## Next Task
//
// [Grouping Data](group_data.html)
//
// ## See Also
//
// - [Making Juice with Reduce](http://www.macwright.org/2015/01/03/reduce-juice.html) - Tom MacWright's intro to the ill-used reduce
// - [Immutable JS](https://github.com/facebook/immutable-js) - if you want to get serious about immutable data structures in JavaScript
// - [Ramda](http://fr.umio.us/why-ramda/) - a more functional approach to data processing in JS
