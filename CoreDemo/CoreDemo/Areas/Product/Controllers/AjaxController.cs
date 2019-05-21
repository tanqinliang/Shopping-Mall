/***************************************************************
 * Author       :谭清亮
 * Date         :2018-12-28
 * Description  :商品类型管理相关ajax方法
***************************************************************/
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Common;
using BasePage;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace CoreDemo.Areas.Product.Controllers
{
    //[Authorize]
    [Area("Product")]
    public class AjaxController : MerchantAgentBackPage
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public AjaxController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        /// <summary>
        /// 得到商品类型列表
        /// </summary>
        /// <param name="page">第几页</param>
        /// <param name="limit">每页显示的行数</param>
        /// <returns></returns>
        public JsonResult GetProductType(int page, int limit)
        {
            //类型名称
            string sTypeTitle = CommonUtils.GetStringValue(Request.Query["TypeTitle"]);
            //符合条件的总数据数量
            int iTotalRow = 0;
            //查询数据
            DataTable dtProductTypeTable = new BLL.ProductType().GetPageRecord(page, limit, sTypeTitle, out iTotalRow);
            return ReturnGridData<Model.ProductType>(dtProductTypeTable, iTotalRow);
        }

        /// <summary>
        /// 添加或修改商品类型
        /// </summary>
        /// <returns></returns>
        public JsonResult SetProductType([FromForm]Model.ProductType productTypeInfo)
        {
            //判断商品类型名称是否为空
            if (string.IsNullOrWhiteSpace(productTypeInfo.Title))
            {
                return ReturnMsg("-1", "商品名称不能为空");
            }

            //判断是否已存在相同的商品类型
            if (productTypeInfo.ID == 0 && new BLL.ProductType().GetRecordInfo(productTypeInfo.Title).ID != 0)
            {
                return ReturnMsg("-1", "商品名称已存在");
            }

            //添加或修改商品类型
            bool bIsSuc = new BLL.ProductType().SetRecord(productTypeInfo);
            //判断是否添加成功
            if (bIsSuc)
            {
                return ReturnMsg("0", "操作成功");
            }
            return ReturnMsg("-1", "操作失败");
        }

        /// <summary>
        /// 设置商品类型状态
        /// </summary>
        /// <param name="productTypeInfo"></param>
        /// <returns></returns>
        public JsonResult SetTypeStatus()
        {
            int iID = CommonUtils.GetIntValue(Request.Query["ID"]);
            //校验类型编号是否为空
            if (iID == 0)
            {
                return ReturnMsg("-1", "参数错误");
            }

            //设置商品状态
            bool bIsSuc = new BLL.ProductType().SetStatus(iID);
            //判断是否添加成功
            if (bIsSuc)
            {
                return ReturnMsg("0", "设置成功");
            }
            return ReturnMsg("-1", "设置失败");
        }

        /// <summary>
        /// 得到商品列表
        /// </summary>
        /// <returns></returns>
        public JsonResult GetProductList(int page, int limit)
        {
            string sProductTitle = CommonUtils.GetStringValue(Request.Query["ProductTitle"]);
            int iProductType = CommonUtils.GetIntValue(Request.Query["ProductType"]);
            int iProductMaterial = CommonUtils.GetIntValue(Request.Query["ProductMaterial"]);
            int iIsEnable = CommonUtils.GetIntValue(Request.Query["IsEnable"], -1);
            //符合条件的总数据数量
            int iTotalRow = 0;

            //查询数据
            DataTable dtProductTypeTable = new BLL.Product_Info().GetRecordList(page, limit, iProductType, iProductMaterial, iIsEnable, sProductTitle, out iTotalRow);
            return ReturnGridData<Model.AdminProduct>(dtProductTypeTable, iTotalRow);
        }

        /// <summary>
        /// 添加或修改商品
        /// </summary>
        /// <param name="product_Info"></param>
        /// <returns></returns>
        public JsonResult SetProduct([FromForm]Model.Product_Info product_Info)
        {
            //校验商品名称是否为空
            if (string.IsNullOrWhiteSpace(product_Info.ProductName))
            {
                return ReturnMsg("-1", "商品名称不能为空");
            }

            //校验面值
            if (product_Info.Price <= 0)
            {
                return ReturnMsg("-1", "商品价格必须大于零");
            }

            //设置图片路径
            product_Info.Image = "/images/ProductImage/";
            //添加或修改商品
            int iProductID = 0; //商品ID
            bool bIsSuc = new BLL.Product_Info().SetRecord(product_Info, out iProductID);

            if (bIsSuc)
            {
                TempData["ProductID"] = (product_Info.ID > 0 ? product_Info.ID : iProductID);
                return ReturnMsg("0", "操作成功");
            }

            return ReturnMsg("-1", "操作失败");
        }

        /// <summary>
        /// 上传商品图片
        /// </summary>
        /// <returns></returns>
        public JsonResult UploadProductImg()
        {
            //得到上传的图片
            IFormFileCollection files = Request.Form.Files;

            //商品编号
            int iProductID = CommonUtils.GetIntValue(TempData["ProductID"]);
            if (files.Count > 0)
            {
                //站点路径
                string sImgPath = _hostingEnvironment.ContentRootPath + "/wwwroot/images/ProductImage/";

                //判断文件路径是否存在，不存在则创建
                if (!Directory.Exists(sImgPath))
                {
                    Directory.CreateDirectory(sImgPath);
                }

                //生成图片文件名
                string sImageName = iProductID + ".png";

                //保存图片到本地
                using (FileStream fImage = System.IO.File.Create(sImgPath + sImageName))
                {
                    files[0].CopyTo(fImage);
                    fImage.Flush();
                }
            }
            else
            {
                return ReturnMsg("-1", "请上传商品图片");
            }

            return ReturnMsg("0", "操作成功");
        }

        /// <summary>
        /// 修改商品状态
        /// </summary>
        /// <returns></returns>
        public JsonResult SetProductStatus()
        {
            int iProductID = CommonUtils.GetIntValue(Request.Query["ProductID"]);

            //校验类型编号是否为空
            if (iProductID == 0)
            {
                return ReturnMsg("-1", "参数错误");
            }

            //设置商品状态
            bool bIsSuc = new BLL.Product_Info().SetStatus(iProductID);
            //判断是否添加成功
            if (bIsSuc)
            {
                return ReturnMsg("0", "设置成功");
            }
            return ReturnMsg("-1", "设置失败");
        }

        /// <summary>
        /// 获取商品材质列表
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public JsonResult GetProductMaterialList(int page, int limit)
        {
            string sName = CommonUtils.GetStringValue(Request.Query["Name"]);
            //符合条件的总数据数量
            int iTotalRow = 0;
            //查询数据
            DataTable dtProductTypeTable = new BLL.Product_Material().GetRecordList(page, limit, sName, out iTotalRow);
            return ReturnGridData<Model.Product_Material>(dtProductTypeTable, iTotalRow);

        }

        /// <summary>
        /// 添加或修改材质
        /// </summary>
        /// <returns></returns>
        public JsonResult SetProductMaterial([FromForm]Model.Product_Material MaterialInfo)
        {
            if (string.IsNullOrWhiteSpace(MaterialInfo.Name))
            {
                return ReturnMsg("-1", "材质名称不能为空");
            }

            bool bIsSuc = new BLL.Product_Material().SetRecord(MaterialInfo);
            if (bIsSuc)
            {
                return ReturnMsg("0", "设置成功");
            }
            return ReturnMsg("-1", "设置失败");
        }

        /// <summary>
        /// 获取首页商品
        /// </summary>
        /// <returns></returns>
        public JsonResult GetHomeTopProductList()
        {
            //符合条件的总数据数量
            int iTotalRow = 0;
            //查询数据
            DataTable dtProductList = new BLL.Product_Info().GetHomeTopList();
            iTotalRow = dtProductList.Rows.Count;
            return ReturnGridData<Model.AdminProduct>(dtProductList, iTotalRow);
        }

        /// <summary>
        /// 获取首页商品类型
        /// </summary>
        /// <returns></returns>
        public JsonResult GetHomeTopTypeList()
        {
            //符合条件的总数据数量
            int iTotalRow = 0;
            //查询数据
            DataTable dtProductTypeList = new BLL.ProductType().GetHomeTopList();
            iTotalRow = dtProductTypeList.Rows.Count;
            return ReturnGridData<Model.ProductType>(dtProductTypeList, iTotalRow);
        }
    }
}