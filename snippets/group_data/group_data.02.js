var expensesByName = d3.nest()
  .key(function(d) { return d.name; })
  .entries(expenses);
