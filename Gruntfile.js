module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['src/*.js', 'assets/*'],
      tasks: ['exec']
    },
    exec: {
      command: "docco -t assets/custom.jst --css=assets/custom.css ./src/*.js --output=./"
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.registerMultiTask('docco', 'run docco', function() {
    
  });
  grunt.registerTask('default', ['http-server:dev', 'watch']);
  grunt.loadNpmTasks('grunt-exec');
};
