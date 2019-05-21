/***************************************************************
 * Author       :谭清亮
 * Date         :2018-04-19
 * Description  :后台BagePage类
***************************************************************/
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Common;

namespace BasePage
{
    public class MerchanAgentCookies
    {
        //本次登录保存的记录信息
        public int AdminID { get; set; }								//管理员ID
        public string Account { get; set; }					    //管理员帐号
        public string ShowName { get; set; }					//显示名称		    
        public string LoginValidate { get; set; }                   //安全校验码

        public MerchanAgentCookies()
        {
            AdminID = 0;
            Account = "";
            ShowName = "";
            LoginValidate = "";
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
        private static string Key = "";

        protected const string LOGIN_VALIDATE_COOKIENAME = "LoginValidateCode";
        /// <summary>
        /// 对外使用的类信息
        /// </summary>
        public MerchanAgentCookies uc = new MerchanAgentCookies();

        /// <summary>
        /// 下载的application类型
        /// </summary>
        public static string DownloadContenType = "application/vnd.android.package-archive";

        public string GetIP()
        {
            return RequetUtils.GetIP(Request, HttpContext);
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            uc = HttpContext.GetInfo<MerchanAgentCookies>();
            base.OnActionExecuting(context);
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
        /// 返回前端表格数据
        /// </summary>
        /// <param name="dt">源数据</param>
        /// <returns></returns>
        public JsonResult ReturnGridData<T>(DataTable dtTable,int iCount)
        {
            //给对象赋值
            LayerUiTableBase<T> layerUiTable = new LayerUiTableBase<T>() {
                count= iCount,
                data = dtTable.GetDataList<T>()
            };
            //返回json格式数据
            return Json(layerUiTable, new JsonSerializerSettings() { ContractResolver = new DefaultContractResolver() });
        }

    }

    public class LayerUiTableBase<T>
    {
        public int code = 0;

        public string msg = "";

        public int count = 0;

        public List<T> data = new List<T>();
    }



}
