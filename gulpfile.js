var gulp = require('gulp');
var watch = require('gulp-watch');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sourcemap = require('gulp-sourcemap');
var umd = require('gulp-umd')

var clc = require('cli-color');

//要合并的模块
var env = process.env['MODULES']
var polyfill = env && env.indexOf('polyfill') > -1 ? true : false;
var modules = (process.env['MODULES'] ? 
    (polyfill? ' polyfill' : '') + ' function JSLite ' + (polyfill? env.replace('polyfill','') : '') : 
    'polyfill function JSLite form event ajax').replace('  ',' ').split(' ');

//输出要合并的所有文件的路径 返回数组
var module_files = (function() {
    var _i, _len, _results = [];
    for (_i = 0, _len = modules.length; _i < _len; _i++) {
      module = modules[_i];
      _results.push("src/" + module + ".js");
    }
    return _results;
})();

gulp.task('default',["build"])

// 侦听文件改变执行任务
gulp.task('watch', function (cb) {
    gulp.watch('src/**/*.js', ['default']);
});

// 侦听文件改变执行任务
gulp.task('build', function (cb) {

    // 生成 JSLite.min.js
    gulp.src(module_files)
        .on('error',gutil.log)
        .pipe(concat('JSLite.js'))
        .pipe(uglify({
            mangle: false,
            output:{
                // comments:true
            }
        }))
        .pipe(rename({
            suffix:".min"
        }))
        .pipe(umd({
            exports: function(file) {
                return 'JSLite';
            },
            namespace: function(file) {
                return 'JSLite';
            }
        }))
        .pipe(gulp.dest('./dist/'));

    // 生成 JSLite.js
    gulp.src(module_files)
        .on('error',gutil.log)
        .pipe(concat('JSLite.js'))
        .pipe(uglify({
            mangle: false,
            output: {
                beautify: true
            },
            compress: {
                "hoist_funs": false,
                loops: false,
                unused: false
            }
        }))
        .pipe(umd({
            dependencies: function(file) {
                return ['JSLite'];
            },
            exports: function(file) {
                return 'JSLite';
            },
            namespace: function(file) {
                return 'JSLite';
            }
        }))
        .pipe(gulp.dest('./dist/'));



});

gulp.task('map', function (cb) {
    // 生成 JSLite.min.map
    gulp.src(['dist/JSLite.js'])
        .pipe(sourcemap({
            outSourceMap:'JSLite.min.map',
            sourceRoot:"http://jslite.io",
            write:'./dist/',
            beautify: {
                "ascii_only": true
            }
        }))
        .pipe(gulp.dest('./dist/'));

})
