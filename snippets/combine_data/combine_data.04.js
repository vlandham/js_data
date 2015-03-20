function innerJoin(primary, foreign, primaryKey, foreignKey, select) {
    var m = primary.length,
        n = foreign.length,
        index = [],
        output = [];
    for (var i = 0; i < m; i++) { // loop through m items
        var row = primary[i];
        index[row[primaryKey]] = row; // create an index for primary table
    }
    for (var j = 0; j < n; j++) { // loop through n items
        var y = foreign[j];
        var x = index[y[foreignKey]]; // get corresponding row from primary
        output.push(select(x, y)); // select only the columns you need
    }
    return output;
};
