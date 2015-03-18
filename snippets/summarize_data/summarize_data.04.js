var landExtent = d3.extent(data, function(d) { return d.land_area; });
console.log(landExtent);
