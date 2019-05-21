/***************************************************************
 * Author       :谭清亮
 * Date         :2018-12-28
 * Description  :登录首页
***************************************************************/
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Soholife.Common;
using BasePage;

namespace CoreDemo.Controllers
{
    [AllowAnonymous]
    public class AdminController : MerchantAgentBackPage
    {
        
        public IActionResult Login()
        {
            return View();
        }
        
        public IActionResult Validatepic()
        {
            string sCode = string.Empty;
            MemoryStream ms = ValidatePic.CreateImage(out sCode);
            //将验证码记录cookie缓存
            HttpContext.Response.Cookies.Append(LOGIN_VALIDATE_COOKIENAME, sCode, new CookieOptions() { Domain = DomainName });
            return File(ms.ToArray(), @"image/png");

        }

        
    }
}