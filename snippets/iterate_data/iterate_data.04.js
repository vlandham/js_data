var dataObject = {"name":"Carl", "age":"48", "salary":"12300"};
var copyOfData = _.clone(dataObject);
copyOfData.age = +copyOfData.age;
copyOfData.salary = +copyOfData.salary;
console.log(dataObject);
