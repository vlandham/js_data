var expense = {"name":"jim","amount":34,"date":"11/12/2015"};

var parser = d3.time.format("%m/%d/%Y");

expense.date = parser.parse(expense.date);
console.log(expense);

var date = d3.time.format("%A, %B %-d, %Y").parse("Wednesday, November 12, 2014");
console.log(date);

date = d3.time.format("%m/%y").parse("12/14");
console.log(date);

var time = d3.time.format("%I:%M%p").parse("12:34pm");
console.log(time);

time = d3.time.format("%m/%d/%Y %H:%M:%S").parse("01/02/2014 08:22:05");
console.log(time);

time = d3.time.format("%x %X").parse("01/02/2014 08:22:05");
console.log(time);

var hourParser = d3.time.format("%I:%M%p");
var time = hourParser.parse("10:34pm");
var hour = d3.time.hour.round(time);
console.log(hour);

console.log(hourParser(hour));
