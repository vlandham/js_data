var large_land = data.filter(function(d) { return d.land_area > 200; });
console.log(JSON.stringify(large_land));
