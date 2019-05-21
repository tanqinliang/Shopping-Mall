/***************************************************************
 * Author       :谭清亮
 * Date         :2019-1-23
 * Description  :商品管理相关页面
***************************************************************/
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreDemo.Controllers
{
    [AllowAnonymous]
    public class ShopController : Controller
    {
        /// <summary>
        /// 商城首页
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            ViewBag.ProductType = new BLL.ProductType().GetRecordList().Select("IsEnable"); //所有开通的商品类型
            ViewBag.ProductMaterial = new BLL.Product_Material().GetRecordList().Select("IsEnable");    //所有开通的材质类型
            ViewBag.HomeTopProductType = new BLL.ProductType().GetHomeTopList().Rows;   //首页显示的商品类型
            return View();
        }

        /// <summary>
        /// 商品详情页
        /// </summary>
        /// <returns></returns>
        public IActionResult ProductDetail()
        {
            int iProductID = Common.CommonUtils.GetIntValue(Request.Query["ProductID"]);    //商品编号
            Model.Product_Info ProductInfo = new BLL.Product_Info().GetRecordInfo(iProductID);  //商品详情
            ProductInfo.Details = ProductInfo.Details.Replace(" ", "&nbsp").Replace("\n", "<br />");
            ViewBag.ProductInfo = ProductInfo;
            ViewBag.ProductType = new BLL.ProductType().GetRecordInfo(ProductInfo.ProductType);    //商品类型详情
            ViewBag.ProductMaterial = new BLL.Product_Material().GetRecordInfo(ProductInfo.Material); //商品材质详情
            return View();
        }

        /// <summary>
        /// 联系方式页
        /// </summary>
        /// <returns></returns>
        public IActionResult AboutUs()
        {
            return View();
        }

    }
}