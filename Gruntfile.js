module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    lessSource: 'assets/less',
    lessDest: 'assets/css',
    jsSource: 'assets/jsSRC',
    jsDest: 'assets/js',
    less: {
        dev: {
            files: [
                {
                    expand: true,   
                    cwd: '<%=lessSource%>',     
                    src: ['**/*.less'], 
                    dest: '<%=lessDest%>', 
                    ext: '.css'                           
                }
                    ]
        },
        proc: {
            options: {
                compress: true
            },
            src: '<%=lessSource%>/**/*.less',
            dest: '<%=lessDest%>/app.min.css'
        }
    },
    uglify: {
        dev: {
            options : {
                beautify : true,
                compress : false
            },
            files: [
                {
                    expand: true,     // Enable dynamic expansion.
                    cwd: '<%=jsSource%>',      // Src matches are relative to this path.
                    src: ['**/*.js'], // Actual pattern(s) to match.
                    dest: '<%=jsDest%>',   // Destination path prefix.
                    ext: '.js'   // Dest filepaths will have this extension.
                         }
                    ]
            
        },

        proc: {
            options: {
                compress: true
            },
            src: 'assets/jsSRC/**/*.js',
            dest: 'assets/js/app.min.js'
        }
    },
    watch: {
        css: {
            options : {
                livereload : true
            },
            files : [
                        '<%=lessSource%>/**/*.less'
                    ],
            tasks : ['less:dev']
        },
        html: {
             options: {
                livereload : true,
                },
             files : ['**/*.html']
             
            }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['less:dev', 'uglify:dev']);
  grunt.registerTask('proc', ['less:proc', 'uglify:proc']);
};
