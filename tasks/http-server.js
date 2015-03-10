module.exports = function(grunt) {

  grunt.config.set('http-server', {
    dev: {
      root: './public',
      port: 8081,
      host: '127.0.0.1',
      showDir : true,
      ext: 'html',
      runInBackground: true
    }
  });

    grunt.loadNpmTasks('grunt-http-server');
};