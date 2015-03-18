module.exports = function(grunt) {

  grunt.config.set('watch', {
    src: {
      files: ['locales/**/*.md', 'assets/*', 'snippets/**/*'],
      tasks: ['code-inject', 'markdown', 'inject-script-tag', 'copy:js']
    },
    data : {
      files : ['data/*'],
      tasks: ['copy:data']
    },
    css : {
      files: ['assets/*.css'],
      tasks: ['copy:css']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
