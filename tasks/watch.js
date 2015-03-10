module.exports = function(grunt) {

  grunt.config.set('watch', {
    src: {
      files: ['src/*.js', 'assets/*'],
      tasks: ['docco', 'inject-script-tag', 'copy:js']
    },
    data : {
      files : ['data/*'],
      tasks: ['copy:data']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};