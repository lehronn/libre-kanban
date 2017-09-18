module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      files: ['dev/html/*.html',
        'dev/sass/*.sass',
        'dev/scss/*.scss',
        'dev/css/*.css',
        'dev/js/*.js',
        'dev/css/*min.css',
        'dev/js/*.min.js'
      ],
      tasks: ['jshint', 'sass', 'htmlmin', 'uglify']
    },
    jshint: {
      all: ['gruntfile.js',
        'dev/js/*.js'
      ]
    },
    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed'
      },
      dev: {
        files: {
          'dist/css/main.css': 'dev/sass/main.sass'
        }
      }
    },
    htmlmin: { // Task
      dist: { // Target
        options: { // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: { // Dictionary of files
          'dist/index.html': 'dev/html/index.html' // 'destination': 'source'
        }
      }
    },
    uglify: {
      my_target: {
        options: {
          sourceMap: true,
          sourceMapName: 'dist/js/script.min.map'
        },
        files: {
          'dist/js/script.min.js': ['dev/js/*.js']
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'dev/images/',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: 'dist/images/'
        }]
      }
    },
    browserSync: {
      bsFiles: {
        src: [
          'dist/css/*.css',
          'dist/*.html'
        ]
      },
      options: {
        watchTask: true,
        server: './dist'
      }
    }
  });
  // Load the plugins tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-browser-sync');
  // Default task(s).
  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('dist', ['jshint', 'sass', 'htmlmin', 'uglify']);
};
