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
            useStrict: true,
            banner: (
              '/*!\n' +
              ' * JSLite JavaScript Library v' + package.version + '\n' + 
              ' * http://JSLite.io\n *\n' + '' +
              String(fs.readFileSync('./MIT-LICENSE')).trim().split('\n')
                .map( (l,u) => u==0?` * ${l}`:``).join('') +
              '\n * Date:' + new Date() +
              '\n */'
            )
        });
    });
});