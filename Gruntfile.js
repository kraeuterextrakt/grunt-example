const sass = require('node-sass');

module.exports = function(grunt) {

    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'public/main.css': 'assets/scss/style.scss'
                }
            }
        },
        concat: {
            dist: {
                src: ['assets/js/cookiehint.js','assets/js/responsive-table.js'],
                dest: 'public/main.js',
            },
        },
        uglify: {
            main: {
                files: {
                    'public/main.min.js': ['public/main.js'],
                }
            }
        },
        cssmin: {
            main: {
                files: {
                    'public/main.min.css': ['public/main.css']
                }
            }
        },
        watch: {
            scripts: {
                files: 'assets/js/*.js',
                tasks: ['concat', 'uglify'],
                options: {
                    interrupt: true,
                },
            },
            styles: {
                files: 'assets/scss/*.scss',
                tasks: ['sass', 'cssmin'],
                options: {
                    interrupt: true,
                },
            },
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'assets/scss/*.scss',
                        'assets/js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    proxy: "localhost:8080"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['sass', 'concat', 'cssmin', 'uglify']);
    grunt.registerTask('serve', ['default','browserSync','watch']);

};