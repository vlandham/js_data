var hourParser = d3.timeParse("%I:%M%p");
var time = hourParser("10:34pm");
var hour = d3.timeHour.round(time);
console.log(hour);
