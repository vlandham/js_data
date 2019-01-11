# About this guide

This guide teaches the basics of manipulating data using JavaScript in the
browser, or in node.js. Specifically, these tasks are geared around preparing
data for further analysis and visualization.

Here we demonstrate some basic techniques and how to implement them
using core JavaScript API, the [d3.js](http://d3js.org/) library and [lodash](http://lodash.com/).

It assumes you already have some basic knowledge of JavaScript.

## Tasks

<ul class='tasks'>
 <li>[Getting Started](getting_started.html)</li>
 <li>[Reading in Data](read_data.html)</li>
 <li>[Combining Data](combine_data.html)</li>
 <li>[Summarizing Data](summarize_data.html)</li>
 <li>[Iterating and Reducing](iterate_data.html)</li>
 <li>[Nesting and Grouping Data](group_data.html)</li>
 <li>[Working with Strings](strings.html)</li>
 <li>[Regular Expressions](regexes.html)</li>
 <li>[Working with Time](time.html)</li>
 <li>[Checking Data Assumptions](assumptions.html)</li>
 <li>[Using Node](node.html)</li>
</ul>

## News

**01/11/2019**: We also have an amazing [Observable version of the guide](https://beta.observablehq.com/@dakoop/learn-js-data) provided by the very talented [@dakoop](https://beta.observablehq.com/@dakoop). Observable is a great, interactive way to try out JavaScript. Give it a try now!

**01/10/2019**: We've updated the guide to use [D3v5](https://github.com/d3/d3/blob/master/CHANGES.md#changes-in-d3-50). The new changes mostly impact the "Reading in Data" section of the guide. A very special thank you goes out to [Erin Brown](https://github.com/erinbrown) who contributed the PR to make this happen! We really appreciate the help!

**03/20/2017**: We've updated the guide to use **D3v4**!! Thanks very much to [Kanit Ham Wong](https://twitter.com/kanitw) and others at the [UW Interactive Data Lab](https://idl.cs.washington.edu/) for support, suggestions, and motivation for this process. Thanks to [Adam Pearce](https://twitter.com/adamrpearce) for doing most of the converting!

If you need the old D3v3 guide, [its been archived here](v3/)

## Code

Each document in this repo is executed when loaded into a browser. Check it out by opening the Developer Tools Console. You should see the output of the following code block:

@@ code=index/index.01.js @@

Check out the [full source on github](https://github.com/vlandham/js_data).

## Why?

Is data cleaning and processing in JavaScript something you would actually want to do? _Maybe_.

There are other languages out there that do a great job with data wrangling:

- [R with the Tidyverse](https://www.tidyverse.org/)
- [Python with pandas](http://nbviewer.ipython.org/gist/fonnesbeck/5850413)
- [Java (just kidding)]()

These tools are great and you should use them. Often times, however, you are already familiar with a particular language (like JavaScript) and would like to get started with data, but want to take it one step at a time.

Additionally, sometimes you are already in a particular environment (like JavaScript) and don't have the luxury of switching to one of these other options.

In these cases, JavaScript could be considered a viable option for your data analysis. And if you find yourself in one of these situations, or just want to try out JavaScript for data analysis for fun, then _this guide is for you_!

Check out some of the tasks, and see if JavaScript Data something you want to try yourself.

## Thanks!

This guide is the result of quite a team effort.

Its inspiration came from a ponderous tweet by the one and only [Lynn Cherney](http://ghostweather.com/), who lamented the dirth of JavaScript data guidance at the time.

The beautiful folks at [Bocoup](https://bocoup.com/) are the reason this guide exists. They had the foresight to provide the all important luxury of time so that it could be written. Thanks to [Jory Burson](https://bocoup.com/about/bocouper/jory-burson) and [Boaz Sender](https://bocoup.com/about/bocouper/boaz-sender) for creating a culture that gave space for these kinds of things to be created.

The bulk of this guide was written while at Bocoup by [Irene Ros](https://medium.com/@ireneros), [Yannick Assogba](http://clome.info/), and [Jim Vallandingham](http://vallandingham.me/).

Since that time, we have had [numerous other contributors](https://github.com/vlandham/js_data/graphs/contributors), who have seen something to improve, and made us all better for their help.

Perhaps hackneyed, but almost always true - It takes a village. So to that village we want to say, "Thanks!".
