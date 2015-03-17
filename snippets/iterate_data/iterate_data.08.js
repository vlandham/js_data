var dataObject = {"name":"Saul", "stats":{"age":"55"}};
var deepCopy = _.clone(dataObject, true);
deepCopy.stats.age = +deepCopy.stats.age;
console.log(dataObject);
