
    //clientHeight-0; 空白值 iframe自适应高度
    function windowW() {
        if ($(window).width() < 980) {
          //  $('.header').css('width', 980 + 'px');
            $('#content').css('width', 980 + 'px');
            $('body').attr('scroll', 'yes');
            $('body').css('overflow', 'auto');
        }
    }
    windowW();
    $(window).resize(function () {
        if ($(window).width() < 980) {
            windowW();
        } else {
            $('.header').css('width', 'auto');
            $('#content').css('width', 'auto');
            //$('body').attr('scroll', 'no');
            //$('body').css('overflow', 'hidden');

        }
    });
    window.onresize = function () {
        var heights = document.documentElement.clientHeight - 150;
		$("#rightMain").height(heights);
		//document.getElementById('rightMain').height = heights;
        var openClose = $("#rightMain").height() + 39;
        $('#center_frame').height(openClose + 9);
        $("#openClose").height(openClose + 30);
    }
    window.onresize();
    $(function () {
        //默认载入左侧菜单
        //$("#leftMain").load("left_html/Left_Admin.html");
        //  $("#leftMain").load("left.html?m=admin&c=index&a=public_menu_left&menuid=10");
        $("#openClose").bind("click", function () {//展开与伸缩左边导航条
            if ($("#openClose").attr("class") == "open") {
                $(".left_menu").addClass("left_menu_on");
                $("#openClose").removeClass("open");
                $("#openClose").addClass("close");
            }
            else {
                $(".left_menu").removeClass("left_menu_on");
                $("#openClose").addClass("open");
                $("#openClose").removeClass("close");
            }
        });
                
    })

    function _M(menuid, targetUrl,menUrl) {
        $("#menuid").val(menuid);
        $("#bigid").val(menuid);
        $("#paneladd").html('<a class="panel-add" href="javascript:add_panel();"><em>添加</em></a>');
        $("#leftMain").load(targetUrl);
        $("#rightMain").attr('src', menUrl);
        $('.top_menu').removeClass("on");
        $('#_M' + menuid).addClass("on");
         $("#current_pos").html($('#_M' + menuid).attr("title"));
        //当点击顶部菜单后，隐藏中间的框架
        $('#display_center_id').css('display', 'none');
        //显示左侧菜单，当点击顶部时，展开左侧
        $(".left_menu").removeClass("left_menu_on");
        $("#openClose").removeClass("close");
        $("html").removeClass("on");
        $("#openClose").data('clicknum', 0);
        $("#current_pos").data('clicknum', 1);
    }
    function _MP(menuid, targetUrl, titleValue) {
       $("#current_pos").html(titleValue);
        $("#menuid").val(menuid);
        $("#rightMain").attr('src', targetUrl+"?t="+Math.random());
        $('.sub_menu').removeClass("on fb blue");
        $('#_MP' + menuid).addClass("on fb blue"); 
        $("#current_pos").data('clicknum', 1);
    }
 function _MP1(menuid, targetUrl, titleValue) {
       $("#current_pos").html(titleValue);
        $("#menuid").val(menuid);
        $("#rightMain").attr('src', targetUrl+"&t="+Math.random());
        $('.sub_menu').removeClass("on fb blue");
        $('#_MP' + menuid).addClass("on fb blue");
        $("#current_pos").data('clicknum', 1);
    }
//首页点击到其它页面处理
function _mi(menuid, targetUrl, titleValue) {
	$(window.parent.$("#leftMain").load(targetUrl));
	   $('#current_pos', parent.document).html(titleValue);
	   $('.top_menu', parent.document).removeClass("on");
	   $('#_M' + menuid, parent.document).addClass("on");

}

//首页点击到其它页面处理
function _hzsh(menuid, targetUrl, titleValue) {
    $(window.parent.$("#leftMain").load(targetUrl));
    $('#current_pos', parent.document).html(titleValue);
    $('.top_menu', parent.document).removeClass("on");
    $('#_M' + menuid, parent.document).addClass("on");
    window.parent.$("#content").find(".left_menu").removeClass("left_menu_on");
    window.parent.$("#content").find("#openClose").addClass("open");
    window.parent.$("#content").find("#openClose").removeClass("close");

}
 
 (function($){
	$.getUrlParam = function(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return unescape(r[2]); return null;
	}
})(jQuery);
if ($.getUrlParam('ulid') != null && $.getUrlParam('ulid') != undefined && $.getUrlParam('ulid') != "") {
   
	var ulid = $.getUrlParam('ulid');
	var liid = $.getUrlParam('liid');
	//window.parent.$("#leftMain").find('ul:eq(0)').addClass("hidden");
	window.parent.$("#leftMain").find('ul:eq(' + (ulid - 1) + ')').removeClass("hidden");
	window.parent.$("#leftMain").find('#_MP'+ liid).addClass("on fb blue");
}