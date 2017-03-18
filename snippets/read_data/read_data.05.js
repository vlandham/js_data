var psv = d3.dsvFormat("|");

// This parser can parse pipe-delimited text:
var output = psv.parse("first|last\nabe|lincoln")
console.log(output[0])
