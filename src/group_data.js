// # Grouping and Nesting Data
//
// Grouping data is an important capability to have when doing data analysis. Often times, you will want to break apart the data by a categorical variable and look at statistics or details for each group. 
//
// D3 includes the powerful [d3.nest](https://github.com/mbostock/d3/wiki/Arrays#-nest) functionality to produce these groupings with a minimal amount of code.
//
// ## Nest Basics
//
// Fundamentally, `d3.nest` is about taking a flat data structure and turning it into a nested one. The user gets to decide how the nesting should occur, and how deep to nest. This is a bit different then many group_by concepts, where only a single level of nesting is allowed.
//
// Let's say we have the following CSV file of "expenses":
//
// ```
// name,amount,date
// jim,34.0,11/12/2015
// carl,120.11,11/12/2015
// jim,45.0,12/01/2015
// stacy,12.01,01/04/2016
// stacy,34.05,01/04/2016
// stacy,44.99,01/05/2016
// ```
//
// And that has been converted to a nice array of objects via our [data reading powers](read_data.html) into something like this:
//

var expenses = [{"name":"jim","amount":34,"date":"11/12/2015"},
  {"name":"carl","amount":120.11,"date":"11/12/2015"},
  {"name":"jim","amount":45,"date":"12/01/2015"},
  {"name":"stacy","amount":12.01,"date":"01/04/2016"},
  {"name":"stacy","amount":34.05,"date":"01/04/2016"},
  {"name":"stacy","amount":44.99,"date":"01/05/2016"}
];

// And now we want to slice up this data in different ways.
//
// First, let's use nest to group by `name`:

var expensesByName = d3.nest()
  .key(function(d) { return d.name; })
  .entries(expenses);

// Which results in a nested data structure:

expensesByName = [
  {"key":"jim","values":[
    {"name":"jim","amount":34,"date":"11/12/2015"},
    {"name":"jim","amount":45,"date":"12/01/2015"}
  ]},
    {"key":"carl","values":[
      {"name":"carl","amount":120.11,"date":"11/12/2015"}
    ]},
    {"key":"stacy","values":[
      {"name":"stacy","amount":12.01,"date":"01/04/2016"},
      {"name":"stacy","amount":34.05,"date":"01/04/2016"},
      {"name":"stacy","amount":44.99,"date":"01/05/2016"}
    ]}
];

// `expensesByName` is an array of objects. Each object has a `key` property - which is what we used as the grouping value using the `key` function. Here, we used the values associated with the `name` property as the key.
//
// The `values` property of these entries is an array containing all the original data objects that had that key. 
//
// ## Summarizing Groups 
//
// The nested structure can be great for visualizing your data, but might be a little underwhelming for analytical applications. Never fear! [d3.rollup](https://github.com/mbostock/d3/wiki/Arrays#nest_rollup) is here!
//
// ## Sorting Keys and Values
//
// If you want to sort the keys or values produced
//
// ## See Also
//
// - [Mister Nester](http://bl.ocks.org/shancarter/raw/4748131/) - a `d3.nest` power tool!
// - [Phoebe Bright Nest Tutorial](http://bl.ocks.org/phoebebright/raw/3176159/) - lots more nest examples
