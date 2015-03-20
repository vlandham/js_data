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