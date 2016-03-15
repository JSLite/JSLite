var gulp        = require('gulp');
var fs          = require('fs');
var rollup      = require('rollup').rollup;
var commonjs    = require('rollup-plugin-commonjs');
var replace     = require('rollup-plugin-replace');
var babel       = require('rollup-plugin-babel');
var uglify      = require('rollup-plugin-uglify');
var package     = require('./package.json');


gulp.task('default',['script','minjs']);
gulp.task('watch',function(){
    gulp.watch('src/**/*',['default'])
})

var banner_str = (
  '/*!\n' +
  ' * JSLite JavaScript Library v' + package.version + '\n' + 
  ' * http://JSLite.io\n *\n' + '' +
  String(fs.readFileSync('./MIT-LICENSE')).trim().split('\n')
    .map( (l,u) => u==0?` * ${l}`:``).join('') +
  '\n * Date:' + new Date() +
  '\n */'
);

var banner_min_str = (
  '/*! JSLite JavaScript Library v' + package.version + 
  ' http://JSLite.io ' +
  ' Date:' + new Date() +
  ' */'
);

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
            banner: banner_str
        });
    });
});

gulp.task('minjs', function () {
    return rollup({
            entry: 'src/JSLite.js',
            plugins: [
                commonjs(),
                babel({
                    exclude: 'node_modules/**/*',
                    // //externalHelpers 不包含到我打包的JS里面去
                    externalHelpers: true,
                }),
                uglify(),
                replace({
                    delimiters: [ '<@','@>' ],
                    values: {
                        VERSION: package.version
                    }
                })
            ]
    }).then(function (bundle) {
        // 输出 bundle + sourcemap
        var result = bundle.generate({
            // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
            // amd – 使用像requirejs一样的银木块定义
            // cjs – CommonJS，适用于node和browserify / Webpack
            // es6 (default) – 保持ES6的格式
            // iife – 使用于<script> 标签引用的方式
            // umd – 适用于CommonJs和AMD风格通用模式
            format: 'umd',
            moduleName:"JSLite",
            useStrict: true,
            banner: banner_str
        });
        
        fs.writeFileSync( 'dist/JSLite.min.js', banner_min_str + result.code );

    });
});