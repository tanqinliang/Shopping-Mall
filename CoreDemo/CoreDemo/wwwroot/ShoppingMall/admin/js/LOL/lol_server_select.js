﻿
if(!LOLServerSelect)
{
    var LOLServerSelect={};
}

LOLServerSelect.create=function(select_array, ext_opt_array, opt_array)
{
    return new MultiSelect.create(select_array, opt_array||LOLServerSelect.DATA, ext_opt_array||[]);
}

LOLServerSelect.STD_DATA= 
[

    {t:"艾欧尼亚  电信",v:"1", status:"1"}
,
    {t:"比尔吉沃特  网通",v:"2", status:"1"}
,
    {t:"祖安 电信",v:"3", status:"1"}
,
    {t:"诺克萨斯  电信",v:"4", status:"1"}
,
    {t:"德玛西亚 网通",v:"6", status:"1"}
,
    {t:"班德尔城 电信",v:"5", status:"1"}
,
    {t:"皮尔特沃夫 电信",v:"7", status:"1"}
,
    {t:"战争学院 电信",v:"8", status:"1"}
,
    {t:"弗雷尔卓德 网通",v:"9", status:"1"}
,
    {t:"巨神峰 电信",v:"10", status:"1"}
,
    {t:"雷瑟守备 电信",v:"11", status:"1"}
,
    {t:"无畏先锋 网通",v:"12", status:"1"}
,
    {t:"裁决之地 电信",v:"13", status:"1"}
,
    {t:"黑色玫瑰 电信",v:"14", status:"1"}
,
    {t:"暗影岛 电信",v:"15", status:"1"}
,
    {t:"钢铁烈阳 电信",v:"17", status:"1"}
,
    {t:"恕瑞玛 网通",v:"16", status:"1"}
,
    {t:"均衡教派 电信",v:"19", status:"1"}
,
    {t:"水晶之痕 电信",v:"18", status:"1"}
,
    {t:"教育网专区",v:"21", status:"1"}
,
    {t:"影流 电信",v:"22", status:"1"}
,
    {t:"守望之海 电信",v:"23", status:"1"}
,
    {t:"扭曲丛林 网通",v:"20", status:"1"}
,
    {t:"征服之海 电信",v:"24", status:"1"}
,
    {t:"卡拉曼达 电信",v:"25", status:"1"}
,
    {t:"皮城警备 电信",v:"27", status:"1"}
,
    {t:"巨龙之巢 网通",v:"26", status:"1"}

];


//////////////////////////////////////////////////////////////////////////////////////////////////////////
LOLServerSelect.showzone=function(select_array, ext_opt_array, opt_array)
{
	//显示停机
	var arrOpt = opt_array||LOLServerSelect.STD_DATA;
	
	if(arrOpt && arrOpt.length > 0){
		for(var i = 0; i < arrOpt.length; i++){
			if(arrOpt[i].status * 1 === 0){
				if(arrOpt[i].t.indexOf('(停机)') >= 0){
					continue;
				}
				arrOpt[i].t += "(停机)";
			}
		}
	}
    return new MultiSelect.create(select_array, arrOpt, ext_opt_array||[]);
}

LOLServerSelect.showzone2=function(select_array, ext_opt_array, opt_array)
{
	//停机隐藏
	var arrOpt = opt_array||LOLServerSelect.STD_DATA;
	if(arrOpt && arrOpt.length > 0){
		var tempArrOpt = [];
		for(var i = 0; i < arrOpt.length; i++){
			if(arrOpt[i].status * 1 != 0){
				tempArrOpt.push(arrOpt[i]);
			}
		}
		arrOpt = tempArrOpt;
	}
    return new MultiSelect.create(select_array, arrOpt, ext_opt_array||[]);
}

LOLServerSelect.showStatusByServerId = function(serverId){
	if(!serverId){
		return "";
	}	
	var arrOpt = LOLServerSelect.STD_DATA;
	if(arrOpt && arrOpt.length > 0){
		for(var i = 0; i < arrOpt.length; i++){
			if(serverId == arrOpt[i].v){
				return (arrOpt[i].status);
			}
		}
	}
	return "";
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////


LOLServerSelect.zoneToName=function(ssn)
{
    var data=this.STD_DATA;
    var len=data.length;
    var result;
    for(var i=0;i<len;i++)
    {
        if(data[i].v==String(ssn))
        {
            result=data[i].t;
            break;
        }
    }
    return result || "";
}

LOLServerSelect.ssn2desc=LOLServerSelect.zoneToName;
/*  |xGv00|9503a3371b302b58d62a9bf626f70b38 */
