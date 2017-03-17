var expensesTotalByDay = d3.nest()
  .key(function(d) { return d.date; })
  .key(function(d) { return d.name; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.amount; }); })
  .object(expenses);
console.log(JSON.stringify(expensesTotalByDay));
