var aChar = "Hello There!"[6];
console.log(aChar);

var aSlice = "Hello There!".slice(6,11);
console.log(aSlice);

var orderNum = 8;
console.log("You are number " + (orderNum + 1) + " in line.");

d3.csv("data/cities_spaced.csv", function(data) {
  console.log(JSON.stringify(data));
});

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

console.log("A man, a plan, a canal".indexOf("man") !== -1);

console.log("A man, a plan, a canal".indexOf("panama") !== -1);

console.log("A man, a plan, a canal".replace("canal", ""));

var person = { name : "Birdman", occupation: "Imaginary Super Hero" };
var html_snippet = "<div class=\"person\">" +
  "<span class=\"name\">" + person.name + "</span>" +
  "<span class=\"occupation\">" + person.occupation + "</span>" +
"</div>";
console.log(html_snippet);

var templateString = "<div class='person'>" +
  "  <span class='name'><%= name %></span>" +
  "  <span class='occupation'><%= occupation %></span>" +
  "</div>";
var templateFunction = _.template(templateString);

console.log(templateFunction(person));

var anotherPerson = { name : "James. James Bond", occupation: "Spy" };
console.log(templateFunction(anotherPerson));
