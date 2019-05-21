$(document).ready(function () {
	
	//$("#leftMain ul").addClass("hidden");
	$("#leftMain ul:first").removeClass("hidden");
    $("#leftMain h3").bind("click", function () {
        var index = $("#leftMain h3").index($(this));
        if ($("#leftMain").find("ul:eq(" + index + ")").attr("class") != "") {
            $("#leftMain").find("ul:eq(" + index + ")").removeClass("hidden");
            $(this).children("span").addClass("on");
        }
        else {
            $("#leftMain").find("ul:eq(" + index + ")").addClass("hidden");
            $(this).children("span").removeClass("on");
        }
    });
	
});

