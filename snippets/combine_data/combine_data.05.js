var result = innerJoin(articles, brands, "id", "brand_id", function(article, brand) {
    return {
        id: article.id,
        name: article.name,
        weight: article.weight,
        price: article.price,
        brand: brand.name
    };
});
console.log(result);