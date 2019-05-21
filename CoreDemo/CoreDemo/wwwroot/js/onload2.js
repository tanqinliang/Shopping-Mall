/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.16
 * 描 述：手风琴风格皮肤	
 */
var bootstrap = function ($, bpm) {
    "use strict";

    // 菜单操作
    var meuns = {
        init: function () {
            this.load();
            this.bind();
        },
        load: function () {
            var modulesTree = bpm.clientdata.get(['modulesTree']);
            // 第一级菜单
            var parentId = '0';
            var modules = modulesTree[parentId] || [];
//          var $firstmenus = $('<ul class="first-menu-list"></ul>');
            var $firstmenus = $('<ul class="first-menu-list"><li title="优惠券管理"><a id="7cbf51d5-640c-41af-b561-9cdd423a2d98" href="javascript:void(0);" class="menu-item"><i class="fa fa-envelope-open-o menu-item-icon"></i><span class="menu-item-text">首页</span><span class="menu-item-arrow"></span></a></li></ul>');
            for (var i = 0, l = modules.length; i < l; i++) {
                var item = modules[i];
                if (item.F_IsMenu == 1) {
                    var $firstMenuItem = $('<li></li>');
                    if (!!item.F_Description) {
                        $firstMenuItem.attr('title', item.F_Description);
                    }
                    var menuItemHtml = '<a id="' + item.F_ModuleId + '" href="javascript:void(0);" class="menu-item">';
                    menuItemHtml += '<i class="' + item.F_Icon + ' menu-item-icon"></i>';
                    menuItemHtml += '<span class="menu-item-text">' + item.F_FullName + '</span>';
                    menuItemHtml += '<span class="menu-item-arrow"><i class="fa fa-angle-right"></i></span></a>';
                    $firstMenuItem.append(menuItemHtml);
                    // 第二级菜单
                    var secondModules = modulesTree[item.F_ModuleId] || [];
                    var $secondMenus = $('<ul class="second-menu-list"></ul>');
                    var secondMenuHad = false;
                    for (var j = 0, sl = secondModules.length ; j < sl; j++) {
                        var secondItem = secondModules[j];
                        if (secondItem.F_IsMenu == 1) {
                            secondMenuHad = true;
                            var $secondMenuItem = $('<li></li>');
                            if (!!secondItem.F_Description) {
                                $secondMenuItem.attr('title', secondItem.F_Description);
                            }
                            var secondItemHtml = '<a id="' + secondItem.F_ModuleId + '" href="javascript:void(0);" class="menu-item" >';
                            secondItemHtml += '<i class="' + secondItem.F_Icon + ' menu-item-icon"></i>';
                            secondItemHtml += '<span class="menu-item-text">' + secondItem.F_FullName + '</span>';
                            secondItemHtml += '</a>';

                            $secondMenuItem.append(secondItemHtml);
                            // 第三级菜单
                            var threeModules = modulesTree[secondItem.F_ModuleId] || [];
                            var $threeMenus = $('<ul class="three-menu-list"></ul>');
                            var threeMenuHad = false;
                            for (var m = 0, tl = threeModules.length ; m < tl; m++) {
                                var threeItem = threeModules[m];
                                if (threeItem.F_IsMenu == 1) {
                                    threeMenuHad = true;
                                    var $threeMenuItem = $('<li></li>');
                                    $threeMenuItem.attr('title', threeItem.F_FullName);
                                    var threeItemHtml = '<a id="' + threeItem.F_ModuleId + '" href="javascript:void(0);" class="menu-item" >';
                                    threeItemHtml += '<i class="' + threeItem.F_Icon + ' menu-item-icon"></i>';
                                    threeItemHtml += '<span class="menu-item-text">' + threeItem.F_FullName + '</span>';
                                    threeItemHtml += '</a>';
                                    $threeMenuItem.append(threeItemHtml);
                                    $threeMenus.append($threeMenuItem);
                                }
                            }
                            if (threeMenuHad) {
                                $secondMenuItem.addClass('meun-had');
                                $secondMenuItem.find('a').append('<span class="menu-item-arrow"><i class="fa fa-angle-right"></i></span>');
                                $secondMenuItem.append($threeMenus);
                            }
                            $secondMenus.append($secondMenuItem);
                        }
                    }
                    if (secondMenuHad) {
                        $firstMenuItem.append($secondMenus);
                    }
                    $firstmenus.append($firstMenuItem);
                }
            }
            $('#frame_menu').html($firstmenus);


            // 语言包翻译
            $('.menu-item-text').each(function () {
                var $this = $(this);
                var text = $this.text();
                bpm.language.get(text, function (text) {
                    $this.text(text);
                    $this.parent().parent().attr('title', text);
                });
            });
        },
        bind: function () {
            $("#frame_menu").scroll();

//          $('#frame_menu_btn').on('click', function () {
//              var $body = $('body');
//              if ($body.hasClass('menu-closed')) {
//                  $body.removeClass('menu-closed');
//              }
//              else {
//                  $body.addClass('menu-closed');
//              }
//          });

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

//          $('.frame-personCenter .dropdown-toggle').hover(function () {
//              if ($('body').hasClass('menu-closed')) {
//                  var text = $(this).text();
//                  layer.tips(text, $(this));
//              }
//          }, function () {
//              if ($('body').hasClass('menu-closed')) {
//                  layer.closeAll('tips');
//              }
//          });


            // 添加点击事件
            $('#frame_menu a').on('click', function () {
                var $obj = $(this);
                var id = $obj.attr('id');
                var _module = bpm.clientdata.get(['modulesMap', id]);
                switch (_module.F_Target) {
                    case 'iframe':// 窗口
                        if (bpm.validator.isNotNull(_module.F_UrlAddress).code) {
                            bpm.frameTab.open(_module);
                        }
                        else {

                        }
                        break;
                    case 'expand':// 打开子菜单
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
 * 日 期：2018.03.16
 * 描 述：操作类	
 */
top.bpm = (function ($) {
    "use strict";
    var bpm = {
        // 是否是调试模式
        isDebug: true,
        log: function () {
            if (bpm.isDebug) {
                console.log('=====>' + new Date().getTime() + '<=====');
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
                top.bpm.language.get(_text, function (text) {
                    top.$("#loading_bar_message").html(text);
                });
               
            } else {
                top.bpm.language.get("正在拼了命为您加载…", function (text) {
                    top.$("#loading_bar_message").html(text);
                });
            }
            if (isShow) {
                $loading.show();
            } else {
                $loading.hide();
            }
        },
        // 动态加载css文件
        loadStyles: function (url) {
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            link.back = "backeg";
            document.getElementsByTagName("head")[0].appendChild(link);
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
        // 改变url参数值
        changeUrlParam: function (url, key, value) {
            var newUrl = "";
            var reg = new RegExp("(^|)" + key + "=([^&]*)(|$)");
            var tmp = key + "=" + value;
            if (url.match(reg) != null) {
                newUrl = url.replace(eval(reg), tmp);
            } else {
                if (url.match("[\?]")) {
                    newUrl = url + "&" + tmp;
                }
                else {
                    newUrl = url + "?" + tmp;
                }
            }
            return newUrl;
        },
        // 转化成十进制
        toDecimal: function (num) {
            if (num == null) {
                num = "0";
            }
            num = num.toString().replace(/\$|\,/g, '');
            if (isNaN(num))
                num = "0";
            var sign = (num == (num = Math.abs(num)));
            num = Math.floor(num * 100 + 0.50000000001);
            var cents = num % 100;
            num = Math.floor(num / 100).toString();
            if (cents < 10)
                cents = "0" + cents;
            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
                num = num.substring(0, num.length - (4 * i + 3)) + '' +
                        num.substring(num.length - (4 * i + 3));
            return (((sign) ? '' : '-') + num + '.' + cents);
        },
        // 文件大小转换
        countFileSize: function (size) {
            if (size < 1024.00)
                return bpm.toDecimal(size) + " 字节";
            else if (size >= 1024.00 && size < 1048576)
                return bpm.toDecimal(size / 1024.00) + " KB";
            else if (size >= 1048576 && size < 1073741824)
                return bpm.toDecimal(size / 1024.00 / 1024.00) + " MB";
            else if (size >= 1073741824)
                return bpm.toDecimal(size / 1024.00 / 1024.00 / 1024.00) + " GB";
        },
        // 数组复制
        arrayCopy: function (data) {
            return $.map(data, function (obj) {
                return $.extend(true, {}, obj);
            });
        },
        // 检测数据是否选中
        checkrow: function (id) {
            var isOK = true;
            if (id == undefined || id == "" || id == 'null' || id == 'undefined') {
                isOK = false;
                top.bpm.language.get('您没有选中任何数据项,请选中后再操作！', function (text) {
                    bpm.alert.warning(text);
                });
               
            }
            return isOK;
        },
        // 提示消息栏
        alert: {
            success: function (msg) {
                top.bpm.language.get(msg, function (text) {
                    toastr.success(text);
                });
               
            },
            info: function (msg) {
                top.bpm.language.get(msg, function (text) {
                    toastr.info(text);
                });
            },
            warning: function (msg) {
                top.bpm.language.get(msg, function (text) {
                    toastr.warning(text);
                });
            },
            error: function (msg) {
                top.bpm.language.get(msg, function (text) {
                    toastr.warning(msg);
                });
            }
        },
        //下载文件（she写的扩展）
        download: function (options) {
            var defaults = {
                method: "GET",
                url: "",
                param: []
            };
            var options = $.extend(defaults, options);
            if (options.url && options.param) {
                var $form = $('<form action="' + options.url + '" method="' + (options.method || 'post') + '"></form>');
                for (var key in options.param) {
                    var $input = $('<input type="hidden" />').attr('name', key).val(options.param[key]);
                    $form.append($input);
                }
                $form.appendTo('body').submit().remove();
            };
        },

        // 数字格式转换成千分位
        commafy: function (num) {
            if (num == null) {
                num = "0";
            }
            if (isNaN(num)) {
                return "0";
            }
            num = num + "";
            if (/^.*\..*$/.test(num)) {
                varpointIndex = num.lastIndexOf(".");
                varintPart = num.substring(0, pointIndex);
                varpointPart = num.substring(pointIndex + 1, num.length);
                intPart = intPart + "";
                var re = /(-?\d+)(\d{3})/
                while (re.test(intPart)) {
                    intPart = intPart.replace(re, "$1,$2")
                }
                num = intPart + "." + pointPart;
            } else {
                num = num + "";
                var re = /(-?\d+)(\d{3})/
                while (re.test(num)) {
                    num = num.replace(re, "$1,$2")
                }
            }
            return num;
        },

        // 检测图片是否存在
        isExistImg: function (pathImg) {
            if (!!pathImg) {
                var ImgObj = new Image();
                ImgObj.src = pathImg;
                if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
                    return true;
                } else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
    };
    return bpm;
})(window.jQuery);/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.04.19
 * 描 述：滚动条优化
 */
(function ($, bpm, window) {
    "use strict";
    var $move = null;

    var methods = {
        init: function ($this, callback) {
            var id = $this.attr('id');
            if (!id) {
                id = '' + bpm.newGuid();
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

})(window.jQuery, top.bpm, window);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.16
 * 描 述：tab窗口操作方法
 */
(function ($, bpm) {
    "use strict";
    //初始化菜单和tab页的属性Id
    var iframeIdList = {};

    bpm.frameTab = {
        iframeId: '',
        init: function () {
            bpm.frameTab.bind();
        },
        bind: function () {
            $(".frame-tabs-wrap").scroll();
        },
        setCurrentIframeId: function (iframeId) {
            bpm.iframeId = iframeId;
        },
        open: function (module, notAllowClosed) {
        	$("#current_pos").html(module.F_FullName);
        	$("#rightMain").attr('src', $.rootUrl + module.F_UrlAddress +"?t="+Math.random());
        	
//          var $tabsUl = $('#frame_tabs_ul');
//          var $frameMain = $('#frame_main');
//
//          if (iframeIdList[module.F_ModuleId] == undefined || iframeIdList[module.F_ModuleId] == null) {
//              // 隐藏之前的tab和窗口
//              if (bpm.frameTab.iframeId != '') {
//                  $tabsUl.find('#tab_' + bpm.frameTab.iframeId).removeClass('active');
//                  $frameMain.find('#iframe_' + bpm.frameTab.iframeId).removeClass('active');
//                  iframeIdList[bpm.frameTab.iframeId] = 0;
//              }
//              var parentId = bpm.frameTab.iframeId;
//              bpm.frameTab.iframeId = module.F_ModuleId;
//              iframeIdList[bpm.frameTab.iframeId] = 1;
//
//              // 打开一个功能模块tab_iframe页面
//              var $tabItem = $('<li class="frame-tabItem active" id="tab_' + module.F_ModuleId + '" parent-id="' + parentId + '"  ><span>' + module.F_FullName + '</span></li>');
//              // 翻译
//              bpm.language.get(module.F_FullName, function (text) {
//                  $tabItem.find('span').text(text);
//              });
//
//              if (!notAllowClosed) {
//                  $tabItem.append('<span class="reomve" title="关闭窗口"></span>');
//              }
//             // var $iframe = $('<iframe class="frame-iframe active" id="iframe_' + module.F_ModuleId + '" frameborder="0" src="' + $.rootUrl + module.F_UrlAddress + '"></iframe>');
//              var $iframe = $('<iframe class="frame-iframe active" id="iframe_' + module.F_ModuleId + '" frameborder="0" src="' + 'https://www.baidu.com/' + '"></iframe>');
//              $tabsUl.append($tabItem);
//              $frameMain.append($iframe);
//
//              var w = 0;
//              var width = $tabsUl.children().each(function () {
//                  w += $(this).outerWidth();
//              });
//              $tabsUl.css({ 'width': w });
//              $tabsUl.parent().css({ 'width': w });
//
//
//              $(".frame-tabs-wrap").scrollSet('moveRight');
//
//           
//
//              //绑定一个点击事件
//              $tabItem.on('click', function () {
//                  var id = $(this).attr('id').replace('tab_', '');
//                  bpm.frameTab.focus(id);
//              });
//              $tabItem.find('.reomve').on('click', function () {
//                  var id = $(this).parent().attr('id').replace('tab_', '');
//                  bpm.frameTab.close(id);
//                  return false;
//              });
//
//              if (!!bpm.frameTab.opencallback) {
//                  bpm.frameTab.opencallback();
//              }
//              if (!notAllowClosed) {
//                  $.ajax({
//                      url: top.$.rootUrl + "/Home/VisitModule",
//                      data: { moduleName: module.F_FullName, moduleUrl: module.F_UrlAddress },
//                      type: "post",
//                      dataType: "text"
//                  });
//              }
//          }
//          else {
//              bpm.frameTab.focus(module.F_ModuleId);
//          }
        },
        focus: function (moduleId) {
            if (iframeIdList[moduleId] == 0) {
                // 定位焦点tab页
                $('#tab_' + bpm.frameTab.iframeId).removeClass('active');
                $('#iframe_' + bpm.frameTab.iframeId).removeClass('active');
                iframeIdList[bpm.frameTab.iframeId] = 0;

                $('#tab_' + moduleId).addClass('active');
                $('#iframe_' + moduleId).addClass('active');
                bpm.frameTab.iframeId = moduleId;
                iframeIdList[moduleId] = 1;

                if (!!bpm.frameTab.opencallback) {
                    bpm.frameTab.opencallback();
                }
            }
        },
        leaveFocus: function () {
            $('#tab_' + bpm.frameTab.iframeId).removeClass('active');
            $('#iframe_' + bpm.frameTab.iframeId).removeClass('active');
            iframeIdList[bpm.frameTab.iframeId] = 0;
            bpm.frameTab.iframeId = '';
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
            if (moduleId == bpm.frameTab.iframeId && $prev.length > 0) {
                var prevId = $prev.attr('id').replace('tab_', '');

                $prev.addClass('active');
                $('#iframe_' + prevId).addClass('active');
                bpm.frameTab.iframeId = prevId;
                iframeIdList[prevId] = 1;
            }
            else {
                if ($prev.length < 1) {
                    bpm.frameTab.iframeId = "";
                }
            }

            var $tabsUl = $('#frame_tabs_ul');
            var w = 0;
            var width = $tabsUl.children().each(function () {
                w += $(this).outerWidth();
            });
            $tabsUl.css({ 'width': w });
            $tabsUl.parent().css({ 'width': w });

            if (!!bpm.frameTab.closecallback) {
                bpm.frameTab.closecallback();
            }
        }
        // 获取当前窗口
        ,currentIframe: function () {
            var ifameId = 'iframe_' + bpm.frameTab.iframeId;
            if (top.frames[ifameId].contentWindow != undefined) {
                return top.frames[ifameId].contentWindow;
            }
            else {
                return top.frames[ifameId];
            }
        }
        ,parentIframe: function () {
            var ifameId = 'iframe_' + top.$('#tab_'+bpm.frameTab.iframeId).attr('parent-id');
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

    bpm.frameTab.init();
})(window.jQuery, top.bpm);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.16
 * 描 述：时间日期的处理
 */
(function ($, bpm) {
    "use strict";
    
    $.extend(bpm, {
        // 字串转化成日期
        parseDate: function (strDate) {
            var myDate;
            if (strDate.indexOf("/Date(") > -1)
                myDate = new Date(parseInt(strDate.replace("/Date(", "").replace(")/", ""), 10));
            else
                myDate = new Date(Date.parse(strDate.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
            return myDate;
        },
        // 日期格式化v日期,format:格式
        formatDate: function (v, format) {
            if (!v) return "";
            var d = v;
            if (typeof v === 'string') {
                if (v.indexOf("/Date(") > -1)
                    d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
                else
                    d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
            }
            var o = {
                "M+": d.getMonth() + 1,  //month
                "d+": d.getDate(),       //day
                "h+": d.getHours(),      //hour
                "m+": d.getMinutes(),    //minute
                "s+": d.getSeconds(),    //second
                "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
                "S": d.getMilliseconds() //millisecond
            };
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        },
        // 获取当前时间;format为格式
        getDate: function (format, strInterval, Number) {
            var myDate = new Date();
            if (!!strInterval) {
                myDate = myDate.DateAdd(strInterval, Number);
            }
            var res = bpm.formatDate(myDate, format);
            return res;
        },
        // 月
        getMonth:function(){
            var res = {
                begin: '',
                end: ''
            };
            var currentDate = bpm.parseDate(bpm.formatDate(new Date(), "yyyy-MM-01"));
            var endDate = currentDate.DateAdd('m', 1).DateAdd('d', -1);

            res.begin = bpm.formatDate(currentDate, 'yyyy-MM-dd 00:00:00');
            res.end = bpm.formatDate(endDate, 'yyyy-MM-dd 23:59:59');

            return res;
        },
        getPreMonth: function () {
            var res = {
                begin:'',
                end:''
            };
            var currentDate = bpm.parseDate(bpm.formatDate(new Date(), "yyyy-MM-01"));
            var preMonth = currentDate.DateAdd('d',-1);

            res.begin = bpm.formatDate(preMonth, 'yyyy-MM-01 00:00:00');
            res.end = bpm.formatDate(preMonth, 'yyyy-MM-dd 23:59:59');

            return res;
        },
        // 季度
        getCurrentQuarter: function () {
            var currentDate = new Date();
            return bpm.getQuarter(currentDate.getFullYear(), currentDate.getMonth());
        },
        getPreQuarter: function () {
            var currentDate = new Date().DateAdd('q', -1);
            return bpm.getQuarter(currentDate.getFullYear(), currentDate.getMonth());
        },
        getQuarter: function (Year, month) {
            var res = {
                begin: '',
                end: ''
            };
            switch (month) {
                case 0:
                case 1:
                case 2:
                    res.begin = Year + "-01-01 00:00:00";
                    res.end = Year + "-03-31 23:59:59";
                    break;
                case 3:
                case 4:
                case 5:
                    res.begin = Year + "-04-01 00:00:00";
                    res.end = Year + "-06-30 23:59:59";
                    break;
                case 6:
                case 7:
                case 8:
                    res.begin = Year + "-07-01 00:00:00";
                    res.end = Year + "-09-30 23:59:59";
                    break;
                case 9:
                case 10:
                case 11:
                    res.begin = Year + "-10-01 00:00:00";
                    res.end = Year + "-12-31 23:59:59";
                    break;
            }
            return res;
        },
        // 年
        getYear: function () {
            var currentDate = new Date();
            var res = {
                begin: '',
                end: ''
            };
            var year = currentDate.getFullYear();
            res.begin = year + '-01-01 00:00:00';
            res.end = year + '-12-31 23:59:59';
            return res;
        },
        getPreYear: function () {
            var currentDate = new Date();
            var res = {
                begin: '',
                end: ''
            };
            var year = currentDate.getFullYear()-1;
            res.begin = year + '-01-01 00:00:00';
            res.end = year + '-12-31 23:59:59';
            return res;
        },
        getFirstHalfYear: function () {
            var currentDate = new Date();
            var res = {
                begin: '',
                end: ''
            };
            var year = currentDate.getFullYear();
            res.begin = year + '-01-01 00:00:00';
            res.end = year + '-06-30 23:59:59';
            return res;
        },
        getSecondHalfYear: function () {
            var currentDate = new Date();
            var res = {
                begin: '',
                end: ''
            };
            var year = currentDate.getFullYear();
            res.begin = year + '-07-01 00:00:00';
            res.end = year + '-12-31 23:59:59';
            return res;
        }
    });

    //+---------------------------------------------------  
    //| 日期计算  
    //+---------------------------------------------------  
    Date.prototype.DateAdd = function (strInterval, Number) {
        var dtTmp = this;
        switch (strInterval) {
            case 's': return new Date(Date.parse(dtTmp) + (1000 * Number));// 秒
            case 'n': return new Date(Date.parse(dtTmp) + (60000 * Number));// 分
            case 'h': return new Date(Date.parse(dtTmp) + (3600000 * Number));// 小时
            case 'd': return new Date(Date.parse(dtTmp) + (86400000 * Number));// 天
            case 'w': return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));// 星期
            case 'q': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());// 季度
            case 'm': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());// 月
            case 'y': return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());// 年
        }
    }
    //+---------------------------------------------------  
    //| 比较日期差 dtEnd 格式为日期型或者 有效日期格式字符串  
    //+---------------------------------------------------  
    Date.prototype.DateDiff = function (strInterval, dtEnd) {
        var dtStart = this;
        if (typeof dtEnd == 'string')//如果是字符串转换为日期型  
        {
            dtEnd = bpm.parseDate(dtEnd);
        }
        switch (strInterval) {
            case 's': return parseInt((dtEnd - dtStart) / 1000);
            case 'n': return parseInt((dtEnd - dtStart) / 60000);
            case 'h': return parseInt((dtEnd - dtStart) / 3600000);
            case 'd': return parseInt((dtEnd - dtStart) / 86400000);
            case 'w': return parseInt((dtEnd - dtStart) / (86400000 * 7));
            case 'm': return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
            case 'y': return dtEnd.getFullYear() - dtStart.getFullYear();
        }
    }
    //+---------------------------------------------------  
    //| 取得当前日期所在月的最大天数  
    //+---------------------------------------------------  
    Date.prototype.MaxDayOfDate = function () {
        var myDate = this;
        var ary = myDate.toArray();
        var date1 = (new Date(ary[0], ary[1] + 1, 1));
        var date2 = date1.DateAdd('m', 1);
        var result = dateDiff(date1.Format('yyyy-MM-dd'), date2.Format('yyyy-MM-dd'));
        return result;
    } 
    //---------------------------------------------------  
    // 判断闰年  
    //---------------------------------------------------  
    Date.prototype.isLeapYear = function () {
        return (0 == this.getYear() % 4 && ((this.getYear() % 100 != 0) || (this.getYear() % 400 == 0)));
    }
})(jQuery, top.bpm);

/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.16
 * 描 述：数据验证完整性
 */
(function ($, bpm) {
    "use strict";

    // 数据验证方法
    bpm.validator = {
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
            return bpm.validator.validReg(obj, /^[-+]?\d+$/, '必须为数字');
        },
        isNumOrNull: function (obj) {// 验证数字 或者空
            return bpm.validator.validRegOrNull(obj, /^[-+]?\d+$/, '数字或空');
        },
        isEmail: function (obj) {//Email验证 email
            return bpm.validator.validReg(obj, /^\w{3,}@\w+(\.\w+)+$/, '必须为E-mail格式');
        },
        isEmailOrNull: function (obj) {//Email验证 email   或者null,空
            return bpm.validator.validRegOrNull(obj, /^\w{3,}@\w+(\.\w+)+$/, '必须为E-mail格式或空');
        },
        isEnglishStr: function (obj) {//验证只能输入英文字符串 echar
            return bpm.validator.validReg(obj, /^[a-z,A-Z]+$/, '必须为英文字符串');
        },
        isEnglishStrOrNull: function (obj) {//验证只能输入英文字符串 echar 或者null,空
            return bpm.validator.validRegOrNull(obj, /^[a-z,A-Z]+$/, '必须为英文字符串或空');
        },
        isTelephone: function (obj) { //验证是否电话号码 phone
            return bpm.validator.validReg(obj, /^(\d{3,4}\-)?[1-9]\d{6,7}$/, '必须为电话格式');
        },
        isTelephoneOrNull: function (obj) {//验证是否电话号码 phone或者null,空
            return bpm.validator.validRegOrNull(obj, /^(\d{3,4}\-)?[1-9]\d{6,7}$/, '必须为电话格式或空');
        },
        isMobile: function (obj) {//验证是否手机号 mobile
            return bpm.validator.validReg(obj, /^(\+\d{2,3}\-)?\d{11}$/, '必须为手机格式');
        },
        isMobileOrnull: function (obj) {//验证是否手机号 mobile或者null,空
            return bpm.validator.validRegOrNull(obj, /^(\+\d{2,3}\-)?\d{11}$/, '必须为手机格式或空');
        },
        isMobileOrPhone: function (obj) {//验证是否手机号或电话号码 mobile phone 
            var res = { code: true, msg: '' };
            if (!bpm.validator.isTelephone(obj).code && !bpm.validator.isMobile(obj).code) {
                res.code = false;
                res.msg = '为电话格式或手机格式';
            }
            return res;
        },
        isMobileOrPhoneOrNull: function (obj) {//验证是否手机号或电话号码 mobile phone或者null,空
            var res = { code: true, msg: '' };
            if (bpm.validator.isNotNull(obj).code && !bpm.validator.isTelephone(obj).code && !bpm.validator.isMobile(obj).code) {
                res.code = false;
                res.msg = '为电话格式或手机格式或空';
            }
            return res;
        },
        isUri: function (obj) {//验证网址 uri
            return bpm.validator.validReg(obj, /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/, '必须为网址格式');
        },
        isUriOrNull: function (obj) {//验证网址 uri或者null,空
            return bpm.validator.validRegOrNull(obj, /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/, '必须为网址格式或空');
        },
        isDate: function (obj) {//判断日期类型是否为YYYY-MM-DD格式的类型 date
            return bpm.validator.validReg(obj, /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/, '必须为日期格式');
        },
        isDateOrNull: function (obj) {//判断日期类型是否为YYYY-MM-DD格式的类型 date或者null,空
            return bpm.validator.validRegOrNull(obj, /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/, '必须为日期格式或空');
        },
        isDateTime: function (obj) {//判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型 datetime
            return bpm.validator.validReg(obj, /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/, '必须为日期时间格式');
        },
        isDateTimeOrNull: function (obj) {//判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型 datetime或者null,空
            return bpm.validator.validRegOrNull(obj, /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/, '必须为日期时间格式');
        },
        isTime: function (obj) {//判断日期类型是否为hh:mm:ss格式的类型 time
            return bpm.validator.validReg(obj, /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/, '必须为时间格式');
        },
        isTimeOrNull: function (obj) {//判断日期类型是否为hh:mm:ss格式的类型 time或者null,空
            return bpm.validator.validRegOrNull(obj, /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/, '必须为时间格式或空');
        },
        isChinese: function (obj) {//判断输入的字符是否为中文 cchar 
            return bpm.validator.validReg(obj, /^[\u0391-\uFFE5]+$/, '必须为中文');
        },
        isChineseOrNull: function (obj) {//判断输入的字符是否为中文 cchar或者null,空
            return bpm.validator.validRegOrNull(obj, /^[\u0391-\uFFE5]+$/, '必须为中文或空');
        },
        isZip: function (obj) {//判断输入的邮编(只能为六位)是否正确 zip
            return bpm.validator.validReg(obj, /^\d{6}$/, '必须为邮编格式');
        },
        isZipOrNull: function (obj) {//判断输入的邮编(只能为六位)是否正确 zip或者null,空
            return bpm.validator.validRegOrNull(obj, /^\d{6}$/, '必须为邮编格式或空');
        },
        isDouble: function (obj) {//判断输入的字符是否为双精度 double
            return bpm.validator.validReg(obj, /^[-\+]?\d+(\.\d+)?$/, '必须为小数');
        },
        isDoubleOrNull: function (obj) {//判断输入的字符是否为双精度 double或者null,空
            return bpm.validator.validRegOrNull(obj, /^[-\+]?\d+(\.\d+)?$/, '必须为小数或空');
        },
        isIDCard: function (obj) {//判断是否为身份证 idcard
            return bpm.validator.validReg(obj, /^\d{15}(\d{2}[A-Za-z0-9;])?$/, '必须为身份证格式');
        },
        isIDCardOrNull: function (obj) {//判断是否为身份证 idcard或者null,空
            return bpm.validator.validRegOrNull(obj, /^\d{15}(\d{2}[A-Za-z0-9;])?$/, '必须为身份证格式或空');
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
            if (bpm.validator.isNotNull(obj) && !bpm.validator.isIP(obj).code) {
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
            if (bpm.validator.isNotNull(obj).code && !bpm.validator.isLenNum(obj)) {
                res.code = false;
                res.msg = '必须为' + n + '位数字或空';
            }
            return res;
        },
        isLenStr: function (obj, n) {//验证是否小于等于n位数的字符串 nchar
            var res = { code: true, msg: '' };
            obj = $.trim(obj);
            if (!bpm.validator.isNotNull(obj).code || obj.length > n) {
                res.code = false;
                res.msg = '必须小于等于' + n + '位字符';
            }
            return res;
        },
        isLenStrOrNull: function (obj, n) {//验证是否小于等于n位数的字符串 nchar或者null,空
            var res = { code: true, msg: '' };
            obj = $.trim(obj);
            if (bpm.validator.isNotNull(obj).code && obj.length > n) {
                res.code = false;
                res.msg = '必须小于等于' + n + '位字符或空';
            }
            return res;
        }
    };

})(window.jQuery, top.bpm);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.16
 * 描 述：弹层（基于layer.js-3.0.3）	
 */
(function ($, bpm) {
    "use strict";
    $.extend(bpm, {
        // 询问框
        layerConfirm: function (_msg, callback) {
            top.bpm.language.get(_msg, function (msg) {
                top.layer.confirm(msg, {
                    btn: ['确认', '取消'],
                    title: "提示",
                    icon: 0,
                    skin: 'layer',
                    success: function (layero, index) {
                        layero.find('.layui-layer-btn a').each(function () {
                            var $this = $(this);
                            var _text = $this.text();
                            top.bpm.language.get(_text, function (text) {
                                $this.text(text);
                            });

                        });
                        layero.find('.layui-layer-title').each(function () {
                            var $this = $(this);
                            var _text = $this.text();
                            top.bpm.language.get(_text, function (text) {
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
                end:false,
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
                    top['layer_' + dfop.id] = bpm.iframe($(layero).find('iframe').attr('id'), top.frames);
                    layero[0].layerid = 'layer_' + dfop.id;
                    //如果底部有按钮添加-确认并关闭窗口勾选按钮
                    if (!!dfop.btn && layero.find('.layer-btn-cb').length == 0) {
                        top.bpm.language.get('确认并关闭窗口', function (text) {
                            layero.find('.layui-layer-btn').append('<div class="checkbox layer-btn-cb" myIframeId="layer_' + dfop.id + '" ><label><input checked="checked" type="checkbox" >' + text + '</label></div>');
                        });
                        layero.find('.layui-layer-btn a').each(function () {
                            var $this = $(this);
                            var _text = $this.text();
                            top.bpm.language.get(_text, function (text) {
                                $this.text(text);
                            });

                        });
                    }
                    layero.find('.layui-layer-title').each(function () {
                        var $this = $(this);
                        var _text = $this.text();
                        top.bpm.language.get(_text, function (text) {
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
                        bpm.layerClose('',index);
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


})(window.jQuery, top.bpm);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.16
 * 描 述：ajax操作方法
 */
(function ($, bpm) {
    "use strict";
    var httpCode = {
        success: 200,
        fail: 400,
        exception: 500
    };
    var exres = { code: httpCode.exception, info: '通信异常，请联系管理员！' }
    $.extend(bpm, {
        // http 通信异常的时候调用此方法
        httpErrorLog: function (msg) {
            bpm.log(msg);
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
                    if (data.code == bpm.httpCode.exception) {
                        bpm.httpErrorLog(data.info);
                        data.info = '系统异常，请联系管理员！';
                    }
                    callback(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    bpm.httpErrorLog(textStatus);
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
                    if (data.code == bpm.httpCode.exception) {
                        bpm.httpErrorLog(data.info);
                        data.info = '系统异常，请联系管理员！';
                    }
                    res = data;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    bpm.httpErrorLog(textStatus);
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
                    if (data.code == bpm.httpCode.exception) {
                        bpm.httpErrorLog(data.info);
                        data.info = '系统异常，请联系管理员！';
                    }
                    callback(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    bpm.httpErrorLog(textStatus);
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
                    if (data.code == bpm.httpCode.exception) {
                        bpm.httpErrorLog(data.info);
                        data.info = '系统异常，请联系管理员！';
                    }
                    callback(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    bpm.httpErrorLog(textStatus);
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
                    if (res.code == bpm.httpCode.success) {
                        callback(res.data);
                    }
                    else {
                        bpm.httpErrorLog(res.info);
                        callback(null);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    bpm.httpErrorLog(textStatus);
                    callback(null);
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
        },

        deleteForm:function (url, param, callback) {
            bpm.loading(true, '正在删除数据');
            bpm.httpAsyncPost(url, param, function (res) {
                bpm.loading(false);
                if (res.code == bpm.httpCode.success) {
                    if (!!callback) {
                        callback(res);
                    }
                    bpm.alert.success(res.info);
                }
                else {
                    bpm.alert.error(res.info);
                    bpm.httpErrorLog(res.info);
                }
                layer.close(layer.index);
            });
        },
        postForm:function (url, param, callback) {
            bpm.loading(true, '正在提交数据');
            bpm.httpAsyncPost(url, param, function (res) {
                bpm.loading(false);
                if (res.code == bpm.httpCode.success) {
                    if (!!callback) {
                        callback(res);
                    }
                    bpm.alert.success(res.info);
                }
                else {
                    bpm.alert.error(res.info);
                    bpm.httpErrorLog(res.info);
                }
                layer.close(layer.index);
            });
        }
    });

})(window.jQuery, top.bpm);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.17
 * 描 述：获取客户端数据
 */
/*
`*******************登录后数据***********************
 *userinfo----------------------用户登录信息

 *modules-----------------------功能模块
 *modulesTree-------------------按照父节点的功能模块
 *modulesMap--------------------主键对应实例数据

 *******************使用时异步获取*******************
 *user--------------------------用户数据
    bpm.clientdata.getAsync('user', {
        userId: value,
        callback: function (item) {
            callback(item.F_RealName);
        }
    });
 *department--------------------部门数据
    bpm.clientdata.getAsync('department', {
        key: value,
        companyId: row.F_CompanyId,
        callback: function (item) {
            callback(item.F_FullName);
        }
    });
 *company----------------------公司
    bpm.clientdata.getAsync('company', {
            key: value,
            callback: function (_data) {
                _data.F_FullName
            }
   });
 *db--------------------------数据库
    bpm.clientdata.getAsync('db', {
            key: value,
            callback: function (_data) {
                _data.F_DBName
            }
   });
 *dataItem--------------------数据字典
 bpm.clientdata.getAsync('dataItem', {
            key: value,
            code:code,
            callback: function (_data) {
                _data.text
            }
   });
 *custmerData-----------------自定义数据
 bpm.clientdata.getAsync('custmerData', {
        url: url,
        key: value,
        valueId: valueId,
        callback: function (item) {
            callback(item.F_FullName);
        }
    });
*/

/*
*登录成功后自动去加载基础数据
*公司
*部门
*人员
*数据字典
*数据源数据（数据源数据设置不要过大）
*数据库连接数据（移动端不需要）
*/

(function ($, bpm) {
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

    bpm.clientdata = {
        init: function (callback) {
            initLoad(function (res) {
                callback(res);
                if (res) {// 开始异步加载数据
                    clientAsyncData.company.init();
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
//          bpm.httpAsyncGet($.rootUrl + '/SystemModule/Module/GetModuleList', function (res) {
//              if (res.code == bpm.httpCode.success) {
//                  clientData.modules = res.data;
//                  clientDataFn.modules.toMap();
//                  clientDataFn.modules.state = loadSate.yes;
//              }
//              else {
//                  clientData.modules = [];
//                  clientDataFn.modules.toMap();
//                  clientDataFn.modules.state = loadSate.fail;
//              }
//          });


//=====================================================================================
//clientData.modules = res.data;
//clientDataFn.modules.toMap();
//clientDataFn.modules.state = loadSate.yes;

            clientData.modules = [
    {
        "F_ModuleId": "698f872c-407b-471b-a28b-eee69a4e64ba",
        "F_ParentId": "0",
        "F_EnCode": "AgileDevelopment",
        "F_FullName": "敏捷开发",
        "F_Icon": "fa fa-send-o",
        "F_UrlAddress": "",
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 0,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2018-04-12 14:42:47",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-24 09:50:27",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "1",
        "F_ParentId": "0",
        "F_EnCode": "SysManage",
        "F_FullName": "系统管理",
        "F_Icon": "fa fa-desktop",
        "F_UrlAddress": "",
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": null,
        "F_CreateUserId": null,
        "F_CreateUserName": null,
        "F_ModifyDate": "2018-04-12 14:31:46",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "c89136f9-9c35-4c13-808d-19cd5be8a09f",
        "F_ParentId": "0",
        "F_EnCode": "CRMModule",
        "F_FullName": "CRM管理",
        "F_Icon": "fa fa-user",
        "F_UrlAddress": null,
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 1,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-25 18:28:06",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-15 12:03:08",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "2",
        "F_ParentId": "0",
        "F_EnCode": "BaseManage",
        "F_FullName": "单位组织",
        "F_Icon": "fa fa-coffee",
        "F_UrlAddress": "",
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": null,
        "F_CreateUserId": null,
        "F_CreateUserName": null,
        "F_ModifyDate": "2018-04-12 13:40:38",
        "F_ModifyUserId": "632cab6e-a691-495a-acf4-ebe37ba901af",
        "F_ModifyUserName": "陈小二"
    },
    {
        "F_ModuleId": "6",
        "F_ParentId": "0",
        "F_EnCode": "ReportManage",
        "F_FullName": "报表中心",
        "F_Icon": "fa fa-area-chart",
        "F_UrlAddress": null,
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 5,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": null,
        "F_CreateUserId": null,
        "F_CreateUserName": null,
        "F_ModifyDate": "2018-03-12 16:01:43",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "4",
        "F_ParentId": "0",
        "F_EnCode": "CommonInfo",
        "F_FullName": "公共信息",
        "F_Icon": "fa fa-globe",
        "F_UrlAddress": null,
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 6,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": null,
        "F_CreateUserId": null,
        "F_CreateUserName": null,
        "F_ModifyDate": "2018-01-11 15:33:52",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "b9f9df92-8ac5-46e2-90ac-68c5c2e034c3",
        "F_ParentId": "0",
        "F_EnCode": "WeChatManage",
        "F_FullName": "微信管理",
        "F_Icon": "fa fa-weixin",
        "F_UrlAddress": null,
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 7,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": "2015-12-22 16:42:12",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-01-09 16:40:19",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "264f05f7-67c5-4944-a910-f4f19f715920",
        "F_ParentId": "0",
        "F_EnCode": "StoredCardManage",
        "F_FullName": "储值管理",
        "F_Icon": "fa fa-address-card-o",
        "F_UrlAddress": null,
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 1,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 8,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-10 14:50:34",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-18 10:40:37",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "f67511d7-7f94-456f-b733-3c55112cefbf",
        "F_ParentId": "0",
        "F_EnCode": "pr",
        "F_FullName": "规格值列表",
        "F_Icon": "",
        "F_UrlAddress": "/BarModel/ProudertSpec/Index",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": null,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 8,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2018-03-28 12:33:48",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "7cbf51d5-640c-41af-b561-9cdd423a2d98",
        "F_ParentId": "0",
        "F_EnCode": "CouponModule",
        "F_FullName": "优惠券管理",
        "F_Icon": "fa fa-file",
        "F_UrlAddress": "/CouponModule/CouponManage/CouponList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": null,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 10,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-03-01 14:12:11",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-21 14:44:41",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "e31a0b94-4b4c-417c-b9d8-62bf9b322ad5",
        "F_ParentId": "0",
        "F_EnCode": "SupplierManage",
        "F_FullName": "供应商管理",
        "F_Icon": "fa fa-shopping-basket",
        "F_UrlAddress": "",
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 11,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2018-01-11 08:43:06",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "c922f201-afb5-4dc2-9ca3-32cf4c3c1d15",
        "F_ParentId": "0",
        "F_EnCode": "MaterialManage",
        "F_FullName": "商品管理",
        "F_Icon": "fa fa-cubes",
        "F_UrlAddress": "",
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 12,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2018-01-11 08:45:19",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "a19fe934-1fff-4100-bbca-e001bcaa4fc2",
        "F_ParentId": "0",
        "F_EnCode": "DiscountManage",
        "F_FullName": "折扣管理",
        "F_Icon": "fa fa-percent",
        "F_UrlAddress": null,
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 13,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": "2018-01-11 08:49:26",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-12 16:01:17",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "cb023d70-36bd-4dbd-8765-e61ece82aa99",
        "F_ParentId": "0",
        "F_EnCode": "ShopManage",
        "F_FullName": "门店管理",
        "F_Icon": "fa fa-shopping-bag",
        "F_UrlAddress": "",
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 14,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2018-01-18 14:28:28",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "76bcab98-80cf-4bb7-ac67-66d5d31ee0b1",
        "F_ParentId": "0",
        "F_EnCode": "ExpressModule",
        "F_FullName": "快递配送",
        "F_Icon": "fa fa-id-card-o",
        "F_UrlAddress": null,
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 16,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-02-06 19:34:00",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-02-06 19:40:02",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "ab5847e0-e091-4828-b161-f5ccddae6649",
        "F_ParentId": "0",
        "F_EnCode": "BarManage",
        "F_FullName": "吧台管理",
        "F_Icon": "fa fa-microchip",
        "F_UrlAddress": "",
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 16,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2018-03-27 15:25:46",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "e60e5342-83b9-47de-ab70-bd9c0b309a02",
        "F_ParentId": "0",
        "F_EnCode": "WeChatOrders",
        "F_FullName": "订单管理",
        "F_Icon": "fa fa-weixin",
        "F_UrlAddress": null,
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 17,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-02-28 17:18:55",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-14 15:22:54",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "7ae94059-9aa5-48eb-8330-4e2a6565b193",
        "F_ParentId": "1",
        "F_EnCode": "AreaManage",
        "F_FullName": "行政区域",
        "F_Icon": "fa fa-leaf",
        "F_UrlAddress": "https://fanyi.baidu.com/translate",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "行政区域管理",
        "F_CreateDate": "2015-11-12 14:38:20",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-07-31 14:49:19",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "4efd37bf-e3ef-4ced-8248-58eba046d78b",
        "F_ParentId": "1",
        "F_EnCode": "DataItemManage",
        "F_FullName": "数据字典",
        "F_Icon": "fa fa-book",
        "F_UrlAddress": "/SystemModule/DataItem/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "通用数据字典",
        "F_CreateDate": "2015-11-12 14:37:04",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-06-13 17:06:08",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "7adc5a16-54a4-408e-a101-2ddab8117d67",
        "F_ParentId": "1",
        "F_EnCode": "CodeRule",
        "F_FullName": "单据编码",
        "F_Icon": "fa fa-barcode",
        "F_UrlAddress": "/SystemModule/CodeRule/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 3,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "自动产生号码",
        "F_CreateDate": "2015-11-12 14:47:51",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-06-13 17:21:35",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "91736eda-da51-4ff0-8c6d-fae446440d7d",
        "F_ParentId": "1",
        "F_EnCode": "DataItemClassify",
        "F_FullName": "字典分类",
        "F_Icon": "",
        "F_UrlAddress": "/SystemModule/DataItem/ClassifyIndex",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 3,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2018-06-13 17:15:12",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-07-31 15:00:24",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "21",
        "F_ParentId": "1",
        "F_EnCode": "SystemModule",
        "F_FullName": "系统功能",
        "F_Icon": "fa fa-navicon",
        "F_UrlAddress": "/SystemModule/Module/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 4,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "系统导航功能",
        "F_CreateDate": null,
        "F_CreateUserId": null,
        "F_CreateUserName": null,
        "F_ModifyDate": "2018-07-07 10:03:40",
        "F_ModifyUserId": "24a055d6-5924-44c5-be52-3715cdd68011",
        "F_ModifyUserName": "陈彬彬"
    },
    {
        "F_ModuleId": "f21fa3a0-c523-4d02-99ca-fd8dd3ae3d59",
        "F_ParentId": "1",
        "F_EnCode": "SystemLog",
        "F_FullName": "系统日志",
        "F_Icon": "fa fa-warning",
        "F_UrlAddress": "/SystemModule/Log/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 6,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "登录日志、操作日志。异常日志",
        "F_CreateDate": "2015-11-12 15:04:58",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-14 09:55:38",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "a8248cf8-c449-401a-95a8-c2fe8ea75937",
        "F_ParentId": "1",
        "F_EnCode": "CustmerQuery",
        "F_FullName": "自定义查询",
        "F_Icon": "fa fa-search",
        "F_UrlAddress": "/SystemModule/CustmerQuery/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 6,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": "2018-04-24 11:34:11",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-14 09:55:26",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "3e582caa-61ad-494f-ae0a-25f2a7e3953b",
        "F_ParentId": "1",
        "F_EnCode": "BasicFig",
        "F_FullName": "基础配置",
        "F_Icon": "fa fa-wrench",
        "F_UrlAddress": null,
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 8,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-03-14 09:42:38",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-14 09:54:57",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "71fdd51a-72d6-48a7-ac81-76817a54cbac",
        "F_ParentId": "1",
        "F_EnCode": "excelManage",
        "F_FullName": "Excel配置",
        "F_Icon": "fa fa-file-excel-o",
        "F_UrlAddress": "",
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 98,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": "配置excel的导入导出",
        "F_CreateDate": "2016-12-04 13:56:07",
        "F_CreateUserId": "632cab6e-a691-495a-acf4-ebe37ba901af",
        "F_CreateUserName": "陈小二",
        "F_ModifyDate": "2018-07-26 06:12:47",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "7cec0a0f-7204-4240-b009-312fa0c11cbf",
        "F_ParentId": "1",
        "F_EnCode": "DatabaseManage",
        "F_FullName": "数据管理",
        "F_Icon": "fa fa-database",
        "F_UrlAddress": "",
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 99,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2015-11-12 15:03:09",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-24 09:43:51",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "00b8c220-8fb5-47e8-b2eb-fbcaf56d9e5a",
        "F_ParentId": "1",
        "F_EnCode": "DataAuthorizeManage",
        "F_FullName": "数据权限管理",
        "F_Icon": "fa fa-briefcase",
        "F_UrlAddress": "/AuthorizeModule/DataAuthorize/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 100,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": "数据权限管理",
        "F_CreateDate": "2018-06-21 16:30:44",
        "F_CreateUserId": "65b8ade1-c8df-4485-a018-5e9764331e74",
        "F_CreateUserName": "力软框架开发组",
        "F_ModifyDate": "2018-03-14 09:53:30",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "90c1d32d-be34-4e23-919f-2b25e33fafa2",
        "F_ParentId": "1",
        "F_EnCode": "Interface",
        "F_FullName": "接口管理",
        "F_Icon": "fa fa-address-book",
        "F_UrlAddress": "/SystemModule/Interface/Index",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 100,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "对接口进行维护，用于数据接口管理",
        "F_CreateDate": "2018-07-03 17:53:22",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-07-04 10:44:28",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "8",
        "F_ParentId": "2",
        "F_EnCode": "CompanyManage",
        "F_FullName": "公司管理",
        "F_Icon": "fa fa-sitemap",
        "F_UrlAddress": "/OrganizationModule/Company/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": null,
        "F_CreateUserId": null,
        "F_CreateUserName": null,
        "F_ModifyDate": "2018-06-13 22:05:44",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "9",
        "F_ParentId": "2",
        "F_EnCode": "DepartmentManage",
        "F_FullName": "部门管理",
        "F_Icon": "fa fa-th-list",
        "F_UrlAddress": "/OrganizationModule/Department/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": null,
        "F_CreateUserId": null,
        "F_CreateUserName": null,
        "F_ModifyDate": "2018-06-13 22:10:02",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "0c941dbb-1e11-4f2a-b706-052d7324ee52",
        "F_ParentId": "2",
        "F_EnCode": "PostManage",
        "F_FullName": "岗位管理",
        "F_Icon": "fa fa-graduation-cap",
        "F_UrlAddress": "/OrganizationModule/Post/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 3,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "管理员工上下级关系",
        "F_CreateDate": "2018-05-03 11:45:16",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-06-13 22:23:49",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "11",
        "F_ParentId": "2",
        "F_EnCode": "RoleManage",
        "F_FullName": "角色管理",
        "F_Icon": "fa fa-paw",
        "F_UrlAddress": "/OrganizationModule/Role/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 4,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": null,
        "F_CreateUserId": null,
        "F_CreateUserName": null,
        "F_ModifyDate": "2018-06-21 17:49:55",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "10",
        "F_ParentId": "2",
        "F_EnCode": "UserManage",
        "F_FullName": "用户管理",
        "F_Icon": "fa fa-user",
        "F_UrlAddress": "/OrganizationModule/User/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 5,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": null,
        "F_CreateUserId": null,
        "F_CreateUserName": null,
        "F_ModifyDate": "2018-07-04 15:50:37",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "2ea2fda3-baa7-40b0-a747-d436c2e260c9",
        "F_ParentId": "2001e98b-78ef-4151-b73a-0ecdb365a1a2",
        "F_EnCode": "CardLog",
        "F_FullName": "储值卡操作日志",
        "F_Icon": null,
        "F_UrlAddress": "/StoredCardModel/CardLogManage/CardLogIndex",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-25 14:15:35",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-01-25 16:06:50",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "832dc1d1-d5a2-40c8-ab4c-5b5f21986067",
        "F_ParentId": "2001e98b-78ef-4151-b73a-0ecdb365a1a2",
        "F_EnCode": "SplitCardMergeLog",
        "F_FullName": "拆分/合并操作日志",
        "F_Icon": null,
        "F_UrlAddress": "/StoredCardModel/CardLogManage/SplitMergeLogIndex",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "拆分/合并操作日志",
        "F_CreateDate": "2018-01-25 14:17:59",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-01-25 17:24:12",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "bb30f1a8-db1b-49e7-a07a-f0d2d7ef2231",
        "F_ParentId": "24592451-af48-48ea-bd96-4feb23749542",
        "F_EnCode": "BarCategory",
        "F_FullName": "吧台分类",
        "F_Icon": "fa fa-inbox",
        "F_UrlAddress": "/MaterialModule/BarCategory/BarCategoryIndex",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 6,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-03-21 16:14:17",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-22 09:34:54",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "13314165-0e3e-4b39-9d10-efbc7248f01e",
        "F_ParentId": "24592451-af48-48ea-bd96-4feb23749542",
        "F_EnCode": "book_class_department",
        "F_FullName": "统计分类",
        "F_Icon": "fa fa-window-maximize",
        "F_UrlAddress": "/MaterialModule/book_class_department/BookClassDepartList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 7,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-12 11:08:14",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-03 18:09:04",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "f67fbf38-312a-4c0d-80b7-f1a5dc20c0a2",
        "F_ParentId": "24592451-af48-48ea-bd96-4feb23749542",
        "F_EnCode": "book_class_cls",
        "F_FullName": "营销分类",
        "F_Icon": "fa fa-id-card-o",
        "F_UrlAddress": "/MaterialModule/book_class_cls/BookClassClsList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 8,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-12 15:34:22",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-03 18:08:42",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "00ad9e86-e512-4682-9f4c-1e4725c7a439",
        "F_ParentId": "24592451-af48-48ea-bd96-4feb23749542",
        "F_EnCode": "book_class_display",
        "F_FullName": "陈列分类",
        "F_Icon": "fa fa-meetup",
        "F_UrlAddress": "/MaterialModule/book_class_display/BookClassDisplayList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 9,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-12 16:42:39",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-23 15:29:15",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "fea6016a-49d8-44d5-8309-30dd7c47a81c",
        "F_ParentId": "24592451-af48-48ea-bd96-4feb23749542",
        "F_EnCode": "book_class_clc",
        "F_FullName": "中图法分类",
        "F_Icon": "fa fa-superpowers",
        "F_UrlAddress": "/MaterialModule/book_class_clc/BookClassClcList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 10,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-12 18:47:55",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-03 09:41:02",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "255e70ec-f4d1-4a9a-a8b4-30df94ee6af4",
        "F_ParentId": "24592451-af48-48ea-bd96-4feb23749542",
        "F_EnCode": "AssociationAttributes",
        "F_FullName": "AssociationAttributes",
        "F_Icon": "fa fa-facebook-square",
        "F_UrlAddress": "/MaterialModule/关联规格/Index",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": null,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 11,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2018-03-22 16:34:11",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "ca171868-a5f0-405a-bc97-e4dd641fb0fc",
        "F_ParentId": "24592451-af48-48ea-bd96-4feb23749542",
        "F_EnCode": "BookClassMapping",
        "F_FullName": "分类对照表",
        "F_Icon": "fa fa-magic",
        "F_UrlAddress": "/MaterialModule/BookClassMapping/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 12,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-02-01 15:47:30",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-03 10:53:03",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "8870aeca-9ebd-4e43-b058-907ee1f83e95",
        "F_ParentId": "264f05f7-67c5-4944-a910-f4f19f715920",
        "F_EnCode": "AssignmentCard",
        "F_FullName": "储值批次管理",
        "F_Icon": "fa fa-address-book",
        "F_UrlAddress": "/StoredCardModel/AssignmentCardManage/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-11 10:33:51",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-03 14:47:09",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "cdce3d9a-de94-4999-9734-1da08166a3ed",
        "F_ParentId": "264f05f7-67c5-4944-a910-f4f19f715920",
        "F_EnCode": "StoredCardList",
        "F_FullName": "总部储值卡管理",
        "F_Icon": "fa fa-microchip",
        "F_UrlAddress": "/StoredCardModel/CardManage/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-10 15:05:58",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-02-05 16:26:16",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "f2f25171-fea5-482f-86d0-d3905bd10597",
        "F_ParentId": "264f05f7-67c5-4944-a910-f4f19f715920",
        "F_EnCode": "storeCardManage",
        "F_FullName": "门店储值卡管理",
        "F_Icon": "fa fa-angellist",
        "F_UrlAddress": "/StoredCardModel/StoreCardManage/Index",
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 3,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "门店储值卡管理",
        "F_CreateDate": "2018-01-31 15:42:25",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-02-05 16:26:36",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "24966a13-aa93-41c2-b808-1400a9b80dd2",
        "F_ParentId": "264f05f7-67c5-4944-a910-f4f19f715920",
        "F_EnCode": "CardSplit",
        "F_FullName": "储值卡拆分",
        "F_Icon": "fa fa-id-card",
        "F_UrlAddress": "/StoredCardModel/CardMergeSplitManage/SplitForm",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 4,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "储值卡拆分",
        "F_CreateDate": "2018-01-18 10:01:51",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-01-23 15:01:19",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "6956f325-c43c-44d5-8918-4aa1ee254299",
        "F_ParentId": "264f05f7-67c5-4944-a910-f4f19f715920",
        "F_EnCode": "MergeForm",
        "F_FullName": "储值卡合并",
        "F_Icon": "fa fa-id-card",
        "F_UrlAddress": "/StoredCardModel/CardMergeSplitManage/MergeForm",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 5,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "储值卡合并",
        "F_CreateDate": "2018-01-23 15:02:24",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-01-23 15:02:45",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "659327ee-49b2-4fb8-84cc-606b39fffced",
        "F_ParentId": "264f05f7-67c5-4944-a910-f4f19f715920",
        "F_EnCode": "BigCustomer",
        "F_FullName": "大客户",
        "F_Icon": "fa fa-address-book",
        "F_UrlAddress": "/StoredCardModel/BigCustomer/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 9,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "大客户列表",
        "F_CreateDate": "2018-01-29 14:36:40",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-02-05 16:27:10",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "2001e98b-78ef-4151-b73a-0ecdb365a1a2",
        "F_ParentId": "264f05f7-67c5-4944-a910-f4f19f715920",
        "F_EnCode": "CardLogManage",
        "F_FullName": "日志管理",
        "F_Icon": "fa fa-sticky-note-o",
        "F_UrlAddress": null,
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 11,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-25 11:50:37",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-02-27 11:43:43",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "c9af1339-40ef-4680-9a0c-abf889301d7e",
        "F_ParentId": "3d72df35-426a-4ddd-8c1c-ef45629f0b1f",
        "F_EnCode": "paper",
        "F_FullName": "纸张信息",
        "F_Icon": "fa fa-file-o",
        "F_UrlAddress": "/SystemModule/DataItem/DetailIndex?itemCode=paper",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-11 09:25:56",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-01-11 09:30:05",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "664390c8-a078-464c-bcb6-5e93a435d2c9",
        "F_ParentId": "3d72df35-426a-4ddd-8c1c-ef45629f0b1f",
        "F_EnCode": "unit",
        "F_FullName": "包装单位",
        "F_Icon": "fa fa-cube",
        "F_UrlAddress": "/SystemModule/DataItem/DetailIndex?itemCode=unit",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-11 09:27:01",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-01-11 09:30:28",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "d7e8d459-f62c-4b84-b235-32b42e7311dd",
        "F_ParentId": "3d72df35-426a-4ddd-8c1c-ef45629f0b1f",
        "F_EnCode": "book_bkbind",
        "F_FullName": "装帧信息",
        "F_Icon": "fa fa-book",
        "F_UrlAddress": "/MaterialModule/BookBkbind/BookBkbindList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 3,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-11 09:36:14",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-03 16:10:07",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "3bfdb956-2b7c-44f3-a17c-2c12ac307f4c",
        "F_ParentId": "3d72df35-426a-4ddd-8c1c-ef45629f0b1f",
        "F_EnCode": "tb_pdt_series",
        "F_FullName": "商品套装",
        "F_Icon": "fa fa-telegram",
        "F_UrlAddress": "/MaterialModule/tb_pdt_series/TbpdtSeriesIndex",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 3,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-26 14:26:39",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-19 10:47:23",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "674aef6b-dbcc-4c04-8015-5db65d9aee1b",
        "F_ParentId": "3d72df35-426a-4ddd-8c1c-ef45629f0b1f",
        "F_EnCode": "book_bksize",
        "F_FullName": "开本资料",
        "F_Icon": "fa fa-file-excel-o",
        "F_UrlAddress": "/MaterialModule/book_bksize/BookbksizeList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 4,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-11 11:00:17",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-29 16:11:36",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "1ec05380-4ff8-434c-8b2a-3597380fd03b",
        "F_ParentId": "3d72df35-426a-4ddd-8c1c-ef45629f0b1f",
        "F_EnCode": "book_language",
        "F_FullName": "语种",
        "F_Icon": "fa fa-etsy",
        "F_UrlAddress": "/MaterialModule/book_language/BookLanguageList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 5,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-11 15:02:01",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-03 16:06:45",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "236ec9fa-97ee-4bef-879a-b1d760618ad8",
        "F_ParentId": "3d72df35-426a-4ddd-8c1c-ef45629f0b1f",
        "F_EnCode": "tb_currency",
        "F_FullName": "货币单位",
        "F_Icon": "fa fa-cc-visa",
        "F_UrlAddress": "/MaterialModule/tb_currency/TbcurrencyList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 6,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-11 15:28:26",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-03 16:07:32",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "b2a3728b-09b2-425a-a357-c909a90cc340",
        "F_ParentId": "3d72df35-426a-4ddd-8c1c-ef45629f0b1f",
        "F_EnCode": "ProductList",
        "F_FullName": "类型下商品",
        "F_Icon": null,
        "F_UrlAddress": "/MaterialModule/tb_pdt_type/ProductList",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 9,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": "2018-03-24 14:47:12",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-24 14:57:48",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "01299e28-3565-401d-ab50-5d053570fb50",
        "F_ParentId": "3d72df35-426a-4ddd-8c1c-ef45629f0b1f",
        "F_EnCode": "tb_pdt_type",
        "F_FullName": "商品类型",
        "F_Icon": "fa fa-window-restore",
        "F_UrlAddress": "/MaterialModule/tb_pdt_type/TbpdtTypeList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 10,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-16 18:23:34",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-03 16:08:19",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "086a51bd-ac4f-4a49-8c2e-669ac4f3540e",
        "F_ParentId": "3d72df35-426a-4ddd-8c1c-ef45629f0b1f",
        "F_EnCode": "GetRelationList",
        "F_FullName": "类型关联规格列表",
        "F_Icon": null,
        "F_UrlAddress": "/MaterialModule/tb_pdt_type/RelationList",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 11,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": "2018-03-22 19:06:35",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-23 11:38:35",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "4b83696f-3099-4358-9139-dec3af546386",
        "F_ParentId": "3d72df35-426a-4ddd-8c1c-ef45629f0b1f",
        "F_EnCode": "tb_pdt_brand",
        "F_FullName": "商品品牌",
        "F_Icon": "fa fa-wpexplorer",
        "F_UrlAddress": "/MaterialModule/tb_pdt_brand/TbPdtBrandList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 11,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-17 11:11:12",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-03 16:09:11",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "477627d7-42b0-4d88-b715-f34ee43bf373",
        "F_ParentId": "3d72df35-426a-4ddd-8c1c-ef45629f0b1f",
        "F_EnCode": "RelationItem",
        "F_FullName": "类型关联规格操作列表",
        "F_Icon": null,
        "F_UrlAddress": "/MaterialModule/tb_pdt_type/RelationItem",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 12,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": "2018-03-23 14:21:34",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-23 14:31:42",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "8d1bf7e2-e52f-4efa-9ca5-c65c62052f3c",
        "F_ParentId": "3d72df35-426a-4ddd-8c1c-ef45629f0b1f",
        "F_EnCode": "tb_pdt_tag",
        "F_FullName": "商品标签",
        "F_Icon": "fa fa-braille",
        "F_UrlAddress": "/MaterialModule/tb_pdt_tag/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": null,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 12,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2018-01-18 10:30:54",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "6a938117-a4cb-4833-bf1c-2f4859c8321a",
        "F_ParentId": "3e582caa-61ad-494f-ae0a-25f2a7e3953b",
        "F_EnCode": "TbOdrPayment",
        "F_FullName": "支付方式",
        "F_Icon": "fa fa-eraser",
        "F_UrlAddress": "/WeChatModule/tb_odr_payment/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-02-28 17:49:31",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-16 11:08:37",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "09193a49-f9f4-42f9-9e72-290a9049bcbb",
        "F_ParentId": "3e582caa-61ad-494f-ae0a-25f2a7e3953b",
        "F_EnCode": "tb_pos_server",
        "F_FullName": "POS配置",
        "F_Icon": "fa fa-cc-diners-club",
        "F_UrlAddress": "/ShopModule/PosServer/ServerList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-19 16:32:55",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-26 14:30:39",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "65e62f09-76cf-45fc-9191-287e5b079f70",
        "F_ParentId": "3e582caa-61ad-494f-ae0a-25f2a7e3953b",
        "F_EnCode": "TbOdrConfig",
        "F_FullName": "订单设置",
        "F_Icon": "fa fa-cog",
        "F_UrlAddress": "/WeChatModule/TbOdrConfig/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-02-28 18:19:21",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-14 09:43:32",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "da7b4f0f-d27b-42ea-9a85-483a75d3f2b5",
        "F_ParentId": "3e582caa-61ad-494f-ae0a-25f2a7e3953b",
        "F_EnCode": "tb_client",
        "F_FullName": "客户端配置",
        "F_Icon": "fa fa-user-circle",
        "F_UrlAddress": "/ShopModule/PosClient/ClientList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 3,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-20 10:35:55",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-26 16:49:20",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "7d1500de-5b0a-43f2-a7df-67a885425065",
        "F_ParentId": "3e582caa-61ad-494f-ae0a-25f2a7e3953b",
        "F_EnCode": "654654656646",
        "F_FullName": "64565465465",
        "F_Icon": "为太热太热",
        "F_UrlAddress": "5465654656",
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 645645656,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "有人也一天一天不容易",
        "F_CreateDate": "2018-04-03 14:37:12",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "b1fb741f-e6ad-4329-a284-00b9756656ea",
        "F_ParentId": "530ac712-599a-41d1-863e-1fdb6d91bef9",
        "F_EnCode": "publisher_type",
        "F_FullName": "出版者类型",
        "F_Icon": "fa fa-book",
        "F_UrlAddress": "/PublishModule/publish_type/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2018-03-13 11:35:53",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "21e94ef8-2ebc-4613-b0d4-475196d05ad6",
        "F_ParentId": "530ac712-599a-41d1-863e-1fdb6d91bef9",
        "F_EnCode": "publisher",
        "F_FullName": "出版社资料",
        "F_Icon": "fa fa-building-o",
        "F_UrlAddress": "/PublishModule/publisher/PublisherIndex",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-03-13 11:44:39",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-28 11:43:07",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "4a81fc4f-01a0-4476-a8fb-789fa545976b",
        "F_ParentId": "530ac712-599a-41d1-863e-1fdb6d91bef9",
        "F_EnCode": "publisher_tag",
        "F_FullName": "标签管理",
        "F_Icon": "fa fa-book",
        "F_UrlAddress": "/SystemModule/DataItem/DetailIndex?itemCode=publisher_tag",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 3,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2018-03-13 11:45:18",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "06e93974-375c-44f8-9186-8a9628d0add8",
        "F_ParentId": "530ac712-599a-41d1-863e-1fdb6d91bef9",
        "F_EnCode": "bookpublisherorganization",
        "F_FullName": "出版社联合体",
        "F_Icon": "fa fa-address-book",
        "F_UrlAddress": "/MaterialModule/BookPublisherOrganization/BookPublisherOrganizationList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 4,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "出版社联合体",
        "F_CreateDate": "2018-03-15 11:12:16",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-04 10:27:15",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "92a535c9-4d4b-4500-968d-a142e671c09b",
        "F_ParentId": "6",
        "F_EnCode": "ReportCustmer",
        "F_FullName": "报表管理",
        "F_Icon": "fa fa-cogs",
        "F_UrlAddress": "/ReportModule/ReportManage/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "可自定义报表",
        "F_CreateDate": "2016-01-13 17:21:17",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-07-12 11:18:46",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "fcd05f77-20f3-4e0c-8f8b-afb2daf25e28",
        "F_ParentId": "6",
        "F_EnCode": "ReportCustmer",
        "F_FullName": "报表实例",
        "F_Icon": "fa fa-file-powerpoint-o",
        "F_UrlAddress": "",
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "自定义报表的一些实例",
        "F_CreateDate": "2018-06-09 09:41:08",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-07-12 11:19:47",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "c2da2f51-f9b2-4a0b-a8fe-1ab65caee7cb",
        "F_ParentId": "6",
        "F_EnCode": "ReportTemp",
        "F_FullName": "报表模板",
        "F_Icon": "fa fa-wpforms",
        "F_UrlAddress": "",
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 3,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2018-06-08 17:42:44",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-06-09 09:41:14",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "1f98c46c-72f1-4abb-b750-af1620d33c79",
        "F_ParentId": "698f872c-407b-471b-a28b-eee69a4e64ba",
        "F_EnCode": "CodeGenerator",
        "F_FullName": "代码生成器",
        "F_Icon": "fa fa-desktop",
        "F_UrlAddress": "http://news.baidu.com/",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 1,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "代码模板生成器",
        "F_CreateDate": "2018-06-08 16:55:37",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-08-13 21:17:56",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "dcad6b11-1c43-4170-a45d-59b48a27bd4e",
        "F_ParentId": "698f872c-407b-471b-a28b-eee69a4e64ba",
        "F_EnCode": "Icon",
        "F_FullName": "图标查看",
        "F_Icon": "fa fa-search",
        "F_UrlAddress": "/CodeGeneratorModule/Icon/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 1,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 97,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "对字体图标的查看",
        "F_CreateDate": "2018-05-03 11:00:50",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-05-04 10:44:37",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "9f70b427-9c46-4d70-8f5c-4e7e7c48571c",
        "F_ParentId": "698f872c-407b-471b-a28b-eee69a4e64ba",
        "F_EnCode": "JsDemo",
        "F_FullName": "插件演示",
        "F_Icon": "fa fa-send-o",
        "F_UrlAddress": "/CodeGeneratorModule/PluginDemo/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 1,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 98,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "演示JS插件页面",
        "F_CreateDate": "2016-11-02 10:29:53",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-05-03 10:58:43",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "958bbcee-fb1d-4e71-b9fc-fefb65f1ac8a",
        "F_ParentId": "698f872c-407b-471b-a28b-eee69a4e64ba",
        "F_EnCode": "DemoManage",
        "F_FullName": "开发示例",
        "F_Icon": "fa fa-window-restore",
        "F_UrlAddress": "",
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 99,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "一些页面模板和示例功能展示",
        "F_CreateDate": "2018-05-03 10:55:57",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "69714858-9816-4b7c-98a1-cc76044cd099",
        "F_ParentId": "6da6a402-e2f4-4bff-bd73-34bddb4bc396",
        "F_EnCode": "MemberCardType",
        "F_FullName": "会员卡类型",
        "F_Icon": null,
        "F_UrlAddress": "/CRMModule/CardManage/CardTypeIndex",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "会员卡类型，普通卡/黄金卡/白金卡/钻石卡。。。等",
        "F_CreateDate": "2018-01-29 15:16:22",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-01 11:11:29",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "8592aa45-dac2-4660-904d-7c7337acd52b",
        "F_ParentId": "6da6a402-e2f4-4bff-bd73-34bddb4bc396",
        "F_EnCode": "MemberList",
        "F_FullName": "会员卡列表",
        "F_Icon": null,
        "F_UrlAddress": "/CRMModule/CardManage/MemberIndex",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "会员卡列表",
        "F_CreateDate": "2018-02-07 10:02:49",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-02 15:43:21",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "1b450f8c-6335-4183-82e8-e1f973c50477",
        "F_ParentId": "6da6a402-e2f4-4bff-bd73-34bddb4bc396",
        "F_EnCode": "CustomerManage",
        "F_FullName": "客户信息管理",
        "F_Icon": null,
        "F_UrlAddress": "/CRMModule/CrmManage/CustomerIndex",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 3,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "客户信息管理",
        "F_CreateDate": "2018-02-05 16:39:44",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-02-07 10:38:19",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "dd8f30ab-566a-47da-bd43-cd4e2cac3a25",
        "F_ParentId": "6da6a402-e2f4-4bff-bd73-34bddb4bc396",
        "F_EnCode": "CrmCustomerPayTax",
        "F_FullName": "会员缴费记录列表",
        "F_Icon": null,
        "F_UrlAddress": "/CRMModule/CrmCustomerPayTax/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 3,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "会员缴费记录列表",
        "F_CreateDate": "2018-02-07 10:08:14",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-02-07 10:23:38",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "1c26c6c2-d3f9-4627-9ee4-723c85f58c58",
        "F_ParentId": "6da6a402-e2f4-4bff-bd73-34bddb4bc396",
        "F_EnCode": "CrmTaxCode",
        "F_FullName": "缴费代码管理",
        "F_Icon": "",
        "F_UrlAddress": "/CRMModule/CrmTaxCode/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": null,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 4,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "缴费代码管理",
        "F_CreateDate": "2018-02-07 10:42:51",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "e2741390-fd85-4165-b5cb-b658ff478e02",
        "F_ParentId": "6da6a402-e2f4-4bff-bd73-34bddb4bc396",
        "F_EnCode": "MemberConsumeManage",
        "F_FullName": "会员消费管理",
        "F_Icon": "",
        "F_UrlAddress": "/CRMModule/CardManage/MemberConsumeIndex",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 6,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "会员消费管理",
        "F_CreateDate": "2018-02-07 14:53:01",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "86027428-d6f1-441c-b97e-986d08bc5c04",
        "F_ParentId": "6da6a402-e2f4-4bff-bd73-34bddb4bc396",
        "F_EnCode": "MemberLog",
        "F_FullName": "客户操作日志",
        "F_Icon": "",
        "F_UrlAddress": "/CRMModule/MemberLog/MemberLogIndex",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 10,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "客户操作日志",
        "F_CreateDate": "2018-03-07 11:10:42",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "23801918-10c6-4fe3-9f1c-554548834f16",
        "F_ParentId": "71fdd51a-72d6-48a7-ac81-76817a54cbac",
        "F_EnCode": "excelImport",
        "F_FullName": "导入配置",
        "F_Icon": "fa fa-sign-in",
        "F_UrlAddress": "/SystemModule/ExcelImport/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 0,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "导入excel文件配置",
        "F_CreateDate": "2016-12-04 14:00:20",
        "F_CreateUserId": "632cab6e-a691-495a-acf4-ebe37ba901af",
        "F_CreateUserName": "陈小二",
        "F_ModifyDate": "2018-05-27 15:06:28",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "b5762428-c123-4072-92c8-8a382af6a4ee",
        "F_ParentId": "71fdd51a-72d6-48a7-ac81-76817a54cbac",
        "F_EnCode": "excelExport",
        "F_FullName": "导出配置",
        "F_Icon": "fa fa-sign-out",
        "F_UrlAddress": "/SystemManage/ExcelExportSet/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "配置快速导出按钮",
        "F_CreateDate": "2016-12-07 16:11:45",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "7d0bb815-e3db-495d-b314-f434587c5bec",
        "F_ParentId": "76bcab98-80cf-4bb7-ac67-66d5d31ee0b1",
        "F_EnCode": "PluginShippingMode",
        "F_FullName": "配送方式",
        "F_Icon": "fa fa-blind",
        "F_UrlAddress": "/ExpressModule/PluginShippingMode/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-02-06 20:12:30",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-09 12:00:51",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "6fa7854b-0f3c-4519-8e94-8332ec242da1",
        "F_ParentId": "76bcab98-80cf-4bb7-ac67-66d5d31ee0b1",
        "F_EnCode": "PluginShippingCompany",
        "F_FullName": "物流公司",
        "F_Icon": "fa fa-telegram",
        "F_UrlAddress": "/ExpressModule/PluginShippingCompany/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-02-07 10:04:37",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-02-28 10:44:50",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "5a74c143-1e52-4b65-a457-9dec5ca9a1a9",
        "F_ParentId": "76bcab98-80cf-4bb7-ac67-66d5d31ee0b1",
        "F_EnCode": "PluginShippingTemplate",
        "F_FullName": "运费模板",
        "F_Icon": "fa fa-envelope-open",
        "F_UrlAddress": "/ExpressModule/FreightTemplate/FreightTempList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 3,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-02-07 16:38:37",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-16 11:17:07",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "34e362f4-c220-4fb7-b3f0-288c83417cb3",
        "F_ParentId": "7cec0a0f-7204-4240-b009-312fa0c11cbf",
        "F_EnCode": "DataBaseLink",
        "F_FullName": "数据库连接",
        "F_Icon": "fa fa-plug",
        "F_UrlAddress": "/SystemModule/DatabaseLink/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "动态链接数据库",
        "F_CreateDate": "2015-11-24 09:50:22",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-07-17 14:16:52",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "2f820f6e-ae2e-472f-82cc-0129a2a57597",
        "F_ParentId": "7cec0a0f-7204-4240-b009-312fa0c11cbf",
        "F_EnCode": "DataBaseTable",
        "F_FullName": "数据表管理",
        "F_Icon": "fa fa-table",
        "F_UrlAddress": "/SystemModule/DatabaseTable/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "数据库表结构",
        "F_CreateDate": "2015-11-24 09:53:42",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-07-17 14:18:36",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "d967ce5c-1bdf-4bbf-967b-876abc3ea245",
        "F_ParentId": "7cec0a0f-7204-4240-b009-312fa0c11cbf",
        "F_EnCode": "DataSource",
        "F_FullName": "数据源管理",
        "F_Icon": "fa fa-bullseye",
        "F_UrlAddress": "/SystemModule/DataSource/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 3,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "将数据以api形式对外开放",
        "F_CreateDate": "2016-09-06 16:18:44",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-07-17 14:14:10",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "2bcd0d25-ff40-4b45-9118-339289ee851d",
        "F_ParentId": "958bbcee-fb1d-4e71-b9fc-fefb65f1ac8a",
        "F_EnCode": "0001",
        "F_FullName": "接口测试",
        "F_Icon": "·",
        "F_UrlAddress": "/SOAModule/AppUserManage/TestAPI",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2018-04-03 14:37:12",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "63f31d99-0818-451c-be14-73cb65a978d8",
        "F_ParentId": "958bbcee-fb1d-4e71-b9fc-fefb65f1ac8a",
        "F_EnCode": "Token",
        "F_FullName": "测试Token",
        "F_Icon": "",
        "F_UrlAddress": "/StoredCardModel/CardAppManage/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2018-04-07 14:51:14",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "8de4d2bc-e320-4bb4-91cd-1e942c8b4595",
        "F_ParentId": "a19fe934-1fff-4100-bbca-e001bcaa4fc2",
        "F_EnCode": "plugin_discount",
        "F_FullName": "限时折扣活动",
        "F_Icon": "fa fa-money",
        "F_UrlAddress": "/DiscountModule/plugin_discount/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-22 16:08:02",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-01-25 09:57:49",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "036d7169-a931-4167-8420-45e585b12f2f",
        "F_ParentId": "ab5847e0-e091-4828-b161-f5ccddae6649",
        "F_EnCode": "ProductType",
        "F_FullName": "商品类型",
        "F_Icon": "fa fa-bookmark",
        "F_UrlAddress": "/BarModel/ProductType/ProductTypeList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-03-27 15:30:31",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-09 16:12:14",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "19661100-4733-4471-a2f6-eedf00b6884d",
        "F_ParentId": "ab5847e0-e091-4828-b161-f5ccddae6649",
        "F_EnCode": "ProudertSpec",
        "F_FullName": "规格列表",
        "F_Icon": null,
        "F_UrlAddress": "/BarModel/ProductType/ProudertSpecList",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": "2018-03-28 12:40:09",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-09 16:13:07",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "640f6267-edee-456d-af11-9cb714cca2b6",
        "F_ParentId": "ab5847e0-e091-4828-b161-f5ccddae6649",
        "F_EnCode": "ProductNextCategory",
        "F_FullName": "吧台二级分类",
        "F_Icon": null,
        "F_UrlAddress": "/BarModel/BarManage/ProductNextCategoryList",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 5,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": "2018-03-29 11:21:30",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-09 16:18:09",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "d31908a3-ba7c-44c7-bfed-ab22b6f891ac",
        "F_ParentId": "ab5847e0-e091-4828-b161-f5ccddae6649",
        "F_EnCode": "ProductCategory",
        "F_FullName": "吧台分类列表",
        "F_Icon": "fa fa-american-sign-language-interpreting",
        "F_UrlAddress": "/BarModel/BarManage/ProductCategoryList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 11,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-03-28 18:41:32",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-09 16:17:02",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "a5594d90-4cd9-4466-88c5-4b6892c21df8",
        "F_ParentId": "ab5847e0-e091-4828-b161-f5ccddae6649",
        "F_EnCode": "ProudertSpecValue",
        "F_FullName": "规格值列表",
        "F_Icon": null,
        "F_UrlAddress": "/BarModel/ProductType/ProudertSpecValueList",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 102,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": "2018-03-28 16:56:28",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-09 16:14:14",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "abce19c0-921d-41e1-9519-22f6c3333617",
        "F_ParentId": "ab5847e0-e091-4828-b161-f5ccddae6649",
        "F_EnCode": "CustomAttributes",
        "F_FullName": "自定义属性列表",
        "F_Icon": null,
        "F_UrlAddress": "/BarModel/ProductType/CustomAttributesList",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 106,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": "2018-03-29 14:35:08",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-09 16:15:40",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "56bed571-32c7-42f5-a01d-e8001843a171",
        "F_ParentId": "ab5847e0-e091-4828-b161-f5ccddae6649",
        "F_EnCode": "Bar_OrderManage",
        "F_FullName": "吧台订单列表",
        "F_Icon": "fa fa-file-text",
        "F_UrlAddress": "/OrderModule/Bar_OrderManage/Bar_OrderManageList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 109,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-04-09 15:28:22",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-09 16:04:42",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "60e2b647-7990-41fa-99d1-a48e9f10baf1",
        "F_ParentId": "ab5847e0-e091-4828-b161-f5ccddae6649",
        "F_EnCode": "ProductList",
        "F_FullName": "商品列表",
        "F_Icon": null,
        "F_UrlAddress": "/BarModel/BarManage/ProductList",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 109,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": "2018-03-30 09:49:09",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-09 16:19:05",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "a977d91e-77b7-4d60-a7ad-dfbc138f7c0a",
        "F_ParentId": "b9f9df92-8ac5-46e2-90ac-68c5c2e034c3",
        "F_EnCode": "企业号设置",
        "F_FullName": "企业号设置",
        "F_Icon": "fa fa-plug",
        "F_UrlAddress": "/WebChatModule/Token/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2015-12-22 17:20:21",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-05-03 11:20:16",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "5cc9d2d9-e097-4b51-9b9e-84ca9f1a0ab5",
        "F_ParentId": "b9f9df92-8ac5-46e2-90ac-68c5c2e034c3",
        "F_EnCode": "企业号部门",
        "F_FullName": "企业号部门",
        "F_Icon": "fa fa-sitemap",
        "F_UrlAddress": "",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": "",
        "F_CreateDate": "2015-12-22 17:20:38",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-07-19 10:42:47",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "4d0f2e44-f68f-41fd-a55c-40ac67453ef4",
        "F_ParentId": "b9f9df92-8ac5-46e2-90ac-68c5c2e034c3",
        "F_EnCode": "企业号成员",
        "F_FullName": "企业号成员",
        "F_Icon": "fa fa-users",
        "F_UrlAddress": "",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 3,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": "",
        "F_CreateDate": "2015-12-22 17:20:53",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-07-19 10:40:59",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "6da6a402-e2f4-4bff-bd73-34bddb4bc396",
        "F_ParentId": "c89136f9-9c35-4c13-808d-19cd5be8a09f",
        "F_EnCode": "MemberManage",
        "F_FullName": "客户管理",
        "F_Icon": null,
        "F_UrlAddress": null,
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "客户管理",
        "F_CreateDate": "2018-01-30 14:30:48",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-02-05 16:06:34",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "9a7f6721-44a6-4b41-bfb3-47ab3aeb2a39",
        "F_ParentId": "c89136f9-9c35-4c13-808d-19cd5be8a09f",
        "F_EnCode": "PointManage",
        "F_FullName": "积分管理",
        "F_Icon": null,
        "F_UrlAddress": "/CRMModule/PointManage/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 3,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-26 11:49:13",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-01-30 09:52:05",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "a8dbd5ca-fa87-441b-a56a-2d6a6f03146d",
        "F_ParentId": "c922f201-afb5-4dc2-9ca3-32cf4c3c1d15",
        "F_EnCode": "product",
        "F_FullName": "商品列表",
        "F_Icon": "fa fa-cube",
        "F_UrlAddress": "/MaterialModule/product/ProductList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 0,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-12 11:22:31",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-29 17:48:21",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "3d72df35-426a-4ddd-8c1c-ef45629f0b1f",
        "F_ParentId": "c922f201-afb5-4dc2-9ca3-32cf4c3c1d15",
        "F_EnCode": "Material_Base",
        "F_FullName": "基础信息",
        "F_Icon": "fa fa-book",
        "F_UrlAddress": null,
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-11 09:23:54",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-01-26 14:27:38",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "24592451-af48-48ea-bd96-4feb23749542",
        "F_ParentId": "c922f201-afb5-4dc2-9ca3-32cf4c3c1d15",
        "F_EnCode": "ClassifyManage",
        "F_FullName": "分类管理",
        "F_Icon": "fa fa-file",
        "F_UrlAddress": "",
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2018-03-03 10:51:31",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "08daf5f1-b86b-4ff0-a7b7-33424a468d01",
        "F_ParentId": "c922f201-afb5-4dc2-9ca3-32cf4c3c1d15",
        "F_EnCode": "ProductMerge",
        "F_FullName": "商品合并",
        "F_Icon": "fa fa-clipboard",
        "F_UrlAddress": "/MaterialModule/product/MergeProduct",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-02-27 11:30:00",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-03 16:54:29",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "530ac712-599a-41d1-863e-1fdb6d91bef9",
        "F_ParentId": "c922f201-afb5-4dc2-9ca3-32cf4c3c1d15",
        "F_EnCode": "PublishManage",
        "F_FullName": "出版社管理",
        "F_Icon": "fa fa-file",
        "F_UrlAddress": "",
        "F_Target": "expand",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 3,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2018-03-03 10:56:57",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "6fd174fb-d68d-491c-a6a9-992aa9737908",
        "F_ParentId": "c922f201-afb5-4dc2-9ca3-32cf4c3c1d15",
        "F_EnCode": "TbOdrPriceAdjust",
        "F_FullName": "商品调价单",
        "F_Icon": "fa fa-diamond",
        "F_UrlAddress": "/MaterialModule/TbOdrPriceAdjust/TbOdrPriceAdjustList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 6,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "商品调价单",
        "F_CreateDate": "2018-04-08 14:52:26",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-09 09:21:53",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "ab935217-2fcd-4a59-b127-26b053b135d7",
        "F_ParentId": "c922f201-afb5-4dc2-9ca3-32cf4c3c1d15",
        "F_EnCode": "TbOdrPriceAdjustAddList",
        "F_FullName": "新增商品调价",
        "F_Icon": null,
        "F_UrlAddress": "/MaterialModule/TbOdrPriceAdjust/TbOdrPriceAdjustAddList",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 9,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": "2018-04-08 16:47:22",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-04-08 16:52:44",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "b648a76d-bdf8-4ee6-8a63-14fed026e473",
        "F_ParentId": "c922f201-afb5-4dc2-9ca3-32cf4c3c1d15",
        "F_EnCode": "ProductManage",
        "F_FullName": "规格管理",
        "F_Icon": "fa fa-microchip",
        "F_UrlAddress": "/MaterialModule/ProductManage/ProductAttrList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 10,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-03-19 17:17:10",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-27 15:40:16",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "3960d4ea-8c31-4b3e-8a67-e59606259576",
        "F_ParentId": "c922f201-afb5-4dc2-9ca3-32cf4c3c1d15",
        "F_EnCode": "ProductAttrValue",
        "F_FullName": "规格值管理",
        "F_Icon": null,
        "F_UrlAddress": "/MaterialModule/ProductManage/ProductAttrVlaueList",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 106,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": "2018-03-21 14:34:10",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-22 14:48:44",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "dcf0e155-d709-4023-8bc8-e6c96bcb6642",
        "F_ParentId": "cb023d70-36bd-4dbd-8765-e61ece82aa99",
        "F_EnCode": "tb_sto_store",
        "F_FullName": "门店信息",
        "F_Icon": "fa fa-user-secret",
        "F_UrlAddress": "/ShopModule/StoStore/StoStoreIndex",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-18 16:11:18",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-21 11:38:24",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "18ede1d2-9af4-494b-bd50-e4ff3b739530",
        "F_ParentId": "cb023d70-36bd-4dbd-8765-e61ece82aa99",
        "F_EnCode": "StoBarCategory",
        "F_FullName": "门店吧台分类",
        "F_Icon": "",
        "F_UrlAddress": "/ShopModule/StoBarCategory/StoBarCategoryIndex",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": "",
        "F_CreateDate": "2018-03-22 10:20:11",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "5f2485d1-2813-4fd8-933f-2228d8e65dc2",
        "F_ParentId": "cb023d70-36bd-4dbd-8765-e61ece82aa99",
        "F_EnCode": "StoCategory",
        "F_FullName": "门店分类",
        "F_Icon": null,
        "F_UrlAddress": "/ShopModule/StoCategory/StoCategoryIndex",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 4,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": "2018-03-09 16:18:14",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-15 16:04:10",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "b6fa79cb-a396-4dc9-aed6-1213b86c5c0e",
        "F_ParentId": "cb023d70-36bd-4dbd-8765-e61ece82aa99",
        "F_EnCode": "StoTag",
        "F_FullName": "栏目管理",
        "F_Icon": "fa fa-file-text-o",
        "F_UrlAddress": "/ShopModule/StoTag/StoTagIndex",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 5,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-03-12 16:31:01",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-15 10:46:01",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "591d991a-7fd2-4c6d-9931-96346c7bfad0",
        "F_ParentId": "cb023d70-36bd-4dbd-8765-e61ece82aa99",
        "F_EnCode": "StoProduct",
        "F_FullName": "门店商品",
        "F_Icon": null,
        "F_UrlAddress": "/ShopModule/StoProduct/StoProductIndex",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 5,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": "门店商品",
        "F_CreateDate": "2018-03-09 16:31:26",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-19 16:26:23",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "648bc78c-e40a-4f9d-a79a-2fbd3034746f",
        "F_ParentId": "cb023d70-36bd-4dbd-8765-e61ece82aa99",
        "F_EnCode": "StoProductSku",
        "F_FullName": "门店商品SKU",
        "F_Icon": null,
        "F_UrlAddress": "/ShopModule/StoProductSku/StoProductSkuIndex",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 5,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": "2018-03-19 17:21:52",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-20 09:33:40",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "87c62548-cec4-4416-a294-8f072b42188e",
        "F_ParentId": "cb023d70-36bd-4dbd-8765-e61ece82aa99",
        "F_EnCode": "StoStoreTag",
        "F_FullName": "门店栏目管理",
        "F_Icon": "fa fa-gear",
        "F_UrlAddress": "/ShopModule/StoStoreTag/StoreTagList",
        "F_Target": "iframe",
        "F_IsMenu": 0,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 6,
        "F_DeleteMark": 0,
        "F_EnabledMark": 0,
        "F_Description": null,
        "F_CreateDate": "2018-03-12 15:16:20",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-29 09:41:38",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "30695383-527f-4915-ac73-2cc97ee3a7d3",
        "F_ParentId": "e31a0b94-4b4c-417c-b9d8-62bf9b322ad5",
        "F_EnCode": "supplier_type",
        "F_FullName": "供应商类型",
        "F_Icon": "fa fa-book",
        "F_UrlAddress": "/SystemModule/DataItem/DetailIndex?itemCode=supplier_type",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "",
        "F_CreateDate": "2018-01-11 09:20:52",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": null,
        "F_ModifyUserId": null,
        "F_ModifyUserName": null
    },
    {
        "F_ModuleId": "0b8eaeeb-2759-4125-9605-aedacc27a4fe",
        "F_ParentId": "e31a0b94-4b4c-417c-b9d8-62bf9b322ad5",
        "F_EnCode": "supplier",
        "F_FullName": "供应商资料",
        "F_Icon": "fa fa-industry",
        "F_UrlAddress": "/SupplierModule/supplier/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-11 14:34:07",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-09 11:39:24",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "7456f9d8-f832-4e70-8d96-ad13df38b579",
        "F_ParentId": "e60e5342-83b9-47de-ab70-bd9c0b309a02",
        "F_EnCode": "RefundList",
        "F_FullName": "退款单列表",
        "F_Icon": "fa fa-file-o",
        "F_UrlAddress": "/OrderModule/RefundManage/RefundList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 1,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-03-07 16:47:53",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-17 14:57:05",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "caf57d7d-992d-483c-af06-787aa98a6285",
        "F_ParentId": "e60e5342-83b9-47de-ab70-bd9c0b309a02",
        "F_EnCode": "ShipList",
        "F_FullName": "发货单列表",
        "F_Icon": "fa fa-file-o",
        "F_UrlAddress": "/OrderModule/ShipManage/ShipList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-03-08 17:08:59",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-13 18:07:28",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "39b6186a-1aa1-457a-b16c-86a8ac8f9295",
        "F_ParentId": "e60e5342-83b9-47de-ab70-bd9c0b309a02",
        "F_EnCode": "OrderManage",
        "F_FullName": "订单列表",
        "F_Icon": "fa fa-file-o",
        "F_UrlAddress": "/OrderModule/OrderManage/OrderList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-03-06 10:36:14",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-30 15:34:47",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "ffe6bbe0-1eac-4da4-a28f-a5ca3075b62b",
        "F_ParentId": "e60e5342-83b9-47de-ab70-bd9c0b309a02",
        "F_EnCode": "RefundList",
        "F_FullName": "退货单列表",
        "F_Icon": "fa fa-file-o",
        "F_UrlAddress": "/OrderModule/ReturnManage/ReturnList",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "退货单管理",
        "F_CreateDate": "2018-03-07 10:34:49",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-20 18:12:42",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "14112fc5-3e24-4b5d-b772-99daf54f9e43",
        "F_ParentId": "f2f25171-fea5-482f-86d0-d3905bd10597",
        "F_EnCode": "store_apply_card_log",
        "F_FullName": "储值卡申请列表",
        "F_Icon": "fa fa-file-o",
        "F_UrlAddress": "/StoredCardModel/StoreCardManage/ApplyIndex",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 2,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "储值卡申请管理",
        "F_CreateDate": "2018-01-31 18:20:48",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-02-27 11:41:43",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "68cb4b7a-5eb5-48a4-8baa-8193b7901357",
        "F_ParentId": "f2f25171-fea5-482f-86d0-d3905bd10597",
        "F_EnCode": "store_distribute_order",
        "F_FullName": "分发单列表",
        "F_Icon": "fa fa-file-o",
        "F_UrlAddress": "/StoredCardModel/StoreDistributeOrder/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 3,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "门店分发单管理",
        "F_CreateDate": "2018-02-02 18:53:12",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-01 10:55:42",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "bd43706a-6f97-4bf4-a50f-3d4fb7b0c67a",
        "F_ParentId": "f2f25171-fea5-482f-86d0-d3905bd10597",
        "F_EnCode": "storedCardManage",
        "F_FullName": "储值卡列表",
        "F_Icon": "fa fa-file-o",
        "F_UrlAddress": "/StoredCardModel/StoreCardManage/StoreCardIndex",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 0,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 4,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": "分店储值卡管理",
        "F_CreateDate": "2018-02-02 12:10:05",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-02-27 11:40:12",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "4d50a77c-f999-4586-85de-3d7f565fae04",
        "F_ParentId": "f2f25171-fea5-482f-86d0-d3905bd10597",
        "F_EnCode": "store_apply_transfer_log",
        "F_FullName": "调拨申请列表",
        "F_Icon": "fa fa-file-o",
        "F_UrlAddress": "/StoredCardModel/StoreApplytransferlog/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 4,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-02-05 17:38:46",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-02-28 18:25:03",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "2e079084-ae5a-454b-a64a-7778064cd016",
        "F_ParentId": "f2f25171-fea5-482f-86d0-d3905bd10597",
        "F_EnCode": "Store_transfer_order",
        "F_FullName": "调拨单列表",
        "F_Icon": "fa fa-file-o",
        "F_UrlAddress": "/StoredCardModel/StoreTransferOrder/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 5,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-02-05 17:30:58",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-03-01 10:12:24",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    },
    {
        "F_ModuleId": "fc7eabf9-f3f9-4119-9244-48174db0b6a2",
        "F_ParentId": "f2f25171-fea5-482f-86d0-d3905bd10597",
        "F_EnCode": "SellOrderManage",
        "F_FullName": "销售单列表",
        "F_Icon": "fa fa-id-card",
        "F_UrlAddress": "/StoredCardModel/SellOrderManage/Index",
        "F_Target": "iframe",
        "F_IsMenu": 1,
        "F_AllowExpand": 1,
        "F_IsPublic": 0,
        "F_AllowEdit": null,
        "F_AllowDelete": null,
        "F_SortCode": 10,
        "F_DeleteMark": 0,
        "F_EnabledMark": 1,
        "F_Description": null,
        "F_CreateDate": "2018-01-17 16:40:06",
        "F_CreateUserId": "System",
        "F_CreateUserName": "超级管理员",
        "F_ModifyDate": "2018-02-27 11:46:33",
        "F_ModifyUserId": "System",
        "F_ModifyUserName": "超级管理员"
    }
];
            clientDataFn.modules.toMap();
            clientDataFn.modules.state = loadSate.yes;

//=====================================================================================
        },
        toMap: function () {
            //转化成树结构 和 转化成字典结构
            var modulesTree = {};
            var modulesMap = {};
            var _len = clientData.modules.length;
            for (var i = 0; i < _len; i++) {
                var _item = clientData.modules[i];
                if (_item.F_EnabledMark == 1) {
                    modulesTree[_item.F_ParentId] = modulesTree[_item.F_ParentId] || [];
                    modulesTree[_item.F_ParentId].push(_item);
                    modulesMap[_item.F_ModuleId] = _item;
                }
            }
            clientData.modulesTree = modulesTree;
            clientData.modulesMap = modulesMap;
        }
    };
    // 登录用户信息
    clientDataFn.userinfo = {
        state: loadSate.no,
        init: function () {
            //初始化加载数据
            clientDataFn.userinfo.state = loadSate.ing;
            bpm.httpAsyncGet($.rootUrl + '/Login/GetUserInfo', function (res) {
                if (res.code == bpm.httpCode.success) {
                    clientData.userinfo = res.data;
                    clientDataFn.userinfo.state = loadSate.yes;
                }
                else {
                    clientDataFn.userinfo.state = loadSate.fail;
                }
            });
        }
    };

    /*******************使用时异步获取*******************/
    var storage = {
        get: function (name) {
            if (localStorage) {
                return JSON.parse(localStorage.getItem(name)) || {};
            }
            else {
                return clientData[name] || {};
            }
        },
        set: function (name, data) {
            if (localStorage) {
                localStorage.setItem(name, JSON.stringify(data));
            }
            else {
                clientData[name] = data;
            }
        }
    };
    // 公司信息
    clientAsyncData.company = {
        states: loadSate.no,
        init: function () {
            if (clientAsyncData.company.states == loadSate.no) {
                clientAsyncData.company.states = loadSate.ing;
                var ver = storage.get("companyData").ver || "";
                bpm.httpAsync('GET', top.$.rootUrl + '/OrganizationModule/Company/GetMap', { ver: ver }, function (data) {
                    if (!data) {
                        clientAsyncData.company.states = loadSate.fail;
                    } else {
                        if (data.ver) {
                            storage.set("companyData", data);
                        }
                        clientAsyncData.company.states = loadSate.yes;
                        clientAsyncData.department.init();
                    }
                });
            }
        },
        get: function (op) {
            clientAsyncData.company.init();
            if (clientAsyncData.company.states == loadSate.ing) {
                setTimeout(function () {
                    clientAsyncData.company.get(op);
                }, 100);// 如果还在加载100ms后再检测
            }
            else {
                var data = storage.get("companyData").data || {};
                op.callback(data[op.key] || {}, op);
            }
        },
        getAll: function (op) {
            clientAsyncData.company.init();
            if (clientAsyncData.company.states == loadSate.ing) {
                setTimeout(function () {
                    clientAsyncData.company.getAll(op);
                }, 100);// 如果还在加载100ms后再检测
            }
            else {
                var data = storage.get("companyData").data || {};
                op.callback(data, op);
            }
        }
    };
    // 部门信息
    clientAsyncData.department = {
        states: loadSate.no,
        init: function () {
            if (clientAsyncData.department.states == loadSate.no) {
                clientAsyncData.department.states = loadSate.ing;
                var ver = storage.get("departmentData").ver || "";
                bpm.httpAsync('GET', top.$.rootUrl + '/OrganizationModule/Department/GetMap', { ver: ver }, function (data) {
                    if (!data) {
                        clientAsyncData.department.states = loadSate.fail;
                    } else {
                        if (data.ver) {
                            storage.set("departmentData", data);
                        }
                        clientAsyncData.department.states = loadSate.yes;
                        clientAsyncData.user.init();
                    }
                });
            }
        },
        get: function (op) {
            clientAsyncData.department.init();
            if (clientAsyncData.department.states == loadSate.ing) {
                setTimeout(function () {
                    clientAsyncData.department.get(op);
                }, 100);// 如果还在加载100ms后再检测
            }
            else {
                var data = storage.get("departmentData").data || {};
                op.callback(data[op.key] || {}, op);
            }
        },
        getAll: function (op) {
            clientAsyncData.department.init();
            if (clientAsyncData.department.states == loadSate.ing) {
                setTimeout(function () {
                    clientAsyncData.department.getAll(op);
                }, 100);// 如果还在加载100ms后再检测
            }
            else {
                var data = storage.get("departmentData").data || {};
                op.callback(data, op);
            }
        }
    };
    // 人员信息
    clientAsyncData.user = {
        states: loadSate.no,
        init: function () {
            if (clientAsyncData.user.states == loadSate.no) {
                clientAsyncData.user.states = loadSate.ing;
                var ver = storage.get("userData").ver || "";
                bpm.httpAsync('GET', top.$.rootUrl + '/OrganizationModule/User/GetMap', { ver: ver }, function (data) {
                    if (!data) {
                        clientAsyncData.user.states = loadSate.fail;
                    } else {
                        if (data.ver) {
                            storage.set("userData", data);
                        }
                        clientAsyncData.user.states = loadSate.yes;
                        clientAsyncData.dataItem.init();
                    }
                });
            }
        },
        get: function (op) {
            clientAsyncData.user.init();
            if (clientAsyncData.user.states == loadSate.ing) {
                setTimeout(function () {
                    clientAsyncData.user.get(op);
                }, 100);// 如果还在加载100ms后再检测
            }
            else {
                var data = storage.get("userData").data || {};
                op.callback(data[op.key] || {}, op);
            }
        },
        getAll: function (op) {
            clientAsyncData.user.init();
            if (clientAsyncData.user.states == loadSate.ing) {
                setTimeout(function () {
                    clientAsyncData.user.getAll(op);
                }, 100);// 如果还在加载100ms后再检测
            }
            else {
                var data = storage.get("userData").data || {};
                op.callback(data, op);
            }
        }
    };
    // 数据字典
    clientAsyncData.dataItem = {
        states: loadSate.no,
        init: function () {
            if (clientAsyncData.dataItem.states == loadSate.no) {
                clientAsyncData.dataItem.states = loadSate.ing;
                var ver = storage.get("dataItemData").ver || "";
                bpm.httpAsync('GET', top.$.rootUrl + '/SystemModule/DataItem/GetMap', { ver: ver }, function (data) {
                    if (!data) {
                        clientAsyncData.dataItem.states = loadSate.fail;
                    } else {
                        if (data.ver) {
                            storage.set("dataItemData", data);
                        }
                        clientAsyncData.dataItem.states = loadSate.yes;
                        clientAsyncData.db.init();
                    }
                });
            }
        },
        get: function (op) {
            clientAsyncData.dataItem.init();
            if (clientAsyncData.dataItem.states == loadSate.ing) {
                setTimeout(function () {
                    clientAsyncData.dataItem.get(op);
                }, 100);// 如果还在加载100ms后再检测
            }
            else {
                var data = storage.get("dataItemData").data || {};

                // 数据字典翻译
                var _item = clientAsyncData.dataItem.find(op.key, data[op.code] || {});
                if (_item) {
                    top.bpm.language.get(_item.text, function (text) {
                        _item.text = text;
                        op.callback(_item, op);
                    });
                }
                else {
                    op.callback({}, op);
                }
            }
        },
        getAll: function (op) {
            clientAsyncData.dataItem.init();
            if (clientAsyncData.dataItem.states == loadSate.ing) {
                setTimeout(function () {
                    clientAsyncData.dataItem.getAll(op);
                }, 100);// 如果还在加载100ms后再检测
            }
            else {
                var data = storage.get("dataItemData").data || {};
                var res = {};
                $.each(data[op.code] || {}, function (_index, _item) {
                    _item.text = top.bpm.language.getSyn(_item.text);
                    res[_index] = _item;
                });
                op.callback(res, op);
            }
        },
        gets: function (op) {
            clientAsyncData.dataItem.init();
            if (clientAsyncData.dataItem.states == loadSate.ing) {
                setTimeout(function () {
                    clientAsyncData.dataItem.get(op);
                }, 100);// 如果还在加载100ms后再检测
            }
            else {
                var data = storage.get("dataItemData").data || {};

                var keyList = op.key.split(',');
                var _text = []
                $.each(keyList, function (_index, _item) {
                    var _item = clientAsyncData.dataItem.find(_item, data[op.code] || {});
                    top.bpm.language.get(_item.text, function (text) {
                        _text.push(text);
                    });
                });
                op.callback(String(_text), op);
            }
        },
        find: function (key, data) {
            var res = {};
            for (var id in data) {
                if (data[id].value == key) {
                    res = data[id];


                    break;
                }
            }
            return res;
        },
        update: function () {
            clientAsyncData.dataItem.states = loadSate.no;
            clientAsyncData.dataItem.init();
        }
    };
    // 数据库连接数据
    clientAsyncData.db = {
        states: loadSate.no,
        init: function () {
            if (clientAsyncData.db.states == loadSate.no) {
                clientAsyncData.db.states = loadSate.ing;
                var ver = storage.get("dbData").ver || "";
                bpm.httpAsync('GET', top.$.rootUrl + '/SystemModule/DatabaseLink/GetMap', { ver: ver }, function (data) {
                    if (!data) {
                        clientAsyncData.db.states = loadSate.fail;
                    } else {
                        if (data.ver) {
                            storage.set("dbData", data);
                        }
                        clientAsyncData.db.states = loadSate.yes;
                    }
                });
            }
        },
        get: function (op) {
            clientAsyncData.db.init();
            if (clientAsyncData.db.states == loadSate.ing) {
                setTimeout(function () {
                    clientAsyncData.db.get(op);
                }, 100);// 如果还在加载100ms后再检测
            }
            else{
                var data = storage.get("dbData").data || {};
                op.callback(data[op.key] || {}, op);
            }
        },
        getAll: function (op) {
            clientAsyncData.db.init();
            if (clientAsyncData.db.states == loadSate.ing) {
                setTimeout(function () {
                    clientAsyncData.db.getAll(op);
                }, 100);// 如果还在加载100ms后再检测
            }
            else {
                var data = storage.get("dbData").data || {};
                op.callback(data, op);
            }
        }
    };
    // 数据源数据
    clientAsyncData.sourceData = {
        states: {},
        get: function (op) {
            if (clientAsyncData.sourceData.states[op.code] == undefined || clientAsyncData.sourceData.states[op.code] == loadSate.no) {
                clientAsyncData.sourceData.states[op.code] = loadSate.ing;
                clientAsyncData.sourceData.load(op.code);
            }

            if (clientAsyncData.sourceData.states[op.code] == loadSate.ing) {
                setTimeout(function () {
                    clientAsyncData.sourceData.get(op);
                }, 100);// 如果还在加载100ms后再检测
            }
            else {
                var data = storage.get("sourceData_" + op.code).data || [];
                if (!!data) {
                    op.callback(clientAsyncData.sourceData.find(op.key, op.keyId, data) || {}, op);
                } else {
                    op.callback({}, op);
                }
            }
        },
        getAll: function (op) {
            if (clientAsyncData.sourceData.states[op.code] == undefined || clientAsyncData.sourceData.states[op.code] == loadSate.no) {
                clientAsyncData.sourceData.states[op.code] = loadSate.ing;
                clientAsyncData.sourceData.load(op.code);
            }

            if (clientAsyncData.sourceData.states[op.code] == loadSate.ing) {
                setTimeout(function () {
                    clientAsyncData.sourceData.getAll(op);
                }, 100);// 如果还在加载100ms后再检测
            }
            else if (clientAsyncData.sourceData.states[op.code] == loadSate.yes) {
                var data = storage.get("sourceData_" + op.code).data || [];

                if (!!data) {
                    op.callback(data, op);
                } else {
                    op.callback({}, op);
                }
            }
        },
        load: function (code) {
            var ver = storage.get("sourceData_" + code).ver || "";
            bpm.httpAsync('GET', top.$.rootUrl + '/SystemModule/DataSource/GetMap', { code: code, ver: ver }, function (data) {
                if (!data) {
                    clientAsyncData.sourceData.states[code] = loadSate.fail;
                } else {
                    if (data.ver) {
                        storage.set("sourceData_" + code, data);
                    }
                    clientAsyncData.sourceData.states[code] = loadSate.yes;
                }
            });
        },
        find: function (key, keyId, data) {
            var res = {};
            for (var i = 0, l = data.length; i < l; i++) {
                if (data[i][keyId] == key) {
                    res = data[i];
                    break;
                }
            }
            return res;
        }
    };
    // 获取自定义数据 url key valueId
    clientAsyncData.custmerData = {
        states: {},
        get: function (op) {
            if (clientAsyncData.custmerData.states[op.url] == undefined || clientAsyncData.custmerData.states[op.url] == loadSate.no) {
                clientAsyncData.custmerData.states[op.url] = loadSate.ing;
                clientAsyncData.custmerData.load(op.url);
            }
            if (clientAsyncData.custmerData.states[op.url] == loadSate.ing) {
                setTimeout(function () {
                    clientAsyncData.custmerData.get(op);
                }, 100);// 如果还在加载100ms后再检测
            }
            else {
                var data = clientData[op.url] || [];
                if (!!data) {
                    op.callback(clientAsyncData.custmerData.find(op.key, op.keyId, data) || {}, op);
                } else {
                    op.callback({}, op);
                }
            }
        },
        gets: function (op) {
            if (clientAsyncData.custmerData.states[op.url] == undefined || clientAsyncData.custmerData.states[op.url] == loadSate.no) {
                clientAsyncData.custmerData.states[op.url] = loadSate.ing;
                clientAsyncData.custmerData.load(op.url);
            }
            if (clientAsyncData.custmerData.states[op.url] == loadSate.ing) {
                setTimeout(function () {
                    clientAsyncData.custmerData.get(op);
                }, 100);// 如果还在加载100ms后再检测
            }
            else {
                var data = clientData[op.url] || [];
                if (!!data) {
                    var keyList = op.key.split(',');
                    var _text = []
                    $.each(keyList, function (_index, _item) {
                        var _item = clientAsyncData.custmerData.find(op.key, op.keyId, data) || {};
                        if (_item[op.textId]) {
                            _text.push(_item[op.textId]);
                        }
                       
                    });
                    op.callback(String(_text), op); 
                } else {
                    op.callback('', op);
                }
            }
        },
        getAll: function (op) {
            if (clientAsyncData.custmerData.states[op.url] == undefined || clientAsyncData.custmerData.states[op.url] == loadSate.no) {
                clientAsyncData.custmerData.states[op.url] = loadSate.ing;
                clientAsyncData.custmerData.load(op.url);
            }
            if (clientAsyncData.custmerData.states[op.url] == loadSate.ing) {
                setTimeout(function () {
                    clientAsyncData.custmerData.get(op);
                }, 100);// 如果还在加载100ms后再检测
            }
            else {
                var data = clientData[op.url] || [];
                if (!!data) {
                    op.callback(data, op);
                } else {
                    op.callback([], op);
                }
            }
        },
        load: function (url) {
            bpm.httpAsync('GET', top.$.rootUrl + url, {}, function (data) {
                if (!!data) {
                    clientData[url] = data;
                }
                clientAsyncData.custmerData.states[url] = loadSate.yes;
            });
        },
        find: function (key, keyId, data) {
            var res = {};
            for (var i = 0, l = data.length; i < l; i++) {
                if (data[i][keyId] == key) {
                    res = data[i];
                    break;
                }
            }
            return res;
        }
    };
})(window.jQuery, top.bpm);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.05.10
 * 描 述：客户端语言包加载（菜单，tab条）
 */
(function ($, bpm) {
    "use strict";

    bpm.language = {
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
})(window.jQuery, top.bpm);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.22
 * 描 述：Tree	
 */
(function ($, bpm) {
    "use strict";
    $.tree = {
        getItem: function (path, dfop) {
            var ap = path.split(".");
            var t = dfop.data;
            for (var i = 0; i < ap.length; i++) {
                if (i == 0) {
                    t = t[ap[i]];
                }
                else {
                    t = t.ChildNodes[ap[i]];
                }
            }
            return t;
        },
        render: function ($self) {
            var dfop = $self[0]._tree.dfop;
            // 渲染成树
            var $treeRoot = $('<ul class="tree-root" ></ul>');
            var _len = dfop.data.length;
            for (var i = 0; i < _len; i++) {
                var $node = $.tree.renderNode(dfop.data[i], 0, i, dfop);
                $treeRoot.append($node);
            }
            $self.append($treeRoot);
            $self.scroll();
            dfop = null;
        },
        renderNode: function (node, deep, path, dfop) {
            if (node.shide) {
                return "";
            }

            node._deep = deep;
            node._path = path;
            // 渲染成单个节点
            var nid = node.id.replace(/[^\w]/gi, "_");
            var title = node.title || node.text;
            var $node = $('<li class="tree-node"></li>');
            var $nodeDiv = $('<div id="' + dfop.id + '_' + nid + '" tpath="' + path + '" title="' + title + '"  dataId="' + dfop.id + '"  class="tree-node-el" ></div>');
            if (node.hasChildren) {
                var c = (node.isexpand || dfop.isAllExpand) ? 'tree-node-expanded' : 'tree-node-collapsed';
                $nodeDiv.addClass(c);
            }
            else {
                $nodeDiv.addClass('tree-node-leaf');
            }
            // span indent
            var $span = $('<span class="tree-node-indent"></span>');
            if (deep == 1) {
                $span.append('<img class="tree-icon" src="' + dfop.cbiconpath + 's.gif"/>');
            }
            else if (deep > 1) {
                $span.append('<img class="tree-icon" src="' + dfop.cbiconpath + 's.gif"/>');
                for (var j = 1; j < deep; j++) {
                    $span.append('<img class="tree-icon" src="' + dfop.cbiconpath + 's.gif"/>');
                }
            }
            $nodeDiv.append($span);
            // img
            var $img = $('<img class="tree-ec-icon" src="' + dfop.cbiconpath + 's.gif"/>');
            $nodeDiv.append($img);
            // checkbox
            if (node.showcheck) {
                if (node.checkstate == null || node.checkstate == undefined) {
                    node.checkstate = 0;
                }
                var $checkBox = $('<img  id="' + dfop.id + '_' + nid + '_cb" + class="tree-node-cb" src="' + dfop.cbiconpath + dfop.icons[node.checkstate] + '" />');
                $nodeDiv.append($checkBox);
            }
            // 显示的小图标
            if (node.icon != -1) {
                if (!!node.icon) {
                    $nodeDiv.append('<i class="' + node.icon + '"></i>&nbsp;');
                } else if (node.hasChildren) {
                    if (node.isexpand || dfop.isAllExpand) {
                        $nodeDiv.append('<i class="fa fa-folder-open" style="width:15px">&nbsp;</i>');
                    }
                    else {
                        $nodeDiv.append('<i class="fa fa-folder" style="width:15px">&nbsp;</i>');
                    }
                }
                else {
                    $nodeDiv.append('<i class="fa fa-file-o"></i>&nbsp;');
                }
            }
            // a
            var ahtml = '<a class="tree-node-anchor" href="javascript:void(0);">';
            ahtml += '<span data-value="' + node.id + '" class="tree-node-text" >' + node.text + '</span>';
            ahtml += '</a>';
            $nodeDiv.append(ahtml);
            // 节点事件绑定
            $nodeDiv.on('click', $.tree.nodeClick);

            if (!node.complete) {
                $nodeDiv.append('<div class="tree-loading"><img class="tree-ec-icon" src="http://ctc.qzonestyle.gtimg.cn/qzonestyle/qzone_client_v5/img/loading.gif"/></div>');
            }

            $node.append($nodeDiv);
            if (node.hasChildren) {
                var $treeChildren = $('<ul  class="tree-node-ct" >');
                if (!node.isexpand && !dfop.isAllExpand) {
                    $treeChildren.css('display', 'none');
                }
                if (node.ChildNodes) {
                    var l = node.ChildNodes.length;
                    for (var k = 0; k < l; k++) {
                        node.ChildNodes[k].parent = node;
                        var $childNode = $.tree.renderNode(node.ChildNodes[k], deep + 1, path + "." + k, dfop);
                        $treeChildren.append($childNode);
                    }
                    $node.append($treeChildren);
                }
            }
            node.render = true;
            dfop = null;
            return $node;
        },
        renderNodeAsync: function ($this, node, dfop) {
            var $treeChildren = $('<ul  class="tree-node-ct" >');
            if (!node.isexpand && !dfop.isAllExpand) {
                $treeChildren.css('display', 'none');
            }
            if (node.ChildNodes) {
                var l = node.ChildNodes.length;
                for (var k = 0; k < l; k++) {
                    node.ChildNodes[k].parent = node;
                    var $childNode = $.tree.renderNode(node.ChildNodes[k], node._deep + 1, node._path + "." + k, dfop);
                    $treeChildren.append($childNode);
                }
                $this.parent().append($treeChildren);
            }
            return $treeChildren;
        },
        renderToo: function ($self) {
            var dfop = $self[0]._tree.dfop;
            // 渲染成树
            var $treeRoot = $self.find('.tree-root');
            $treeRoot.html('');
            var _len = dfop.data.length;
            for (var i = 0; i < _len; i++) {
                var $node = $.tree.renderNode(dfop.data[i], 0, i, dfop);
                $treeRoot.append($node);
            }
            dfop = null;
        },
        nodeClick: function (e) {
            var et = e.target || e.srcElement;
            var $this = $(this);
            var $parent = $('#' + $this.attr('dataId'));
            var dfop = $parent[0]._tree.dfop;
            if (et.tagName == 'IMG') {
                var $et = $(et);
                var $ul = $this.next('.tree-node-ct');
                if ($et.hasClass("tree-ec-icon")) {
                    if ($this.hasClass('tree-node-expanded')) {
                        $ul.slideUp(200, function () {
                            $this.removeClass('tree-node-expanded');
                            $this.addClass('tree-node-collapsed');
                        });
                    }
                    else if ($this.hasClass('tree-node-collapsed')) {
                        // 展开
                        var path = $this.attr('tpath');
                        var node = $.tree.getItem(path, dfop);
                        if (!node.complete) {
                            if (!node._loading) {
                                node._loading = true;// 表示正在加载数据
                                $this.find('.tree-loading').show();
                                bpm.httpAsync('GET', dfop.url, { parentId: node.id }, function (data) {
                                    if (!!data) {
                                        node.ChildNodes = data;
                                        $ul = $.tree.renderNodeAsync($this, node, dfop);
                                        $ul.slideDown(200, function () {
                                            $this.removeClass('tree-node-collapsed');
                                            $this.addClass('tree-node-expanded');
                                        });
                                        node.complete = true;
                                        $this.find('.tree-loading').hide();
                                    }
                                    node._loading = false;
                                });
                            }
                        }
                        else {
                            $ul.slideDown(200, function () {
                                $this.removeClass('tree-node-collapsed');
                                $this.addClass('tree-node-expanded');
                            });
                        }                       
                    }

                }
                else if ($et.hasClass("tree-node-cb")) {
                    var path = $this.attr('tpath');
                    var node = $.tree.getItem(path, dfop);
                   
                    if (node.checkstate == 1) {
                        node.checkstate = 0;
                    }
                    else {
                        node.checkstate = 1;
                    }
                    $et.attr('src', dfop.cbiconpath + dfop.icons[node.checkstate]);
                    $.tree.checkChild($.tree.check, node, node.checkstate, dfop);
                    $.tree.checkParent($.tree.check, node, node.checkstate, dfop);
                    if (!!dfop.nodeCheck) {
                        dfop.nodeCheck(node, $this);
                    }
                }
            }
            else {
                var path = $this.attr('tpath');
                var node = $.tree.getItem(path, dfop);
                dfop.currentItem = node;
                $('#' + dfop.id).find('.tree-selected').removeClass('tree-selected');
                $this.addClass('tree-selected');
                if (!!dfop.nodeClick) {
                    dfop.nodeClick(node, $this);
                }
            }
            return false;
        },
        check: function (item, state, type, dfop) {
            var pstate = item.checkstate;
            if (type == 1) {
                item.checkstate = state;
            }
            else {// go to childnodes
                var cs = item.ChildNodes;
                var l = cs.length;
                var ch = true;
                for (var i = 0; i < l; i++) {
                    cs[i].checkstate = cs[i].checkstate || 0;
                    if ((state == 1 && cs[i].checkstate != 1) || state == 0 && cs[i].checkstate != 0) {
                        ch = false;
                        break;
                    }
                }
                if (ch) {
                    item.checkstate = state;
                }
                else {
                    item.checkstate = 2;
                }
            }
            //change show
            if (item.render && pstate != item.checkstate) {
                var nid = item.id.replace(/[^\w]/gi, "_");
                var et = $("#" + dfop.id + "_" + nid + "_cb");
                if (et.length == 1) {
                    et.attr("src", dfop.cbiconpath + dfop.icons[item.checkstate]);
                }
            }
        },
        checkParent: function (fn, node, state, dfop) {
            var p = node.parent;
            while (p) {
                var r = fn(p, state, 0, dfop);
                if (r === false) {
                    break;
                }
                p = p.parent;
            }
        },
        checkChild: function (fn, node, state, dfop) {
            if (fn(node, state, 1, dfop) != false) {
                if (node.ChildNodes != null && node.ChildNodes.length > 0) {
                    var cs = node.ChildNodes;
                    for (var i = 0, len = cs.length; i < len; i++) {
                        $.tree.checkChild(fn, cs[i], state, dfop);
                    }
                }
            }
        },

        search: function (keyword, data) {
            var res = false;
            $.each(data, function (i, row) {
                var flag = false;
                
                if (!bpm.validator.isNotNull(keyword).code || row.text.indexOf(keyword) != -1) {
                    
                    flag = true;
                }
                if (row.hasChildren) {
                    if ($.tree.search(keyword, row.ChildNodes)) {
                        flag = true;
                    }
                }
                if (flag) {
                    res = true;
                    row.isexpand = true;
                    row.shide = false;
                }
                else {
                    row.shide = true;
                }
            });
            return res;
        },
        findItem: function (data, id, value) {
            var _item = null;
            _fn(data, id, value);
            function _fn(_cdata, _id, _value) {
                for (var i = 0, l = _cdata.length; i < l; i++) {
                    if (_cdata[i][id] == value) {
                        _item = _cdata[i];
                        return true;
                    }
                    if (_cdata[i].hasChildren && _cdata[i].ChildNodes.length > 0) {
                        if (_fn(_cdata[i].ChildNodes, _id, _value)) {
                            return true;
                        }
                    }
                }
                return false;
            }
            return _item;
        },
        listTotree: function (data, parentId, id, text, value, check) {
            // 只适合小数据计算
            var resdata = [];
            var mapdata = {};
            for (var i = 0, l = data.length; i < l; i++) {
                var item = data[i];
                mapdata[item[parentId]] = mapdata[item[parentId]] || [];
                mapdata[item[parentId]].push(item);
            }
            _fn(resdata, '0');
            function _fn(_data, vparentId) {
                var pdata = mapdata[vparentId] || [];
                for (var j = 0, l = pdata.length; j < l; j++) {
                    var _item = pdata[j];
                    var _point = {
                        id: _item[id],
                        text: _item[text],
                        value: _item[value],
                        showcheck: check,
                        checkstate: false,
                        hasChildren: false,
                        isexpand: false,
                        complete: true,
                        ChildNodes: []
                    };
                    if (_fn(_point.ChildNodes, _item[id])) {
                        _point.hasChildren = true;
                        _point.isexpand = true;
                    }
                    _data.push(_point);
                }
                return _data.length > 0;
            }
            return resdata;
        },
        treeTotree: function (data, id, text, value, check, childId) {
            var resdata = [];
            _fn(resdata, data);
            function _fn(todata,fromdata) {
                for (var i = 0, l = fromdata.length; i < l; i++) {
                    var _item = fromdata[i];
                    var _point = {
                        id: _item[id],
                        text: _item[text],
                        value: _item[value],
                        showcheck: check,
                        checkstate: false,
                        hasChildren: false,
                        isexpand: true,
                        complete: true,
                        ChildNodes: []
                    };
                    if (_item[childId].length > 0) {
                        _point.hasChildren = true;
                        _fn(_point.ChildNodes, _item[childId]);
                    }
                    todata.push(_point);
                }
            }
            return resdata;
        },

        addNode: function ($self, node, Id, index) {// 下一版本完善
            var dfop = $self[0]._tree.dfop;
            if (!!Id)// 在最顶层
            {
                dfop.data.splice(index, 0, node);
                var $node = $.tree.renderNode(node, 0, index, dfop);
                if ($self.find('.tree-root>li').length == 0) {
                    $self.find('.tree-root>li').append($node);
                }
                else {
                    $self.find('.tree-root>li').eq(index).before($node);
                }

            }
            else {
                var $parentId = $self.find('#' + dfop.id + '_' + Id);
                var path = $parentId.attr('tpath');
                var $node = $.tree.renderNode(node, 0, path + '.' + index, dfop);
                if ($parentId.next().children().length == 0) {
                    $parentId.next().children().append($node);
                }
                else {
                    $parentId.next().children().eq(index).before($node);
                }
            }
        },
        setValue: function ($self) {
            var dfop = $self[0]._tree.dfop;
            if (dfop.data.length == 0) {
                setTimeout(function () {
                    $.tree.setValue($self);
                }, 100);
            }
            else {
                $self.find('span[data-value="' + dfop._value + '"]').trigger('click');
            }
        }
    };

    $.fn.tree = function (settings) {
        var dfop = {
            icons: ['checkbox_0.png', 'checkbox_1.png', 'checkbox_2.png'],
            method: "GET",
            url: false,
            param: null,
            /* [{
            id,
            text,
            value,
            showcheck,bool
            checkstate,int
            hasChildren,bool
            isexpand,bool
            complete,bool
            ChildNodes,[]
            }]*/
            data: [],
            isAllExpand: false,
            cbiconpath: top.$.rootUrl + '/Content/images/tree/',
            // 点击事件（节点信息）,节点$对象
            nodeClick: false,
            // 选中事件（节点信息）,节点$对象
            nodeCheck: false
            
        };
        $.extend(dfop, settings);
        var $self = $(this);
        dfop.id = $self.attr("id");
        if (dfop.id == null || dfop.id == "") {
            dfop.id = "tree" + new Date().getTime();
            $self.attr("id", dfop.id);
        }
        $self.html('');
        $self.addClass("tree");
        $self[0]._tree = { dfop: dfop };
        $self[0]._tree.dfop.backupData = dfop.data;
        if (dfop.url) {
            bpm.httpAsync(dfop.method, dfop.url, dfop.param, function (data) {
                $self[0]._tree.dfop.data = data || [];
                $self[0]._tree.dfop.backupData = $self[0]._tree.dfop.data;
                $.tree.render($self);
            });
        }
        else {
            $.tree.render($self);
        }
        // pre load the icons
        if (dfop.showcheck) {
            for (var i = 0; i < 3; i++) {
                var im = new Image();
                im.src = dfop.cbiconpath + dfop.icons[i];
            }
        }
        dfop = null;
        return $self;
    };

    $.fn.treeSet = function (name,op) {
        var $self = $(this);
        var dfop = $self[0]._tree.dfop;
        var getCheck = function (items, buff, fn) {
            for (var i = 0, l = items.length; i < l; i++) {
                if ($self.find('#' + dfop.id + '_' + items[i].id.replace(/-/g, '_')).parent().css('display') != 'none') {
                    (items[i].showcheck == true && (items[i].checkstate == 1 || items[i].checkstate == 2)) && buff.push(fn(items[i]));
                    if (!items[i].showcheck || (items[i].showcheck == true && (items[i].checkstate == 1 || items[i].checkstate == 2))) {
                        if (items[i].ChildNodes != null && items[i].ChildNodes.length > 0) {
                            getCheck(items[i].ChildNodes, buff, fn);
                        }
                    }
                }
            }
        };
        var getCheck2 = function (items, buff, fn) {
            for (var i = 0, l = items.length; i < l; i++) {
                (items[i].showcheck == true && (items[i].checkstate == 1 || items[i].checkstate == 2) && !items[i].hasChildren) && buff.push(fn(items[i]));
                if (!items[i].showcheck || (items[i].showcheck == true && (items[i].checkstate == 1 || items[i].checkstate == 2))) {
                    if (items[i].ChildNodes != null && items[i].ChildNodes.length > 0) {
                        getCheck2(items[i].ChildNodes, buff, fn);
                    }
                }
            }
        };

        var setNoCheck = function (items, buff, fn) {
            for (var i = 0, l = items.length; i < l; i++) {
                if (items[i].showcheck) {
                    items[i].checkstate = 0;
                }
                if (items[i].ChildNodes != null && items[i].ChildNodes.length > 0) {
                    setNoCheck(items[i].ChildNodes);
                }
            }
        };


        switch (name) {
            case 'allNoCheck':
                $self.find('.tree-node-cb').attr('src', dfop.cbiconpath + 'checkbox_0.png');
                setNoCheck(dfop.data);
                break;
            case 'allCheck':
                $self.find('.tree-node-cb[src$="checkbox_0.png"]').trigger('click');
                break;
            case 'setCheck':
                var list = op;
                $.each(list, function (id, item) {
                    var $div = $self.find('#' + dfop.id + '_' + item.replace(/-/g, '_'));
                    if ($div.next().length == 0) {
                        $div.find('.tree-node-cb').trigger('click');
                    }
                });
                break;
            case 'setValue':
                dfop._value = op;
                $.tree.setValue($self);
                break;
            case 'currentItem':
                return dfop.currentItem;
                break;
            case 'getCheckNodesEx':// 只获取最下面的选中元素
                var buff = [];
                getCheck2(dfop.data, buff, function (item) { return item; });
                return buff;
                break;
            case 'getCheckNodes':
                var buff = [];
                getCheck(dfop.data, buff, function (item) {return item; });
                return buff;
                break;
            case 'getCheckNodeIds':
                var buff = [];
                getCheck(dfop.data, buff, function (item) {return item.id; });
                return buff;
                break;
            case 'getCheckNodeIdsByPath':
                var buff = [];
                var pathlist
                getCheck(dfop.data, buff, function (item) { return item.id; });
                return buff;
                break;
            case 'search':
                $.tree.search(op.keyword, dfop.data);
                if (bpm.validator.isNotNull(op.keyword).code) {
                    dfop._isSearch = true;
                }
                else if (dfop._isSearch) {
                    dfop._isSearch = false;
                }
                $.tree.renderToo($self);
                break;
            case 'refresh':
                $.extend(dfop, op || {});
                if (!!dfop.url) {
                    bpm.httpAsync(dfop.method, dfop.url, dfop.param, function (data) {
                        $self[0]._tree.dfop.data = data || [];
                        $self[0]._tree.dfop.backupData = $self[0]._tree.dfop.data;
                        $.tree.renderToo($self);
                        dfop._isSearch = false;
                    });
                }
                else {
                    $self[0]._tree.dfop.backupData = $self[0]._tree.dfop.data;
                    $.tree.renderToo($self);
                    dfop._isSearch = false;
                }
                break;
            case 'addNode':
                
                break;
            case 'updateNode':

                break;
        }
    }

})(jQuery, top.bpm);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.22
 * 描 述：Select（普通，多选，树形数据，gird，搜索，输入框选择器）-渲染数据在点击的时候触发，考虑到在一个表单上有超级多的下拉框的绑定情况（这里需要考虑赋值的特殊性）
 */
(function ($, bpm) {
    "use strict";

    $(function () {
        $(document).click(function (e) {
            $('.select-option').slideUp(150);
            $('.select').removeClass('select-focus');
        });
    });

    $.select = {
        htmlToData: function ($self) {
            var dfop = $self[0]._select.dfop;
            var $ul = $self.find('ul');
            dfop.data = [];
            $ul.find('li').each(function () {
                var $li = $(this);
                var point = { id: $li.attr('data-value'), text: $li.html() };
                dfop.data.push(point);
            });
            $ul.remove();
            $ul = null;
            dfop = null;
        },
        calc: function ($this, op) { // 计算高度和方向
            var bodyHeight = 0;
            var top = 0;

            bodyHeight = $('body').height();
            top = $this.offset().top;
            var topH = top - 1;
            var bottomH = bodyHeight - top - 30;
            var selctH = 2;
            // 计算选择框的高度
            if (op.allowSearch) {
                selctH += 30;
            }
            selctH += op.data.length * 26;
            if (op.placeholder) {
                selctH += 25;
            }

            if ((op.type === 'tree' || op.type === 'treemultiple') && op.data.length > 1) {
                selctH = 200;
            }

            var res = {
                type: 0, // 0 向下 1 向上
                height: 0
            };

            if (bottomH > 130 || bottomH > topH || bottomH > selctH) { // 如果能够显示四条数据和搜索框就采用下拉方式
                res.height = bottomH > selctH ? selctH : bottomH;
            } else {
                res.type = 1;
                res.height = topH > selctH ? selctH : topH;
            }

            return res;
        },
        initRender: function (dfop, $self) {
            $('#select_option_' + dfop.id).remove();
            var $option = $('<div class="select-option" id="select_option_' + dfop.id + '"></div>');

            var $optionContent = $('<div class="select-option-content"></div>');
            var $ul = $('<ul id="select_option_content' + dfop.id + '"></ul>');
            //$optionContent.css('max-height', dfop.maxHeight + 'px');
            $option.hide();
            $optionContent.html($ul);
            $option.prepend($optionContent);
            if (dfop.allowSearch) {
                var $search = $('<div class="select-option-search"><input type="text" placeholder="搜索关键字"><span class="input-query" title="查询"><i class="fa fa-search"></i></span></div>');
                $option.append($search);
                $option.css('padding-bottom', '25px');
                $search.on('click', function () { return false; });
                $search.find('input').on("keypress", function (e) {
                    e = e || window.event;
                    if (e.keyCode === 13) {
                        var $this = $(this);
                        var keyword = $this.val();
                        var $option = $this.parents('.select-option');
                        var dfop = $option[0].dfop;
                        if (dfop.type === "tree" || dfop.type === "treemultiple") {
                            var $optionContent = $this.parent().prev();
                            $optionContent.treeSet('search', { keyword: keyword });
                        }
                        else if (dfop.type === "default" || dfop.type === "multiple") {
                            for (var i = 0, l = dfop.data.length; i < l; i++) {
                                var _item = dfop.data[i];
                                if (!keyword || _item[dfop.text].indexOf(keyword) != -1 || (!!_item[dfop.title] && _item[dfop.title].indexOf(keyword) != -1)) {
                                    _item._hide = false;
                                }
                                else {
                                    _item._hide = true;
                                }
                            }
                            $.select.render(dfop);
                        }

                        $option = null;
                        
                    }
                });
            }
            $('body').append($option);
            $option.on('click', $.select.itemClick);
            $option[0].dfop = dfop;
            $self.append('<div class="select-placeholder" >==' + dfop.placeholder + '==</div>');
            $self.attr('type', 'select').addClass('select');

            if (dfop.type != 'tree') {
                $optionContent.scroll();
            }
        },
        render: function (dfop) {
            switch (dfop.type) {
                case 'default':
                    $.select.defaultRender(dfop);
                    break;
                case 'tree':
                case 'treemultiple':
                    $.select.treeRender(dfop);
                    break;
                case 'gird':
                    break;
                case 'multiple':
                    $.select.multipleRender(dfop);
                    break;
                default:
                    break;
            }
            dfop.isrender = true;
            
        },
        defaultRender: function (dfop) {
            var $ul = $('#select_option_content' + dfop.id);
            $ul.html("");
            if (dfop.placeholder) {
                $ul.append('<li data-value="-1" class="selectitem-li" >==' + dfop.placeholder + '==</li>');
            }
            for (var i = 0, l = dfop.data.length; i < l; i++) {
                var item = dfop.data[i];
                if (!item._hide) {
                    var $li = $('<li data-value="' + i + '" class="selectitem-li" >' + item[dfop.text] + (dfop.title != '' && dfop.title != undefined && item[dfop.title] != undefined ? '[' + item[dfop.title] + ']' : '') + '</li>');
                    $ul.append($li);
                }
              
            }
        },
        multipleRender: function (dfop) {
            var $ul = $('#select_option_content' + dfop.id);
            $ul.html("");
            if (dfop.placeholder) {
                $ul.append('<li data-value="-1" class="selectitem-li" >==' + dfop.placeholder + '==</li>');
            }
            for (var i = 0, l = dfop.data.length; i < l; i++) {
                var item = dfop.data[i];
                if (!item._hide) {
                    if (!!dfop.multipleMapValue && dfop.multipleMapValue[i] != undefined) {
                        var $li = $('<li data-value="' + i + '" class="selectitem-li" ><img class="select-node-cb" src="/Content/images/tree/checkbox_1.png">' + item[dfop.text] + '</li>');
                        $ul.append($li);
                    }
                    else {
                        var $li = $('<li data-value="' + i + '" class="selectitem-li" ><img class="select-node-cb" src="/Content/images/tree/checkbox_0.png">' + item[dfop.text] + '</li>');
                        $ul.append($li);
                    }
                }
            }
        },
        treeRender: function (dfop) {
            var $option = $('#select_option_' + dfop.id);
            $option.find('.select-option-content').remove();
            var $optionContent = $('<div class="select-option-content"></div>');
            $option.prepend($optionContent);
            //$optionContent.css('max-height', dfop.maxHeight + 'px');
            dfop.data.unshift({
                "id": "-1",
                "text": '==' + dfop.placeholder + '==',
                "value": "-1",
                "icon": "-1",
                "parentnodes": "0",
                "showcheck": false,
                "isexpand": false,
                "complete": true,
                "hasChildren": false,
                "ChildNodes": []
            });
            var treeop = {
                data: dfop.data,
                nodeClick: $.select.treeNodeClick
            };
            if (dfop.type === 'treemultiple') {
                treeop.nodeClick = $.select.treeNodeClick2;
                treeop.nodeCheck = $.select.treeNodeCheck;
            }
            $optionContent.tree(treeop);
        },
        bindEvent: function ($self) {
            $self.unbind('click');
            $self.on('click', $.select.click);
        },
        click: function (e) {
            var $this = $(this);
            if ($this.attr('readonly') == 'readonly' || $this.attr('disabled') == 'disabled') {
                return false;
            }
            var dfop = $this[0]._select.dfop;
            if (!dfop.isload) {
                return false;
            }
            if (!dfop.isrender) {
                $.select.render(dfop);
            }

            // 选中下拉框的某一项
            e = e || Window.event;
            var et = e.target || e.srcElement;
            var $et = $(et);

            var $option = $('#select_option_' + dfop.id);
            if ($option.is(":hidden")) {
                $('.select').removeClass('select-focus');
                $('.select-option').slideUp(150);

                $this.addClass('select-focus');
                var width = dfop.width || $this.parent().width();//+ (dfop.diffWidth || 0);
                var height = $this.innerHeight();
                var top = $this.offset().top;
                var left = $this.offset().left;
                var res = $.select.calc($this, dfop);

                if (res.type == 0) {
                    $option.css({ 'width': width, 'top': top + height + 2, 'left': left, 'height': res.height }).show();
                }
                else {
                    $option.css({ 'width': width, 'top': top - res.height - 2, 'left': left, 'height': res.height }).show();
                }
                $option.find('.select-option-search').find('input').select();

                if (dfop.type != 'multiple') {
                    $option.find('.selected').removeClass('selected');
                    if (dfop._index != -1) {
                        $option.find('.selectitem-li[data-value="' + dfop._index + '"]').addClass('selected');
                    }
                }

            }
            else {
                $option.slideUp(150);
                $this.removeClass('select-focus');
            }
          
            dfop = null;
            e.stopPropagation();
        },
        itemClick: function (e) {
            // 选中下拉框的某一项
            e = e || Window.event;
            var et = e.target || e.srcElement;
            var $et = $(et);
            var $option = $(this);
            var dfop = $option[0].dfop;
            var $this = $('#' + dfop.id);

            if (dfop.type != 'multiple') {
                if ($et.hasClass('selectitem-li')) {
                    var _index = $et.attr('data-value');
                    $option.find('.selected').removeClass('selected');
                    $et.addClass('selected');
                    if (dfop._index != _index) {
                        var $inputText = $this.find('.select-placeholder');

                        if (_index == -1) {
                            $inputText.css('color', '#999');
                            $inputText.html('==' + dfop.placeholder + '==');
                        }
                        else {
                            $inputText.css('color', '#000');
                            $inputText.html(dfop.data[_index][dfop.text]);
                        }
                        dfop._index = _index;

                        $this.trigger("change");
                        if (dfop.select) {
                            dfop.select(dfop.data[_index]);
                        }
                    }
                }

                $option.slideUp(150);
                $this.removeClass('select-focus');
            }
            else {
                if ($et.hasClass('selectitem-li') || $et.hasClass('select-node-cb')) {
                    var $inputText = $this.find('.select-placeholder');
                    var $cbobj = $et.find('.select-node-cb');
                    var _index = $et.attr('data-value');
                    if ($et.hasClass('select-node-cb')) {
                        $cbobj = $et;
                        _index = $et.parent().attr('data-value');
                    }

                    dfop.multipleMapValue = dfop.multipleMapValue || {};
                    dfop.multipleValue = dfop.multipleValue || [];
                    dfop.multipleText = dfop.multipleText || [];

                    if (_index == -1) {
                        $inputText.css('color', '#999');
                        $inputText.html('==' + dfop.placeholder + '==');
                        dfop.multipleMapValue = {};
                        dfop.multipleValue = [];
                        dfop.multipleText = [];

                        $option.find('.select-node-cb[src$="checkbox_1.png"]').attr('src', '/Content/images/tree/checkbox_0.png');
                        $option.slideUp(150);
                        $this.removeClass('select-focus');
                    }
                    else {
                        var selected = true;
                        if (dfop.multipleMapValue[_index] == undefined) {
                            $inputText.css('color', '#000');
                            dfop.multipleValue.push(dfop.data[_index][dfop.value]);
                            dfop.multipleText.push(dfop.data[_index][dfop.text]);

                            dfop.multipleMapValue[_index] = dfop.data[_index];
                            $inputText.html(String(dfop.multipleText));

                            $cbobj.attr('src', '/Content/images/tree/checkbox_1.png');
                        }
                        else {
                            dfop.multipleValue = [];
                            dfop.multipleText = [];
                            delete dfop.multipleMapValue[_index];
                            $.each(dfop.multipleMapValue, function (_id, _item) {
                                dfop.multipleValue.push(_item[dfop.value]);
                                dfop.multipleText.push(_item[dfop.text]);
                            });
                            if (dfop.multipleText.length == 0) {
                                $inputText.css('color', '#999');
                                $inputText.html('==' + dfop.placeholder + '==');
                            }
                            else {
                                $inputText.html(String(dfop.multipleText));
                            }
                            selected = false;
                            $cbobj.attr('src', '/Content/images/tree/checkbox_0.png');
                        }

                        $this.trigger("change");
                        if (dfop.select) {
                            dfop.select(dfop.data[_index], selected, $this);
                        }
                    }
                }
            }
            e.stopPropagation();
        },
        treeNodeClick: function (item, $item) {
            var $option = $item.parents('.select-option');
            var dfop = $option[0].dfop;
            $option.slideUp(150);
            var $select = $('#' + dfop.id);
            $select.removeClass('select-focus');
            dfop.currtentItem = item;
            var $inputText = $select.find('.select-placeholder');
            $inputText.html(dfop.currtentItem.text);
            if (item.value == '-1') {
                $inputText.css('color', '#999');
            }
            else {
                $inputText.css('color', '#000');
            }
            $select.trigger("change");
            if (dfop.select) {
                dfop.select(dfop.currtentItem);
            }

            $option = null;
            $select = null;
        },
        treeNodeClick2: function (item, $item) {
            var $tree = $item.parents('.select-option-content');
            var $option = $item.parents('.select-option');
            var dfop = $option[0].dfop;
            var $select = $('#' + dfop.id);
          
            $select.removeClass('select-focus');
            dfop.currtentItems = [];
            if (item.value == '-1') {
                $item.parents('.select-option').slideUp(150);
                $tree.treeSet('allNoCheck');
                var $inputText = $select.find('.select-placeholder');
                $inputText.html(item.text);
                $inputText.css('color', '#999');
                $select.trigger("change");
                if (dfop.select) {
                    dfop.select([]);
                }
            }
            $tree = null;
            $option = null;
            $select = null;
        },
        treeNodeCheck: function (item, $item) {
            var $tree = $item.parents('.select-option-content');
            var $option = $item.parents('.select-option');
            var dfop = $option[0].dfop;
            var $select = $('#' + dfop.id);
            var $inputText = $select.find('.select-placeholder');
            $select.removeClass('select-focus');
            var data = $tree.treeSet('getCheckNodesEx');
            dfop.currtentItems = data;
            var text = "";
            for (var i = 0, l = data.length; i < l; i++) {
                var one = data[i];
                if (text != "") {
                    text += ",";
                }
                text += one.text;
            }
            if (text == "") {
                $inputText.html("==" + dfop.placeholder + "==");
                $inputText.css('color', '#999');
            }
            else {
                $inputText.text(text);
                $inputText.css('color', '#000');
            }
            $select.trigger("change");
            if (dfop.select) {
                dfop.select(dfop.currtentItems);
            } 
            $tree = null;
            $option = null;
            $select = null;
            $inputText = null;

        },
        defaultValue: function ($self, type) {
            var dfop = $self[0]._select.dfop;
            dfop.currtentItem = null;
            dfop._index = -1;
            var $inputText = $self.find('.select-placeholder');
            $inputText.css('color', '#999');
            $inputText.html('==' + dfop.placeholder + '==');

            $('#' + dfop.id + ' .select-option .selected').removeClass('selected');
            dfop.select && dfop.select(null, type);
            $self.trigger("change");
        }
    };


    $.fn.select = function (op) {
        var dfop = {
            // 请选择
            placeholder: "请选择",
            // 类型
            type: 'default',// default,tree,treemultiple,gird,multiple
            // 字段
            value: "id",
            text: "text",
            title: "title",
            // 宽度
            width: false,
            // 是否允许搜索
            allowSearch: false,
            // 访问数据接口地址
            url: false,
            data: false,
            // 访问数据接口参数
            param: null,
            // 接口请求的方法
            method: "GET",

            //选择事件
            select: false,
            
            isload: false, // 数据是否加载完成
            isrender: false// 选项是否渲染完成
        };
        $.extend(dfop, op || {});
        var $self = $(this);
        if ($self.length == 0) {
            return $self;
        }

        dfop.id = $self.attr('id');

        if (!dfop.id) {
            return false;
        }
        if ($self[0]._select) {
            return $self;
        }

        $self[0]._select = { dfop: dfop };
        // 基础信息渲染
        $.select.bindEvent($self);
        
        // 数据获取方式有三种：url,data,html
        // url优先级最高
        if (dfop.url) {
            bpm.httpAsync(dfop.method, dfop.url, dfop.param, function (data) {
                $self[0]._select.dfop.data = data || [];
                $self[0]._select.dfop.backdata = data || [];
                dfop.isload = true;
            });
        }
        else if (dfop.data) {
            dfop.isload = true;
            dfop.backdata = dfop.data;
        }
        else {// 最后是html方式获取（只适合数据比较少的情况）
            $.select.htmlToData($self);
            dfop.isload = true;
            dfop.backdata = dfop.data;
        }
        $.select.initRender(dfop, $self);
        return $self;
        
    };

    $.fn.selectRefresh = function (op) {
        var $self = $(this);
        if ($self.length == 0) {
            return $self;
        }
        if (!$self[0]._select) {
            return false;
        }
        var dfop = $self[0]._select.dfop;
        if (!dfop) {
            return false;
        }
        $.extend(dfop, op || {});

        dfop.isload = false;
        dfop.isrender = false;
        if (dfop.url) {
            bpm.httpAsync(dfop.method, dfop.url, dfop.param, function (data) {
                $self[0]._select.dfop.data = data || [];
                $self[0]._select.dfop.backdata = data || [];
                dfop.isload = true;
            });
        }
        else if (dfop.data) {
            dfop.isload = true;
            dfop.backdata = dfop.data;
        }

        if (dfop._setValue != null && dfop._setValue != undefined) {
            $self.selectSet(dfop._setValue);
        }
        else {
            $.select.defaultValue($self, 'refresh');
        }
        return $self;
    };

    
    $.fn.selectGet = function () {
        var $this = $(this);
        if ($this.length == 0) {
            return $this;
        }
        var dfop = $this[0]._select.dfop;
        var value = '';
        switch (dfop.type) {
            case 'default':
                if (dfop.data[dfop._index]) {
                    value = dfop.data[dfop._index][dfop.value];
                }
                break;
            case 'tree':
                if (dfop.currtentItem) {
                    value = dfop.currtentItem[dfop.value];
                }
                break;
            case 'treemultiple':
                if (dfop.currtentItems) {
                    for (var i = 0, l = dfop.currtentItems.length; i < l; i++) {
                        if (value != "") {
                            value += ",";
                        }
                        value += dfop.currtentItems[i][dfop.value];
                    }
                }
                break;
            case 'gird':
                break;
            case 'multiple':
                dfop.multipleValue = dfop.multipleValue || [];
                return String(dfop.multipleValue);
            default:
                break;
        }
        return value;
    };

    $.fn.selectSet = function (value) {
        // 设置数据的值
        var $this = $(this);
        if ($this.length == 0) {
            return $this;
        }
        if (!$this[0]._select) {
            return $this;
        }
        value = value + '';
        if (value == '' || value == 'undefined' || value == 'null') {
            $.select.defaultValue($this);
            return $this;
        }
        var dfop = $this[0]._select.dfop;
        dfop._setValue = null;
        if (!dfop) {
            return $this;
        }
        $('#' + dfop.id + ' .select-option .selected').removeClass('selected');

        function _fn(dfop) {
            if (dfop.isload == false) {
                setTimeout(function () {
                    _fn(dfop);
                }, 100);
            }
            else if (dfop.isload == true) {
                var _currtentItem;
                switch (dfop.type) {
                    case 'default':
                        for (var i = 0, l = dfop.data.length; i < l; i++) {
                            if (dfop.data[i][dfop.value] == value) {
                                dfop._index = i;
                                _currtentItem = dfop.data[i];
                                break;
                            }
                        }
                        break;
                    case 'tree':
                        _currtentItem = $.tree.findItem(dfop.data, dfop.value, value);
                        dfop.currtentItem = _currtentItem;
                        break;
                    case 'treemultiple':
                        $.select.render(dfop);
                        $this.find('.select-option-content').treeSet('setCheck', value.split(','));
                        return false;
                    case 'gird':
                        break;
                    case 'multiple':
                        dfop.multipleMapValue = {};
                        dfop.multipleValue = [];
                        dfop.multipleText = [];
                        if (dfop.isrender) {
                            $this.find('.select-node-cb[src$="checkbox_1.png"]').attr('src', '/Content/images/tree/checkbox_0.png');
                        }
                        var _valuellist = value.split(',');
                        for (var i = 0, l = dfop.data.length; i < l; i++) {
                            var _arrayIndex = $.inArray(dfop.data[i][dfop.value] + '', _valuellist);
                            
                            if (_arrayIndex != -1) {
                                dfop.multipleMapValue[i] = dfop.data[i];
                                dfop.multipleValue.push(dfop.data[i][dfop.value]);
                                dfop.multipleText.push(dfop.data[i][dfop.text]);

                                if (dfop.isrender) {
                                    $this.find('[data-value="' + i + '"] .select-node-cb').attr('src', '/Content/images/tree/checkbox_1.png');
                                }
                                if (dfop.select) {
                                    dfop.select(dfop.data[i], true, $this);
                                }
                            }
                        }

                        if (dfop.multipleText.length > 0) {
                            _currtentItem = dfop.multipleText;
                        }
                        break;
                    default:
                        break;
                }
               

                if (_currtentItem) {
                    if (dfop.type == 'multiple') {
                        var $inputText = $this.find('.select-placeholder');
                        if (dfop.multipleText.length > 0) {
                            $inputText.css('color', '#000');
                        }
                        else {
                            $inputText.css('color', '#999');
                        }
                        $inputText.html(String(dfop.multipleText));
                        $this.trigger("change");
                    } else {
                        var $inputText = $this.find('.select-placeholder');
                        $inputText.html(_currtentItem[dfop.text]);
                        $inputText.css('color', '#000');
                        $this.trigger("change");
                        if (dfop.select) {
                            dfop.select(_currtentItem);
                        }
                    }
                }
                else {
                    dfop._setValue = value;
                }
            }
        }
        _fn(dfop);


        return $this;
    };

    $.fn.selectGetEx = function () {
        var $this = $(this);
        if ($this.length == 0) {
            return $this;
        }
        var dfop = $this[0]._select.dfop;
        var item = null;
        switch (dfop.type) {
            case 'default':
                if (dfop.data[dfop._index]) {
                    item = dfop.data[dfop._index];
                }
                break;
            case 'tree':
                if (dfop.currtentItem) {
                    item = dfop.currtentItem;
                }
                break;
            case 'treemultiple':
                if (dfop.currtentItems) {
                    item = dfop.currtentItems;
                }
                break;
            case 'gird':
                break;
            case 'multiple':
                item = dfop.multipleValue || [];
                break;
            default:
                break;
        }
        return item;
    };

})(jQuery, top.bpm);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.22
 * 描 述：工作流引擎api操作方法类
 */
(function ($, bpm) {
    "use strict";

    var api = {
        bootstraper: top.$.rootUrl + '/WorkFlowModule/WfEngine/Bootstraper',
        taskinfo: top.$.rootUrl + '/WorkFlowModule/WfEngine/Taskinfo',
        processinfo: top.$.rootUrl + '/WorkFlowModule/WfEngine/Processinfo',

        auditer: top.$.rootUrl + '/WorkFlowModule/WfEngine/Auditer',

        create: top.$.rootUrl + '/WorkFlowModule/WfEngine/Create',
        audit: top.$.rootUrl + '/WorkFlowModule/WfEngine/Audit',
    };

    var httpGet = function (url, param, callback, loadmsg) {
        bpm.loading(true, loadmsg || '正在获取数据');
        bpm.httpAsync('GET', url, param, function (res) {
            bpm.loading(false);
            callback(res);
        });
    };
    var httpPost = function (url, param, callback, loadmsg) {
        bpm.loading(true, loadmsg || '正在获取数据');
        bpm.httpAsync('Post', url, param, function (data) {
            bpm.loading(false);
            callback(data);
        });
    };

    // 读取登录秘钥信息
    function getLoginInfo() {
        var req = {
            token: top.$.cookie('BPM_Token'),
            loginMark: top.$.cookie('BPM_Mark'),
        };

        return req;
    }

    bpm.workflowapi = {
        // 流程初始化用于发起:
        // isNew是否是新发起的流程,processId:发起的流程实例主键,schemeCode:发起的流程模板编码
        // callback:回调函数 res：true/false,data:返回的节点数据
        bootstraper: function (op) {
            var dfop = {
                isNew: true,
                processId: '',
                schemeCode: '',
            }
            $.extend(dfop, op);
            //var req = getLoginInfo();
            var req = {
                isNew: dfop.isNew,
                processId: dfop.processId,
                schemeCode: dfop.schemeCode
            };
            httpGet(api.bootstraper, req, function (res) {
                if (res != null) {
                    if (res.status == 1) {
                        op.callback(true, res.data);
                    }
                    else {
                        bpm.alert.error(res.desc);
                        op.callback(false);
                    }
                }
                else {
                    bpm.alert.error('获取流程信息失败!');
                    op.callback(false);
                }
            }, '正在获取流程信息...');
        },
        // 流程实例发起:
        // isNew是否是新发起的流程,processId:发起的流程实例主键,schemeCode:发起的流程模板编码
        // callback:回调函数 res：true/false,data:返回的节点数据
        create: function (op) {
            var dfop = {
                isNew: true,
                processId: '',
                schemeCode: '',
                auditers: '{}'
            }
            $.extend(dfop, op);
            var req = {
                isNew: dfop.isNew,
                processId: dfop.processId,
                sourceId: dfop.sourceId,
                schemeCode: dfop.schemeCode,
                processName: dfop.processName,
                processLevel: dfop.processLevel,
                description: dfop.description,
                auditers: dfop.auditers,
                formData: op.formData
            };

            httpPost(api.create, req, function (res) {
                if (res != null) {
                    if (res.status == 1) {
                        op.callback(true);
                    }
                    else {
                        bpm.alert.error(res.desc);
                        op.callback(false);
                    }
                }
                else {
                    bpm.alert.error('创建流程失败!');
                    op.callback(false);
                }
            }, '正在创建流程实例...');
        },

        taskinfo: function (op) {
            var dfop = {
                processId: '',
                taskId: '',
            }
            $.extend(dfop, op);
            var req = {
                processId: dfop.processId,
                taskId: dfop.taskId
            };

            httpGet(api.taskinfo, req, function (res) {
                if (res != null) {
                    if (res.status == 1) {
                        op.callback(true, res.data);
                    }
                    else {
                        bpm.alert.error(res.desc);
                        op.callback(false);
                    }
                }
                else {
                    bpm.alert.error('获取流程信息失败!');
                    op.callback(false);
                }
            }, '正在获取流程信息...');
        },
        audit: function (op) {
            var dfop = {
                verifyType: '',
                taskId: '',
                auditers:'{}'
            }
            $.extend(dfop, op);
            var req = {
                taskId: dfop.taskId,
                verifyType: dfop.verifyType,
                description: dfop.description,
                auditorId: dfop.auditorId,
                auditorName: dfop.auditorName,
                auditers: dfop.auditers,
                formData: op.formData
            };
            httpPost(api.audit, req, function (res) {
                if (res != null) {
                    if (res.status == 1) {
                        op.callback(true, res.data);
                    }
                    else {
                        bpm.alert.error(res.desc);
                        op.callback(false, {});
                    }
                }
                else {
                    bpm.alert.error('流程审核失败!');
                    op.callback(false, {});
                }
            }, '正在审核流程实例...');
        },

        processinfo: function (op) {
            var dfop = {
                processId: '',
                taskId: '',
            }
            $.extend(dfop, op);
            var req = {
                processId: dfop.processId,
                taskId: dfop.taskId
            };

            httpGet(api.processinfo, req, function (res) {
                if (res != null) {
                    if (res.status == 1) {
                        op.callback(true, res.data);
                    }
                    else {
                        bpm.alert.error(res.desc);
                        op.callback(false);
                    }
                }
                else {
                    bpm.alert.error('获取流程信息失败!');
                    op.callback(false);
                }
            }, '正在获取流程信息...');
        },

        auditer: function (op) {// 获取下一个节点审核人员
            var dfop = {
                isNew: false,
                taskId: '',
                processId: '',
                schemeCode:'',
                formData: '{}'
            }
            $.extend(dfop, op);

            var req = {
                isNew: dfop.isNew,
                processId: dfop.processId,
                schemeCode: dfop.schemeCode,
                taskId: dfop.taskId,
                formData: dfop.formData
            };
            httpGet(api.auditer, req, function (res) {
                if (res != null) {
                    op.callback(res);
                }
                else {
                    //bpm.alert.error('获取下一个节点审核人员失败!');
                    op.callback([]);
                }
            }, '获取下个节点审核人员...');
        }

    };

})(jQuery, top.bpm);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.22
 * 描 述：右键菜单
 */
(function ($, bpm) {
    "use strict";

    $.fn.contextmenu = function (op) {
        var dfop = {
            menulist: [],
            before:false
        }
        $.extend(dfop, op || {});
        var $self = $(this);
        dfop.id = $self.attr('id');
        if (!dfop.id) {
            return false;
        }
        if (!!$self[0]._contextmenu) {
            return false;
        }
        $self[0]._contextmenu = { "dfop": dfop };
        $self.on('contextmenu', function (e) {
            e.preventDefault();

            var $self = $(this);
            var dfop = $self[0]._contextmenu.dfop;
            var wrapid = dfop.id + '_contextmenu_wrap'
            var $wrap = $('#' + wrapid);
            if ($wrap.length > 0) {
                if (!!dfop.before) {
                    dfop.before(e, $wrap);
                }
                $wrap.show();
            }
            else {
                $wrap = $('<div class="contextmenu-wrap" id="' + wrapid + '" ><ul class="contextmenu-ul"></ul></div>');
                var $ul = $wrap.find('.contextmenu-ul');

                for (var i = 0, l = dfop.menulist.length; i < l; i++) {
                    var item = dfop.menulist[i];
                    var $li = $('<li data-value="' + item.id + '" ><a href="javascript:;"><span>' + item.text + '</span><a></li>');
                    $li.on('click', item.click);
                    $ul.append($li);
                }

                $('body').append($wrap);
                $wrap.show();
                if (!!dfop.before) {
                    dfop.before(e, $wrap);
                }
            }

            var clientTop = $(window).scrollTop() + e.clientY,
                 x = ($wrap.width() + e.clientX < $(window).width()) ? e.clientX : e.clientX - $wrap.width(),
                 y = ($wrap.height() + e.clientY < $(window).height()) ? clientTop : clientTop - $wrap.height();

            $wrap.css({ 'left': x, 'top': y });

        });
        $(document).on('click', function () {
            var wrapid = dfop.id + '_contextmenu_wrap'
            var $wrap = $('#' + wrapid);
            

            $wrap.hide();
        });
    }

})(jQuery, top.bpm);
(function ($, bpm) {
    "use strict";

    var msgList = {};
    var imChat;
    var isLoaded = -1;
    var loadingMsg = {};
    var loadingMsg2 = {};

    var _im = {
        init: function () {
            _im.registerServer();
            _im.connect();
        }
        // 连接服务端
        , connect: function () {
            var loginInfo = bpm.clientdata.get(['userinfo']);
            $.ajax({
                url: loginInfo.imUrl + "/hubs",
                type: "get",
                dataType: "text",
                success: function (data) {
                    eval(data);
                    //Set the hubs URL for the connection
                    $.connection.hub.url = loginInfo.imUrl;
                    $.connection.hub.qs = { "userId": loginInfo.userId };
                    // Declare a proxy to reference the hub.
                    imChat = $.connection.ChatsHub;
                    _im.registerClient();
                    // 连接成功后注册服务器方法
                    $.connection.hub.start().done(function () {
                        _im.afterSuccess();
                    });
                    //断开连接后
                    $.connection.hub.disconnected(function () {
                        _im.disconnected();
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    isLoaded = 0;
                },
            });
        }
        // 连接成功后执行方法
        , afterSuccess: function () {
            isLoaded = 1;
            $('.im-bell').show();
        }
        // 断开连接后执行
        , disconnected: function () {
            isLoaded = 0;
        }
        // 注册客户端方法
        , registerClient: function () {
            if (imChat) {
                //接收消息
                imChat.client.revMsg = function (userId, msg, dateTime, isSystem) {
                    if (!loadingMsg2[userId]) {
                        var point = { userId: userId, content: msg, time: dateTime, isSystem: isSystem || 0 };
                        addMsgList(userId, point);
                        bpm.im.revMsg && bpm.im.revMsg(userId, msg, dateTime, isSystem || 0);
                    }
                }
            }
        }
        // 注册服务端方法
        ,registerServer: function () {
            // 发送信息
            _im.sendMsg = function (userId, msg) {
                if (isLoaded == 1) {
                    imChat.server.sendMsg(userId, msg, 0);
                }
                else if (isLoaded == -1) {
                    setTimeout(function () {
                        _im.sendMsg(userId, msg);
                    }, 100);
                }
            };
        }
    };


    function addMsgList(userId, item) {
        msgList[userId] = msgList[userId] || [];
        if (loadingMsg[userId]) {
            setTimeout(function () {
                addMsgList(userId, item);
            }, 100);
        }
        else {
            msgList[userId].push(item);
        }
    }

    bpm.im = {
        addContacts: function (userId) {// 添加联系人
            bpm.httpAsync('Post', top.$.rootUrl + '/IM/IMMsg/AddContact', { otherUserId: userId }, function (data) {});
        },
        getContacts: function (callback) {// 获取最近的联系人列表
            setTimeout(function () {
                bpm.httpAsync('GET', top.$.rootUrl + '/IM/IMMsg/GetContactsList', {}, function (data) {
                    data = data || [];
                    _im.init();
                    callback(data);
                });
            }, 1000);
        },
        updateContacts: function (userId) {
            bpm.httpAsync('Post', top.$.rootUrl + '/IM/IMMsg/UpdateContactState', { otherUserId: userId}, function (data) {
            });
        },
        sendMsg: function (userId, msg) {// 发送消息
            var time = "";
            var loginInfo = bpm.clientdata.get(['userinfo']);
            var point = { userId: loginInfo.userId, content: msg, time: bpm.getDate('yyyy-MM-dd hh:mm:ss'), isSystem: 0 };
            addMsgList(userId, point);
            bpm.httpAsync('Post', top.$.rootUrl + '/IM/IMMsg/SendMsg', { userId: userId, content: msg }, function (data) {
                _im.sendMsg(userId, msg);// 发送给即时通讯服务
            });
            if (msgList[userId].length > 1) {
                if (bpm.parseDate(point.time).DateDiff('s', msgList[userId][msgList[userId].length - 2].time) > 60) {
                    time = point.time;
                }
            }
            else {
                time = point.time;
            }
            return time;
        },
        getMsgList: function (userId, callback,isGetMsgList) {
            msgList[userId] = msgList[userId] || [];
            loadingMsg[userId] = true;
            if (msgList[userId].length == 0 && isGetMsgList) {// 如果没有信息，获取最近10条的聊天记录
                loadingMsg2[userId] = true;
                bpm.httpAsync('GET', top.$.rootUrl + '/IM/IMMsg/GetMsgList', { userId: userId }, function (data) {
                    msgList[userId] = msgList[userId] || [];
                    data = data || [];
                    var len = data;
                    if (len > 0) {
                        for (var i = len - 1; i >= 0; i--) {
                            var item = data[i];
                            var point = { userId: _item.F_SendUserId, content: _item.F_Content, time: _item.F_CreateDate, isSystem: _item.F_IsSystem || 0 };
                            msgList[userId].push(point);
                        }
                    }
                    callback(msgList[userId]);
                    loadingMsg[userId] = false;
                    loadingMsg2[userId] = false;
                });
            }
            else {
                callback(msgList[userId]);
                loadingMsg[userId] = false;
            }
        },
        registerRevMsg: function (callback) {// 获取消息记录
            bpm.im.revMsg = callback;
        }
    };

})(jQuery, top.bpm);
/*
 * *
 * Copyright (c) 2017-2018 深圳市盈华讯方通信技术有限公司
 * 创建人：sunny
 * 日 期：2018.03.16
 * 描 述：admin顶层页面操作方法
 */

var loaddfimg;
(function ($, bpm) {
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
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "3000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
            // 打开首页模板
//          bpm.frameTab.open({ F_ModuleId: '0', F_Icon: 'fa fa-desktop', F_FullName: '我的桌面', F_UrlAddress: '/Home/AdminDesktop' }, true);
            bpm.clientdata.init(function () {
                //page.userInit();
                // 初始页面特例
                bootstrap($, bpm);
                if ($('body').hasClass('IE') || $('body').hasClass('InternetExplorer')) {
                    $('#loadbg').fadeOut();
                }
            });

            // 加载数据进度
            page.loadbarInit();
            // 全屏按钮
            page.fullScreenInit();
            // 主题选择初始化
            //page.uitheme();
           
        },

        // 登录头像和个人设置
//      userInit: function () {
//          var loginInfo = bpm.clientdata.get(['userinfo']);
//          var _html = '<div class="frame-personCenter"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">';
//          _html += '<img id="userhead"src="' + top.$.rootUrl + '/OrganizationModule/User/GetImg?userId=' + loginInfo.userId + '" >';
//          _html += '<span>' + loginInfo.realName + '</span>';
//          _html += '</a>';
//          _html += '<ul class="dropdown-menu pull-right">';
//          _html += '<li><a href="javascript:void(0);" id="userinfo_btn"><i class="fa fa-user"></i>个人信息</a></li>';
//          _html += '<li><a href="javascript:void(0);" id="schedule_btn"><i class="fa fa-calendar"></i>我的日程</a></li>';
//          if (loginInfo.isSystem) {
//              _html += '<li><a href="javascript:void(0);" id="clearredis_btn"><i class="fa fa-refresh"></i>清空缓存</a></li>';
//          }
//          _html += '<li><a href="javascript:void(0);" id="loginout_btn"><i class="fa fa-power-off"></i>安全退出</a></li>';
//          _html += '</ul></div>';
//          $('body').append(_html);
//
//          $('#loginout_btn').on('click', page.loginout);
//          $('#userinfo_btn').on('click', page.openUserCenter);
//          $('#clearredis_btn').on('click', page.clearredis);
//      },
//      loginout: function () { // 安全退出
//          bpm.layerConfirm("注：您确定要安全退出本次登录吗？", function (r) {
//              if (r) {
//                  bpm.loading(true, '退出系统中...');
//                  bpm.httpAsyncPost($.rootUrl + '/Login/OutLogin', {}, function (data) {
//                      window.location.href = $.rootUrl + "/Login/Index";
//                  });
//              }
//          });
//      },
        clearredis: function () {
            bpm.layerConfirm("注：您确定要清空全部后台缓存数据吗？", function (r) {
                if (r) {
                    bpm.loading(true, '清理缓存数据中...');
                    bpm.httpAsyncPost($.rootUrl + '/Home/ClearRedis', {}, function (data) {
                        window.location.href = $.rootUrl + "/Login/Index";
                    });
                }
            });
        },
        openUserCenter: function () {
            // 打开个人中心
            bpm.frameTab.open({ F_ModuleId: '1', F_Icon: 'fa fa-user', F_FullName: '个人中心', F_UrlAddress: '/UserCenter/Index' });
        },

        // 全屏按钮
        fullScreenInit: function () {
            var _html = '<div class="frame_fullscreen"><a href="javascript:void(0);" id="fullscreen_btn" title="全屏"><i class="fa fa-arrows-alt"></i></a></div>';
            $('body').append(_html);
            $('#fullscreen_btn').on('click', function () {
                if (!$(this).attr('fullscreen')) {
                    $(this).attr('fullscreen', 'true');
                    page.requestFullScreen();
                } else {
                    $(this).removeAttr('fullscreen');
                    page.exitFullscreen();
                }
            });
        },
        requestFullScreen: function () {
            var de = document.documentElement;
            if (de.requestFullscreen) {
                de.requestFullscreen();
            } else if (de.mozRequestFullScreen) {
                de.mozRequestFullScreen();
            } else if (de.webkitRequestFullScreen) {
                de.webkitRequestFullScreen();
            }
        },
        exitFullscreen: function () {
            var de = document;
            if (de.exitFullscreen) {
                de.exitFullscreen();
            } else if (de.mozCancelFullScreen) {
                de.mozCancelFullScreen();
            } else if (de.webkitCancelFullScreen) {
                de.webkitCancelFullScreen();
            }
        },

        // 加载数据进度
        loadbarInit: function () {
            var _html = '<div class="loading-bar" id="loading_bar" >';
            _html += '<div class="loading-bar-bg"></div>';
            _html += '<div class="loading-bar-message" id="loading_bar_message"></div>';
            _html += '</div>';
            $('body').append(_html);
        },

        // 皮肤主题设置
        uitheme: function () {
            var uitheme = top.$.cookie('BPM_UItheme') || '1';
            var $setting = $('<div class="theme-setting"></div>');
            var $btn = $('<button class="btn btn-default"><i class="fa fa-spin fa-gear"></i></button>');
            var _html = '<div class="panel-heading">界面风格</div>';
            _html += '<div class="panel-body">';
            _html += '<div><label><input type="radio" name="ui_theme" value="1" ' + (uitheme == '1' ? 'checked' : '') + '>经典版</label></div>';
            _html += '<div><label><input type="radio" name="ui_theme" value="2" ' + (uitheme == '2' ? 'checked' : '') + '>风尚版</label></div>';
            _html += '<div><label><input type="radio" name="ui_theme" value="3" ' + (uitheme == '3' ? 'checked' : '') + '>炫动版</label></div>';
            _html += '<div><label><input type="radio" name="ui_theme" value="4" ' + (uitheme == '4' ? 'checked' : '') + '>飞扬版</label></div>';
            _html += '</div>';
            $setting.append($btn);
            $setting.append(_html);
            $('body').append($setting);

            $btn.on('click', function () {
                var $parent = $(this).parent();
                if ($parent.hasClass('opened')) {
                    $parent.removeClass('opened');
                }
                else {
                    $parent.addClass('opened');
                }
            });
            $setting.find('input').click(function () {
                var value = $(this).val();
                top.$.cookie('BPM_UItheme', value, { path: "/" });
                window.location.href = $.rootUrl + '/Home/Index';
            });

        },
    };

    $(function () {
        page.init();
    });
})(window.jQuery, top.bpm);
