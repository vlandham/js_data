var dataset_1 = [{
    'a': 1,
    'b': 3
}, {
    'a': 4,
    'b': 3
}];
var dataset_2 = [{
    'c': 2,
    'd': 4
}, {
    'c': 5,
    'd': 6
}];
var result = _.merge(dataset_1, dataset_2);
console.log(result);