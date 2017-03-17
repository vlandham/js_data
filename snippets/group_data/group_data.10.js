var expensesByYear = d3.nest()
  .key(function(d) { return d.date.split("/")[2]; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.amount; }); })
  .object(expenses);
console.log(JSON.stringify(expensesByYear));
