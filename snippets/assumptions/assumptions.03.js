function checkDataContent(data) {
  data.forEach(function(d) {
    var dString = JSON.stringify(d);
    assert(_.isString(d.name), dString + " has a bad name - should be a string");
    assert(_.isNumber(d.age), dString + " has a bad age - should be a number");
    assert(!_.isNaN(d.age), dString + " has a bad age - should not be NaN");
    assert(_.isBoolean(d.superhuman), dString + " has a bad superhuman - should be boolean");
  });
}

checkDataContent(data);
