//登录跳转函数
function GoToLogin() {
    window.location.href = "http://vcodehzsh_new.vnetone.com/Admin/Login";
}

//跳转页面函数
function turnToOtherPage(Main){
	top.vso.frameTab.open({ ID: Main.ID, Icon: Main.Icon, Name: Main.Name, Url: Main.Url, ParentName: Main.ParentName, LocaMenu: Main.LocaMenu });
}