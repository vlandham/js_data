// # Getting Started
//
// ## About Tasks
//
// This guide is broken up into a number of tasks, which we can think of as little modules or _recipes_.
//
// Each task tries to encapsulate a concrete lesson around common data manipulation and analysis processes. Tasks attempt to be self-contained and stay focused on the, well, _task at hand_. 
//
// This guide was built with for client side data processing (in the browser), but can easily be used in a server side (Node) application with a bit of tweaking. Check out the [analyzing data with Node](node.html) section for the details. 
//
// ## Why D3?
//
// [D3.js](http://d3js.org/) is largely known for its data visualization capabilities - and for good reason. It is quickly becoming the de facto standard for interactive visualization on the web.
//
// Its core feature of binding data to visual representations happens to require a lot of manipulation of said data. Thus, while this toolkit is focused around visualization, it is well suited for data munging as well!
//
// And, a typical output for data manipulation is at least some sort of visualization of that data, in which case you are all ready to go.
//
// ## Why lodash?
//
// [Lodash](https://lodash.com) is fast, popular, and fills in some holes in D3's processing features. Plus, it's functional style and chaining capabilities make it work well alongside D3.
//
// ## Code Snippets
//
// There are a bunch of useful snippets in this guide. Here is an example:
//
var theMax = d3.max([1,2,20,3]);
console.log(theMax);
// ```
//=> 20
// ```
// <div class="aside">This code is using d3.js</div>
//
// We use a little arrow, `=>`, to indicate output from a code snippet. This same output you can view by opening the [console](https://developer.chrome.com/devtools/docs/console) of your favorite web browser.
//
// Snippets in this guide that are not pure JavaScript will be marked with the libraries used to make them work.
//
// ## Preparing Your Site for Data Processing
//
// To get started using these tools for your data processing, you are going to want to include them in your html file along with a JavaScript file to perform the analysis. 
//
// I typically download these scripts and include local copies in my page. To do this, you would want to have your HTML look something like this: 
//
// ```
// <!doctype html>
// <html>
// <head>
// </head>
// <body>
// 
// <script src='js/d3.js'></script>
// <script src='js/lodash.js'></script>
// <script src='js/analysis.js'></script>
// </body>
// </html>
// ```
//
// `analysis.js` would be where your analysis code goes. I put them at the end of the `body` - just so that if there is other content on the page, it won't be delayed in loading. Typically, I name this file `index.html` - so that its loaded automatically as the root page.
//
// ## Running a Local Server
//
// D3's functions for [reading data](read_data.html) require you be running the page from a server. You can do this on your own machine by running a local server out of the root directory of your site.
//
// There are many options for easy-to-spin-up web servers:
//
// - [SimpleHTTPServer](http://www.pythonforbeginners.com/modules-in-python/how-to-use-simplehttpserver/) for Python
// - [httpd](http://www.benjaminoakes.com/2013/09/13/ruby-simple-http-server-minimalist-rake/) for Ruby
// - [http-server](https://github.com/nodeapps/http-server) for Node
//
// Lately, I have been using that last option - `http-server`. If you have Node and npm installed, you can grab the required package by installing it from the command line:
//
// ```
// npm install -g http-server
// ```
//
// (The `-g` flag stands for _global_ - which allows you to access `http-server` from any directory on your machine.
//
// Then `cd` to your analysis directory and start it up!
//
// ```
// cd /path/to/dir
// http-server
// ```
//
// In your web browser, open up [http://0.0.0.0:8080](http://0.0.0.0:8080) and you should be ready to go!
//
// ## Next Task
//
// [Reading in Data](read_data.html)
//
// ## See Also
//
// - [Installing Node](http://howtonode.org/how-to-install-nodejs) - if you need some help getting `http-server` on your machine.
