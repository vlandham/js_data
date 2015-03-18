d3.csv("data/cities.csv", function(data) {
  console.log(data[0]);
});

d3.csv("data/cities.csv", function(data) {
  data.forEach(function(d) {
    d.population = +d.population;
    d["land area"] = +d["land area"];
  });
  console.log(data[0]);
});

d3.csv("data/cities.csv", function(d) {
  return {
    city : d.city,
    state : d.state,
    population : +d.population,
    land_area : +d["land area"]
  };
}, function(data) {
  console.log(data[0]);
});

d3.tsv("data/animals.tsv", function(data) {
  console.log(data[0]);
});

var psv = d3.dsv("|", "text/plain");

psv("data/animals_piped.txt", function(data) {
  console.log(data[1]);
});

d3.json("data/employees.json", function(data) {
  console.log(data[0]);
});

queue()
  .defer(d3.csv, "data/cities.csv")
  .defer(d3.tsv, "data/animals.tsv")
  .await(analyze);

function analyze(error, cities, animals) {
  if(error) { console.log(error); }

  console.log(cities[0]);
  console.log(animals[0]);
}
