var bigCities = data.filter(function(d) { return d.population > 500000; })
  .sort(function(a,b) { return a.population - b.population; })
  .map(function(d) { return d.city; });
console.log(bigCities);
