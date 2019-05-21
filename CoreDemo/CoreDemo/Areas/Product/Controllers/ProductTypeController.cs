/***************************************************************
 * Author       :谭清亮
 * Date         :2018-12-28
 * Description  :商品类型管理相关页面
***************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BasePage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreDemo.Areas.Product.Controllers
{
    //[Authorize]
    [Area("Product")]
    public class ProductTypeController : MerchantAgentBackPage
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult AddType([FromQuery]Model.ProductType productType)
        {
            return View(productType);
        }
    }
}