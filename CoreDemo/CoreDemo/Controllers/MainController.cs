/***************************************************************
 * Author       :谭清亮
 * Date         :2019-1-9
 * Description  :首页框架
***************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BasePage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreDemo.Controllers
{
    //[Authorize]
    public class MainController : MerchantAgentBackPage
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}