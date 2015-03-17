var dataObject = {"name":"Saul", "stats":{"age":"55"}};
var shallowCopy = _.clone(dataObject);
shallowCopy.stats.age = +shallowCopy.stats.age;
console.log(dataObject);
