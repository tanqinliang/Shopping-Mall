/*****************************************************************************************************
Author		:
Date			:2019/1/14
Description	:
Update		:
Author			Date				Description			
*****************************************************************************************************/

using System.Data;


namespace BLL
{
    /// <summary>
    /// 业务逻辑层Soholife.Model代码 
    /// </summary>
    public class Product_Info
    {
        /// <summary>
        /// 数据操作层操作对象
        /// </summary>
        private DAL.Product_Info dal = new DAL.Product_Info();

        /// <summary>
        /// 构造函数
        /// </summary>
        public Product_Info() {; }

        /// <summary>
        /// 添加记录信息
        /// </summary>
        /// <returns></returns>
        public bool SetRecord(Model.Product_Info obj, out int iID)
        {
            return dal.SetRecord(obj, out iID);
        }

        /// <summary>
        /// 修改记录信息
        /// </summary>
        /// <returns></returns>
        public bool SetStatus(int iID)
        {
            return dal.SetStatus(iID);
        }

        /// <summary>
        /// 修改首页显示状态
        /// </summary>
        /// <param name="obj">存放了修改记录的相关信息模型对象</param>
        /// <returns></returns>
        public bool SetHomeTop(int iID)
        {
            return dal.SetHomeTop(iID);
        }

        /// <summary>
        /// 删除记录信息
        /// </summary>
        /// <returns></returns>
        public void DeleteRecord(int iID)
        {
            dal.DeleteRecord(iID);
        }

        /// <summary>
        /// 得到记录信息
        /// </summary>
        /// <returns></returns>
        public Model.Product_Info GetRecordInfo(int iID)
        {
            return dal.GetRecordInfo(iID);
        }

        /// <summary>
        /// 取得记录列表信息
        /// </summary>
        /// <returns></returns>
        public DataTable GetRecordListByProductType(int iProductType, int iIsHomeTop = -1)
        {
            return dal.GetRecordListByProductType(iProductType, iIsHomeTop);
        }


        /// <summary>
        /// 得到分页记录信息
        /// </summary>
        public DataTable GetRecordList(int iPage, int iPageSize, int iProductType, int iMaterial, int iIsEnable, string sProductName, out int iTotalRow)
        {
            return dal.GetRecordList(iPage, iPageSize, iProductType, iMaterial, iIsEnable, sProductName, out iTotalRow);
        }

        /// <summary>
        /// 获取首页商品
        /// </summary>
        /// <returns></returns>
        public DataTable GetHomeTopList()
        {
            return dal.GetHomeTopList();
        }
    }
}

