module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
          css: {
            files: 'css/*.css',
            tasks: ''
            },
          js: {
            files: 'js/*.js',
            tasks: ''
            }
          },

          express:{
  			all:{
  				options:{
  					port:3000,
  					hostname:'localhost',
  					bases:['./'],
  					livereload:true
  				}
  			}
  		},
      parallel: {
      mix: {
        tasks: [{
          grunt: true,
          args: ['fast']
        }, {
          grunt: true,
          args: ['block']
        }, {
          cmd: 'pwd'
        },{
          grunt: true,
          args: ['fast']
       }]
      },
      shell: {
        tasks: [{
          cmd: 'whoami'
        }]
      },
      grunt: {
        options: {
          grunt: true
        },
        tasks: ['fast', 'block', 'fast']
      },
      stream: {
        options: {
          stream: true
        },
        tasks: [ { cmd: 'tail', args: ['-f', '/var/log/system.log'] }]
      }
    }
		});
    grunt.loadNpmTasks('grunt-parallel');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
	  grunt.registerTask('server',['express','watch']);
		grunt.registerTask('default');
    };
