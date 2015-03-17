var hourParser = d3.time.format("%I:%M%p");
var time = hourParser.parse("10:34pm");
var hour = d3.time.hour.round(time);
console.log(hour);
