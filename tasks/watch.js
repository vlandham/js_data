module.exports = function(grunt) {

  grunt.config.set('watch', {
    src: {
      files: ['locales/**/*.md', 'assets/*'],
      tasks: ['code-inject', 'markdown', 'copy:js']
    },
    data : {
      files : ['data/*'],
      tasks: ['copy:data']
    },
    css : {
      files: ['assets/*.css'],
      tasks: ['markdown']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
