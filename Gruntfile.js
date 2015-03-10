module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['http-server:dev', 'watch']);
  grunt.registerTask('build', ['docco', 'inject-script-tag', 'copy']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);
};
