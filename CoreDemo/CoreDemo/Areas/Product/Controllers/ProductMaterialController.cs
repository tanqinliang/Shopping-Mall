/***************************************************************
 * Author       :谭清亮
 * Date         :2019-1-22
 * Description  :商品材质管理
***************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CoreDemo.Areas.Product.Controllers
{
    //[Authorize]
    [Area("Product")]
    public class ProductMaterialController : Controller
    {
        /// <summary>
        /// 商品材质列表
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 添加或修改商品材质
        /// </summary>
        /// <returns></returns>
        public IActionResult AddMaterial()
        {
            int iMaterialID = Common.CommonUtils.GetIntValue(Request.Query["MaterialID"]);
            ViewBag.MeaterialInfo = new BLL.Product_Material().GetRecordInfo(iMaterialID);
            return View();
        }
    }
}