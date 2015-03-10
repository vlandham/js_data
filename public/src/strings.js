// # Working with Strings
//
// String cleaning is something you end up doing quite a lot. Hopefully this task will help make the process less painful. There are a near infinite transformations you might want to do with strings, so we won't get to everything, but hopefully this will be a good starting point for common manipulations that will come up again and again.
//
// We will start with generic JavaScript string functions and add in a bit of [lodash](https://lodash.com/) magic to make things easier.
//
// ## String Basics
//
// Similar to arrays, the characters in strings are accessible via indexing
//
var aChar = "Hello There!"[6];
console.log(aChar);
// ```
//=> T
//```
//
// Also, just like arrays, you have access to the powerful [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) method, which is used to extract sub-sections based on indexes.
var aSlice = "Hello There!".slice(6,11);
console.log(aSlice);
// ```
//=> There
//```
// The sliced string goes up to - but not including - the last index.
//
// And, of course, string concatenation is done in JavaScript using the `+` operator. Use parenthesis if you want to do actual arithmetic inside your concatenation.

var orderNum = 8;
console.log("You are number " + (orderNum + 1) + " in line.");
// ```
//=> You are number 9 in line.
//```
//
// Check [the documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) for all the other basic tools.
//
// ## Stripping Whitespace
//
// Often, you are going to have some surrounding whitespace that you don't want corrupting the rest of your data. Reading CSV files gives a good example of this, as spaces are typically also used in conjunction with the commas to separate columns.
//
// A data file like this:
// ```
// cities_spaced.csv:
//
// city  ,state ,population,land area
//   seattle  ,WA , 652405 ,83.9
// new york,NY,8405837,  302.6
// ```
// When [read in](read_data.html) can produce quite the messy dataset:

d3.csv("data/cities_spaced.csv", function(data) {
  console.log(JSON.stringify(data));
});

// ```
// => [{"city  ":"  seattle  ","state ":"WA ","population":" 652405 ","land area":"83.9   "},
//      {"city  ":"new york","state ":"NY","population":"8405837","land area":"  302.6"}]
//```
//
// Note the spaces in the property names as well as the values. In cases like this, it might be best to [map](iterate_data.html) the data back to a clean version. Lodash's [trim](https://lodash.com/docs#trim) can help. It removes that unsightly whitespace from the front and back of your strings.
//
// Here is a version of the data loading function that removes whitespace. It uses

d3.csv("data/cities_spaced.csv", function(data) {
  var clean = data.map(function(d) {
    var cleanD = {};
    d3.keys(d).forEach(function(k) {
      cleanD[_.trim(k)] = _.trim(d[k]);
    });
    return cleanD;
  });
  console.log(JSON.stringify(clean));
});
// ```
// =>  [{"city":"seattle","state":"WA","population":"652405","land area":"83.9"},
//       {"city":"new york","state":"NY","population":"8405837","land area":"302.6"}]
// ```
//
// The strings are now clear of those pesky spaces.
//
// ## Find and Replace
//
// Extracting data from strings can sometimes mean extracting pieces of strings. Finding out if a string contains a keyword or sub-string of interest is a first step in quantifying the content of a body of text.
//
// [indexOf]() can be used to perform this searching. You pass it a sub-string, and it'll tell you the location in string you are calling it where that sub-string starts. `-1` is returned if the sub-string can't be found. You can use this to build a little string finder, by comparing the return value to `-1`.
//
console.log("A man, a plan, a canal".indexOf("man") !== -1);
// ```
// => true
// ```
console.log("A man, a plan, a canal".indexOf("panama") !== -1);
// ```
// => false
// ```
// Replace is the butter to find's bread. We will see more replacing when we get to regular expressions, but replacing sections of a string can be done with the [replace]() method.
//
console.log("A man, a plan, a canal".replace("canal", ""));
// ```
// => "A man, a plan, a"
// ```
//
// ## Templating
//
// When you need to create a more complicated string, such as an html snippet, it may
// become too tedious to just combine strings by concatenating them with your variables. Consider
// the following example:
//
// ```html
// <div class="person">
//   <span class="name">Birdman</span>
//   <span class="occupation">Imaginary Super Hero</span>
// </div>
// ```
// If we wanted to build it using string concatenation, it might look like this:
//
var person = { name : "Birdman", occupation: "Imaginary Super Hero" };
var html_snippet = "<div class=\"person\">" +
  "<span class=\"name\">" + person.name + "</span>" +
  "<span class=\"occupation\">" + person.occupation + "</span>" +
"</div>";
console.log(html_snippet);
//
// ```
// => '<div class="person"><span class="name">Birdman</span><span class="occupation">Imaginary Super Hero</span></div>'
// ```
// ## Regular Expressions
//
// TODO
//
// ## Next Task
//
// [Working With Time](time.html)
//
// ## See Also
//
// - [Working With Strings](http://www.quirksmode.org/js/strings.html) - a great guide to more string basics
// - [underscore.string](https://github.com/epeli/underscore.string) - for all the other string functions you might want
