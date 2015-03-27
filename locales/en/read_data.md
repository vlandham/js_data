# Reading in Data

The first step in any data processing is getting the data! Here is how to parse in and prepare common input formats using D3.js

## Parsing CSV Files

[D3 has a bunch](https://github.com/mbostock/d3/wiki/Requests) of filetypes it can support when loading data, and one of the most common is probably plain old CSV (comma separated values).

Let's say you had a csv file with some city data in it:


```bash
cities.csv:

city,state,population,land area
seattle,WA,652405,83.9
new york,NY,8405837,302.6
boston,MA,645966,48.3
kansas city,MO,467007,315.0
```

Use [d3.csv](https://github.com/mbostock/d3/wiki/CSV) to convert it into an array of objects

@@ code=read_data/read_data.01.js @@
@@ code=read_data/read_data.01.out @@

<div class="aside">This code is using d3.js</div>

You can see that the headers of the original CSV have been used as the property names for the data objects. Using `d3.csv` in this manner requires that your CSV file has a header row.

If you look closely, you can also see that the values associated with these properties are all strings. This is probably _not what you want_ in the case of numbers. When loading CSVs and other flat files, you have to do the type conversion.

We will see more of this in other tasks, but a simple way to do this is to use the [+](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Unary_plus) operator (unary plus). `forEach` can be used to iterate over the data array.

@@ code=read_data/read_data.02.js @@
@@ code=read_data/read_data.02.out @@

<div class="aside">This code is using d3.js</div>

[Dot notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors) is a useful way to access the properties of these data objects. However, if your headers have spaces in them, then you will need to use bracket notation as shown.


This can also be done during the loading of the data, by `d3.csv` directly. This is done by providing an accessor function to `d3.csv`, who's return value will be the individual data objects in our data array.

@@ code=read_data/read_data.03.js @@
@@ code=read_data/read_data.03.out @@

<div class="aside">This code is using d3.js</div>

In this form, you have complete control over the data objects and can rename properties (like `land_area`) and convert values (like `population`) willy-nilly.  On the other hand, you have to be quite explicit about which properties to return. This may or may not be what you are into.

I typically allow D3 to load all the data, and then make modifications in a post-processing step, but it might be more effective for you to be more explicit with the modifications.


## Reading TSV Files

CSV is probably the most common flat file format, but in no way the only one.

I often like to use TSV (tab separated files) - to get around the issues of numbers and strings often having commas in them.

D3 can parse TSV's with [d3.tsv](https://github.com/mbostock/d3/wiki/CSV#tsv):

```
animals.tsv:

name	type	avg_weight
tiger	mammal	260
hippo	mammal	3400
komodo dragon	reptile	150
```
Loading animals.tsv with `d3.tsv`:

@@ code=read_data/read_data.04.js @@
@@ code=read_data/read_data.04.out @@

<div class="aside">This code is using d3.js</div>

## Reading Other Flat Files

In fact, `d3.tsv` and `d3.csv` are only the tip of the iceberg. If you have a non-standard delimited file, you can create your own parser easily, using [d3.dsv](https://github.com/mbostock/d3/wiki/CSV#arbitrary-delimiters)

Using `d3.dsv` takes one more step. You first create a new parser by passing in the type of delimiter and [mimeType](http://en.wikipedia.org/wiki/Internet_media_type) to use.

For example, if we had a file that looked like this:
```
animals_piped.txt:

name|type|avg_weight
tiger|mammal|260
hippo|mammal|3400
komodo dragon|reptile|150
```
We could create a pipe separated values (PSV) parser using `d3.dsv`:

@@ code=read_data/read_data.05.js @@

And then use this to parse the strangely formated file.

@@ code=read_data/read_data.06.js @@
@@ code=read_data/read_data.06.out @@

<div class="aside">This code is using d3.js</div>

## Reading JSON Files

For nested data, or for passing around data where you don't want to mess with data typing, its hard to beat [JSON](http://json.org/).

JSON has become the language of the internet for good reason. Its easy to understand, write, and parse. And with [d3.json]() - you too can harness its power.


```
employees.json:

[
 {"name":"Andy Hunt",
  "title":"Big Boss",
  "age": 68,
  "bonus": true
 },
 {"name":"Charles Mack",
  "title":"Jr Dev",
  "age":24,
  "bonus": false
 }
]
```

Loading employees.json with `d3.json`:

@@ code=read_data/read_data.07.js @@
@@ code=read_data/read_data.07.out @@

<div class="aside">This code is using d3.js</div>

We can see that, unlike our flat file parsing, numeric types stay numeric. Indeed, a JSON value can be a string, a number, a boolean value, an array, or another object. This allows nested data to be dealt with easily.

## Loading Multiple Files

D3's basic loading mechanism is fine for one file, but starts to get messy as we nest multiple callbacks.

For loading multiple files, we can use [Queue.js](https://github.com/mbostock/queue) (also written by Mike Bostock) to wait for multiple data sources to be loaded.

@@ code=read_data/read_data.08.js @@
@@ code=read_data/read_data.08.out @@

<div class="aside">This code is using queue.js and d3.js</div>

Note that we `defer` the loading of two types of files - using two different loading functions - so this is an easy way to mix and match file types.

The callback function passed into `await` gets each dataset as a parameter, with the first parameter being populated if an error has occurred in loading the data.

It can be useful to output the error, if it is defined, so you catch data loading problems quickly.

To add another data file, simply add another defer and extend the input parameters for your callback!


## Next Task

[Combining Data](combine_data.html)

## See Also

- [D3 documentation](https://github.com/mbostock/d3/wiki/Requests)
- [Loading XML with D3](https://github.com/mbostock/d3/wiki/Requests#d3_xml)
- [Loading External SVG with D3](http://bl.ocks.org/mbostock/1014829) - SVG is just XML!

