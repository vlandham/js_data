var expense = {"name":"jim","amount":34,"date":"11/12/2015"};

var parser = d3.timeParse("%m/%d/%Y");

expense.date = parser(expense.date);
console.log(expense);

var date = d3.timeParse("%A, %B %-d, %Y")("Wednesday, November 12, 2014");
console.log(date);

date = d3.timeParse("%m/%y")("12/14");
console.log(date);

var time = d3.timeParse("%I:%M%p")("12:34pm");
console.log(time);

time = d3.timeParse("%m/%d/%Y %H:%M:%S %p")("1/2/2014 8:22:05 AM");
console.log(time);

time = d3.timeParse("%x %X")("1/2/2014 8:22:05 AM");
console.log(time);

var hourParser = d3.timeParse("%I:%M%p");
var time = hourParser("10:34pm");
var hour = d3.timeHour.round(time);
console.log(hour);

var hourFormater = d3.timeFormat("%I:%M%p")
console.log(hourFormater(hour));
