var path = require('path');

module.exports = function(grunt) {

  grunt.config.set('inject-script-tag', {
    options: {
      html_files: ['public/*.html', 'public/**/*.html'],
      js_files: "build/src/*.js",
    }
  });

  var re = /<\/body\>/;

  grunt.registerTask('inject-script-tag', 'Inject src tags into html files', function() {
    var options = this.options();
    var html_files = grunt.file.expand(options.html_files);
    var js_files = grunt.file.expand(options.js_files);
    var js_map = {};
    js_files.forEach(function(js_file) {
      js_map[path.basename(js_file, path.extname(js_file))] = js_file;
    });


    html_files.forEach(function(html_file, idx) {
      var html_id = path.basename(html_file, path.extname(html_file));

      var js_file = js_map[html_id];

      var html = grunt.file.read(html_file);
      var js = grunt.file.read(js_file);
      var base_js_file = path.basename(js_file);


      html = html.replace('</body>', '<script type="text/javascript" src="/src/' + base_js_file + '"></script></body>');
      grunt.file.write(html_file, html);
      grunt.log.ok(html_file);
    });
  });

};
