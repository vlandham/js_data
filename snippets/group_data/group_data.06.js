var expenseMetrics = d3.nest()
  .key(function(d) { return d.name; })
  .rollup(function(v) { return {
    count: v.length,
    total: d3.sum(v, function(d) { return d.amount; }),
    avg: d3.mean(v, function(d) { return d.amount; })
  }; })
  .entries(expenses);
console.log(JSON.stringify(expenseMetrics));
