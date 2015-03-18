queue()
  .defer(d3.csv, "/data/cities.csv")
  .defer(d3.tsv, "/data/animals.tsv")
  .await(analyze);

function analyze(error, cities, animals) {
  if(error) { console.log(error); }

  console.log(cities[0]);
  console.log(animals[0]);
}
