module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      files: ['src/*.js', 'assets/*'],
      tasks: ['docco', 'exec']
    },

    exec: {
      inject: {
        command: "tools/inject_source.rb ./ src/"
      }
    },

    'http-server': {
      'dev': {
        root: "./",
        port: 8081,
        host: "127.0.0.1",
        showDir : true,
        ext: "html",
        runInBackground: true
      }
    },

    docco: {
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
    },

    'gh-pages': {
      options: {
        base: 'public'
      },
      src: ['**']
    }
  });


  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-docco-multi');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-http-server');

  grunt.registerTask('default', ['http-server:dev', 'watch']);

  grunt.loadNpmTasks('grunt-exec');
};
