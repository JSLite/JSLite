// 包装函数
module.exports = function(grunt) {

    var clc = require('cli-color');

    //要合并的模块
    var env = process.env['MODULES']
    var polyfill = env.indexOf('polyfill') > -1 ? true : false;
    var modules = (process.env['MODULES'] ? 
        'start'+ (polyfill? ' polyfill' : '') + ' function JSLite ' + (polyfill? env.replace('polyfill','') : '') + ' end' : 
        'start polyfill function JSLite form event ajax end').replace('  ',' ').split(' ');

    //输出要合并的所有文件的路径 返回数组
    var module_files = (function() {
        var _i, _len, _results = [];
        for (_i = 0, _len = modules.length; _i < _len; _i++) {
          module = modules[_i];
          _results.push("src/" + module + ".js");
        }
        return _results;
    })();

    // 任务配置,所有插件的配置信息
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //删除文件
        clean: {
            build: {
                files: [{
                    src: ['build/*']
                }]
            },
            dist:['dist/*']
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
            build: {
                src: module_files,
                dest: 'build/JSLite.js'
            },
            dist:{
                src: module_files,
                dest: 'dist/JSLite.js'
            }
        },
        dist: {
            default_options: {
                files: {
                    "dist":['dist/JSLite.js']
                }
            }
        },
        // uglify插件的配置信息
        uglify: {
            //输出JSLite.min
            build: {
                options: {
                    preserveComments: 'some'
                },
                files: {
                    'build/JSLite.min.js': ['<%= concat.build.dest %>']
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
    grunt.registerTask('default', ['clean:build', 'concat:build', 'uglify:build']);

    grunt.registerTask('dist_task', ['clean:dist', 'concat:dist', 'dist']);

    grunt.registerTask('make', '选择合并JSLite模块',function(){
        grunt.log.writeln(clc.xterm(46)("\n合并的js模块：\n"));
        grunt.log.writeln(" " + module_files.join('\n ') + '\n');
        grunt.task.run('dist_task');
    });
};
