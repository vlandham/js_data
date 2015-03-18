module.exports = function(grunt) {

  preCompile = function(src, context) {
    context.title = src.split("\n")[0].replace("# ", "");
  };
  grunt.config.set("markdown", {
    all: {
      files: [
        {
        expand: true,
        cwd: 'build/locales',
        src: '**/*.md',
        dest: 'public/',
        ext: '.html'
        },
        {
        expand: true,
        cwd: 'build/locales/en',
        src: '*.md',
        dest: 'public/',
        ext: '.html'
        }
      ],
      options: {
        template: 'assets/custom.jst',
        markdownOptions: {
          highlight: 'manual'
        },
        preCompile: preCompile,
        contextBinder: false,
        contextBinderMark: '###'
      }
    }
  });
  grunt.loadNpmTasks('grunt-markdown');
};
