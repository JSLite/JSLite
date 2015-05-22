;(function($){
    var jsonpID = 0
    function parseArguments(url, data, success, dataType){
        $.isFunction(data) && (dataType = success, success = data, data = undefined),
        $.isFunction(success) || (dataType = success, success = undefined)
        return {
            url: url, 
            data: data, 
            success: success, 
            dataType: dataType
        }
    }
    $.extend({
        ajaxSettings:{
            // 默认请求类型
            type:'GET',
            // 如果请求成功时执行回调
            success:function(){},
            // 如果请求失败时执行回调
            error:function(){},
            xhr:function () {
              return new window.XMLHttpRequest();
            },
            processData:true,
            async:true,
            complete:function(){},//要求执行回调完整（包括：错误和成功）
            // MIME类型的映射
            accepts:{
                script:'text/javascript, application/javascript',
                json:  'application/json',
                xml:   'application/xml, text/xml',
                html:  'text/html',
                text:  'text/plain'
            },
            // 应该被允许缓存GET响应
            cache: true
        },
        param:function(obj,traditional,scope){
            if($.type(obj) == "String") return obj;
            var params = [],str='';
            params.add=function(key, value){
                this.push(encodeURIComponent(key) + '=' + encodeURIComponent(value== null?"":value))
            };
            if(scope==true&&$.type(obj)=='Object') params.add(traditional,obj)
            else {
                for(var p in obj) {
                    var v = obj[p],str='',
                        k = (function(){
                            if (traditional) {
                                if (traditional==true) return p;
                                else{
                                    if(scope&&$.type(obj)=='Array'){
                                        return traditional
                                    }
                                    return traditional + "[" + ($.type(obj)=='Array'?"":p) + "]";
                                };
                            };
                            return p
                        })();
                    if (typeof v=="object") {
                        str=this.param(v, k ,traditional);
                    }else str=params.add(k,v);

                    if (str) params.push(str);
                };
            }
            return params.join('&');
        },
        get:function(url, success){return $.ajax(parseArguments.apply(null, arguments))},
        post:function(url, data, success, dataType){
            var options = parseArguments.apply(null, arguments);
            return options.type = "POST", $.ajax(options);
        },
        getJSON:function(/* url, data, success */){
            var options = parseArguments.apply(null, arguments),
                url = arguments[0];
            if(url&&url == document.location.host) options.dataType = 'json';
            else options.dataType = 'jsonp';
            return this.ajax(options);
        },
        ajaxJSONP:function (options) {
            var _callbackName = options.jsonpCallback,
            callbackName = ($.isFunction(_callbackName) ? _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
            script = document.createElement('script'),
            originalCallback = window[callbackName],
            responseData,xhr={};

            $(script).on('load error', function(e, errorType){
                $(script).off().remove()
                if (e.type == 'error' || !responseData) {
                    options.error(e, errorType || 'error',options)
                } else {
                    options.success(responseData[0], xhr, options)
                }
                window[callbackName] = originalCallback
                if (responseData && $.isFunction(originalCallback))
                originalCallback(responseData[0])
                originalCallback = responseData = undefined
            })

            //插入script 获取返回的数据
            window[callbackName] = function(){responseData = arguments}
            script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
            document.head.appendChild(script)
            return options.xhr()
        },
        ajax:function(options){
            var key,settings,
                setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
                appendQuery = function(url, query) {
                    if (query == '') return url
                    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
                },
                serializeData = function(options){
                    if (options.processData && options.data && $.type(options.data) != "string")
                        options.data = $.param(options.data, options.traditional)
                    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
                        options.url = appendQuery(options.url, options.data), options.data = undefined
                };
                options = options || {};
                if ($.isString(options)) {
                    if (arguments[0]=="GET") {
                        var  urls=arguments[1];
                        if (arguments[2]&&$.isFunction(arguments[2])) {
                            $.get(urls,arguments[2])
                        }else if(arguments[2]&&$.isJson(arguments[2])){
                            $.get(urls.indexOf('?')>-1?urls+'&'+this.param(arguments[2]):urls+'?'+this.param(arguments[2]),arguments[3])
                        };
                    }else if(arguments[0]=="POST"){
                        $.post(arguments[1],arguments[2],arguments[3],arguments[4])
                    };
                    return;
                };
                settings=$.extend({}, options || {});
                for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key];
                //{ type, url, data, success, dataType, contentType }
            serializeData(settings)

            //jsonp
            var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
            if (hasPlaceholder) dataType = 'jsonp';
            //给URL后面加上时间戳
            if (settings.cache === false || (
                (!options || options.cache !== true) &&
                ('script' == dataType || 'jsonp' == dataType)
            )) {
                settings.url = appendQuery(settings.url, '_=' + Date.now())
            }
            //判断是否为jsonp
            if ('jsonp' == dataType) {
                if (!hasPlaceholder) settings.url = appendQuery(settings.url,settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
                return $.ajaxJSONP(settings)
            }

            var data = settings.data,
                callback = settings.success || function(){},
                errback = settings.error || function(){},
                mime = $.ajaxSettings.accepts[settings.dataType],
                content = settings.contentType,
                xhr = new XMLHttpRequest(),
                nativeSetHeader = xhr.setRequestHeader,
                headers={};
                if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest'),setHeader('Accept', mime || '*/*');
                if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name]);
                if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
                    setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function(){
                if (xhr.readyState == 4) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 0) {
                        if (mime == 'application/json'&&!(/^\s*$/.test(xhr.responseText))) {
                            var result, error = false;
                                result = xhr.responseText
                            try {
                                if (settings.dataType == 'script')    (1,eval)(result)
                                else if (settings.dataType == 'xml')  result = xhr.responseXML
                                else if (settings.dataType == 'json') result = /^\s*$/.test(result) ? null : JSON.parse(result)
                            } catch (e) { error = e }

                            if (error) errback(error, 'parsererror', xhr, settings);
                            else callback(result, 'success', xhr);
                        } else {
                            callback(xhr.responseText, 'success', xhr)
                        };
                    } else {
                        settings.complete(xhr, error ? 'error' : 'success')
                    }
                }
            };
            if (data&&data instanceof Object&&settings.type=='GET'){
                data?settings.url =(settings.url.indexOf('?')>-1?settings.url +'&'+ data:settings.url +'?'+ data) :null;
            }
            xhr.open(settings.type, settings.url, true);
            if (mime) xhr.setRequestHeader('Accept', mime);
            if (data instanceof Object && mime == 'application/json' ) data = JSON.stringify(data), content = content || 'application/json';
            for (name in headers) nativeSetHeader.apply(xhr, headers[name]);

            xhr.send(data?data:null);
        }
    });
    $.fn.extend({
        load:function (/*url, data, success*/) {
            if (!this.length || arguments.length === 0) return this
            var self = this, parts = arguments[0].split(/\s/), selector,
                options = parseArguments.apply(null, arguments)
                callback = options.success
            if (parts.length > 1){
                options.url = parts[0], selector = parts[1]
            }
            options.success = function(response){
                response = response.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,'')
                self.html(selector ? $('<div>').html(response).find(selector) : response)
                callback && callback.apply(self, arguments)
            }
            $.ajax(options)
            return this
        }
    });
})(JSLite);