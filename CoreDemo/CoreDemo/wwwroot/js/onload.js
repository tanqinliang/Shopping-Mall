/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.16
 * 描 述：通讯平台	
 */
var bootstrap = function ($, vso) {
    "use strict";

    // 菜单操作
    var meuns = {
        init: function () {
            this.load();
            this.bind();
        },
        load: function () {
            var modulesTree = vso.clientdata.get(['modulesTree']);
            // 第一级菜单
            var parentId = '0';
            var modules = modulesTree[parentId] || [];
            var $firstmenus = $('<ul class="first-menu-list"></ul>');
            //          var $firstmenus = $('<ul class="first-menu-list"><li title="优惠券管理"><a id="7cbf51d5-640c-41af-b561-9cdd423a2d98" href="javascript:void(0);" class="menu-item"><i class="fa fa-envelope-open-o menu-item-icon"></i><span class="menu-item-text">首页</span><span class="menu-item-arrow"></span></a></li></ul>');
            for (var i = 0, l = modules.length; i < l; i++) {
                var item = modules[i];
                //              if (item.F_IsMenu == 1) {
                var $firstMenuItem = $('<li></li>');
                if (!!item.F_Description) {
                    $firstMenuItem.attr('title', item.F_Description);
                }
                var menuItemHtml = '<a id="' + item.ID + '" href="javascript:void(0);" class="menu-item">';
                menuItemHtml += '<i class="' + item.Icon + ' menu-item-icon"></i>';
                if (!!item.Url) {
                    if (item.Name == '首页') {
                        menuItemHtml += '<i class="firstmenui activemenu"></i>';//移上的背景色
                    } else {
                        menuItemHtml += '<i class="firstmenui"></i>';//移上的背景色
                    }
                }
                menuItemHtml += '<span class="menu-item-text">' + item.Name + '</span>';
                if (!item.Url) {
                    menuItemHtml += '<span class="menu-item-arrow"><i class="fa fa-angle-right"></i></span></a>';
                }
                $firstMenuItem.append(menuItemHtml);
                // 第二级菜单
                var secondModules = modulesTree[item.ID] || [];
                var $secondMenus = $('<ul class="second-menu-list"></ul>');
                var secondMenuHad = false;
                for (var j = 0, sl = secondModules.length; j < sl; j++) {
                    var secondItem = secondModules[j];
                    //                      if (secondItem.F_IsMenu == 1) {
                    secondMenuHad = true;
                    var $secondMenuItem = $('<li></li>');
                    if (!!secondItem.F_Description) {
                        $secondMenuItem.attr('title', secondItem.F_Description);
                    }
                    var secondItemHtml = '<a id="' + secondItem.ID + '" href="javascript:void(0);" class="menu-item" >';
                    secondItemHtml += '<i></i>';//移上的背景色
                    //                          secondItemHtml += '<i class="' + secondItem.Icon + ' menu-item-icon"></i>';
                    secondItemHtml += '<span class="menu-item-text">' + secondItem.Name + '</span>';
                    secondItemHtml += '</a>';

                    $secondMenuItem.append(secondItemHtml);
                    // 第三级菜单
                    var threeModules = modulesTree[secondItem.ID] || [];
                    var $threeMenus = $('<ul class="three-menu-list"></ul>');
                    var threeMenuHad = false;
                    for (var m = 0, tl = threeModules.length; m < tl; m++) {
                        var threeItem = threeModules[m];
                        //                              if (threeItem.F_IsMenu == 1) {
                        threeMenuHad = true;
                        var $threeMenuItem = $('<li></li>');
                        $threeMenuItem.attr('title', threeItem.Name);
                        var threeItemHtml = '<a id="' + threeItem.ID + '" href="javascript:void(0);" class="menu-item" >';
                        //                                  threeItemHtml += '<i class="' + threeItem.Icon + ' menu-item-icon"></i>';
                        threeItemHtml += '<span class="menu-item-text">' + threeItem.Name + '</span>';
                        threeItemHtml += '</a>';
                        $threeMenuItem.append(threeItemHtml);
                        $threeMenus.append($threeMenuItem);
                        //                              }
                    }
                    if (threeMenuHad) {
                        $secondMenuItem.addClass('meun-had');
                        $secondMenuItem.find('a').append('<span class="menu-item-arrow"><i class="fa fa-angle-right"></i></span>');
                        $secondMenuItem.append($threeMenus);
                    }
                    $secondMenus.append($secondMenuItem);
                    //                      }
                }
                if (secondMenuHad) {
                    $firstMenuItem.append($secondMenus);
                }
                $firstmenus.append($firstMenuItem);
                //              }
            }
            $('#frame_menu').html($firstmenus);


            // 语言包翻译
            $('.menu-item-text').each(function () {
                var $this = $(this);
                var text = $this.text();
                vso.language.get(text, function (text) {
                    $this.text(text);
                    $this.parent().parent().attr('title', text);
                });
            });
        },
        bind: function () {
            $("#frame_menu").scroll();

            $('#frame_menu a').hover(function () {
                if ($('body').hasClass('menu-closed')) {
                    var id = $(this).attr('id');
                    var text = $('#' + id + '>span').text();
                    layer.tips(text, $(this));
                }
            }, function () {
                if ($('body').hasClass('menu-closed')) {
                    layer.closeAll('tips');
                }
            });

            // 添加点击事件
            $('#frame_menu a').on('click', function () {
                var $obj = $(this);
                var id = $obj.attr('id');
                var _module = vso.clientdata.get(['modulesMap', id]);
                switch (!!_module.Url) {
                    case true:// 窗口
                        if (vso.validator.isNotNull(_module.Url).code) {
                            vso.frameTab.open(_module);
                        }
                        else {

                        }
                        break;
                    case false:// 打开子菜单
                        var $ul = $obj.next();
                        if ($ul.is(':visible')) {
                            $ul.slideUp(500, function () {
                                $obj.removeClass('open');
                            });
                        }
                        else {
                            if ($ul.hasClass('second-menu-list')) {
                                $('#frame_menu .second-menu-list').slideUp(300, function () {
                                    $(this).prev().removeClass('open');
                                });
                            }
                            else {
                                $ul.parents('.second-menu-list').find('.three-menu-list').slideUp(300, function () {
                                    $(this).prev().removeClass('open');
                                });
                            }
                            $ul.slideDown(300, function () {
                                $obj.addClass('open');
                            });
                        }
                        break;
                }
            });
        }
    };
    meuns.init();
};

$.rootUrl = '/'.substr(0, '/'.length - 1);

/*
 * @Describe: div大小监听事件
 */
(function ($, h, c) {
    var a = $([]),
        e = $.resize = $.extend($.resize, {}),
        i,
        k = "setTimeout",
        j = "resize",
        d = j + "-special-event",
        b = "delay",
        f = "throttleWindow";
    e[b] = 250;
    e[f] = true;
    $.event.special[j] = {
        setup: function () {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.add(l);
            $.data(this, d, {
                w: l.width(),
                h: l.height()
            });
            if (a.length === 1) {
                g();
            }
        },
        teardown: function () {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.not(l);
            l.removeData(d);
            if (!a.length) {
                clearTimeout(i);
            }
        },
        add: function (l) {
            if (!e[f] && this[k]) {
                return false;
            }
            var n;
            function m(s, o, p) {
                var q = $(this),
                    r = $.data(this, d);
                r.w = o !== c ? o : q.width();
                r.h = p !== c ? p : q.height();
                n.apply(this, arguments);
            }
            if ($.isFunction(l)) {
                n = l;
                return m;
            } else {
                n = l.handler;
                l.handler = m;
            }
        }
    };
    function g() {
        i = h[k](function () {
            a.each(function () {
                var n = $(this),
                    m = n.width(),
                    l = n.height(),
                    o = $.data(this, d);
                if (m !== o.w || l !== o.h) {
                    n.trigger(j, [o.w = m, o.h = l]);
                }
            });
            g();
        },
            e[b]);
    }
})(jQuery, this);/*
 * @Describe: 鼠标滚动监听事件
 */
(function ($) {
    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ('onwheel' in document || document.documentMode >= 9) ?
            ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ($.event.fixHooks) {
        for (var i = toFix.length; i;) {
            $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener) {
                for (var i = toBind.length; i;) {
                    this.addEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },
        teardown: function () {
            if (this.removeEventListener) {
                for (var i = toBind.length; i;) {
                    this.removeEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
        },
        getLineHeight: function (elem) {
            return parseInt($(elem)['offsetParent' in $.fn ? 'offsetParent' : 'parent']().css('fontSize'), 10);
        },
        getPageHeight: function (elem) {
            return $(elem).height();
        },
        settings: {
            adjustOldDeltas: true
        }
    };

    $.fn.extend({
        mousewheel: function (fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },
        unmousewheel: function (fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event,
            args = slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ('detail' in orgEvent) { deltaY = orgEvent.detail * -1; }
        if ('wheelDelta' in orgEvent) { deltaY = orgEvent.wheelDelta; }
        if ('wheelDeltaY' in orgEvent) { deltaY = orgEvent.wheelDeltaY; }
        if ('wheelDeltaX' in orgEvent) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ('deltaY' in orgEvent) {
            deltaY = orgEvent.deltaY * -1;
            delta = deltaY;
        }
        if ('deltaX' in orgEvent) {
            deltaX = orgEvent.deltaX;
            if (deltaY === 0) { delta = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if (deltaY === 0 && deltaX === 0) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if (orgEvent.deltaMode === 1) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if (orgEvent.deltaMode === 2) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

        if (!lowestDelta || absDelta < lowestDelta) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
            // Divide all the things by 40!
            delta /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
        deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
        deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }
    function nullLowestDelta() {
        lowestDelta = null;
    }
    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }
})(window.jQuery);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.19
 * 描 述：操作类	
 */
top.vso = (function ($) {
    "use strict";
    var vso = {
        // 是否是调试模式
        isDebug: true,
        log: function () {
            if (vso.isDebug) {
                //console.log('=====>' + new Date().getTime() + '<=====');
                var len = arguments.length;
                for (var i = 0; i < len; i++) {
                    console.log(arguments[i]);
                }
            }
        },
        // 创建一个GUID
        newGuid: function () {
            var guid = "";
            for (var i = 1; i <= 32; i++) {
                var n = Math.floor(Math.random() * 16.0).toString(16);
                guid += n;
                if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) guid += "-";
            }
            return guid;
        },
        // 加载提示
        loading: function (isShow, _text) {//加载动画显示与否
            var $loading = top.$("#loading_bar");
            if (!!_text) {
                top.vso.language.get(_text, function (text) {
                    top.$("#loading_bar_message").html(text);
                });

            } else {
                top.vso.language.get("正在拼了命为您加载…", function (text) {
                    top.$("#loading_bar_message").html(text);
                });
            }
            if (isShow) {
                $loading.show();
            } else {
                $loading.hide();
            }
        },
        // 获取iframe窗口
        iframe: function (Id, _frames) {
            if (_frames[Id] != undefined) {
                if (_frames[Id].contentWindow != undefined) {
                    return _frames[Id].contentWindow;
                }
                else {
                    return _frames[Id];
                }
            }
            else {
                return null;
            }
        },
        // 提示消息栏
        alert: {
            success: function (msg) {
                //          	toastr.success(msg);
                //              top.vso.language.get(msg, function (text) {
                //                  toastr.success(text);
                //              });
                layer.msg(msg, { icon: 1, anim: 5, time: 2000 });

            },
            info: function (msg) {
                top.vso.language.get(msg, function (text) {
                    toastr.info(text);
                });
            },
            warning: function (msg) {
                top.vso.language.get(msg, function (text) {
                    toastr.warning(text);
                });
            },
            error: function (msg) {
                //              top.vso.language.get(msg, function (text) {
                //                  toastr.warning(msg);
                //              });
                layer.msg(msg, { icon: 2, time: 2000 });
            }
        },

        // 调节菜单的状态
        //      adjustMenu: function (){
        //      	var a= $(".frame-menu .first-menu-list>li");
        //      	console.log(333);
        //      	console.log(a);
        //      },

        //弹窗页面调用控制弹窗按钮样式
        hideThelayerBtu: function (ishide) {
            if (ishide) {
                $(".layui-layer-btn.layui-layer-btn- >a").hide();
            } else {
                $(".layui-layer-btn.layui-layer-btn- >a").show();
            }

        },

        //刷新父页面的iframe框架
        refreshTheIframe: function () {
            $("#rightMain")[0].contentWindow.refreshGird();
            //document.getElementsByTagName('iframe')[0].contentWindow.refreshGird();
        },

        //关闭进度条页面
        closePregressPage: function () {
            var frameId = document.getElementById('layerProgress').getElementsByTagName('iframe')[0].id;
            $('#' + frameId)[0].contentWindow.openThisWindow();
        }
    };
    return vso;
})(window.jQuery);/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.04.19
 * 描 述：滚动条优化
 */
(function ($, vso, window) {
    "use strict";
    var $move = null;

    var methods = {
        init: function ($this, callback) {
            var id = $this.attr('id');
            if (!id) {
                id = '' + vso.newGuid();
                $this.attr('id', id);
            }

            $this.addClass('scroll-wrap');
            // 加载内容
            var $content = $this.children();

            var $scroll = $('<div class="scroll-box" id="' + id + '_box" ></div>');
            $this.append($scroll);
            $scroll.append($content);

            // 加载y滚动条
            var $vertical = $('<div class="scroll-vertical"   ><div class="scroll-vertical-block" id="' + id + '_vertical"></div></div>')
            $this.append($vertical);

            // 加载x滚动条
            var $horizontal = $('<div class="scroll-horizontal" ><div class="scroll-horizontal-block" id="' + id + '_horizontal"></div></div>')
            $this.append($horizontal);

            // 添加一个移动板
            if ($move === null) {
                $move = $('<div style="-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;display: none;position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 9999;cursor: pointer;" ></div>');
                $('body').append($move);
            }
            // 初始化数据
            var sh = $scroll.innerHeight();
            var sw = $scroll.innerWidth();


            var h = $this.height();
            var w = $this.width();
            var data = {
                id: id,
                sy: 0,
                sx: 0,
                sh: sh,
                sw: sw,
                h: h,
                w: w,
                yh: 0,
                xw: 0,
                callback: callback
            };
            $this[0].op = data;
            methods.update($this);
            methods.bindEvent($this, $scroll, $vertical, $horizontal);

            $scroll = null;
            $content = null;
            $vertical = null;
            $horizontal = null;
            $this = null;
        },
        bindEvent: function ($this, $scroll, $vertical, $horizontal) { // 绑定监听事件
            // div大小变化
            $this.resize(function () {
                var $this = $(this);
                var op = $this[0].op;
                var h = $this.height();
                var w = $this.width();
                if (h != op.h) {
                    op.h = h;
                    methods.updateY($this);
                }
                if (w != op.w) {
                    op.w = w;
                    methods.updateX($this);
                }
                $this = null;
            });
            $scroll.resize(function () {
                var $this = $(this);
                var $scrollWrap = $this.parent();
                var op = $scrollWrap[0].op;
                var sh = $this.innerHeight();
                var sw = $this.innerWidth();

                if (sh != op.sh) {
                    op.sh = sh;
                    methods.updateY($scrollWrap);
                }
                if (sw != op.sw) {
                    op.sw = sw;
                    methods.updateX($scrollWrap);
                }
                $this = null;
                $scrollWrap = null;
            });

            // 监听鼠标滚动
            $this.mousewheel(function (event, delta, deltaX, deltaY) {

                var $this = $(this);
                var op = $this[0].op;
                var d = delta * 4;
                if (op.sh > op.h) {
                    op.oldsy = op.sy;
                    op.sy = op.sy - d;
                    methods.moveY($this, true);
                    $this = null;
                    return false;
                } else if (op.sw > op.w) {
                    op.oldsx = op.sx;
                    op.sx = op.sx - d;
                    methods.moveX($this, true);
                    $this = null;
                    return false;
                }
            });

            // 监听鼠标移动
            $vertical.find('.scroll-vertical-block').on('mousedown', function (e) {
                $move.show();
                var $this = $(this).parent().parent();
                var op = $this[0].op;
                op.isYMousedown = true;
                op.yMousedown = e.pageY;
                $this.addClass('scroll-active');
                $this = null;
            });
            $horizontal.find('.scroll-horizontal-block').on('mousedown', function (e) {
                $move.show();
                var $this = $(this).parent().parent();
                var op = $this[0].op;
                op.isXMousedown = true;
                op.xMousedown = e.pageX;
                $this.addClass('scroll-active');
                $this = null;
            });


            top.$(document).on('mousemove', { $obj: $this }, function (e) {
                var op = e.data.$obj[0].op;
                if (op.isYMousedown) {
                    var y = e.pageY;
                    var _yd = y - op.yMousedown;
                    op.yMousedown = y;
                    op.oldsy = op.sy;
                    op.blockY = op.blockY + _yd;

                    if ((op.blockY + op.yh) > op.h) {
                        op.blockY = op.h - op.yh;
                    }
                    if (op.blockY < 0) {
                        op.blockY = 0;
                    }
                    methods.getY(op);
                    methods.moveY(e.data.$obj);
                }
                else if (op.isXMousedown) {
                    var op = e.data.$obj[0].op;
                    var x = e.pageX;
                    var _xd = x - op.xMousedown;
                    op.xMousedown = x;
                    op.oldsx = op.sx;
                    op.blockX = op.blockX + _xd;
                    if ((op.blockX + op.xw) > op.w) {
                        op.blockX = op.w - op.xw;
                    }
                    if (op.blockX < 0) {
                        op.blockX = 0;
                    }
                    methods.getX(op);
                    methods.moveX(e.data.$obj);
                }
            }).on('mouseup', { $obj: $this }, function (e) {
                e.data.$obj[0].op.isYMousedown = false;
                e.data.$obj[0].op.isXMousedown = false;
                $move.hide();
                e.data.$obj.removeClass('scroll-active');
            });
        },
        update: function ($this) { // 更新滚动条
            methods.updateY($this);
            methods.updateX($this);
        },
        updateY: function ($this) {
            var op = $this[0].op;
            var $scroll = $this.find('#' + op.id + '_box');
            var $vertical = $this.find('#' + op.id + '_vertical');
            if (op.sh > op.h) { // 出现纵向滚动条
                // 更新显示区域位置
                if ((op.sh - op.sy) < op.h) {
                    var _sy = 0;
                    op.sy = op.sh - op.h;
                    if (op.sy < 0) {
                        op.sy = 0;
                    } else {
                        _sy = 0 - op.sy;
                    }
                    $scroll.css('top', _sy + 'px');
                }
                // 更新滚动条高度
                var scrollH = parseInt(op.h * op.h / op.sh);
                scrollH = (scrollH < 30 ? 30 : scrollH);
                op.yh = scrollH;

                // 更新滚动条位置
                var _y = parseInt(op.sy * (op.h - scrollH) / (op.sh - op.h));
                if ((_y + scrollH) > op.h) {
                    _y = op.h - scrollH;
                }
                if (_y < 0) {
                    _y = 0;
                }

                op.blockY = _y;

                // 设置滚动块大小和位置
                $vertical.css({
                    'top': _y + 'px',
                    'height': scrollH + 'px'
                });
            } else {
                op.blockY = 0;
                op.sy = 0;
                $scroll.css('top', '0px');
                $vertical.css({
                    'top': '0px',
                    'height': '0px'
                });
            }

            op.callback && op.callback(op.sx, op.sy);
            $scroll = null;
            $vertical = null;
        },
        updateX: function ($this) {
            var op = $this[0].op;
            var $scroll = $this.find('#' + op.id + '_box');
            var $horizontal = $this.find('#' + op.id + '_horizontal');
            if (op.sw > op.w) {
                // 更新显示区域位置
                if ((op.sw - op.sx) < op.w) {
                    var _sx = 0;
                    op.sx = op.sw - op.w;
                    if (op.sx < 0) {
                        op.sx = 0;
                    } else {
                        _sx = 0 - op.sx;
                    }
                    $scroll.css('left', _sx + 'px');
                }
                // 更新滚动条高度
                var scrollW = parseInt(op.w * op.w / op.sw);
                scrollW = (scrollW < 30 ? 30 : scrollW);
                op.xw = scrollW;

                // 更新滚动条位置
                var _x = parseInt(op.sx * (op.w - scrollW) / (op.sw - op.w));
                if ((_x + scrollW) > op.w) {
                    _x = op.w - scrollW;
                }
                if (_x < 0) {
                    _x = 0;
                }
                op.blockX = _x;
                // 设置滚动块大小和位置
                $horizontal.css({
                    'left': _x + 'px',
                    'width': scrollW + 'px'
                });

            } else {
                op.sx = 0;
                op.blockX = 0;
                $scroll.css('left', '0px');
                $horizontal.css({
                    'left': '0px',
                    'width': '0px'
                });
            }
            op.callback && op.callback(op.sx, op.sy);
            $scroll = null;
            $horizontal = null;
        },
        moveY: function ($this, isMousewheel) {
            var op = $this[0].op;
            var $scroll = $this.find('#' + op.id + '_box');
            var $vertical = $this.find('#' + op.id + '_vertical');

            // 更新显示区域位置
            var _sy = 0;
            if (op.sy < 0) {
                op.sy = 0;
            } else if (op.sy + op.h > op.sh) {
                op.sy = op.sh - op.h;
                _sy = 0 - op.sy;
            } else {
                _sy = 0 - op.sy;
            }
            if (isMousewheel) {
                var _y = methods.getBlockY(op);
                if (_y == 0 && op.sy != 0) {
                    op.sy = 0;
                    _sy = 0;
                }
                op.blockY = _y;
                // 设置滚动块位置
                //var d = Math.abs(op.sy - op.oldsy) * 100 / 4;
                $scroll.css({
                    'top': _sy + 'px'
                });
                $vertical.css({
                    'top': _y + 'px'
                });
            } else {
                $scroll.css({
                    'top': _sy + 'px'
                });
                $vertical.css({
                    'top': op.blockY + 'px'
                });
            }
            op.callback && op.callback(op.sx, op.sy);
            $scroll = null;
            $vertical = null;
        },
        moveX: function ($this, isMousewheel) {
            var op = $this[0].op;
            var $scroll = $this.find('#' + op.id + '_box');
            var $horizontal = $this.find('#' + op.id + '_horizontal');

            // 更新显示区域位置
            var _sx = 0;
            if (op.sx < 0) {
                op.sx = 0;
            } else if (op.sx + op.w > op.sw) {
                op.sx = op.sw - op.w;
                _sx = 0 - op.sx;
            } else {
                _sx = 0 - op.sx;
            }

            if (isMousewheel) {
                // 更新滑块的位置
                var _x = methods.getBlockX(op);
                if (_x == 0 && op.sx != 0) {
                    op.sx = 0;
                    _sx = 0;
                }
                op.blockX = _x;
                // 设置滚动块位置
                //var d = Math.abs(op.sx - op.oldsx) * 100 / 4;
                $scroll.css({
                    'left': _sx + 'px'
                });
                $horizontal.css({
                    'left': _x + 'px'
                });
            } else {
                $scroll.css({
                    'left': _sx + 'px'
                });
                $horizontal.css({
                    'left': op.blockX + 'px'
                });
            }
            op.callback && op.callback(op.sx, op.sy);
            $scroll = null;
            $horizontal = null;

        },
        getBlockY: function (op) {
            var _y = parseFloat(op.sy * (op.h - op.yh) / (op.sh - op.h));
            if ((_y + op.yh) > op.h) {
                _y = op.h - op.yh;
            }
            if (_y < 0) {
                _y = 0;
            }
            return _y;
        },
        getY: function (op) {
            op.sy = parseInt(op.blockY * (op.sh - op.h) / (op.h - op.yh));
            if ((op.sy + op.h) > op.sh) {
                op.sy = op.sh - op.h;
            }
            if (op.sy < 0) {
                op.sy = 0;
            }
        },
        getBlockX: function (op) {
            var _x = parseFloat(op.sx * (op.w - op.xw) / (op.sw - op.w));
            if ((_x + op.xw) > op.w) {
                _x = op.w - op.xw;
            }
            if (_x < 0) {
                _x = 0;
            }
            return _x;
        },
        getX: function (op) {
            op.sx = parseInt(op.blockX * (op.sw - op.w) / (op.w - op.xw));
            if ((op.sx + op.w) > op.sw) {
                op.sx = op.sw - op.w;
            }
            if (op.sx < 0) {
                op.sx = 0;
            }
        },
    };
    $.fn.scroll = function (callback) {
        $(this).each(function () {
            var $this = $(this);
            methods.init($this, callback);
        });
    }

    $.fn.scrollSet = function (name, data) {
        switch (name) {
            case 'moveRight':
                var $this = $(this);
                setTimeout(function () {
                    var op = $this[0].op;
                    op.oldsx = op.sx;
                    op.sx = op.sw - op.w;
                    methods.moveX($this, true);
                    $this = null;
                }, 250);
                break;
            case 'moveBottom':
                var $this = $(this);
                setTimeout(function () {
                    var op = $this[0].op;
                    op.oldsy = op.sx;
                    op.sy = op.sh - op.h;
                    methods.moveY($this, true);
                    $this = null;
                }, 250);
                break;
        }
    }

})(window.jQuery, top.vso, window);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.16
 * 描 述：tab窗口操作方法
 */
(function ($, vso) {
    "use strict";
    //初始化菜单和tab页的属性Id
    var iframeIdList = {};

    vso.frameTab = {
        iframeId: '',
        init: function () {
            vso.frameTab.bind();
        },
        bind: function () {
            $(".frame-tabs-wrap").scroll();
        },
        setCurrentIframeId: function (iframeId) {
            vso.iframeId = iframeId;
        },
        open: function (module, notAllowClosed) {
            $("#parentsName, #secondMenu, #current_pos").html(''); //清空子页面头部标题
            //链接展开菜单
            if (module.ParentID == 0 && !!module.Url) { //一级菜单有链接
                $(".first-menu-list").find('i').removeClass('activemenu'); //去掉一级菜单选中蓝色标志

                $(".first-menu-list>li a").css("color", "#95a9bd");////去掉一级菜单文字选中标志
                $(".first-menu-list>li a[id= " + module.ID + "]").find('.firstmenui').addClass('activemenu'); //添加一级菜单选中蓝色标志
                $(".first-menu-list>li[title=" + module.Name + "] a").css("color", "#fff");//添加一级菜单文字选中标志
                $(".second-menu-list").css("display", "none"); //二级菜单关闭
                $(".first-menu-list>li a").removeClass('open');
            } else {  //一级菜单没有链接
                if (!module.LocaMenu) {
                    var $obj = $(".first-menu-list a[id=" + module.ID + "]");

                    if (!$obj.parent().parent().prev().hasClass('open')) {
                        $(".second-menu-list").css("display", "none");
                        $(".first-menu-list>li a").removeClass('open');
                        //	        		if(!!module.ParentID && !module.Url){
                        if (module.Name != '首页') {
                            //	        		if(!module.ParentID && !!module.Url){
                            $obj.parent().parent().prev().addClass('open');
                            $obj.parent().parent().css("display", "block");
                        }
                    }

                    //选中的菜单样式
                    $(".first-menu-list").find('i').removeClass('activemenu');

                    $(".first-menu-list>li a").css("color", "#95a9bd");//第一级
                    $(".first-menu-list>li a[id= " + module.ID + "]").find('.firstmenui').addClass('activemenu');
                    $(".first-menu-list>li[title=" + module.Name + "] a").css("color", "#fff");//第一级

                    $(".second-menu-list>li a[id= " + module.ID + "]").find('i').addClass('activemenu');//第二级
                    $(".second-menu-list>li[title=" + module.Name + "]").parent().prev().css("color", "#fff");

                    $(".second-menu-list>li a").css("color", "#95a9bd");
                    $(".first-menu-list>li a").css("color", "#95a9bd");//第一级
                    $(".second-menu-list>li[title=" + module.Name + "] a").css("color", "#fff");
                }
                if (!!module.SecondMenuid) {
                    var secondMonu = vso.clientdata.get(['modulesMap', module.SecondMenuid]);
                    $("#secondMenu").html("<span id='gotosecondmenu' onclick = 'vso.frameTab.open({ID: \"" + secondMonu.ID + "\",Name: \"" + secondMonu.Name + "\",Url: \"" + secondMonu.Url + "\", ParentName:\"" + secondMonu.ParentName + "\"})'>" + secondMonu.Name + "</span>/");
                }
                if (!!module.ParentName) {
                    $("#parentsName").html(module.ParentName + '/');
                } else {
                    $("#parentsName").html('');
                }
            }

            $("#current_pos").html(module.Name);
            $("#rightMain").attr('src', $.rootUrl + module.Url);

        },
        close: function (moduleId) {
            delete iframeIdList[moduleId];

            var $this = $('#tab_' + moduleId);
            var $prev = $this.prev();// 获取它的上一个节点数据;
            if ($prev.length < 1) {
                $prev = $this.next();
            }
            $this.remove();
            $('#iframe_' + moduleId).remove();
            if (moduleId == vso.frameTab.iframeId && $prev.length > 0) {
                var prevId = $prev.attr('id').replace('tab_', '');

                $prev.addClass('active');
                $('#iframe_' + prevId).addClass('active');
                vso.frameTab.iframeId = prevId;
                iframeIdList[prevId] = 1;
            }
            else {
                if ($prev.length < 1) {
                    vso.frameTab.iframeId = "";
                }
            }

            var $tabsUl = $('#frame_tabs_ul');
            var w = 0;
            var width = $tabsUl.children().each(function () {
                w += $(this).outerWidth();
            });
            $tabsUl.css({ 'width': w });
            $tabsUl.parent().css({ 'width': w });

            if (!!vso.frameTab.closecallback) {
                vso.frameTab.closecallback();
            }
        }
        // 获取当前窗口
        , currentIframe: function () {
            var ifameId = 'iframe_' + vso.frameTab.iframeId;
            if (top.frames[ifameId].contentWindow != undefined) {
                return top.frames[ifameId].contentWindow;
            }
            else {
                return top.frames[ifameId];
            }
        }
        , parentIframe: function () {
            var ifameId = 'iframe_' + top.$('#tab_' + vso.frameTab.iframeId).attr('parent-id');
            if (top.frames[ifameId].contentWindow != undefined) {
                return top.frames[ifameId].contentWindow;
            }
            else {
                return top.frames[ifameId];
            }
        }


        , opencallback: false
        , closecallback: false
    };

    vso.frameTab.init();
})(window.jQuery, top.vso);

/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.16
 * 描 述：数据验证完整性
 */
(function ($, vso) {
    "use strict";

    // 数据验证方法
    vso.validator = {
        validReg: function (obj, reg, msg) {
            var res = { code: true, msg: '' };
            if (!reg.test(obj)) {
                res.code = false;
                res.msg = msg;
            }
            return res;
        },
        validRegOrNull: function (obj, reg, msg) {
            var res = { code: true, msg: '' };
            if (obj == null || obj == undefined || obj.length == 0) {
                return res;
            }
            if (!reg.test(obj)) {
                res.code = false;
                res.msg = msg;
            }
            return res;
        },
        isNotNull: function (obj) {// 验证不为空
            var res = { code: true, msg: '' };
            obj = $.trim(obj);
            if (obj == null || obj == undefined || obj.length == 0) {
                res.code = false;
                res.msg = '不能为空';
            }
            return res;
        },
        isNum: function (obj) {// 验证数字
            return vso.validator.validReg(obj, /^[-+]?\d+$/, '必须为数字');
        },
        isNumOrNull: function (obj) {// 验证数字 或者空
            return vso.validator.validRegOrNull(obj, /^[-+]?\d+$/, '数字或空');
        },
        isEmail: function (obj) {//Email验证 email
            return vso.validator.validReg(obj, /^\w{3,}@\w+(\.\w+)+$/, '必须为E-mail格式');
        },
        isEmailOrNull: function (obj) {//Email验证 email   或者null,空
            return vso.validator.validRegOrNull(obj, /^\w{3,}@\w+(\.\w+)+$/, '必须为E-mail格式或空');
        },
        isEnglishStr: function (obj) {//验证只能输入英文字符串 echar
            return vso.validator.validReg(obj, /^[a-z,A-Z]+$/, '必须为英文字符串');
        },
        isEnglishStrOrNull: function (obj) {//验证只能输入英文字符串 echar 或者null,空
            return vso.validator.validRegOrNull(obj, /^[a-z,A-Z]+$/, '必须为英文字符串或空');
        },
        isTelephone: function (obj) { //验证是否电话号码 phone
            return vso.validator.validReg(obj, /^(\d{3,4}\-)?[1-9]\d{6,7}$/, '必须为电话格式');
        },
        isTelephoneOrNull: function (obj) {//验证是否电话号码 phone或者null,空
            return vso.validator.validRegOrNull(obj, /^(\d{3,4}\-)?[1-9]\d{6,7}$/, '必须为电话格式或空');
        },
        isMobile: function (obj) {//验证是否手机号 mobile
            return vso.validator.validReg(obj, /^(\+\d{2,3}\-)?\d{11}$/, '必须为手机格式');
        },
        isMobileOrnull: function (obj) {//验证是否手机号 mobile或者null,空
            return vso.validator.validRegOrNull(obj, /^(\+\d{2,3}\-)?\d{11}$/, '必须为手机格式或空');
        },
        isMobileOrPhone: function (obj) {//验证是否手机号或电话号码 mobile phone 
            var res = { code: true, msg: '' };
            if (!vso.validator.isTelephone(obj).code && !vso.validator.isMobile(obj).code) {
                res.code = false;
                res.msg = '为电话格式或手机格式';
            }
            return res;
        },
        isMobileOrPhoneOrNull: function (obj) {//验证是否手机号或电话号码 mobile phone或者null,空
            var res = { code: true, msg: '' };
            if (vso.validator.isNotNull(obj).code && !vso.validator.isTelephone(obj).code && !vso.validator.isMobile(obj).code) {
                res.code = false;
                res.msg = '为电话格式或手机格式或空';
            }
            return res;
        },
        isUri: function (obj) {//验证网址 uri
            return vso.validator.validReg(obj, /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/, '必须为网址格式');
        },
        isUriOrNull: function (obj) {//验证网址 uri或者null,空
            return vso.validator.validRegOrNull(obj, /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/, '必须为网址格式或空');
        },
        isDate: function (obj) {//判断日期类型是否为YYYY-MM-DD格式的类型 date
            return vso.validator.validReg(obj, /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/, '必须为日期格式');
        },
        isDateOrNull: function (obj) {//判断日期类型是否为YYYY-MM-DD格式的类型 date或者null,空
            return vso.validator.validRegOrNull(obj, /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/, '必须为日期格式或空');
        },
        isDateTime: function (obj) {//判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型 datetime
            return vso.validator.validReg(obj, /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/, '必须为日期时间格式');
        },
        isDateTimeOrNull: function (obj) {//判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型 datetime或者null,空
            return vso.validator.validRegOrNull(obj, /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/, '必须为日期时间格式');
        },
        isTime: function (obj) {//判断日期类型是否为hh:mm:ss格式的类型 time
            return vso.validator.validReg(obj, /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/, '必须为时间格式');
        },
        isTimeOrNull: function (obj) {//判断日期类型是否为hh:mm:ss格式的类型 time或者null,空
            return vso.validator.validRegOrNull(obj, /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/, '必须为时间格式或空');
        },
        isChinese: function (obj) {//判断输入的字符是否为中文 cchar 
            return vso.validator.validReg(obj, /^[\u0391-\uFFE5]+$/, '必须为中文');
        },
        isChineseOrNull: function (obj) {//判断输入的字符是否为中文 cchar或者null,空
            return vso.validator.validRegOrNull(obj, /^[\u0391-\uFFE5]+$/, '必须为中文或空');
        },
        isZip: function (obj) {//判断输入的邮编(只能为六位)是否正确 zip
            return vso.validator.validReg(obj, /^\d{6}$/, '必须为邮编格式');
        },
        isZipOrNull: function (obj) {//判断输入的邮编(只能为六位)是否正确 zip或者null,空
            return vso.validator.validRegOrNull(obj, /^\d{6}$/, '必须为邮编格式或空');
        },
        isDouble: function (obj) {//判断输入的字符是否为双精度 double
            return vso.validator.validReg(obj, /^[-\+]?\d+(\.\d+)?$/, '必须为小数');
        },
        isDoubleOrNull: function (obj) {//判断输入的字符是否为双精度 double或者null,空
            return vso.validator.validRegOrNull(obj, /^[-\+]?\d+(\.\d+)?$/, '必须为小数或空');
        },
        isIDCard: function (obj) {//判断是否为身份证 idcard
            return vso.validator.validReg(obj, /^\d{15}(\d{2}[A-Za-z0-9;])?$/, '必须为身份证格式');
        },
        isIDCardOrNull: function (obj) {//判断是否为身份证 idcard或者null,空
            return vso.validator.validRegOrNull(obj, /^\d{15}(\d{2}[A-Za-z0-9;])?$/, '必须为身份证格式或空');
        },
        isIP: function (obj) {//判断是否为IP地址格式
            var res = { code: true, msg: '' };
            var reg = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式 
            var flag = false;
            if (reg.test(obj)) {
                if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) { flag = true };
            }
            if (!flag) {
                res.code = false;
                res.msg = '必须为IP格式';
            }
            return res;
        },
        isIPOrNull: function (obj) {//判断是否为IP地址格式 或者null,空
            var res = { code: true, msg: '' };
            if (vso.validator.isNotNull(obj) && !vso.validator.isIP(obj).code) {
                res.code = false;
                res.msg = '必须为IP格式或空';
            }
            return res;
        },

        isLenNum: function (obj, n) {//验证是否是n位数字字符串编号 nnum
            var res = { code: true, msg: '' };
            var reg = /^[0-9]+$/;
            obj = $.trim(obj);
            if (obj.length > n || !reg.test(obj)) {
                res.code = false;
                res.msg = '必须为' + n + '位数字';
            }
            return res;
        },
        isLenNumOrNull: function (obj, n) {//验证是否是n位数字字符串编号 nnum或者null,空
            var res = { code: true, msg: '' };
            if (vso.validator.isNotNull(obj).code && !vso.validator.isLenNum(obj)) {
                res.code = false;
                res.msg = '必须为' + n + '位数字或空';
            }
            return res;
        },
        isLenStr: function (obj, n) {//验证是否小于等于n位数的字符串 nchar
            var res = { code: true, msg: '' };
            obj = $.trim(obj);
            if (!vso.validator.isNotNull(obj).code || obj.length > n) {
                res.code = false;
                res.msg = '必须小于等于' + n + '位字符';
            }
            return res;
        },
        isLenStrOrNull: function (obj, n) {//验证是否小于等于n位数的字符串 nchar或者null,空
            var res = { code: true, msg: '' };
            obj = $.trim(obj);
            if (vso.validator.isNotNull(obj).code && obj.length > n) {
                res.code = false;
                res.msg = '必须小于等于' + n + '位字符或空';
            }
            return res;
        }
    };

})(window.jQuery, top.vso);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.16
 * 描 述：弹层（基于layer.js-3.0.3）	
 */
(function ($, vso) {
    "use strict";
    $.extend(vso, {
        // 询问框
        layerConfirm: function (_msg, callback) {
            top.vso.language.get(_msg, function (msg) {
                top.layer.confirm(msg, {
                    btn: ['确认', '取消'],
                    title: "提示",
                    icon: 0,
                    area: ['300px', '170px'],
                    skin: 'layer',
                    success: function (layero, index) {
                        layero.find('.layui-layer-btn a').each(function () {
                            var $this = $(this);
                            var _text = $this.text();
                            top.vso.language.get(_text, function (text) {
                                $this.text(text);
                            });

                        });
                        layero.find('.layui-layer-title').each(function () {
                            var $this = $(this);
                            var _text = $this.text();
                            top.vso.language.get(_text, function (text) {
                                $this.text(text);
                            });

                        });
                    },
                }, function (index) {
                    callback(true, index);
                }, function (index) {
                    callback(false, index);
                    top.layer.close(index); //再执行关闭  
                });
            });


        },
        // 自定义表单弹层
        layerForm: function (op) {
            var dfop = {
                id: null,
                title: '系统窗口',
                width: 550,
                height: 400,
                url: 'error',
                btn: ['确认', '关闭'],
                callBack: false,
                maxmin: false,
                end: false,
            };
            $.extend(dfop, op || {});

            /*适应窗口大小*/
            dfop.width = dfop.width > $(window).width() ? $(window).width() - 10 : dfop.width;
            dfop.height = dfop.height > $(window).height() ? $(window).height() - 10 : dfop.height;
            
            var r = top.layer.open({
                id: dfop.id,
                maxmin: dfop.maxmin,
                type: 2,//0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
                title: dfop.title,
                area: [dfop.width + 'px', dfop.height + 'px'],
                btn: dfop.btn,
                content: op.url,
                skin: dfop.btn == null ? 'layer-nobtn' : 'layer',
                success: function (layero, index) {
                    top['layer_' + dfop.id] = vso.iframe($(layero).find('iframe').attr('id'), top.frames);
                    layero[0].layerid = 'layer_' + dfop.id;
                    //如果底部有按钮添加-确认并关闭窗口勾选按钮
                    if (!!dfop.btn && layero.find('.layer-btn-cb').length == 0) {
                        top.vso.language.get('确认并关闭窗口', function (text) {
                            //layero.find('.layui-layer-btn').append('<div class="checkbox layer-btn-cb" myIframeId="layer_' + dfop.id + '" ><label><input checked="checked" type="checkbox" >' + text + '</label></div>');
                        });
                        layero.find('.layui-layer-btn a').each(function () {
                            var $this = $(this);
                            var _text = $this.text();
                            top.vso.language.get(_text, function (text) {
                                $this.text(text);
                            });

                        });
                    }
                    layero.find('.layui-layer-title').each(function () {
                        var $this = $(this);
                        var _text = $this.text();
                        top.vso.language.get(_text, function (text) {
                            $this.text(text);
                        });

                    });
                },
                yes: function (index) {
                    var flag = true;
                    if (!!dfop.callBack) {
                        flag = dfop.callBack('layer_' + dfop.id);
                    }
                    if (!!flag) {
                        vso.layerClose('', index);
                    }
                },
                end: function () {
                    top['layer_' + dfop.id] = null;
                    if (!!dfop.end) {
                        dfop.end();
                    }
                }
            });
        },

        //自定义弹窗滚动条
        layerProgress: function () {
            top.layer.open({
                type: 2
                , title: false
                , id: 'layerProgress'
                , shade: 0.4
                , closeBtn: false
                , area: ['460px', '200px']
                , content: '/Main/Popup'
                , btn: false //只是为了演示
                //		        ,yes: function(){
                //		          $(that).click(); 
                //		        }
                //		        ,btn2: function(){
                //		          layer.closeAll();
                //		        }
                //		        
                //		        ,zIndex: layer.zIndex //重点1
                //		        ,success: function(layero){
                //		          layer.setTop(layero); //重点2
                //		        }
            })
        },

        // 关闭弹层
        layerClose: function (name, index) {
            var _index;
            if (!!index) {
                _index = index;
            }
            else {
                _index = top.layer.getFrameIndex(name);
            }
            var layero = top.$("#layui-layer" + _index);
            var $IsClose = layero.find('.layui-layer-btn').find(".layer-btn-cb input");
            var IsClose = $IsClose.is(":checked");
            if ($IsClose.length == 0) {
                IsClose = true;
            }
            if (IsClose) {
                top.layer.close(_index); //再执行关闭  
            } else {
                top[layero[0].layerid].location.reload();
            }

        }
    });


})(window.jQuery, top.vso);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.16
 * 描 述：ajax操作方法
 */
(function ($, vso) {
    "use strict";
    var httpCode = {
        success: 200,
        fail: 400,
        exception: 500
    };
    var exres = { code: httpCode.exception, info: '通信异常，请联系管理员！' }
    $.extend(vso, {
        // http 通信异常的时候调用此方法
        httpErrorLog: function (msg) {
            vso.log(msg);
        },
        // http请求返回数据码
        httpCode: httpCode,
        // get请求方法（异步）:url地址,callback回调函数
        httpAsyncGet: function (url, callback) {
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                async: true,
                cache: false,
                success: function (data) {
                    if (data.code == vso.httpCode.exception) {
                        vso.httpErrorLog(data.info);
                        data.info = '系统异常，请联系管理员！';
                    }
                    callback(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    vso.httpErrorLog(textStatus);
                    callback(exres);
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
        },
        // get请求方法（同步）:url地址,param参数
        httpGet: function (url, param) {
            var res = {};
            $.ajax({
                url: url,
                data: param,
                type: "GET",
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    if (data.code == vso.httpCode.exception) {
                        vso.httpErrorLog(data.info);
                        data.info = '系统异常，请联系管理员！';
                    }
                    res = data;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    vso.httpErrorLog(textStatus);
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
            return res;
        },
        // post请求方法（异步）:url地址,param参数,callback回调函数
        httpAsyncPost: function (url, param, callback) {
            $.ajax({
                url: url,
                data: param,
                type: "POST",
                dataType: "json",
                async: true,
                cache: false,
                success: function (data) {
                    if (data.code == vso.httpCode.exception) {
                        vso.httpErrorLog(data.info);
                        data.info = '系统异常，请联系管理员！';
                    }
                    callback(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    vso.httpErrorLog(textStatus);
                    callback(exres);
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
        },
        // post请求方法（同步步）:url地址,param参数,callback回调函数
        httpPost: function (url, param, callback) {
            $.ajax({
                url: url,
                data: param,
                type: "POST",
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    if (data.code == vso.httpCode.exception) {
                        vso.httpErrorLog(data.info);
                        data.info = '系统异常，请联系管理员！';
                    }
                    callback(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    vso.httpErrorLog(textStatus);
                    callback(exres);
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
        },
        // ajax 异步封装
        httpAsync: function (type, url, param, callback) {
            $.ajax({
                url: url,
                data: param,
                type: type,
                dataType: "json",
                async: true,
                cache: false,
                success: function (res) {
                    if (res.code == vso.httpCode.success) {
                        callback(res.data);
                    }
                    else {
                        vso.httpErrorLog(res.info);
                        callback(null);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    vso.httpErrorLog(textStatus);
                    callback(null);
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
        },

        deleteForm: function (url, param, callback) {
            vso.loading(true, '正在删除数据');
            vso.httpAsyncPost(url, param, function (res) {
                vso.loading(false);
                if (res.code == vso.httpCode.success) {
                    if (!!callback) {
                        callback(res);
                    }
                    vso.alert.success(res.info);
                }
                else {
                    vso.alert.error(res.info);
                    vso.httpErrorLog(res.info);
                }
                layer.close(layer.index);
            });
        },
        postForm: function (url, param, callback) {
            vso.loading(true, '正在提交数据');
            vso.httpAsyncPost(url, param, function (res) {
                vso.loading(false);
                if (res.code == vso.httpCode.success) {
                    if (!!callback) {
                        callback(res);
                    }
                    vso.alert.success(res.info);
                }
                else {
                    vso.alert.error(res.info);
                    vso.httpErrorLog(res.info);
                }
                layer.close(layer.index);
            });
        }
    });

})(window.jQuery, top.vso);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.17
 * 描 述：获取客户端数据
 */
(function ($, vso) {
    "use strict";

    var loadSate = {
        no: -1,  // 还未加载
        yes: 1,  // 已经加载成功
        ing: 0,  // 正在加载中
        fail: 2  // 加载失败
    };

    var clientDataFn = {};
    var clientAsyncData = {};

    var clientData = {};


    function initLoad(callback) {
        var res = loadSate.yes;
        for (var id in clientDataFn) {
            var _fn = clientDataFn[id];
            if (_fn.state == loadSate.fail) {
                res = loadSate.fail;
                break;
            }
            else if (_fn.state == loadSate.no) {
                res = loadSate.ing;
                _fn.init();
            }
            else if (_fn.state == loadSate.ing) {
                res = loadSate.ing;
            }
        }
        if (res == loadSate.yes) {
            callback(true);
        } else if (res == loadSate.fail) {
            callback(false);
        }
        else {
            setTimeout(function () {
                initLoad(callback);
            }, 100);
        }
    }
    function get(key, data) {
        var res = "";
        var len = data.length;
        if (len == undefined) {
            res = data[key];
        }
        else {
            for (var i = 0; i < len; i++) {
                if (key(data[i])) {
                    res = data[i];
                    break;
                }
            }
        }
        return res;
    }

    vso.clientdata = {
        init: function (callback) {
            initLoad(function (res) {
                callback(res);
                if (res) {// 开始异步加载数据
                    //clientAsyncData.company.init();
                }
            });
        },
        get: function (nameArray) {//[key,function (v) { return v.key == value }]
            var res = "";
            if (!nameArray) {
                return res;
            }
            var len = nameArray.length;
            var data = clientData;
            for (var i = 0; i < len; i++) {
                res = get(nameArray[i], data);
                if (res != "" && res != undefined) {
                    data = res;
                }
                else {
                    break;
                }
            }
            res = res || "";
            return res;
        },
        getAsync: function (name, op) {//
            return clientAsyncData[name].get(op);
        },
        getAllAsync: function (name, op) {//
            return clientAsyncData[name].getAll(op);
        },
        getsAsync: function (name, op) {//
            return clientAsyncData[name].gets(op);
        },
        update: function (name) {
            clientAsyncData[name].update && clientAsyncData[name].update();
        }
    };


    /*******************登录后数据***********************/
    // 注册数据的加载方法
    // 功能模块数据
    clientDataFn.modules = {
        state: loadSate.no,
        init: function () {
            //初始化加载数据
            clientDataFn.modules.state = loadSate.ing;

            clientData.modules = [
                {
                    "Expanded": false,
                    "IsLeaf": false,
                    "ParentID": 0,
                    "Url": "",
                    "Icon": "iconfont icon-shouye",
                    "ID": 1,
                    "Name": "商品管理",
                    "ParentName": "",
                    "Permission": ""
                },
                {
                    "Expanded": false,
                    "IsLeaf": true,
                    "ParentID": 1,
                    "Url": "/Product/ProductType/Index",
                    "Icon": "",
                    "ID": 11,
                    "Name": "商品类型",
                    "ParentName": "商品管理",
                    "Permission": "AppManageList"
                },
                {
                    "Expanded": false,
                    "IsLeaf": true,
                    "ParentID": 1,
                    "Url": "/Product/ProductMaterial/Index",
                    "Icon": "",
                    "ID": 12,
                    "Name": "商品材质",
                    "ParentName": "商品材质",
                    "Permission": "AppManageList"
                },
                {
                    "Expanded": false,
                    "IsLeaf": true,
                    "ParentID": 1,
                    "Url": "/Product/ProductList/Index",
                    "Icon": "",
                    "ID": 13,
                    "Name": "商品详情",
                    "ParentName": "商品详情",
                    "Permission": "AppManageList"
                },
                {
                    "Expanded": false,
                    "IsLeaf": true,
                    "ParentID": 1,
                    "Url": "/ShopManage/HomePageConfig/Index",
                    "Icon": "",
                    "ID": 14,
                    "Name": "首页配置",
                    "ParentName": "首页配置",
                    "Permission": "AppManageList"
                }
            ];
            clientDataFn.modules.toMap();
            clientDataFn.modules.state = loadSate.yes;

        },
        toMap: function () {
            //转化成树结构 和 转化成字典结构
            var modulesTree = {};
            var modulesMap = {};
            var _len = clientData.modules.length;
            for (var i = 0; i < _len; i++) {
                var _item = clientData.modules[i];
                //              if (_item.F_EnabledMark == 1) {
                modulesTree[_item.ParentID] = modulesTree[_item.ParentID] || [];
                modulesTree[_item.ParentID].push(_item);
                modulesMap[_item.ID] = _item;
                //              }
            }
            clientData.modulesTree = modulesTree;
            clientData.modulesMap = modulesMap;
        }
    };

})(window.jQuery, top.vso);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.05.10
 * 描 述：客户端语言包加载（菜单，tab条）
 */
(function ($, vso) {
    "use strict";

    vso.language = {
        getMainCode: function () {
            return '';
        },
        get: function (text, callback) {
            callback(text);
        },
        getSyn: function (text) {
            return text;
        }
    };
})(window.jQuery, top.vso);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.16
 * 描 述：admin顶层页面操作方法
 */

var loaddfimg;
(function ($, vso) {
    "use strict";

    var page = {
        init: function () {
            /*判断当前浏览器是否是IE浏览器*/
            if ($('body').hasClass('IE') || $('body').hasClass('InternetExplorer')) {
                $('#loadbg').append('<img data-img="imgeg" src="' + top.$.rootUrl + '/Content/images/ie-loader.gif" style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;vertical-align: middle;">');
                Pace.stop();
            }
            else {
                Pace.on('done', function () {
                    $('#loadbg').fadeOut();
                    Pace.options.target = '#pacenone';
                });
            }
            // 通知栏插件初始化设置
            toastr.options = {
                "closeButton": false, //是否显示关闭按钮（提示框右上角关闭按钮）；
                "debug": false,
                "newestOnTop": true,
                "progressBar": false, //是否显示进度条（设置关闭的超时时间进度条）； 
                //              "positionClass": "toast-top-center",
                "positionClass": "toast-center-center", //消息框在页面显示的位置 toast-top-left  顶端左边    toast-top-right    顶端右边   toast-top-center  顶端中间   toast-top-full-width 顶端，宽度铺满整个屏幕   toast-center-center  居中    toast-botton-right  toast-bottom-left  toast-bottom-center  toast-bottom-full-width
                "preventDuplicates": false,
                "onclick": null, //点击消息框自定义事件 
                "showDuration": "300", //显示动作时间 
                "hideDuration": "1000", //隐藏动作时间 
                "timeOut": "3000", //自动关闭超时时间 
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn", //显示的方式，和jquery相同 
                "hideMethod": "fadeOut" //隐藏的方式，和jquery相同
            };
            // 打开首页模板
            //          vso.frameTab.open({ ID: '0', Icon: 'fa fa-desktop', Name: '我的桌面', Url: '/Home/AdminDesktop' }, true);
            vso.clientdata.init(function () {
                //page.userInit();
                // 初始页面特例
                bootstrap($, vso);
                if ($('body').hasClass('IE') || $('body').hasClass('InternetExplorer')) {
                    $('#loadbg').fadeOut();
                }
            });

            // 加载数据进度
            page.loadbarInit();

        },

        // 加载数据进度
        loadbarInit: function () {
            var _html = '<div class="loading-bar" id="loading_bar" >';
            _html += '<div class="loading-bar-bg"></div>';
            _html += '<div class="loading-bar-message" id="loading_bar_message"></div>';
            _html += '</div>';
            $('body').append(_html);
        },

    };

    $(function () {
        page.init();
    });
})(window.jQuery, top.vso);

