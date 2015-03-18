var landSD = d3.deviation(data, function(d) { return d.land_area; });
console.log(landSD);
