var gulp        = require('gulp');
var fs          = require('fs');
var rollup      = require('rollup').rollup;
var commonjs    = require('rollup-plugin-commonjs');
var replace     = require('rollup-plugin-replace');
var babel       = require('rollup-plugin-babel');
var package     = require('./package.json');

gulp.task('default',['script']);
gulp.task('watch',function(){
    gulp.watch('src/**/*',['script'])
})

gulp.task('script', function () {
    return rollup({
        entry: 'src/JSLite.js',
        plugins: [
            commonjs(),
            babel({
                exclude: 'node_modules/**/*',
                // //externalHelpers 不包含到我打包的JS里面去
                externalHelpers: true,
            }),
            replace({
                delimiters: [ '<@','@>' ],
                values: {
                    VERSION: package.version
                }
            })
        ]
    }).then(function (bundle) {

        bundle.write({
            format: 'umd',
            moduleName:"JSLite",
            sourceMap: true,
            dest: 'dist/JSLite.js',
            useStrict: true
        });
    });
});