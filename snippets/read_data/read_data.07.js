Promise.all([
  d3.csv("/data/cities.csv"),
  d3.tsv("/data/animals.tsv")
]).then(function(data) {
  console.log(data[0][0])  // first row of cities
  console.log(data[1][0])  // first row of animals
});
