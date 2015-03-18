d3.csv("/data/cities.csv", function(data) {
  data.forEach(function(d) {
    d.population = +d.population;
    d["land area"] = +d["land area"];
  });
  console.log(data[0]);
});
