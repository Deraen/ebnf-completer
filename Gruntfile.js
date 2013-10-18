module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    watch: {
      test: {
        files: ['index.js', 'test/**/*.js'],
        tasks: ['mochaTest'],
        options: {
          atBegin: true,
        }
      },
    },
    mochaTest: {
      options: {
        reporter: 'spec',
      },
      test: {
        src: ['test/**/*.js'],
      },
    }
  });

  grunt.registerTask('default', 'watch');
};
