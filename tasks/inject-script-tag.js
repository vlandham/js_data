module.exports = function(grunt) {

  grunt.config.set('inject-script-tag', {
    options: {
      html_files: 'public/*.html',
      js_files: "src/*.js",
    }
  });

  var re = /<\/body\>/;

  grunt.registerTask('inject-script-tag', 'Inject src tags into html files', function() {
    var options = this.options();
    var html_files = grunt.file.expand(options.html_files);
    var js_files = grunt.file.expand(options.js_files);


    html_files.forEach(function(html_file, idx) {
      var js_file = js_files[idx];

      var html = grunt.file.read(html_file);
      var js = grunt.file.read(js_file);

      html = html.replace('</body>', '<script type="text/javascript" src="' + js_file + '"></script></body>');
      grunt.file.write(html_file, html);
      grunt.log.ok(html_file);
    });
  });

};