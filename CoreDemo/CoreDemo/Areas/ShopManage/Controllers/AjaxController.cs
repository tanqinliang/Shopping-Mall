/***************************************************************
 * Author       :谭清亮
 * Date         :2019-2-19
 * Description  :商店首页配置ajax类
***************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BasePage;
using Microsoft.AspNetCore.Mvc;
using Common;
using System.Data;

namespace CoreDemo.Areas.ShopManage.Controllers
{
    //[Authorize]
    [Area("ShopManage")]
    public class AjaxController : MerchantAgentBackPage
    {
        /// <summary>
        /// 设置首页商品类型
        /// </summary>
        /// <returns></returns>
        public JsonResult SetHomeTopProductType()
        {
            int iProductTypeID = CommonUtils.GetIntValue(Request.Query["ProductTypeID"]);   //  商品类型编号
            bool bIsDelet = CommonUtils.GetBooleanValue(Request.Query["IsDelet"]);  //是否为删除
            //校验商品类型是否已达到配置限制
            if (new BLL.ProductType().GetHomeTopList().Rows.Count >= 4 && !bIsDelet)
            {
                return ReturnMsg("-1", "主页最多推广4种类型的商品");
            }
            if (iProductTypeID == 0)
            {
                return ReturnMsg("-1", "请选择商品类型");
            }

            //设置商品类型状态
            if (new BLL.ProductType().SetHomeTop(iProductTypeID))
            {
                return ReturnMsg("1", bIsDelet ? "删除成功" : "添加成功");
            }
            else
            {
                return ReturnMsg("1", bIsDelet ? "删除失败" : "添加失败");
            }
        }

        /// <summary>
        /// 设置首页商品
        /// </summary>
        /// <returns></returns>
        public JsonResult SetHomeTopProduct()
        {
            int iProductID = CommonUtils.GetIntValue(Request.Query["ProductID"]);   //商品编号
            bool bIsDelet = CommonUtils.GetBooleanValue(Request.Query["IsDelet"]);   //是否为删除

            //获取商品详情
            Model.Product_Info ProductInfo = new BLL.Product_Info().GetRecordInfo(iProductID);
            if (ProductInfo.ID == 0)
            {
                return ReturnMsg("-1", "参数异常");
            }

            //校验商品是否已达到配置限制
            if (new BLL.Product_Info().GetRecordListByProductType(ProductInfo.ProductType, 1).Rows.Count >= 9 && !bIsDelet)
            {
                return ReturnMsg("-1", "主页每种商品类型最多配置9个商品");
            }

            //设置商品状态
            if (new BLL.Product_Info().SetHomeTop(iProductID))
            {
                return ReturnMsg("1", bIsDelet ? "删除成功" : "添加成功");
            }
            else
            {
                return ReturnMsg("1", bIsDelet ? "删除失败" : "添加失败");
            }

        }

        /// <summary>
        /// 根据商品类型获取对应的商品列表
        /// </summary>
        /// <returns></returns>
        public JsonResult GetProductList()
        {
            int iProductTypeID = CommonUtils.GetIntValue(Request.Query["ProductTypeID"]);
            if (iProductTypeID <= 0)
            {
                return ReturnMsg("-1", "参数错误");
            }
            DataTable dProductInfoTable = new BLL.Product_Info().GetRecordListByProductType(iProductTypeID, 0);

            return ReturnMsg("1", "成功", dProductInfoTable.GetDataList<Model.Product_Info>());
        }


    }
}