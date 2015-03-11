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
// The input string to `d3.time.format` indicates what the date string should look like. You have a [lot of options](https://github.com/mbostock/d3/wiki/Time-Formatting#format) for the special, percent-sign-prefixed variables. You can see in the string I'm using month, day, and four-digit year. The slashes in the format string are not special variables - but just what we expect to find separating the fields in the date string. 
//
// Next we use the parser to parse our string.
//
expense.date = parser.parse(expense.date);
console.log(expense);
//```
//=> {name: "jim", amount: 34, date: Thu Nov 12 2015 00:00:00 GMT-0500 (EST)}
//```
//
// Cool! Now our date is actually a Date object.
//
// Here are a few more time parsers to show the capabilities of D3's parsing.  
//
// Just the date:
var date = d3.time.format("%A, %B %-d, %Y").parse("Wednesday, November 12, 2014");
console.log(date);
//```
//=> Wed Nov 12 2014 00:00:00 GMT-0500 (EST)
//```
//
//(The little dash in front of the `d` is to remove the 0-padding)
//```
date = d3.time.format("%m/%y").parse("12/14");
console.log(date);
//```
//=> Mon Dec 01 2014 00:00:00 GMT-0500 (EST)
//```
//You can see it defaults to the first day of the month.
//
// Just the time:
var time = d3.time.format("%I:%M%p").parse("12:34pm");
console.log(time);
// ```
//=> Mon Jan 01 1900 12:34:00 GMT-0500 (EST)
// ```
// Gives you a somewhat strange default date.
//
// Date and time:
time = d3.time.format("%m/%d/%Y %H:%M:%S").parse("01/02/2014 08:22:05");
console.log(time);
// ```
//=> Thu Jan 02 2014 08:22:05 GMT-0500 (EST)
// ```
// This could also be done using some built in short-hands:
time = d3.time.format("%x %X").parse("01/02/2014 08:22:05");
console.log(time);
// ```
//=> Thu Jan 02 2014 08:22:05 GMT-0500 (EST)
// ```
// You can see that `d3.time.format` gives you a lot of flexibility about what your time string will look like.
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
