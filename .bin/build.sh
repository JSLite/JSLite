#!/bin/bash

set -o errexit # Exit on error

node rollup.js
node_modules/uglify-js/bin/uglifyjs dist/JSLite.js -o dist/JSLite.js -b beautify=true --comments 'all' -c sequences=false,properties=false,dead_code=false,drop_debugger=false,unsafe=false,conditionals=false,comparisons=false,evaluate=false,booleans=false,loops=false,unused=true,hoist_funs=false,hoist_vars=false,if_return=false,join_vars=false,cascade=false,side_effects=false,warnings=true | node_modules/uglify-js/bin/uglifyjs dist/JSLite.js -mc > dist/JSLite.min.js