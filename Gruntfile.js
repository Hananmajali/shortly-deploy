module.exports = function(grunt) { //wrapper funcion

  grunt.initConfig({  //Most Grunt tasks rely on configuration data defined in an object passed to the grunt.initConfig method.
    pkg: grunt.file.readJSON('package.json'), //imports the JSON metadata stored in package.json
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['public/**/*.js'],
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
      dist: {
        src: ['dist/built.js'], //uglify these files 
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
      tasks : '?????????'
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
    }
    
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

  grunt.registerTask('build', [ //you will prepare your code base for production 
    'concat',
    'uglify' ,
  ]);

  grunt.registerTask('upload', function(n) {
    //grunt.run.task('default' , 'uglify'); //example ..
    if (grunt.option('prod')) {
      // add your production server task here
      // push it up to the production droplet :
        
        //Run eslint before deployment. 
        grunt.task.run('eslint');
        grunt.task.run('mochaTest'); //Run your Mocha tests before deployment. If any tests fail, the build process should exit
        console.log('after eslint hi ');
        //If eslint fails, 
          //the build process should exit

        //if eslint success 
          grunt.task.run ('deploy');   //upload files or run // globally ??

        //grunt.task.run([ 'server-dev' ]); //to remove later 

    } else {
      grunt.task.run([ 'server-dev' ]); // => npm start
    }
  });

  grunt.registerTask('deploy', [ 
    //Add a prod option such that when you run grunt deploy --prod you will prepare your code base for production and push it up to the production droplet

    // add your deploy tasks here
    //concat
    //uglify
    grunt.task.run([ 'server-dev' ]);
  ]);
};
