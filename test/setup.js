/*
 * store original global keys
 */

var blacklist = Object.keys(global)
blacklist.push('constructor')


var defaults = {
    globalize: true,
    console: true,
    useEach: false,
    html: '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>'
}

var extend =function(des, src, override){
    if(src instanceof Array){
        for(var i = 0, len = src.length; i < len; i++)
        extend(des, src[i], override);
    }
    for( var i in src){
        if(override || !(i in des)){
            des[i] = src[i];
        }
    } 
    return des;
}


module.exports = function(_options){

    var options = extend(extend({}, defaults), _options)
    var before = options.useEach ? global.beforeEach : global.before
    var keys = []


    global.expect = require('chai').expect


    before(function (next) {

        require('jsdom').env(extend(extend({}, options), { done: done }))

        function done (errors, window) {
            if (options.globalize) {
                propagateToGlobal(window)
            } else {
                global.window = window
            }

            if (options.console) {
                window.console = global.console
            }

            if (errors) {
                return next(getError(errors))
            }

            next(null)
        }
    })



    /*
    * propagate keys from `window` to `global`
    */

    function propagateToGlobal (window) {
        for (var key in window) {
            if (!window.hasOwnProperty(key)) continue
            if (~blacklist.indexOf(key)) continue
            if (key in global) {
                if (process.env.JSDOM_VERBOSE) {
                    console.warn("[jsdom] Warning: skipping cleanup of global['" + key + "']")
                }
                continue
            }

            keys.push(key)
            global[key] = window[key]
        }
    }
}

module.exports.rerequire = rerequire

/**
 * Requires a module via `require()`, but invalidates the cache so it may be
 * called again in the future. Useful for `mocha --watch`.
 *
 *     var rerequire = require('setup').rerequire
 *     var $ = rerequire('JSLite')
 */

function rerequire (module) {
    if (module[0] === '.') {
        module = Path.join(Path.dirname(getCaller()), module)
    }

    var oldkeys = Object.keys(require.cache)
    var result = require(module)
    var newkeys = Object.keys(require.cache)
    newkeys.forEach(function (newkey) {
        if (!~oldkeys.indexOf(newkey)) {
            delete require.cache[newkey]
        }
    })
    return result
}
/**
 * Internal: gets the filename of the caller function. The `offset` defines how
 * many hops away it's expected to be from in the stack trace.
 *
 * See: http://stackoverflow.com/questions/16697791/nodejs-get-filename-of-caller-function
 */

function getCaller (offset) {
    /* eslint-disable handle-callback-err */
    if (typeof offset !== 'number') offset = 1
    var old = Error.prepareStackTrace
    var err = new Error()
    Error.prepareStackTrace = function (err, stack) { return stack }
    var fname = err.stack[1 + offset].getFileName()
    Error.prepareStackTrace = old
    return fname
}
