innerArray.filter(function(innerArrayItem) {
    return innerArrayItem.idA === outerArrayItem.idA &&
        innerArrayItem.idB === outerArrayItem.idB;
});
