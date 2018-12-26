/***************************************************************
 * Author       :谭清亮
 * Date         :2018-12-26
 * Description  :登录验证类
***************************************************************/
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using System;
using System.Security.Claims;
using Common;

namespace BasePage
{
    public static class CookiesManage
    {
        /// <summary>
        /// cookie名称
        /// </summary>
        public static string AuthenticationScheme
        {
            get
            {
                return JsonSettingsUtils.GetSetting("CookieSettings:CookieName");
            }
        }

        /// <summary>
        /// 获得用户实体对象
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public static T GetInfo<T>(this HttpContext context) where T : new()
        {
            T obj = new T();
            Type type = typeof(T);
            foreach (var info in type.GetProperties())
            {
                var claim = context.User.FindFirst(info.Name);
                if (claim != null)
                {
                    try
                    {
                        info.SetValue(obj, Convert.ChangeType((claim.Value), info.PropertyType));
                    }
                    catch (Exception) { }
                }
            }
            return obj;
        }

        /// <summary>
        /// 设置用户登录信息
        /// </summary>
        /// <param name="context">请求上下文</param>
        /// <param name="oUserInfo">用户登录信息</param>
        /// <returns></returns>
        public static bool SetInfo<T>(this HttpContext context, T oUserInfo) where T : new()
        {
            return SetInfo(context, oUserInfo, AuthenticationScheme);
        }

        /// <summary>
        /// 设置用户登录信息
        /// </summary>
        /// <param name="context">请求上下文</param>
        /// <param name="oUserInfo">用户登录信息</param>
        /// <param name="sAuthenticationScheme">认证方案名称</param>
        /// <returns></returns>
        public static bool SetInfo<T>(HttpContext context, T oUserInfo, string sAuthenticationScheme) where T : new()
        {
            bool bValue = false;
            try
            {
                var identity = new ClaimsIdentity("User");
                Type type = oUserInfo.GetType();
                foreach (System.Reflection.PropertyInfo item in type.GetProperties())
                {
                    identity.AddClaim(new Claim(item.Name, CommonUtils.GetStringValue(item.GetValue(oUserInfo))));
                }
                var principal = new ClaimsPrincipal(identity);
                context.SignInAsync(sAuthenticationScheme, principal, new AuthenticationProperties { IsPersistent = false });
                bValue = true;
            }
            catch (Exception)
            {
                bValue = false;
            }
            return bValue;
        }

        /// <summary>
        /// 清初登陆Cookies
        /// </summary>
        public static void Clear(this HttpContext context)
        {
            context.SignOutAsync(AuthenticationScheme);
        }

        /// <summary>
        /// 清初登陆Cookies
        /// </summary>
        public static void Clear(this HttpContext context, string sAuthenticationScheme)
        {
            context.SignOutAsync(sAuthenticationScheme);
        }
    }
}
