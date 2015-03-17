var weirdString = data.reduce(function(str, d, i) {
  var ending = (i % 2 === 0) ? " is cool." : " sucks." ;
  return str + " " + d.city + ending;
}, "");
console.log(weirdString);
