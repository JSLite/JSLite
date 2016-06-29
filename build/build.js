var fs        = require('fs');
var rollup        = require('rollup').rollup;
var babel         = require('rollup-plugin-babel');
var replace       = require('rollup-plugin-replace');
var uglify        = require('uglify-js')
var banner        = require('bannerjs');
var pkg           = require('../package');
// var zlib          = require('zlib');

// var main = fs
//   .readFileSync('src/global/var.js', 'utf-8')
//   // .replace(/Vue\.version = '[\d\.]+'/, "Vue.version = '" + version + "'")
//   .replace(/let\ version\ \=\"'[\d\.]+'/, 'let version ="'+pkg.version+'";')
// fs.writeFileSync('src/global/var.js', main)

var rollup_option = {
  entry: 'src/JSLite.js',
  moduleName:"JSLite",
  plugins: [
    babel({
        exclude: 'node_modules/**/*',
        // //externalHelpers 不包含到我打包的JS里面去
        // externalHelpers: true,
        // loose: 'all'
        // plugins: ['external-helpers-2'],
        externalHelpers: true
    }),
    replace({
        delimiters: [ '<@','@>' ],
        values: {
            VERSION: pkg.version
        }
    })
  ]
}

rollup(rollup_option).then( bundle => {
  // console.log("test",bundle);
    return write('dist/JSLite.js', bundle.generate({
      // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
      // amd – 使用像requirejs一样的银木块定义
      // cjs – CommonJS，适用于node和browserify / Webpack
      // es6 (default) – 保持ES6的格式
      // iife – 使用于<script> 标签引用的方式
      // umd – 适用于CommonJs和AMD风格通用模式
      format: 'umd',
      moduleName: 'JSLite',
      banner: banner.multibanner()
    }).code)
 
}).then( bundle =>{


  return rollup(rollup_option).then(bundle=>{
    var code = bundle.generate({
      dest: 'dist/JSLite.js', 
      format: 'umd',
      moduleName: 'JSLite'
    }).code
    var minified = banner.onebanner() + '\n' + uglify.minify(code, {
      fromString: true,
      output: {
        ascii_only: true
      }
    }).code
    return write('dist/JSLite.min.js', minified)
  }).then(zip)

}).catch(function(err){
    console.log(err);
});


function write (dest, code) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(blue(dest) + ' ' + getSize(code))
      resolve()
    })
  })
}

function zip () {
  return new Promise(function (resolve, reject) {
    fs.readFile('dist/JSLite.min.js', function (err, buf) {
      if (err) return reject(err)
      // zlib.gzip(buf, function (err, buf) {
      //   if (err) return reject(err)
      //   write('dist/JSLite.min.js.gz', buf).then(resolve)
      // })
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e)
}