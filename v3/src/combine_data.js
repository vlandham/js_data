var articles = [{
    "id": 1,
    "name": "vacuum cleaner",
    "weight": 9.9,
    "price": 89.9,
    "brand_id": 2
}, {
    "id": 2,
    "name": "washing machine",
    "weight": 540,
    "price": 230,
    "brand_id": 1
}, {
    "id": 3,
    "name": "hair dryer",
    "weight": 1.2,
    "price": 24.99,
    "brand_id": 2
}, {
    "id": 4,
    "name": "super fast laptop",
    "weight": 400,
    "price": 899.9,
    "brand_id": 3
}];

var brands = [{
    "id": 1,
    "name": "SuperKitchen"
}, {
    "id": 2,
    "name": "HomeSweetHome"
}];

articles.forEach(function(article) {
    var result = brands.filter(function(brand) {
        return brand.id === article.brand_id;
    });
    delete article.brand_id;
    article.brand = (result[0] !== undefined) ? result[0].name : null;
});
console.log(articles);

function join(lookupTable, mainTable, lookupKey, mainKey, select) {
    var l = lookupTable.length,
        m = mainTable.length,
        lookupIndex = [],
        output = [];
    for (var i = 0; i < l; i++) { // loop through l items
        var row = lookupTable[i];
        lookupIndex[row[lookupKey]] = row; // create an index for lookup table
    }
    for (var j = 0; j < m; j++) { // loop through m items
        var y = mainTable[j];
        var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
        output.push(select(y, x)); // select only the columns you need
    }
    return output;
};

var result = join(brands, articles, "id", "brand_id", function(article, brand) {
    return {
        id: article.id,
        name: article.name,
        weight: article.weight,
        price: article.price,
        brand: (brand !== undefined) ? brand.name : null
    };
});
console.log(result);
queue()
    .defer(d3.csv, "/data/big_data_1.csv")
    .defer(d3.csv, "/data/big_data_2.csv")
    .defer(d3.csv, "/data/big_data_3.csv")
    .await(combine);

function combine(error, big_data_1, big_data_2, big_data_3) {
    if (error) {
        console.log(error);
    }
    console.log(d3.merge([big_data_1, big_data_2, big_data_3]));
}

var dataset_1 = [{
    'type': 'boat',
    'model': 'Ocean Queen 2000'
}, {
    'type': 'car',
    'model': 'Ferrari'
}];
var dataset_2 = [{
    'price': 23202020,
    'weight': 5656.9
}, {
    'price': 59988,
    'weight': 1.9
}];
var result = _.merge(dataset_1, dataset_2);
console.log(result);