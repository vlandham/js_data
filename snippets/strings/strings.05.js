d3.csv("data/cities_spaced.csv", function(data) {
  var clean = data.map(function(d) {
    var cleanD = {};
    d3.keys(d).forEach(function(k) {
      cleanD[_.trim(k)] = _.trim(d[k]);
    });
    return cleanD;
  });
  console.log(JSON.stringify(clean));
});
