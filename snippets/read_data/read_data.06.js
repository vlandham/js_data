d3.json("/data/employees.json").then(function(data) {
  console.log(data[0]);
});
