/***************************************************************
 * Author       :谭清亮
 * Date         :2018-1-15
 * Description  :商品管理相关页面
***************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BasePage;
using Microsoft.AspNetCore.Mvc;

namespace CoreDemo.Areas.Product.Controllers
{
    //[Authorize]
    [Area("Product")]
    public class ProductListController : MerchantAgentBackPage
    {
        public IActionResult Index()
        {
            ViewBag.ProductTypeList = new BLL.ProductType().GetRecordList().Select("IsEnable");
            ViewBag.ProductMaterialList = new BLL.Product_Material().GetRecordList().Select("IsEnable");
            return View();
        }

        public IActionResult AddProduct()
        {
            int iProductID = Common.CommonUtils.GetIntValue(Request.Query["ProductID"]);
            ViewBag.ProductTypeList = new BLL.ProductType().GetRecordList().Select("IsEnable");
            ViewBag.ProductMaterialList = new BLL.Product_Material().GetRecordList().Select("IsEnable");
            ViewBag.ProductInfo = new BLL.Product_Info().GetRecordInfo(iProductID);

            return View();
        }

    }

}