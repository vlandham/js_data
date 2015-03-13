module.exports = function(grunt) {

  grunt.config.set("copy", {
    js: {
      expand: true,
      cwd: "src/",
      src: ["*.js"],
      dest: "public/src"
    },
    lib: {
      expand: true,
      cwd: "lib/",
      src: ["**/*"],
      dest: "public/lib"
    },
    data: {
      expand: true,
      cwd : "data/",
      src: ["**"],
      dest: "public/data"
    },
    img: {
      expand: true,
      cwd: "img/",
      src: ["**"],
      dest: "public/img"
    },
    cname: {
      expand: true,
      cwd: "assets/",
      src: "CNAME",
      dest: "public/"
    },
    codeblocks_js: {
      expand: true,
      cwd: "assets/codeblocks",
      src: ["**"],
      dest: "public/lib/codeblocks"
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
