var path = require('path');

module.exports = function(grunt) {

  grunt.config.set('code-inject', {
    options: {
      snippets: "snippets",
      src: "locales/**/*.md",
      dest: "build/"
    }
  });

  var snippet_re = /@@ (.*) @@/; //CUTE!

  /**
   * Example:
   * ### Code
   *
   * Each document in this repo is executed when loaded into a browser. Check it
   * out by opening the Developer Tools Console. You should see the output of
   * the following code block:
   *
   * @@ code=index/index.01.js @@
   *
   * Check out the [full source on github](https://github.com/vlandham/js_data).
   */

  grunt.registerTask('code-inject', 'Injects code snippets into markdown', function() {
    var options = this.options();

    var src = grunt.file.expand(options.src);
    var dest = options.dest;

    src.forEach(function(src_file, idx) {

      var md = grunt.file.read(src_file);

      // find snippets
      var matches;
      while ((matches = snippet_re.exec(md)) !== null) {
        var match = matches[1];
        var snippet_path = path.join(options.snippets, match.split("=")[1]);
        var snippet_file = grunt.file.read(snippet_path); //code=[index/index.1.js] <-

        // check type of file... we only have .js and .html so far.
        if (snippet_path.indexOf('.js') > -1) {
          snippet_file = "```javascript\n" + snippet_file + "\n```";
        } else if (snippet_path.indexOf('.html') > -1) {
          snippet_file = "```html\n" + snippet_file + "\n```";
        } else if (snippet_path.indexOf('.out') > -1) {
            snippet_file = "```\n=> " + snippet_file + "\n```";
        }

        md = md.replace(matches[0], snippet_file);
      }

      var output_file = path.join(options.dest, src_file);
      grunt.file.write(output_file, md);
      grunt.log.ok(output_file);
    });
  });

};
