data.sort(function(a,b) {
  return b.population - a.population;
});
console.log(JSON.stringify(data));
