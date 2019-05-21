var curShowDiv = ""; //当前显示的层
var curDivWidth = 0; //当前层的宽度
var curDivHeight = 0; //当前层的高度
var common = {
    setPositionType: function (backID, divID, divWidth, divHeigth, type) {
        //函数说明：设置divName对象位置,backID:阴影背景ID；divID:弹出层ID；divWidth:弹出层宽度；divHeight:弹出层高度，
        //type:位置类型（1:屏幕居中；2:左居中；3:右居中，4:左下角；5:右下角；6:左上角；7:右上角；8:居中+滚动条高度）
        var bw = $(window).width();
        var bh = $(window).height();
        var st = type == "8" ? $(document).scrollTop() : 0;
        var objw = divWidth;
        var objh = divHeigth;
        objw = (bw - objw) / 2; //左浮动偏移量
        objw = objw < 0 ? 0 : objw;
        objh = (bh - objh) / 2; //顶浮动偏移量
        objh = objh < 0 ? 0 : objh;
        switch (type) {
            case 1: $("#" + divID).css("left", objw + "px");
                $("#" + divID).css("top", objh + "px");
                break;
            case 2: $("#" + divID).css("left", "10px");
                $("#" + divID).css("top", objh + "px");
                break;
            case 3: $("#" + divID).css("right", "10px");
                $("#" + divID).css("top", objh + "px");
                break;
            case 4: $("#" + divID).css("left", "10px");
                $("#" + divID).css("bottom", "10px");
                break;
            case 5: $("#" + divID).css("right", "10px");
                $("#" + divID).css("bottom", "10px");
                break;
            case 6: $("#" + divID).css("left", "10px");
                $("#" + divID).css("top", "10px");
                break;
            case 7: $("#" + divID).css("right", "10px");
                $("#" + divID).css("top", "10px");
                break;
            case 8: $("#" + divID).css("left", objw + "px");
                $("#" + divID).css("top", (objh + st) + "px");
                break;
            default: $("#" + divID).css("left", objw + "px");
                $("#" + divID).css("top", objh + "px");
                break;
        }

        //设置滤镜宽高
        var totalw = $(document.body).width();
        var totalh = $(document).height();
        $("#" + backID).css("width", totalw + "px");
        $("#" + backID).css("height", totalh + "px");

        curShowDiv = divID;
        curDivWidth = divWidth;
        curDivHeight = divHeigth;
    },
    setPosition: function (divName, divWidth, divHeigth, type) {
        //函数说明：设置divName对象位置
        var bw = $(window).width();
        var bh = $(window).height();
        var st = type == "1" ? $(document).scrollTop() : 0;
        var objw = divWidth;
        var objh = divHeigth;
        objw = (bw - objw) / 2;
        objw = objw < 0 ? 0 : objw;
        objh = (bh - objh) / 2;
        objh = objh < 0 ? 0 : objh;
        $("#" + divName).css("left", objw + "px");
        $("#" + divName).css("top", (objh + st) + "px");
		$("#videoiframeDiv").css("top","10px")
        //设置滤镜宽高
        var totalw = $(document.body).width();
        var totalh = $(document).height();
        //        var totalw = window.screen.availWidth;
        //        var totalh = window.screen.availHeight;

        $("#divBacking").css("width", totalw + "px");
        $("#divBacking").css("height", totalh + "px");

        curShowDiv = divName;
        curDivWidth = divWidth;
        curDivHeight = divHeigth;
    },
    setPositionHeight: function (divName, divWidth, divHeigth, type, addHeight) {
        //函数说明：设置divName对象位置
        var bw = $(window).width();
        var bh = $(window).height();
        var st = type == "1" ? $(document).scrollTop() : 0;
        var objw = divWidth;
        var objh = divHeigth;
        objw = (bw - objw) / 2;
        objw = objw < 0 ? 0 : objw;
        objh = (bh - objh) / 2;
        objh = objh < 0 ? 0 : objh;
        $("#" + divName).css("left", objw + "px");
        $("#" + divName).css("top", (objh + st) + "px");
        //设置滤镜宽高
        var totalw = $(document.body).width();
        var totalh = $(document).height();
        //        var totalw = window.screen.availWidth;
        //        var totalh = window.screen.availHeight;

        $("#divBacking").css("width", totalw + "px");
        $("#divBacking").css("height", totalh + addHeight + "px");

        curShowDiv = divName;
        curDivWidth = divWidth;
        curDivHeight = divHeigth;
    },
    setIframe: function (id, width, height, src) {
        //函数说明:设置iframe的宽，高，链接路径
        $("#" + id).css("width", width + "px");
        $("#" + id).css("height", height + "px");
        $("#" + id).attr("src", src);
    },
    setDiv: function (id, top, leftOrRight, num, divWidth) {
        //函数说明:设置DIV的定位位置
        var bw = $(window).width();
        var objw = divWidth;
        objw = (bw - objw) / 2 + num;
        objw = objw < 0 ? 0 : objw;
        $("#" + id).css("top", top + "px");
        $("#" + id).css(leftOrRight, objw + "px");
    },
    showWin: function () {
        //函数说明：打开显示层
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            $("#divBacking").show();
            $("#divframe").show();
        } else {
            $("#divBacking").fadeIn(1000);
            $("#divframe").fadeIn(1000);
        }
    },
    showWin2: function (id) {
        //函数说明：打开显示层
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            $("#divBacking").show();
            $("#" + id).show();
        } else {
            $("#divBacking").fadeIn(500);
            $("#" + id).show();
        }
    },
    showDiv: function (id) {
        //函数说明：只打开显示层（前提是遮罩层已打开）
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            $("#" + id).show();
        } else {
            $("#" + id).fadeIn(500);
        }
    },
    closeWin2: function () {
        //函数说明：关闭当前显示的层
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            $("#divframe").hide();
            $("#divBacking").hide();
        } else {
            $("#divframe").fadeOut(500);
            $("#divBacking").fadeOut(500);
        }
    },
	closeWin3: function () {
        //函数说明：关闭当前显示的层
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            $("#divframe").hide();
        } else {
            $("#divframe").fadeOut(500);
        }
    },
    closeDiv: function (id) {
        //函数说明：只关闭当前显示的层，不关闭遮罩层
        $("#" + id).hide();
    },
    closeWin: function () {
        //函数说明：关闭当前显示的层
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            $("#divframe").hide();
            $("#divBacking").hide();
        } else {
            $("#divframe").fadeOut(500);
            $("#divBacking").fadeOut(500);
        }
        this.setPosition("divframe", "0", "0", "1");
        this.setIframe("0", "0", "#");
    },
    showWin1: function () {
        //函数说明：打开显示层
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            $("#sp").hide();
            $("#divBacking").show();
            $("#divframe").show();
        } else {
            $("#sp").hide();
            $("#divBacking").fadeIn(500);
            $("#divframe").fadeIn(500);
        }
    },
    closeWin1: function (divId, iframeId) {
        //函数说明：关闭当前显示的层
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            $("#" + divId).hide();
            $("#divBacking").hide();
        } else {
            $("#" + divId).fadeOut(500);
            $("#divBacking").fadeOut(500);
        }
        //this.setPosition(divId, "0", "0", "1");
        this.setIframe(iframeId, "0", "0", "");
    }
};
