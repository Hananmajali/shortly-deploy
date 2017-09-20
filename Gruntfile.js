module.exports = function(grunt) { //wrapper funcion

  grunt.initConfig({  //Most Grunt tasks rely on configuration data defined in an object passed to the grunt.initConfig method.
    pkg: grunt.file.readJSON('package.json'), //imports the JSON metadata stored in package.json
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['/public/client/**/*.js'],
        dest: 'dist/built.js',
      },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' // what ? 
      },
      build: {
        src: ['/public/client/**/*.js'], //uglify these files 
        dest: 'dist/uglified.js', //will create this
      },
    },

    eslint: {
      options: { //?
         configFile: '.eslintrc.js',
      },
      target: [
        'server-config.js',
        'server.js',
        'gruntfile.js'
      ]
    },

    cssmin: { //run by watch task ...


    },

    watch: {
      scripts: {
        files: [
          'public/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {

      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'concat'
  ]);
  grunt.registerTask('upload', function(n) {
    //grunt.run.task('default' , 'uglify'); //example ..
    if (grunt.option('prod')) {
      // add your production server task here

    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
  ]);

  grunt.registerTask('default', [
    'concat' ,
    'uglify',
    'eslint' //suggestion !!
    ]);

};
