/***************************************************************
 * Author       :谭清亮
 * Date         :2018-07-11
 * Description  :权限判断过滤器
***************************************************************/

using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace VSOFO.BasePage
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
    public class PowerFilterAttribute : ActionFilterAttribute
    {
        
        public string NoPermissionAction { get; set; }

        public PowerFilterAttribute()
        {
            NoPermissionAction = "/Main/NoPermission";
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //是否经过验证
            if (!filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                return;
            }

            var vAuthorizeTypeList = filterContext.Filters.Where(f => f.GetType() == typeof(AuthorizeTypeAttribute));
            if (vAuthorizeTypeList != null && vAuthorizeTypeList.Count() > 0)
            {
                AuthorizeTypeAttribute authorizeType = vAuthorizeTypeList.ToList().Last() as AuthorizeTypeAttribute;

                if (authorizeType.PowerKey == ConstValue.PowerKeys.SPAgent_PowerKey.IGNORE)
                {
                    return;
                }
                MerchanAgentCookies uc = CookiesManage.GetInfo<MerchanAgentCookies>(filterContext.HttpContext);
                //判断是否拥有权限
                if (AgentIsUserHavePower(uc.AdminID, authorizeType.PowerKey))
                {
                    if (IsAjaxRequest(filterContext.HttpContext.Request))
                    {
                        filterContext.Result = new MerchantAgentBackPage().ReturnMsg("-1", "请输入您的用户名");
                    }
                    else
                    {
                        filterContext.HttpContext.Response.Redirect(NoPermissionAction);
                    }

                }
            }

        }

        public static bool IsAjaxRequest(HttpRequest request)
        {
            bool result = false;
            var xreq = request.Headers.ContainsKey("x-requested-with");
            if (xreq)
            {
                result = request.Headers["x-requested-with"] == "XMLHttpRequest";
            }
            return result;
        }

        /// <summary>
        /// 判断代理商用户是否具有特定权限
        /// </summary>
        /// <param name="iUserID"></param>
        /// <param name="sPowerKey"></param>
        /// <returns></returns>
        public static bool AgentIsUserHavePower(int iUserID, string sPowerKey)
        {
            if (iUserID == 0) return false;
            if (sPowerKey == "") return false;

            //判断是否为超级管理员
            DB.Suppliers.Model.Agent_User aUser = new DB.Suppliers.BLL.Agent_User().GetRecordInfoByID(iUserID);
            if (aUser.IsAdmin)
            {
                return true;
            }
            else if (!aUser.IsEnable)
            {
                return false;
            }


            //判断是否具有基础权限
            return new DB.Suppliers_Agent.BLL.Merchant_PowerList().IsUserHavePower(iUserID, sPowerKey);
        }


    }
}
