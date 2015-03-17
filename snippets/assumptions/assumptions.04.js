function checkDataShape(data) {
  assert(data.length > 0, "data is empty");
  assert(data.length > 4, "data is too small");
  var keys = d3.keys(data[0]);
  assert(keys.length === 4, "wrong number of columns");
}

checkDataShape(data);
