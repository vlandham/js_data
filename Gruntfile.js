module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['http-server:dev', 'watch']);
  grunt.registerTask('build', ['code-inject', 'markdown', 'copy']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);
};
