d3.dsv("|", "/data/animals_piped.txt").then(function(data){
  console.log(data[1]);
});
