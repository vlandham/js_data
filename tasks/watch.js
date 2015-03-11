module.exports = function(grunt) {

  grunt.config.set('watch', {
    src: {
      files: ['src/*.js', 'assets/*'],
      tasks: ['docco', 'inject-script-tag', 'copy:js']
    },
    data : {
      files : ['data/*'],
      tasks: ['copy:data']
    },
    css : {
      files: ['assets/*.css'],
      tasks: ['docco']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};