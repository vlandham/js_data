var landAvg = d3.mean(data, function(d) { return d.land_area; });
console.log(landAvg);
