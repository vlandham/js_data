module.exports = function(grunt) {

  grunt.config.set("docco", {
    debug : {
      files: {
        src: ['src/*.js'],
      },
      options: {
        output: 'public/',
        template: 'assets/custom.jst',
        css: 'assets/custom.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-docco-multi');
};