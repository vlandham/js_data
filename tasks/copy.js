module.exports = function(grunt) {

  grunt.config.set("copy", {
    js: {
      expand: true,
      cwd: "build/src/",
      src: ["*.js"],
      dest: "public/src"
    },
    css: {
      expand: true,
      cwd: "assets/",
      src: ["*.css"],
      dest: "public"
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
    favicon: {
      expand: false,
      src: "favicon.ico",
      dest: "public/"
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
