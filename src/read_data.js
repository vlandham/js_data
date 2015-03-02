// # Reading in Data

// The first step in any data processing is getting the data!

// Here is how to parse in and prepare common input formats using D3.js

// ## Parsing CSV Files

// D3 has a bunch of filetypes it can support when loading data, one of the most common is probably plain old comma separated vales (CSV).

// Let's say you had a csv file with some city data in it:

// ```
// cities.csv:
//
// city,state,population,square miles
// seattle,WA,900000,12.3
// new york,NY,1200000,6
// ```

// Use `d3.csv` to convert it into an array of objects

d3.csv("/data/cities.csv", function(data) {
  console.log(data[0]);
});
// ```
//   => {city: "seattle", state: "WA", population: "900000", square miles: "12.3"}
// ```
//
// You can see that the headers of the original CSV have been used as the property names for the data objects. 
