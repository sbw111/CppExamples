/**
 * User: luckystar
 * Date: 13-8-31
 * Time: 下午10:41
 */

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        less: {
            compile: {
                options: {
                    yuicompress: true
                },
                files: {
                    "stylesheets/*.css": "src/less/*.less"
                }
            }
        },
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: {
                    "index.html": ["src/jade/index.jade"],
                    "slides/chap1_HelloWorld.html": ["src/jade/slides/chap1_HelloWorld.jade"],
                    "slides/chap2_DataStructure.html": ["src/jade/slides/chap2_DataStructure.jade"]
                }
            }
        },
        imagemin: {                          // Task
            dynamic: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'src/img',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'slides/img'                  // Destination path prefix
                }]
            }
        },
        watch: {
            less: {
                files: ["src/less/**/*.less"],
                tasks: ["less:compile"]
            },
            jade: {
                files: ["src/jade/**/*.jade"],
                tasks: ["jade:compile"]
            },
            imagemin: {
                files: ["src/img/**/*.{png,jpg,gif}"],
                tasks: ["imagemin:dynamic"]
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-jade");
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks("grunt-contrib-watch");

    return grunt.registerTask("default", ["less:compile", "jade:compile"]);
};
