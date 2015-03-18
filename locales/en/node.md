# Analyzing Data with Node

As mentioned in the [introduction](getting_started.html), this guide is mostly geared for client-side data analysis, but with a few augmentations, the same tools can be readily used server-side with [Node](https://nodejs.org/).

If the data is too large, this might in fact be your only option if you want to use JavaScript for your data analysis. Trying to deal with large data in the browser might result in your users having to wait for a long time. No user will wait for 5 minutes with a frozen browser, no matter how cool the analysis might be.

## Setting up a Node Project

To get started with Node, ensure both node and [npm](https://www.npmjs.com/), the Node package manager, are installed and available via the command line:

```bash
which node
# /usr/local/bin/node
which npm
# /usr/local/bin/npm
```

Your paths may be different then mine, but as long as `which` returns something, you should be good to go.

If node isn't installed on your machine, you can [install it easily via a package manager](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager#osx).

Create a new directory for your data analysis project. In this example, we have a directory with a sub-directory called `data` which contains our `animals.tsv` file inside.

```bash
animals_analysis
|
 - data
   |
    - animals.tsv
```

## Installing Node Modules

Next, we want to install our JavaScript tools, D3 and lodash. With Node, we can automate the process by using `npm`. Inside your data analysis directory run the following:

```bash
npm install d3
npm install lodash
```

You can see that npm creates a new sub-directory called `node_modules` by default, where your packages are installed. Everything is kept local, so you don't have to worry about problems with missing or out-of-date packages. Your analysis tools for each project are ready to go.

A `package.json` file can be useful for saving this kind of meta information about your project: dependencies, name, description, etc. Check out this [interactive example](http://browsenpm.org/package.json) or [npm's documentation](https://docs.npmjs.com/files/package.json) for more information.

## Requiring Modules

Now we create a separate JavaScript file to do our analysis in:

```bash
touch analyze.js
```

Inside this file, we first [require](http://openmymind.net/2012/2/3/Node-Require-and-Exports/) our external dependencies.

```js
var fs = require("fs");
var d3 = require("d3");
var _ = require("lodash");
```
We are requiring our locally installed `d3` and `lodash` packages. Note how we assign them to variables, which are used to access their functions later in the code.

We also require the [file system](https://nodejs.org/api/fs.html) module. As we will see in a second, we need this to load our data - which is really the key difference between client-side and server-side use of these tools

## Loading Data in Node

D3's data loading functionality is based on [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest), which is great, but Node does not have `XMLHttpRequest`. There are packages around this mismatch, but a more elegant solution is to just use Node's built in file system functionality to load the data, and then D3 to parse it.

```js
fs.readFile("data/animals.tsv", "utf8", function(error, data) {
  data = d3.tsv.parse(data);
  console.log(JSON.stringify(data));
});
```

[fs.readFile](https://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback) is asynchronous and takes a callback function when it is finished loading the data.

Like our Queue example in [client-side reading](read_data.html), the parameters of this function start with `error`, which will be `null` unless there is an error.

The data returned by `readFile` is the raw string contents of the file.

We can use [d3.tsv.parse](https://github.com/mbostock/d3/wiki/CSV#parse) which takes a string and and converts it into an array of data objects - just like what we are used to on the client side!

From this point on, we can use d3 and lodash functionality to analyze our data.

A full, but very simple script might look like this:

```js
var fs = require("fs");
var d3 = require("d3");
var _  = require("lodash");

fs.readFile("data/animals.tsv", "utf8", function(error, data) {
  data = d3.tsv.parse(data);
  console.log(JSON.stringify(data));

  var maxWeight = d3.max(data, function(d) { return d.avg_weight; });
  console.log(maxWeight);
});
```

## Running the Analysis

Since this is not in a browser, we need to execute this script, much like you would with a script written in Ruby or Python.

From the command line, we can simply run it with `node` to see the results.

```bash
node analyze.js
```

@@ code=node/node.01.out @@

## Writing Data

Maybe the original data set is too big, but we can use Node to perform an initial pre-processing or filtering step and output the result to a new file to work with later.

Node has [fs.writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_filename_data_options_callback) that can perform this easily.

Inside the read callback, we can call this to write the data out.

```js
var bigAnimals = data.filter(function(d) { return d.avg_weight > 300; });
bigAnimalsString = JSON.stringify(bigAnimals);

fs.writeFile("big_animals.json", bigAnimalsString, function(err) {
  console.log("file written");
});
```

Running this should leave us with a `big_animals.json` file in our analysis folder.

This is fine if JSON is what you want, but often times you want to output TSV or CSV files for further analysis. D3 to the rescue again!

D3 includes [d3.csv.format](https://github.com/mbostock/d3/wiki/CSV#format) (and the equivalent for TSV and other file formats) which converts our array of data objects into a string - perfect for writing to a file.

Let's use it to make a CSV of our big animals.

```js
var bigAnimals = data.filter(function(d) { return d.avg_weight > 300; });
bigAnimalsString = d3.csv.format(bigAnimals);

fs.writeFile("big_animals.csv", bigAnimalsString, function(err) {
  console.log("file written");
});
```

Run this with the same `node analysis.js` and now you should have a lovely little `big_animals.csv` file in your directory. It even takes care of the headers for you:

```
name,type,avg_weight
hippo,mammal,3400
```

Now even [BIG data](https://medium.com/@wtrsld/big-data-made-me-do-it-5bfc3f46871c) is no match for us - using the power of JavaScript!


