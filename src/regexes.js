// # Regular Expressions
//
// Regular expressions are used to match certain patterns of strings within other strings.
//
// They can be a useful tool for extracting _patterns_ rather than exact strings, for example:
// telephone numbers (sequences of numbers of a specific length,) street numbers or email
// addresses.
//
// ## Finding Strings

var str = "how much wood would a woodchuck chuck if a woodchuck could chuck wood";
var regex = /wood/;

// If we want to know whether the string "wood" appears in our larger string `str` we
// could do the following
if (regex.test(str)) {
  console.log("we found 'wood' in the string!");
}

// ```
// => "we found 'wood' in the string!"
// ```
//
// To see the actual matches we found in the string, we can use the `match` method
// to find all matches available:
var matches = str.match(regex);
console.log(matches);

// ```
// => ["wood"]
// ```
//
// Note that this only returned one match, even though the word "wood" appears several
// times in our original string. In order to find all individual instances of wood, we need
// to add the global flag, which we can do by adding a `g` to the end of our expression:

regex = /wood/g;
console.log(str.match(regex));

// ```
// => ["wood", "wood", "wood", "wood"]
// ```

// Now, note that two of those matches actually belonged to the word "woodchuck", which
// was not a part of our results. If we wanted to extend our regular expression to match both
// we could do so in a few ways:

regex = /wood.*?\b/g;
console.log(str.match(regex));

// ```
// => ["wood", "woodchuck", "woodchuck", "wood"]
// ```
//
// In this regular expression we are matching everything that starts with the string "wood"
// followed by 0 or more characters (`.*?`) until a word break (`\b`) occures.
// Alternatively, we could also just search for both words:
//
regex = /woodchuck|wood/g;
console.log(str.match(regex));

// ```
// => ["wood", "woodchuck", "woodchuck", "wood"]
// ```
//
// Note the order in which we did the last search. We used the word "woodchuch" before
// the word "wood". If we were to run our expression like so: `/wood|woodchuck/g`, we would
// end up with `["wood", "wood", "wood", "wood"]` again because that search would be
// "greedy".
//
// ## Replacing with regular expressions
//
// If we wanted to replace the word "wood" in our original string, with the word
// "nun", we could do it like so:

regex = /wood/g;
var newstr = str.replace(regex, "nun");
console.log(newstr);

// ```
// => "how much nun would a nunchuck chuck if a nunchuck could chuck nun"
// ```
//
// Probablay not what you'd be going for, but you get our drift.

// ## Finding Numbers
//
// Extracting numbers from strings is a common task when looking for things like
// dollar amounts or any other numerical measurements that might be scattered about
// in the text.
// For example, if we wanted to extract the total amount of money spent
// on groceries from this message:

var message = "I bought a loaf of bread for $3.99, some milk for $2.49 and" +
  "a box of chocolate cookies for $6.95";

// we could define a regular expression that looks for dollar amounts by defining a
// pattern like so.

regex = /\$([0-9\.]+)\b/g;

// this pattern looks for:
// * A dollar sign (`\$`) to indicate the beginning of a price
// * A set of repeating characters that can be a number (`0-9`) or the period character `.`. These can appear
// repeatedly (`+`). Note that we're not being particularly careful in making sure we only have one period in
// our string, for example.
// * A word break that would indicate the end of the price string (`\b`).
//
// If we wanted to find all the matches, we could use our string `match` function like so:
matches = message.match(regex);
console.log(matches);

// ```
// => ["$3.99", "$2.49", "$6.95"]
// ```
//
// This is great! We have all our dollar amounts. While this gets us 90% there, we
// can't really add them with those `$` signs. To remove them, we can use our trusty
// `reduce` function like so:

matches.reduce(function(sum, value) {
  return sum + Number(value.slice(1));
}, 0);

// ```
// => 13.43
// ```
//
// ## Useful special characters
// We've used a few special characters so far, like `\b` to indicate a word break. There
// are a few others that might be useful to you:
//
// * `\d` - any number character.  Equivalent to [0-9].
// * `\D` - any non number character. Equivalent to [^0-9].
// * `\s` - any single space character. This includes a single space, tab, line feed or
// form feed.
//
// You can see a full list of all special characters here:
// [MDN - Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

// ## Next Task
//
// [Working With Time](time.html)
//
// ## See Also
//
// - [MDN - Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) - for more information about regular expressions
