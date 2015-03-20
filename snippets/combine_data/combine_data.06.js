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
