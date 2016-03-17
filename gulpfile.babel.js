const gulp        = require('gulp');
const rollup      = require('gulp-rollup')
const uglify      = require('gulp-uglify');
const rename      = require('gulp-rename');
const header      = require('gulp-header');
const sourcemap   = require('gulp-sourcemap');
const gutil       = require('gulp-util');
const babel       = require('rollup-plugin-babel');
const replace     = require('rollup-plugin-replace');
const fs          = require('fs');
const pkg         = require('./package.json');

gulp.task('default',['script']);
gulp.task('watch', ()=> {
    gulp.watch('src/**/*',['default'])
})

var banner_str = (
  '/*!\n' +
  ' * JSLite JavaScript Library v' + pkg.version + '\n' + 
  ' * http://JSLite.io\n *\n' + '' +
    String(fs.readFileSync('./MIT-LICENSE')).trim().split('\n')
    .map( (l,u) => u==0?` * ${l}`:``).join('') +
  '\n * Date:' + new Date() +
  '\n */\n'
);

var banner_min_str = (
  '/*! JSLite JavaScript Library v' + pkg.version + 
  ' http://JSLite.io ' +
  ' Date:' + new Date() +
  ' */\n'
);


gulp.task('script', () => {
    gulp.src('src/JSLite.js')
      .pipe(rollup({
          // any option supported by rollup can be set here, including sourceMap
          sourceMap: true,
          format: 'umd',
          plugins:[
            babel({
                exclude: 'node_modules/**/*',
                // //externalHelpers 不包含到我打包的JS里面去
                // externalHelpers: true,
                // http://babeljs.io/docs/plugins/transform-es3-property-literals/
                // 暂时好像搞不定 
                // "plugins": ["transform-es3-property-literals"]
            }),
            replace({
                delimiters: [ '<@','@>' ],
                values: {
                    VERSION: pkg.version
                }
            })
          ]
      }).on('error',gutil.log))
      // babel 一些奇怪的转化方式，需要通过 uglify 再转换一下
      .pipe(uglify({
        mangle:false,
        preserveComments: 'all',
        compress:{
            // 参数设置在这里
            // http://lisperator.net/uglifyjs/compress
            sequences     : false,  // join consecutive statemets with the “comma operator”
            properties    : false,  // optimize property access: a["foo"] → a.foo
            dead_code     : false,  // discard unreachable code
            drop_debugger : false,  // discard “debugger” statements
            unsafe        : false,      // some unsafe optimizations (see below)
            conditionals  : false,  // optimize if-s and conditional expressions - 优化if-else
            comparisons   : false,  // optimize comparisons
            evaluate      : false,  // evaluate constant expressions
            booleans      : false,  // optimize boolean expressions
            loops         : false,  // optimize loops
            unused        : true,  // drop unused variables/functions
            hoist_funs    : false,  // hoist function declarations
            hoist_vars    : false, // hoist variable declarations
            if_return     : false,  // optimize if-s followed by return/continue
            join_vars     : false,  // join var declarations
            cascade       : false,  // try to cascade `right` into `left` in sequences
            side_effects  : false,  // drop side-effect-free statements
            warnings      : true,  // warn about potentially dangerous optimizations/code
            // global_defs   : { "JSLite": true }     // global definitions
        },
        output: { 
            beautify: true 
        }
      }).on('error',gutil.log))
      .pipe(header(banner_str))
      .pipe(gulp.dest('dist'))
      .pipe(uglify({
        mangle: true
      }).on('error',gutil.log))
      .pipe(rename({
        extname: ".min.js"
      }))
      .pipe(header(banner_min_str))
      .pipe(gulp.dest("dist"))
      .pipe(sourcemap({
          outSourceMap:'JSLite.js.map',
          sourceRoot:"http://jslite.io",
          write:'./dist/'
      }).on('error',gutil.log))
});



// gulp.task('minjs', () => {
//     return rollup({
//         entry: 'src/JSLite.js',
//         plugins: [
//             babel({
//                 exclude: 'node_modules/**/*',
//                 // //externalHelpers 不包含到我打包的JS里面去
//                 // externalHelpers: true,
//             }),
//             uglify(),
//             replace({
//                 delimiters: [ '<@','@>' ],
//                 values: {
//                     VERSION: pkg.version
//                 }
//             })
//         ]
//     }).then( (bundle) => {
//         // 输出 bundle + sourcemap
//         var result = bundle.generate({
//             // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
//             // amd – 使用像requirejs一样的银木块定义
//             // cjs – CommonJS，适用于node和browserify / Webpack
//             // es6 (default) – 保持ES6的格式
//             // iife – 使用于<script> 标签引用的方式
//             // umd – 适用于CommonJs和AMD风格通用模式
//             format: 'umd',
//             moduleName:"JSLite",
//             // useStrict: true,
//             banner: banner_min_str
//         });
        
//         fs.writeFileSync( 'dist/JSLite.min.js', banner_min_str + result.code );

//     });
// });