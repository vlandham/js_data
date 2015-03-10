module.exports = function(grunt) {

  grunt.config.set("gh-pages", {
    options: {
      base: 'public'
    },
    src: ['**']
  });

  grunt.loadNpmTasks('grunt-gh-pages');
};