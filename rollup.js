const fs        = require('fs');
const rollup        = require('rollup').rollup;
const babel         = require('rollup-plugin-babel');
const replace       = require('rollup-plugin-replace');
const pkg           = require('./package');

var banner_str = (
  '/*!\n' +
  ' * JSLite JavaScript Library v' + pkg.version + '\n' + 
  ' * http://JSLite.io\n *\n' + '' +
    String(fs.readFileSync('./MIT-LICENSE')).trim().split('\n')
    .map( (l,u) => u==0?` * ${l}`:``).join('') +
  '\n * Date:' + new Date() +
  '\n */\n'
);

rollup({
  entry: 'src/JSLite.js',
  moduleName:"JSLite",
  plugins: [
    babel({
        exclude: 'node_modules/**/*',
        // //externalHelpers 不包含到我打包的JS里面去
        // externalHelpers: true,
    }),
    replace({
        delimiters: [ '<@','@>' ],
        values: {
            VERSION: pkg.version
        }
    })
  ]
}).then( bundle => {
    bundle.write({ 
        dest: 'dist/JSLite.js', 
        format: 'umd',
        banner: banner_str
    })   
} ).catch(function(err){
    console.log(err);
});


    // return rollup({
    //     entry: 'src/JSLite.js',
    //     plugins: [
    //         babel({
    //             exclude: 'node_modules/**/*',
    //             // //externalHelpers 不包含到我打包的JS里面去
    //             // externalHelpers: true,
    //         }),
    //         uglify(),
    //         replace({
    //             delimiters: [ '<@','@>' ],
    //             values: {
    //                 VERSION: pkg.version
    //             }
    //         })
    //     ]
    // }).then( (bundle) => {
    //     // 输出 bundle + sourcemap
    //     var result = bundle.generate({
    //         // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
    //         // amd – 使用像requirejs一样的银木块定义
    //         // cjs – CommonJS，适用于node和browserify / Webpack
    //         // es6 (default) – 保持ES6的格式
    //         // iife – 使用于<script> 标签引用的方式
    //         // umd – 适用于CommonJs和AMD风格通用模式
    //         format: 'umd',
    //         moduleName:"JSLite",
    //         // useStrict: true,
    //         banner: banner_min_str
    //     });
        
    //     fs.writeFileSync( 'dist/JSLite.min.js', banner_min_str + result.code );

    // });