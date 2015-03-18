var data = [
  {"city":"seattle", "state":"WA", "population":652405, "land_area":83.9},
  {"city":"new york", "state":"NY", "population":8405837, "land_area":302.6},
  {"city":"boston", "state":"MA", "population":645966, "land_area":48.3},
  {"city":"kansas city", "state":"MO", "population":467007, "land_area":315}
];

var minLand = d3.min(data, function(d) { return d.land_area; });
console.log(minLand);

var maxLand = d3.max(data, function(d) { return d.land_area; });
console.log(maxLand);

var landExtent = d3.extent(data, function(d) { return d.land_area; });
console.log(landExtent);

var landAvg = d3.mean(data, function(d) { return d.land_area; });
console.log(landAvg);

var landMed = d3.median(data, function(d) { return d.land_area; });
console.log(landMed);

var landSD = d3.deviation(data, function(d) { return d.land_area; });
console.log(landSD);
