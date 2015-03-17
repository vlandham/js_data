matches.reduce(function(sum, value) {
  return sum + Number(value.slice(1));
}, 0);
