/**
* Convert data-attr into key
* data-foo-bar -> fooBar
* @param {String} val
* @returns {String}
*/
var _attrToDataKey = function( val ){
        var out = val.substr( 5 );
        return out.split( "-" ).map(function( part, inx ){
        if ( !inx ) {
            return part;
        }
        return part.charAt( 0 ).toUpperCase() + part.substr( 1 );
    }).join( "" );
},
_datasetProxy = null,
/**
* Produce dataset object emulating behavior of el.dataset
* @param {Element} el
* @returns {Object}
*/
_getNodeDataAttrs = function( el ){
    var i = 0,
    atts = el.attributes,
    len = atts.length,
    attr,
    _datasetMap = [],
    // represents el.dataset
    proxy = {},
    datakey;
    for ( ; i < len; i++ ){
        attr = atts[ i ].nodeName;
        if ( attr.indexOf( "data-" ) === 0 ) {
            datakey = _attrToDataKey( attr );
            if ( typeof _datasetMap[ datakey ] !== "undefined" ) {
                break;
            }
            _datasetMap[ datakey ] = atts[ i ].nodeValue;
            (function( datakey ){
                // every data-attr found on the element makes a getter and setter
                Object.defineProperty( proxy, datakey, {
                    enumerable: true,
                    configurable: true,
                    get: function() {
                        return  _datasetMap[ datakey ];
                    },
                    set: function ( val ) {
                        _datasetMap[ datakey ] = val;
                        el.setAttribute( attr, val );
                    }
                });
            }( datakey ));
        }
    }
    return proxy;
};

Object.defineProperty( global.window.Element.prototype, "dataset", {
    get: function() {
        _datasetProxy = _datasetProxy || _getNodeDataAttrs( this );
        return _datasetProxy;
    }
});