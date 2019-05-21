//====================================================================================================
// [插件名称] jQuery formValidator
//----------------------------------------------------------------------------------------------------
// [描    述] jQuery formValidator表单验证插件，它是基于jQuery类库，实现了js脚本于页面的分离。对一个表
//            单对象，你只需要写一行代码就可以轻松实现20种以上的脚本控制。现支持一个表单元素累加很多种
//            校验方式,采用配置信息的思想，而不是把信息写在表单元素上，能比较完美的实现ajax请求。
//----------------------------------------------------------------------------------------------------
// [作者网名] 猫冬	
// [日    期] 2008-01-11	
// [邮    箱] wzmaodong@126.com
// [作者博客] http://wzmaodong.cnblogs.com
//====================================================================================================
var jQuery_formValidator_initConfig;
jQuery.formValidator = 
{
	sustainType : function(id,setting)
	{
		var elem = $("#"+id).get(0);
		var srcTag = elem.tagName;
		var stype = elem.type;
		switch(setting.validateType)
		{
			case "InitValidator":
				return true;
			case "InputValidator":
				if (srcTag == "INPUT" || srcTag == "TEXTAREA" || srcTag == "SELECT") return true;
				return false;
			case "CompareValidator":
				if (srcTag == "INPUT" || srcTag == "TEXTAREA")
				{
					if (stype == "checkbox" || stype == "radio") return false;
					return true;
				}
				return false;
			case "AjaxValidator":
				if (stype == "text" || stype == "textarea" || stype == "file" || stype == "select-one") return true;
				return false;
			case "RegexValidator":
				if (srcTag == "INPUT" || srcTag == "TEXTAREA")
				{
					if (stype == "checkbox" || stype == "radio") return false;
					return true;
				}
				return false;
		}
	},
    
	initConfig : function(controlOptions)
	{
		var settings = 
		{
			validatorGroup : "1",
			alertMessage:false,
			onSuccess: function() {return true;},
			onError:function() {},
			submitOnce:false
		};
		controlOptions = controlOptions || {};
		jQuery.extend(settings, controlOptions);
		if (jQuery_formValidator_initConfig == null ) jQuery_formValidator_initConfig = new Array();
		jQuery_formValidator_initConfig.push( settings );
	},
	
	appendValid : function(id, setting )
	{
		if(!jQuery.formValidator.sustainType(id,setting)) return -1;
		var srcjo = $("#"+id).get(0);   
		if (setting.validateType=="InitValidator" || !srcjo.settings || srcjo.settings == undefined ) srcjo.settings = new Array();   
		var len = srcjo.settings.push( setting );
		srcjo.settings[len - 1].index = len - 1;
		return len - 1;
	},
	
	getInitConfig : function( validatorGroup )
	{
		if(jQuery_formValidator_initConfig!=null)
		{
		    for(i=0;i<jQuery_formValidator_initConfig.length;i++)
		    {
		        if(validatorGroup==jQuery_formValidator_initConfig[i].validatorGroup)
		            return jQuery_formValidator_initConfig[i];
		    }
		}
		return null;
	},
	
	triggerValidate : function(id, setting)
	{
		switch(setting.validateType)
		{
			case "InputValidator":
				jQuery.formValidator.InputValid(id, setting);
				break;
			case "CompareValidator":
				jQuery.formValidator.CompareValid(id, setting);
				break;
			case "AjaxValidator":
				jQuery.formValidator.AjaxValid(id, setting);
				break;
			case "RegexValidator":
				jQuery.formValidator.RegexValid(id, setting);
				break;
		}
	},
	
	SetTipState : function(tipid,showclass,showmsg)
	{
	    var tip = $("#"+tipid);
	    tip.removeClass();
	    tip.addClass( showclass );
	    tip.html( showmsg );
	},
	
	SetFailState : function(tipid,showmsg)
	{
	    var tip = $("#"+tipid);
	    tip.removeClass();
	    tip.addClass( "onError" );
	    tip.html( showmsg );
	},
	
	ShowMessage : function(returnObj)
	{
	    var id = returnObj.id;
		var isValid = returnObj.isValid;
		var setting = returnObj.setting;
		var showmsg = "";
		var settings = $("#"+id).get(0).settings;
		var showclass = ""
		if (!isValid)
		{		
			if(setting.validateType=="AjaxValidator")
			{
				if(setting.lastValid=="")
				{
				    showclass = "onLoad";
				    showmsg = setting.onwait;
				}
				else
				{
				    showclass = "onError";
				    showmsg = setting.onerror;
				}
			}
			else
			{
				showmsg = setting.onerror;
				showclass = "onError";
			}
			if(jQuery.formValidator.getInitConfig(settings[0].validatorGroup).alertMessage)		
			{
				alert(showmsg);   
			}
			else
			{
				jQuery.formValidator.SetTipState(settings[0].tipid,showclass,showmsg);
			}
		}
		else
		{		
			if(!jQuery.formValidator.getInitConfig(setting.validatorGroup).alertMessage)
			{
				var showmsg = "";
				if ( jQuery.formValidator.IsEmpty(id) ) 
					showmsg = setting.onempty;
				else
					showmsg = setting.oncorrect;
			    jQuery.formValidator.SetTipState(setting.tipid,"onSuccess",showmsg);
		        if(!returnObj.setting.onvalid($("#"+id).get(0),$("#"+id).val()))
		        {
		            settings[settings.length - 1].isValid = false;
		        }
			}
		}
	},
    
    GetLength : function(id)
    {
        var srcjo = $("#"+id);
        sType = srcjo.get(0).type;
        var len = 0;
        switch(sType)
		{
			case "text":
			case "hidden":
			case "password":
			case "textarea":
			case "file":
		        var val = srcjo.val();
				for (var i = 0; i < val.length; i++) 
                {
			        if (val.charCodeAt(i) >= 0x4e00 && val.charCodeAt(i) <= 0x9fa5) 
				        len += 2;
			        else 
				        len++;
		        }
		        break;
			case "checkbox":
			case "radio": 
				len = $("input[@type='"+sType+"'][@name='"+srcjo.attr("name")+"'][@checked]").length;
				break;
		    case "select-one":
		        return srcjo.get(0).options.selectedIndex;
	    }
        
		return len;
    },
    
    IsEmpty : function(id)
    {
        if($("#"+id).get(0).settings[0].empty && jQuery.formValidator.GetLength(id)==0)
            return true;
        else
            return false;
    },
    
    IsOneValid : function(id)
    {
	    return OneIsValid(id,1).isValid;
    },
    
	OneIsValid : function (id,index)
	{
		var returnObj = new Object();
		returnObj.id = id;
		returnObj.ajax = -1;
		var elem = $("#"+id).get(0);
	    var settings = elem.settings;
	    var settingslen = settings.length;
		returnObj.setting = settings[0];
		if(jQuery.formValidator.IsEmpty(id))
	    {
	        returnObj.isValid = true;
	    }
	    else
	    {
		    for ( var i = index ; i < settingslen ; i ++ )
		    {   
			    returnObj.setting = settings[i];
			    if(settings[i].validateType!="AjaxValidator") 
			        jQuery.formValidator.triggerValidate(id,settings[i]);
			    else
			        returnObj.ajax = i;
			    if(!settings[i].isValid) {
			        returnObj.isValid = false;
			        returnObj.setting = settings[i];
			        break;
			    }else{
			        returnObj.isValid = true;
			        returnObj.setting = settings[0];
			        if(settings[i].validateType=="AjaxValidator") break;
			    }
		    }
		}
		return returnObj;
	},

	PageIsValid : function (validatorGroup)
	{
	    if(validatorGroup == null || validatorGroup == undefined) validatorGroup = "1";
		var isValid = true;
		var thefirstid = "";
		var returnObj;
		var error_tip = "^"; 
		$("INPUT,TEXTAREA,SELECT").each(function(i,elem)
		{
			if ( elem.settings!=undefined && elem.settings!=null )
			{  
				
			    if(elem.settings[0].validatorGroup==validatorGroup)
			    {
				    if(jQuery.formValidator.getInitConfig(validatorGroup).alertMessage) 
				    {
					    if(isValid)
					    {
						    returnObj = jQuery.formValidator.OneIsValid(elem.id,1);	
						    if (!returnObj.isValid) {
							    jQuery.formValidator.ShowMessage(returnObj);
							    isValid = false;
								if(thefirstid=="") thefirstid = returnObj.id;
						    }
					    }
				    }
				    else
				    {
					    returnObj = jQuery.formValidator.OneIsValid(elem.id,1);	
					    if (!returnObj.isValid) {
							isValid = false;
							if (thefirstid == "") thefirstid = returnObj.id;
							if (error_tip.indexOf("^" + elem.settings[0].tipid + "^") == -1) {
								error_tip = error_tip + elem.settings[0].tipid + "^";
								jQuery.formValidator.ShowMessage(returnObj);
							}
						}
						else
						{
							if (error_tip.indexOf("^" + elem.settings[0].tipid + "^") == -1) {
								jQuery.formValidator.ShowMessage(returnObj);
							}
						}
					    
				    }
				}
			}
		});

		if(isValid)
		{
            isValid = jQuery.formValidator.getInitConfig(validatorGroup).onSuccess();
			if(jQuery.formValidator.getInitConfig(validatorGroup).submitOnce){$("input[@type='submit']").attr("disabled",true);}
		}
		else
		{
			jQuery.formValidator.getInitConfig(validatorGroup).onError();
			if(thefirstid!="") $("#"+thefirstid).focus();
		}
		return isValid;
	},

	AjaxValid : function(id, setting)
	{
	    var srcjo = $("#"+id);
		var ls_url = setting.url;
	    if (srcjo.size() == 0 && srcjo.get(0).settings[0].empty) {
			returnObj.setting = $("#"+id).get(0).settings[0];
			returnObj.isValid = true;
			jQuery.formValidator.ShowMessage(returnObj);
			setting.isValid = true;
			return;
		}
		if(setting.addidvalue)
		{
			var parm = id+"="+escape(srcjo.val());
			ls_url = ls_url + ((ls_url).indexOf("?")>0?("&"+ parm) : ("?"+parm));
		}
		jQuery.ajax(
		{	
			type : setting.type, 
			url : ls_url, 
			data : setting.data, 
			async : setting.async, 
			dataType : setting.datatype, 
			success : function(data){
			    setting0 = srcjo.get(0).settings[0];
			    if(setting.success(data))
			    {
			        jQuery.formValidator.SetTipState(setting0.tipid,"onSuccess",setting0.oncorrect);
			        setting.isValid = true;
			    }
			    else
			    {
			        jQuery.formValidator.SetTipState(setting0.tipid,"onError",setting.onerror);
			        setting.isValid = false;
			    }
			},
			complete : setting.complete, 
			beforeSend : function(){
				var isvalid = setting.beforesend();
				if(isvalid) setting.isValid = false;
				setting.lastValid = "-1";
				return setting.beforesend;
			}, 
			error : function(){
				setting0 = srcjo.get(0).settings[0];
			    jQuery.formValidator.SetTipState(setting0.tipid,"onError",setting.onerror);
			    setting.isValid = false;
				setting.error();
			},
			processData : setting.processdata 
		});
	},

	RegexValid : function(id, setting)
	{
		var srcTag = $("#"+id).get(0).tagName;
		var elem = $("#"+id).get(0);
		if(elem.settings[0].empty && elem.value==""){
			setting.isValid = true;
		}
		else 
		{
			var regexpress = setting.regexp;
			if(setting.datatype=="enum") regexpress = eval("regexEnum."+regexpress)
			if(regexpress==undefined || regexpress==""){
				setting.isValid = false;
				return;
			}
			var exp = new RegExp(regexpress, setting.param);
			if (exp.test($("#"+id).val())) 
				setting.isValid = true;
			else 
				setting.isValid = false;
		}
	},
	
	InputValid : function(id, setting)
	{
		var srcjo = $("#"+id);
		var elem = srcjo.get(0);
		var val = srcjo.val();
		var sType = elem.type;
		var len = jQuery.formValidator.GetLength(id);
		switch(sType)
		{
			case "text":
			case "hidden":
			case "password":
			case "textarea":
			case "file":
			case "checkbox":
			case "radio": 
				if (setting.type == "size") {
					if (len < setting.min || len > setting.max) {
						setting.isValid = false;
					}
					else {
						setting.isValid = true;
					}
				}
				else{
					stype = (typeof setting.min);
					if(stype =="number")
					{
						if(!isNaN(val))
						{
							nval = parseFloat(val);
							if(nval>=setting.min && nval<= setting.max)
								setting.isValid = true;
							else
								setting.isValid = false;
						}
						else
							setting.isValid = false;
					}
					if(stype =="string"){
						if(val>=setting.min && val<= setting.max)
							setting.isValid = true;
						else
							setting.isValid = false;
					}
				}
				break;
		    case "select-one":
				if(len > 0)
					setting.isValid =true; 
				else
					setting.isValid =false; 
				break;
		    case "select-more":
                break;
		}
	},
	
	CompareValid : function(id, setting)
	{
		var srcjo = $("#"+id);
	    var desjo = $("#"+setting.desID );
	    setting.isValid = false;
		curvalue = srcjo.val();
		ls_data = desjo.val();
		if(setting.datatype=="number")
        {
            if(!isNaN(curvalue) && !isNaN(ls_data))
			{
				curvalue = parseFloat(curvalue);
                ls_data = parseFloat(ls_data);
			}
			else
			{
			    return;
			}
        }
		
	    switch(setting.operateor)
	    {
	        case "=":
	            if(curvalue == ls_data) setting.isValid = true;
	            break;
	        case "!=":
	            if(curvalue != ls_data) setting.isValid = true;
	            break;
	        case ">":
	            if(curvalue > ls_data) setting.isValid = true;
	            break;
	        case ">=":
	            if(curvalue >= ls_data) setting.isValid = true;
	            break;
	        case "<": 
	            if(curvalue < ls_data) setting.isValid = true;
	            break;
	        case "<=":
	            if(curvalue <= ls_data) setting.isValid = true;
	            break;
	        case "oneok":
	            if(jQuery.formValidator.IsEmpty(id) || jQuery.formValidator.IsEmpty(IsEmpty.desID) )
	                setting.isValid = false;
	            else
	                setting.isValid = true;
	    }
	}
};

jQuery.fn.formValidator = function( msgOptions) 
{
	var setting = 
	{
		validatorGroup : "1",
		empty :false,
		submitonce : false,
		automodify : false,
		entermovetonext : true,
		onshow :"请输入内容",
		onfocus: "请输入内容",
		oncorrect: "输入正确",
		onempty: "输入内容为空",
		onvalid : function(){return true},
		onfocusevent : function(){},
		onblurevent : function(){},
		tipid : this.get(0).id+"Tip",
		defaultvalue : null,
		validateType : "InitValidator"
	};
	msgOptions = msgOptions || {};
	jQuery.extend(setting, msgOptions);
	return this.each(function()
	{
		var triggerID = this.id;
		var tip = $( "#"+setting.tipid );
		jQuery.formValidator.appendValid(triggerID,setting);
		if(!jQuery.formValidator.getInitConfig(setting.validatorGroup).alertMessage){
			jQuery.formValidator.SetTipState(setting.tipid,"onShow",setting.onshow);
		}
		var srcTag = this.tagName;
		var defaultValue = setting.defaultvalue;
		if (srcTag == "INPUT" || srcTag=="TEXTAREA")
		{
			var stype = this.type;
			var joeach = $(this);
			if (stype == "checkbox" || stype == "radio") {
				joeach = $("input[@name=" + this.name + "]");
				if(defaultValue)
				{
					checkobj = $("input[@name=" + this.name + "][@value='"+defaultValue+"']");
					if(checkobj.length==1) checkobj.attr("checked","true");
				}
			}
			else
			{
			    if(defaultValue) joeach.val(setting.defaultvalue);
			}
			joeach.focus(function()
			{	
				var settings = joeach.get(0).settings;
				if(!jQuery.formValidator.getInitConfig(settings[0].validatorGroup).alertMessage){
				    jQuery.formValidator.SetTipState(settings[0].tipid,"onFocus",settings[0].onfocus);
				}
				if (stype == "text" || stype == "textarea" || stype == "file") {
					this.validoldvalue = $(this).val();
				}
				settings[0].onfocusevent(joeach.get(0));
			});

			joeach.blur(function()
			{   
				var elem = joeach.get(0);
				var thefirstsettings = elem.settings;
				var settingslen = thefirstsettings.length;
				var returnObj = jQuery.formValidator.OneIsValid(triggerID,1);
				if(returnObj.ajax >= 0 && elem.validoldvalue!=$(elem).val()) 
				{
			        jQuery.formValidator.SetTipState(thefirstsettings[0].tipid,"onLoad",thefirstsettings[returnObj.ajax].onwait);
				    jQuery.formValidator.AjaxValid(triggerID, thefirstsettings[returnObj.ajax]);
				}
				else
				{
				    jQuery.formValidator.ShowMessage(returnObj);
					if(!returnObj.isValid)
					{
						var auto = thefirstsettings[0].automodify && (elem.type=="text" || elem.type=="textarea" || elem.type=="file")
						if(auto && !jQuery.formValidator.getInitConfig(thefirstsettings[0].validatorGroup).alertMessage)
						{
							alert(returnObj.setting.onerror);
							jQuery.formValidator.SetTipState(thefirstsettings[0].tipid,"onShow",setting.onshow);
						}
					}
				}
				thefirstsettings[0].onblurevent(joeach.get(0));
			});
		} 
		else if (srcTag == "SELECT")
		{
		    srcjo = $(this);
		    var settings = this.settings;
		    if (defaultValue)
		    {			 
			    $.each( this.options ,function(){	
				    if ( this.value==defaultValue) this.selected = true;		  
			    });				  
		    }

			srcjo.focus(function()
			{	
				if(!jQuery.formValidator.getInitConfig(setting.validatorGroup).alertMessage){
				    jQuery.formValidator.SetTipState(settings[0].tipid,"onFocus",settings[0].onfocus);
				}
			});
			
			srcjo.bind( "change" , function()
			{
				var returnObj = jQuery.formValidator.OneIsValid(triggerID,1);	 
				if ( returnObj.ajax >= 0 && this.validoldvalue!=$(this).val()) 
				    jQuery.formValidator.AjaxValid(triggerID, returnObj.setting);
				else
					jQuery.formValidator.ShowMessage(returnObj);    
			});
		}
	});

}; 

jQuery.fn.InputValidator = function(controlOptions)
{
	var settings = 
	{
		isValid : false,
		min : 0,
		max : 99999999999999,
		forceValid : false,
		type : "size",
		defaultValue:null,
		onerror:"输入错误",
		validateType:"InputValidator"
	};
	controlOptions = controlOptions || {};
	jQuery.extend(settings, controlOptions);
	return this.each(function(){
		jQuery.formValidator.appendValid(this.id,settings);
	});
};

jQuery.fn.SelectValidator = function(controlOptions)
{
	var settings = 
	{
		isValid : false,
		onerror:"必须选择",
		defaultValue:null,
		validateType:"SelectValidator"
	};
	controlOptions = controlOptions || {};
	jQuery.extend(settings, controlOptions);
	return this.each(function(){
		jQuery.formValidator.appendValid(this.id,settings);
	});
};

jQuery.fn.CompareValidator = function(controlOptions)
{
	var settings = 
	{
		isValid : false,
		desID : "",
		operateor :"=",
		onerror:"输入错误",
		validateType:"CompareValidator"
	};
	controlOptions = controlOptions || {};
	jQuery.extend(settings, controlOptions);
	return this.each(function(){
		var li_index = jQuery.formValidator.appendValid(this.id,settings);
		if(li_index==-1) return;
		var elem = this;
		$("#"+settings.desID).blur(function(){
			var returnObj = jQuery.formValidator.OneIsValid(elem.id,1);
			if (!returnObj.isValid && returnObj.setting.index == li_index) {
				var returnObj = jQuery.formValidator.OneIsValid(elem.id, li_index);
			}
			if ( returnObj.ajax >= 0 && this.validoldvalue!=$(this).val()) 
			    jQuery.formValidator.AjaxValid(triggerID, returnObj.setting);
			else
				jQuery.formValidator.ShowMessage(returnObj);
		});
	});
};

jQuery.fn.RegexValidator = function(controlOptions)
{
	var settings = 
	{
		isValid : false,
		regexp : "",
		param : "i",
		datatype : "string",
		onerror:"输入的格式不正确",
		validateType:"RegexValidator"
	};
	controlOptions = controlOptions || {};
	jQuery.extend(settings, controlOptions);
	return this.each(function(){
		jQuery.formValidator.appendValid(this.id,settings);
	});
};

jQuery.fn.AjaxValidator = function(controlOptions)
{
	var settings = 
	{
		isValid : false,
		lastValid : "",
		type : "GET",
		url : "",
		addidvalue : true,
		datatype : "html",
		data : "",
		async : true,
		beforesend : function(){return true;},
		success : function(){return true;},
		complete : function(){},
		processdata : false,
		error : function(){},
		onerror:"服务器校验没有通过",
		onwait:"正在等待服务器返回数据",
		validateType:"AjaxValidator"
	};
	controlOptions = controlOptions || {};
	jQuery.extend(settings, controlOptions);
	return this.each(function()
	{
		jQuery.formValidator.appendValid(this.id,settings);
	});
}