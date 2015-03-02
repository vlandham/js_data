// # Reading in Data

// The first step in any data processing is getting the data!

// Here is how to parse in and prepare common input formats using D3.js

// ## Parsing CSV Files

// [D3 has a bunch](https://github.com/mbostock/d3/wiki/Requests) of filetypes it can support when loading data, and one of the most common is probably plain old CSV (comma separated values).

// Let's say you had a csv file with some city data in it:
//

// ```
// cities.csv:
//
//city,state,population,land area
//seattle,WA,652405,83.9
//new york,NY,8405837,302.6
//boston,MA,645966,48.3
//kansas city,MO,467007,315.0
// ```

// Use [d3.csv](https://github.com/mbostock/d3/wiki/CSV) to convert it into an array of objects

d3.csv("/data/cities.csv", function(data) {
  console.log(data[0]);
});
// ```
//=> {city: "seattle", state: "WA", population: "652405", land area: "83.9"}
// ```
//
// You can see that the headers of the original CSV have been used as the property names for the data objects. Using `d3.csv` in this manner requires that your CSV file has a header row.
//
// If you look closely, you can also see that the values associated with these properties are all strings. This is probably _not what you want_ in the case of numbers. When loading CSVs and other flat files, you have to do the type conversion.
//
// We will see more of this in other tasks, but a simple way to do this is to use the [+](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Unary_plus) operator (unary plus). `forEach` can be used to iterate over the data array.
//

d3.csv("/data/cities.csv", function(data) {
  data.forEach(function(d) {
    d.population = +d.population;
    d["land area"] = +d["land area"];
  });
  console.log(data[0]);
});
// ```
//=> {city: "seattle", state: "WA", population: 652405, land area: 83.9}
// ```
//
// [Dot notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors) is a useful way to access the properties of these data objects. However, if your headers have spaces in them, then you will need to use bracket notation as shown.


//
// ## Parsing Other Flat Files
//
// CSV is probably the most common flat file format, but in no way the only one. 
// I often like to use TSV (tab separated files) - to get around the issues of numbers and strings often having commas in them.
//
// D3 can parse TSV's with [d3.tsv](https://github.com/mbostock/d3/wiki/CSV#tsv):
//
//
// ```
// animals.tsv:
//
//
// ```
d3.tsv("/data/animals.tsv", function(data) {
  console.log(data[0]);
});
// ```
//=> {city: "seattle", state: "WA", population: 652405, land area: 83.9}
// ```
//
// ## Parsing JSON Files
