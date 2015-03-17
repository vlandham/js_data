var expensesTotal = d3.nest()
  .key(function(d) { return d.name; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.amount; }); })
  .map(expenses);
console.log(JSON.stringify(expensesTotal));
