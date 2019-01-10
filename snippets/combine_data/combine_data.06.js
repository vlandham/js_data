Promise.all([
    d3.csv("/data/big_data_1.csv"),
    d3.csv("/data/big_data_2.csv"),
    d3.csv("/data/big_data_3.csv")
]).then(function(allData) {
    console.log(d3.merge(allData));
});
