var expensesAvgAmount = d3.nest()
  .key(function(d) { return d.name; })
  .rollup(function(v) { return d3.mean(v, function(d) { return d.amount; }); })
  .entries(expenses);
console.log(JSON.stringify(expensesAvgAmount));
