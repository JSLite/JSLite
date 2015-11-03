/** 
@Js-name:touch.js
@Zh-name:触摸tap事件函数
@Author:chen guojun
@Date:2015-07-10
*/
(function(win, $, undefined) {
    win.tapHand = false;
	//对tap事件用于解除由on()函数绑定的事件处理
    var untap = function(els) {
        return els.off(".tap");
    };
	//开始定义tap事件
    var tap = function(els) {
        return els.each(function() {
            var el = $(this), resetTimer, startY, startX, cancel, scrollTolerance = 10;
			//对tap事件进行触发
            function trigger(e) {
                $(e.target).trigger("tap", [ e, $(e.target).attr("href") ]);
                e.stopPropagation();
            }
			//获取手指点击滑动的坐标
            function getCoords(e) {
                var ev = e.originalEvent || e, touches = ev.touches || ev.targetTouches;
				//检查是否支持touches事件，如果支持并进行左右滑动触屏事件的监听
                if (touches) {
                    return [ touches[0].pageX, touches[0].pageY ];
                } else {
                    return null;
                }
            }
            function start(e) {
				//检查是否支持touches
                if (e.touches && e.touches.length > 1 || e.targetTouches && e.targetTouches.length > 1) {
                    return false;
                }
                var coords = getCoords(e);
				//获取开始触屏事件属性的坐标
                startX = coords[0];
                startY = coords[1];
            }
            function move(e) {
                if (!cancel) {
                    var coords = getCoords(e);
                    if (coords && (Math.abs(startY - coords[1]) > scrollTolerance || Math.abs(startX - coords[0]) > scrollTolerance)) {
                        cancel = true;
                    }
                }
            }
            function end(e) {
				//设置并清除延迟的事件
                clearTimeout(resetTimer);
                resetTimer = setTimeout(function() {
                    win.tapHand = false;
                    cancel = false;
                }, 1e3);
                if (e.which && e.which > 1 || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey) {
                    return;
                }
				//取消事件的默认动作
                e.preventDefault();
                if (cancel || win.tapHand && win.tapHand !== e.type) {
                    cancel = false;
                    return;
                }
                win.tapHand = e.type;
                trigger(e);
            }
			var touchTap = {
				Start:"touchstart.tap MSPointerDown.tap",
				Move:"touchmove.tap MSPointerMove.tap",
				End:"touchend.tap MSPointerUp.tap"				
			}
			//对tap进行绑定
            el.bind(touchTap.Start, start).bind(touchTap.Move, move).bind(touchTap.End, end).bind("click.tap", end);
        });
    };
	//检查特殊的tap事件
    if ($.event && $.event.special) {
        $.event.special.tap = {
            add:function(handleObj) {
                tap($(this));
            },
            remove:function(handleObj) {
                untap($(this));
            }
        };
    } else {
        var oldOn = $.fn.on, oldOff = $.fn.off;
		//对tap事件进行正则验证，实现绑定和解除
		$.fn.extend({
			on:function(evt) {
				if (/(^| )tap( |$)/.test(evt)) {
					untap(this);
					tap(this);
				}
				return oldOn.apply(this, arguments);
			},
			off:function(evt) {
				if (/(^| )tap( |$)/.test(evt)) {
					untap(this);
				}
				return oldOff.apply(this, arguments);
			}
		})
    }
	//最终实现tap事件
    $.fn.tap = function(callback) {
        this.on("tap", callback);
    };
})(this, JSLite);
