var time = d3.timeParse("%I:%M%p")("10:34pm");
var hour = d3.timeHour.round(time);
console.log(hour);
