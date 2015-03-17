module.exports = function(grunt) {
  grunt.config.set("markdown", {
    all: {
      files: [
        {
        expand: true,
        cwd: 'build/locales',
        src: '**/*.md',
        dest: 'public/',
        ext: '.html'
        }
      ],
      options: {
        template: 'assets/custom.jst',
        markdownOptions: {
          highlight: 'manual'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-markdown');
};
