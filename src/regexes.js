var str = "how much wood would a woodchuck chuck if a woodchuck could chuck wood";
var regex = /wood/;

if (regex.test(str)) {
  console.log("we found 'wood' in the string!");
}

var matches = str.match(regex);
console.log(matches);

regex = /wood/g;
console.log(str.match(regex));

regex = /wood.*?\b/g;
console.log(str.match(regex));

regex = /woodchuck|wood/g;
console.log(str.match(regex));

regex = /wood/g;
var newstr = str.replace(regex, "nun");
console.log(newstr);

var message = "I bought a loaf of bread for $3.99, some milk for $2.49 and" +
  "a box of chocolate cookies for $6.95";

regex = /\$([0-9\.]+)\b/g;

matches = message.match(regex);
console.log(matches);

matches.reduce(function(sum, value) {
  return sum + Number(value.slice(1));
}, 0);
