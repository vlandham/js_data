var landMed = d3.median(data, function(d) { return d.land_area; });
console.log(landMed);
