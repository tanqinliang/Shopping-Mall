/***************************************************************
 * Author       :谭清亮
 * Date         :2018-12-28
 * Description  :登录首页ajax类
***************************************************************/
using BasePage;
using Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Soholife.Common;
using System;

namespace CoreDemo.Controllers
{
    [AllowAnonymous]
    public class AjaxController : MerchantAgentBackPage
    {

        public JsonResult Index()
        {
            string sAccountNo = CommonUtils.GetStringValue(Request.Query["acc"]);
            string sPassword = CommonUtils.GetStringValue(Request.Query["pwd"]);
            string sCode = CommonUtils.GetStringValue(Request.Query["code"]);
            if (sAccountNo == "")
            {
                return ReturnMsg("-1", "请输入您的用户名");
            }
            if (sPassword == "")
            {
                return ReturnMsg("-1", "请输入您的密码");
            }
            if (sCode == "")
            {
                return ReturnMsg("-1", "请输入验证码");
            }
            if (!HttpContext.Request.Cookies.ContainsKey(LOGIN_VALIDATE_COOKIENAME))
            {
                return ReturnMsg("-1", "请输入正确的验证码");
            }

            string sVerificationCode_Temp = HttpContext.Request.Cookies[LOGIN_VALIDATE_COOKIENAME].ToString();
            if (!ValidatePic.CheckCode(sCode, sVerificationCode_Temp))
            {
                return ReturnMsg("-1", "请输入正确的验证码");
            }
            string sError = string.Empty;
            bool bIsLogin = Login(sAccountNo, sPassword, out sError);
            //账号验证
            if (bIsLogin)
            {
                return ReturnMsg("1", "/Main/Index");
            }
            else
            {
                return ReturnMsg("-1", sError);
            }
        }



        /// <summary>
        /// 登陆方法
        /// </summary>
        /// <param name="sAccountNo"></param>
        /// <param name="sPassword"></param>
        /// <returns></returns>
        private bool Login(string sAccountNo, string sPassword, out string sError)
        {
            sError = string.Empty;
            //校验账户
            Model.User_Info aUser = new BLL.User_Info().GetRecordInfo(sAccountNo);
            if (aUser.ID == 0 || aUser.IsLock)
            {
                sError = "当前账户不存在或被锁定";
                return false;
            }
            if (aUser.Password != SecurityUtils.EncryptMD5(sPassword))
            {
                sError = "密码错误";
                return false;
            }

            string sIP = IPUtils.GetIP(Request, HttpContext);
            IO.ErrorLog.SetLog("LoginLog" + DateTime.Now.ToString("yyyyMMdd"), $"用户名：{sAccountNo}，IP：{sIP}，时间：{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}");

            MerchantAgentBackPage merchantAgent = new MerchantAgentBackPage();
            merchantAgent.uc.AdminID = aUser.ID;
            merchantAgent.uc.Account = aUser.Account;
            merchantAgent.uc.ShowName = aUser.ShowName;
            HttpContext.SetInfo(merchantAgent.uc);

            //删除验证码;
            return true;
        }


    }
}