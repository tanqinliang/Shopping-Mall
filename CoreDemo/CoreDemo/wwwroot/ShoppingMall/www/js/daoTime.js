function activeEndtime() {
    $(".activeContent dl dt span.remainTime").each(function () {
                var endtime = new Date($(this).attr("endtime")).getTime();//取结束日期(毫秒值)
                var nowtime = new Date().getTime();
                var youtime = endtime - nowtime;
                var seconds = youtime / 1000;
                var minutes = Math.floor(seconds / 60);
                var hours = Math.floor(minutes / 60);
                var days = Math.floor(hours / 24);
                var CDay = days;
                var CHour = hours % 24;
                var CMinute = minutes % 60;
                var CSecond = Math.floor(seconds % 60);
               
                if (endtime <= nowtime) {
                    $(this).parent().hide();
                    $(this).parent().parent().parent().find("dd.endActivity").html("本活动已结束");
                } else {
                    $(this).parent().show();
                    $(this).parent().parent().parent().find("dd.endActivity").hide();
                    if(days>0){
                        $(this).text(days + "天" + CHour + "时" + CMinute + "分" + CSecond+"秒");
                    } else {
                        $(this).text(CHour + "时" + CMinute + "分" + CSecond + "秒");
                    }
                
                }         
          });
    setTimeout("activeEndtime()", 1000);
  };
$(function(){
    activeEndtime();
   });