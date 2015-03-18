var path = require('path');

module.exports = function(grunt) {

  grunt.config.set('combine', {
    options: {
      src: "snippets/*",
      pattern: "*.js",
      dest: "build/src/"
    }
  });

  grunt.registerTask('combine', 'Combines files in a folder', function() {
    var options = this.options();

    //var src = grunt.file.expand(options.src);
    var dest = options.dest;

    // get all module directories
    grunt.file.expand(options.src).forEach(function (dir) {

        // get the section name from the directory name
        var sectionName = dir.split("/")[1];

        // get the current concat object from initConfig
        var concat = grunt.config.get('concat') || {};

        // create a subtask for each module, find all src files
        // and combine into a single js file per module
        concat[sectionName] = {
            src: [dir + '/*.js'],
            dest: options.dest + sectionName + '.js'
        };

        // add module subtasks to the concat task in initConfig
        grunt.config.set('concat', concat);
    });

    // run the concat task
    grunt.task.run('concat');
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

};
