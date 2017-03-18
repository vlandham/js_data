var data = [
  {"city":"seattle", "state":"WA", "population":652405, "land_area":83.9},
  {"city":"new york", "state":"NY", "population":8405837, "land_area":302.6},
  {"city":"boston", "state":"MA", "population":645966, "land_area":48.3},
  {"city":"kansas city", "state":"MO", "population":467007, "land_area":315}
];

var count = 0;

data.forEach(function(d) {
  count += 1;
});

console.log(count);

console.log(data.length);

var dataObject = {"name":"Carl", "age":"48", "salary":"12300"};
var copyOfData = _.clone(dataObject);
copyOfData.age = +copyOfData.age;
copyOfData.salary = +copyOfData.salary;
console.log(dataObject);

console.log(copyOfData);

var dataObject = {"name":"Saul", "stats":{"age":"55"}};
var shallowCopy = _.clone(dataObject);
shallowCopy.stats.age = +shallowCopy.stats.age;
console.log(dataObject);

console.log(shallowCopy);

var dataObject = {"name":"Saul", "stats":{"age":"55"}};
var deepCopy = _.clone(dataObject, true);
deepCopy.stats.age = +deepCopy.stats.age;
console.log(dataObject);

console.log(deepCopy);

var smallData = data.map(function(d,i) {

  return {
    name: d.city.toUpperCase(),
    index: i + 1,
    rounded_area: Math.round(d.land_area)
  };
});
console.log(data[0]);
console.log(smallData[0]);

var large_land = data.filter(function(d) { return d.land_area > 200; });
console.log(JSON.stringify(large_land));

data.sort(function(a,b) {
  return b.population - a.population;
});
console.log(JSON.stringify(data));

var populations = data.map(function(d) { return d.population; });
console.log(populations);

populations.sort(d3.descending);
console.log(populations);

var nums = [3,1,10,20];

console.log(nums.sort());

var landSum = data.reduce(function(sum, d) {
  return sum + d.land_area;
}, 0);
console.log(landSum);

var weirdString = data.reduce(function(str, d, i) {
  var ending = (i % 2 === 0) ? " is cool." : " sucks." ;
  return str + " " + d.city + ending;
}, "");
console.log(weirdString);

var bigCities = data.filter(function(d) { return d.population > 500000; })
  .sort(function(a,b) { return a.population - b.population; })
  .map(function(d) { return d.city; });
console.log(bigCities);
