module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Minify JS
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'js/app.min.js': ['js/main.js'],
                }
            }
        },

        // Compile LESS to CSS
        less: {
            development: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "css/app.min.css": "less/app.less",
                },
                cleancss: true
            },

        },

        // Minify CSS
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            target: {
                files: {
                    'css/app.css': ['css/app.css']
                }
            }
        },

        // Create distributed version
        copy: {
            site: {
                expand: true,
                cwd: '',
                src: [
                    'css/app.min.css',
                    'js/app.min.js',
                    'fonts/**/*',
                    'images/**/*',
                    'robots.txt',
                    'sitemap.xml',
                    'vendors/bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'vendors/bower_components/jquery/dist/jquery.min.js'
                ],
                dest: 'dist/'
            },
            fonts: {
                expand: true,
                flatten: true,
                cwd: '',
                src: [
                    'fonts/**/*',
                    'vendors/bower_components/font-awesome/fonts/**/*'
                ],
                dest: 'dist/fonts'
            },
            css: {
                expand: true,
                cwd: '',
                src: [
                    'css/app.min.css'
                ],
                dest: 'dist/'
            },
            js: {
                expand: true,
                cwd: '',
                src: [
                    'js/app.min.js'
                ],
                dest: 'dist/'
            },
            img: {
                expand: true,
                cwd: '',
                src: [
                    'images/**/*'
                ],
                dest: 'dist/'
            }
        },

        // Clean temp and other unwanted files and folders
        clean: ['**/.idea', '**/.DS_Store', 'dist', '__MACOSX', '__macosx', 'npm-debug.log'],

        // Watch LESS and JS file changes and execute tasks
        watch: {
            less: {
                files: ['less/**/*.less'],
                tasks: ['less', 'cssmin', 'copy:css']
            },
            js: {
                files: ['js/main.js'],
                tasks: ['uglify', 'copy:js']
            },
            htmlbuild: {
                files: ['*.html', 'fixtures/**/*'],
                tasks: ['includereplace']
            }
        },

        // Replace variables in files
        includereplace: {
            your_target: {
                options: {
                    globals: {
                        site_name: "SITE NAME",
                        site_domain: "mydomain.com",
                        site_url: "http://mydomain.com",
                        site_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                        site_keywords: "foo,bar,baz,qux",
                        site_logo_url: "http://mydomain.com/images/logo.jpg"
                    },
                },
                src: ['*.html', 'sitemap.xml', 'robots.txt'],
                dest: 'dist/'
            }
        }
    });

    // Load the plugin that provides the "less" task.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-include-replace');

    grunt.registerTask('default', [
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'less',
        'cssmin',
        'uglify',
        'copy:site',
        'copy:fonts',
        'includereplace'
    ]);
};
