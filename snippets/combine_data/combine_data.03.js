articles.forEach(function(article) {
    var result = brands.filter(function(brand) {
        return brand.id === article.brand_id;
    });
    delete article.brand_id;
    article.brand = (result[0] !== undefined) ? result[0].name : null;
});
console.log(articles);
