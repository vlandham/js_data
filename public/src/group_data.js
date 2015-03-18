var expenses = [{"name":"jim","amount":34,"date":"11/12/2015"},
  {"name":"carl","amount":120.11,"date":"11/12/2015"},
  {"name":"jim","amount":45,"date":"12/01/2015"},
  {"name":"stacy","amount":12.00,"date":"01/04/2016"},
  {"name":"stacy","amount":34.10,"date":"01/04/2016"},
  {"name":"stacy","amount":44.80,"date":"01/05/2016"}
];

var expensesByName = d3.nest()
  .key(function(d) { return d.name; })
  .entries(expenses);

expensesByName = [
  {"key":"jim","values":[
    {"name":"jim","amount":34,"date":"11/12/2015"},
    {"name":"jim","amount":45,"date":"12/01/2015"}
  ]},
    {"key":"carl","values":[
      {"name":"carl","amount":120.11,"date":"11/12/2015"}
    ]},
    {"key":"stacy","values":[
      {"name":"stacy","amount":12.00,"date":"01/04/2016"},
      {"name":"stacy","amount":34.10,"date":"01/04/2016"},
      {"name":"stacy","amount":44.80,"date":"01/05/2016"}
    ]}
];

var expensesCount = d3.nest()
  .key(function(d) { return d.name; })
  .rollup(function(v) { return v.length; })
  .entries(expenses);
console.log(JSON.stringify(expensesCount));

var expensesAvgAmount = d3.nest()
  .key(function(d) { return d.name; })
  .rollup(function(v) { return d3.mean(v, function(d) { return d.amount; }); })
  .entries(expenses);
console.log(JSON.stringify(expensesAvgAmount));

var expenseMetrics = d3.nest()
  .key(function(d) { return d.name; })
  .rollup(function(v) { return {
    count: v.length,
    total: d3.sum(v, function(d) { return d.amount; }),
    avg: d3.mean(v, function(d) { return d.amount; })
  }; })
  .entries(expenses);
console.log(JSON.stringify(expenseMetrics));

var expensesTotal = d3.nest()
  .key(function(d) { return d.name; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.amount; }); })
  .map(expenses);
console.log(JSON.stringify(expensesTotal));

var expensesTotalByDay = d3.nest()
  .key(function(d) { return d.name; })
  .key(function(d) { return d.date; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.amount; }); })
  .map(expenses);
console.log(JSON.stringify(expensesTotalByDay));

var expensesTotalByDay = d3.nest()
  .key(function(d) { return d.date; })
  .key(function(d) { return d.name; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.amount; }); })
  .map(expenses);
console.log(JSON.stringify(expensesTotalByDay));

var expensesByYear = d3.nest()
  .key(function(d) { return d.date.split("/")[2]; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.amount; }); })
  .map(expenses);
console.log(JSON.stringify(expensesByYear));
