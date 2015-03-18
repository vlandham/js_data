function assert(isTrue, message) {
  if(!isTrue) {
    console.log(message);
    return false;
  }
  return true;
}

var data = [{"name":"Dan",
             "age":23,
             "superhuman":false},
            {"name":"Sleepwalker",
              "age":NaN,
              "superhuman":"TRUE"}
];

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

function checkDataShape(data) {
  assert(data.length > 0, "data is empty");
  assert(data.length > 4, "data is too small");
  var keys = d3.keys(data[0]);
  assert(keys.length === 4, "wrong number of columns");
}

checkDataShape(data);

assert.deepEqual({ tea: 'green' }, { tea: 'green' });
