# Learn JS Data

[Live version](http://learnjsdata.com/)

Data manipulation, data munging, and data processing in JavaScript.

## About

This guide teaches the basics of manipulating data using JavaScript in the
browser, or in node.js. Specifically, these tasks are geared around preparing
data for further analysis and visualization.

This guide will demonstrate some basic techniques and how to implement them
using core JavaScript API, the [d3.js](http://d3js.org/) library and [lodash](http://lodash.com/).

It assumes you already have some basic knowledge of JavaScript.

## Contribute

Thanks to everyone who has worked on this to make it awesome:

- [Jim Vallandingham](https://twitter.com/vlandham)
- [Irene Ros](https://twitter.com/ireneros)
- [Timo Grossenbacher](https://twitter.com/grssnbchr)
- [Yannick Assogba](https://twitter.com/tafsiri)
- [Earle Castledine](https://twitter.com/mrspeaker)
- [Lynn Cherny](https://twitter.com/arnicas)

Want to add your own tips and tricks that you use to apply the power of JS to data processing?

Fork this project, modify and send me your pull requests!

_(Or you could probably just yell at me on Twitter - and I can include your suggestions into the guide)_

## Building

If you want to hack on this - or just download and run locally, here is how you would do that.

Requirements:

* node
* npm
* grunt (to rebuild)

First clone the repo:

```
git clone git@github.com:vlandham/js_data.git
```

Then run `npm install` to gather development dependencies:

```
cd js_data
npm install
```

You can now use grunt to do the following:

* Run `grunt` to start a watch task that will recompile things as needed, and kick off a local server on port 8081.
* Run `grunt build` just to build the `public/` directory containing all the output.

## Previous Work

This takes inspiration from a number of similar projects around data manipulation geared towards users of other languages. Here are just some other resources to checkout:

- [Python Code Notebooks](http://nbviewer.ipython.org/github/chrisalbon/code_py/tree/master/) - by Chris Albon
- [R Code Notebooks](https://github.com/chrisalbon/code_r) - also by Chris Albon

The presentation format of this repo borrows heavily from Tom MacWright's [Literate Raytracer](https://github.com/tmcw/literate-raytracer) repo.

## License

This code and accompanying text is released under CC0, or Public Domain where applicable.

