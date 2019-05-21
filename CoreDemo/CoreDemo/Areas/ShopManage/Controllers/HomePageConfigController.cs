/***************************************************************
 * Author       :谭清亮
 * Date         :2019-1-23
 * Description  :商店首页配置
***************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BasePage;
using Microsoft.AspNetCore.Mvc;

namespace CoreDemo.Areas.ShopManage.Controllers
{
    //[Authorize]
    [Area("ShopManage")]
    public class HomePageConfigController : MerchantAgentBackPage
    {
        public IActionResult Index()
        {
            ViewBag.ProductTypeList = new BLL.ProductType().GetRecordList().Select("IsEnable AND NOT IsHomeTop");
            ViewBag.HomeTopProductTypeList = new BLL.ProductType().GetHomeTopList().Rows;
            return View();
        }
    }
}