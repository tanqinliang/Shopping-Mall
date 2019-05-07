/***************************************************************
 * Author       :谭清亮
 * Date         :2018-04-19
 * Description  :代理商后台BagePage类
***************************************************************/
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Soholife.Common;

namespace VSOFO.BasePage
{
    public class MerchanAgentCookies
    {
        //本次登录保存的记录信息
        public int AdminID { get; set; }								//管理员ID
        public string Account { get; set; }					    //管理员帐号
        public string ShowName { get; set; }					//显示名称		    
        public string LoginValidate { get; set; }                   //安全校验码
        public int MerchantID { get; set; }                       //商户编码

        public MerchanAgentCookies()
        {
            AdminID = 0;
            Account = "";
            ShowName = "";
            LoginValidate = "";
            MerchantID = 0;
        }
    }

    public class MerchantAgentBackPage : Controller
    {
        /// <summary> 
        /// 得到当前COOKIE的域名信息
        /// </summary>
        protected static string DomainName { get { return JsonSettingsUtils.GetSetting("CookieSettings:DomainName"); } }

        /// <summary>
        /// 得到当前C0OKIE的3DES密匙
        /// </summary>
        private static string Key = "";     //当前记录要从数据库中获取,12341ADS%^34123

        protected const string LOGIN_VALIDATE_COOKIENAME = "LoginValidateCode";
        /// <summary>
        /// 对外使用的类信息
        /// </summary>
        public MerchanAgentCookies uc = new MerchanAgentCookies();

        /// <summary>
        /// 下载的application类型
        /// </summary>
        public static string DownloadContenType ="application/vnd.android.package-archive";
        
        public string GetIP()
        {
            return RequetUtils.GetIP(Request, HttpContext);
        }

        public void SetInfo(HttpContext httpContext)
        {
            httpContext.SetInfo(uc);
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            uc = HttpContext.GetInfo<MerchanAgentCookies>();
            base.OnActionExecuting(context);
        }

        public void AddLog(string sContent, string strLogItem)
        {
            new DB.Suppliers_Log.BLL.Log_AdminLog().AddRecord(uc.AdminID, uc.Account, "代理用户ID：" + uc.AdminID + "，内容：" + sContent, RequetUtils.GetIP(Request, HttpContext), VSOFO.ConstValue.LogType.AGENT_BACKPAGE);
        }

        /// <summary>
        /// 获取最近的年份列表
        /// </summary>
        public List<int> GetYear()
        {
            int iBeginYear = DateTime.Now.AddYears(-15).Year;
            int iEndYeat = DateTime.Now.AddYears(5).Year;
            List<int> iList = new List<int>();
            for (int i = iBeginYear; i <= iEndYeat; i++)
            {
                iList.Add(i);
            }
            return iList;
        }
        public bool IsConfig()
        {
            return (new VSOFO.DB.Suppliers.BLL.Agent_User().GetRecordInfo(this.uc.MerchantID).ConfigPriceType == 1);
        }
        /// <summary>
        /// 获取月列表
        /// </summary>
        /// <returns></returns>
        public List<int> GetMonth()
        {
            List<int> iList = new List<int>();
            for (int i = 1; i <= 12; i++)
            {
                iList.Add(i);
            }
            return iList;
        }

        /// <summary>
        /// 获取一个月有多少天
        /// </summary>
        public List<int> GetDay(int iYear, int iMonth)
        {
            List<int> iList = new List<int>();

            DateTime BeginDate = CommonUtils.GetDateTimeValue(iYear.ToString() + "-" + iMonth.ToString());
            DateTime EndDate = BeginDate.AddMonths(1).AddDays(-1);

            for (DateTime date = BeginDate; date <= EndDate; date = date.AddDays(1))
            {
                iList.Add(date.Day);
            }
            return iList;
        }

        /// <summary>
        /// 返回状态
        /// </summary>
        /// <param name="code"></param>
        /// <param name="sMsg"></param>
        /// <param name="oData"></param>
        /// <returns></returns>
        public JsonResult ReturnMsg(string code, string sMsg, object oData = null)
        {
            ConstValue.ResultModel model = new ConstValue.ResultModel()
            {
                code = code,
                msg = sMsg,
                data = oData
            };
            return Json(model, new JsonSerializerSettings() { ContractResolver = new DefaultContractResolver() });
        }


        /// <summary>
        /// 得到开通的渠道
        /// </summary>
        public string GetChannel()
        {
            DB.Suppliers_Agent.Model.User_List uList = new DB.Suppliers_Agent.BLL.User_List().GetRecordInfo(uc.AdminID);
            int iUserID = 0;
            if (uList.AdminID == 0)
            {
                iUserID = uc.AdminID;
            }
            else
            {
                iUserID = uList.AdminID;
            }
            DataTable dt = new DB.Suppliers_Agent.BLL.User_Channel().GetRecordList(iUserID);
            string sChannelList = "-1,";
            foreach (DataRow item in dt.Select("UserID>0"))
            {
                sChannelList += item["ID"] + ",";
            }
            return sChannelList.TrimEnd(',');
        }

        /// <summary>
        /// 得到开通的网站
        /// </summary>
        /// <returns></returns>
        public string GetMerchatn()
        {
            VSOFO.DB.Suppliers_Agent.Model.User_List uList = new DB.Suppliers_Agent.BLL.User_List().GetRecordInfo(uc.AdminID);
            int iUserID = 0;
            if (uList.AdminID == 0)
            {
                iUserID = uc.AdminID;
            }
            else
            {
                iUserID = uList.AdminID;
            }
            DataTable dt = new VSOFO.DB.Suppliers_Agent.BLL.User_Merchant().GetRecordList(iUserID);
            string sChannelList = "-1,";
            foreach (DataRow item in dt.Rows)
            {
                sChannelList += item["MerchantID"] + ",";
            }
            return sChannelList.TrimEnd(',');
        }


    }
}
