// # Working with Time
//
// Time is one of those tricky programming things that seems like it should be easy, but usually turns out not to be. We will use D3's built in [time formating](https://github.com/mbostock/d3/wiki/Time-Formatting) and [interval](https://github.com/mbostock/d3/wiki/Time-Intervals) functions. We will also take a look at the powerful [Moment.js](http://momentjs.com/) library, for when you just need more time power.
//
// ## String to Date
//
// The first task when dealing with dates is usually getting a [Data object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) out of a string. Most of the time, your data will have dates or times in an (mostly) arbitrary format, and you need to force that mess into an actual date. 
//
// D3 has [d3.time.format](https://github.com/mbostock/d3/wiki/Time-Formatting#format) which provides a way to do this parsing. It was a little confusing for me the first time I tried it. You use this function to create a string parser, and then use the parser to actually convert the string. 
//
// In our [nesting example](group_data.html), we saw data that had dates as strings:
//
var expense = {"name":"jim","amount":34,"date":"11/12/2015"};
//
// To convert this date string to a Date object, we would need a parser that looks like:
var parser = d3.time.format("%m/%d/%Y");
//
// The input string to `d3.time.format` indicates what the date string should look like. You have a [lot of options](https://github.com/mbostock/d3/wiki/Time-Formatting#format) for the special, percent-sign-prefixed variables. You can see in the string I'm using month, day, and four-digit year. The 
//
// ## Time Arithmetic
//
// ## Moment.js
//
// ## Next Task
//
// [Exploratory Visualization](visualizations.html)
//
// ## See Also
//
//
