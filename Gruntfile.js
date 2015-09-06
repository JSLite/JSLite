// 包装函数
module.exports = function(grunt) {
    // 任务配置,所有插件的配置信息
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //删除文件
        clean: {
            js: {
                files: [{
                    src: ['build/*']
                }]
            }
        },
        //合并代码
        concat: {
            options: {
                banner: '/*!\n' +
                '* JSLite v<%= pkg.version %> (http://JSLite.io)\n' +
                '* Licensed under MIT (https://github.com/JSLite/JSLite/blob/master/MIT-LICENSE)\n' +
                '* build time <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '*/\n'
            },
            js: {
                src: [
                    'src/start.js',
                    'src/polyfill.js',
                    'src/var.js',
                    'src/function.js',
                    'src/JSLite.js',
                    'src/traversing.js',
                    'src/manipulation.js',
                    'src/attribute.js',
                    'src/css.js',
                    'src/effect.js',
                    'src/dimensions.js',
                    'src/form.js',
                    'src/event.js',
                    'src/ajax.js',
                    'src/end.js'
                ],
                dest: 'dist/JSLite.js'
            }
        },
        // uglify插件的配置信息
        uglify: {
            //输出JSLite.min
            all: {
                options: {
                    preserveComments: 'some'
                },
                files: {
                    'dist/JSLite.min.js': ['<%= concat.js.dest %>']
                }
            },
            //JSLite map
            js_map: {
                files: {
                    "dist/JSLite.min.js": [ "dist/JSLite.js" ]
                },
                options: {
                    preserveComments: false,
                    sourceMap: true,
                    sourceMapName: "dist/JSLite.min.map",
                    report: "min",
                    beautify: {
                        "ascii_only": true
                    },
                    banner: "/*! JSLite v<%= pkg.version %> | " +
                        "Licensed under MIT (https://github.com/JSLite/JSLite/blob/master/MIT-LICENSE) */",
                    compress: {
                        "hoist_funs": false,
                        loops: false,
                        unused: false
                    }
                }
            }
        },
        // watch插件的配置信息
        watch: {
            js: {
                files: ['src/*.js'],
                tasks: ['default']
            }
        }
    });

    // 任务加载
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });

    // 告诉grunt当我们在终端中输入grunt时需要做些什么
    grunt.registerTask('default', ['clean', 'concat', 'uglify:all']);

    

};
