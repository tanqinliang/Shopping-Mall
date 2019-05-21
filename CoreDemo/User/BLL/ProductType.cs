/*****************************************************************************************************
Author		:
Date			:2019/1/3
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
    public class ProductType
    {
        /// <summary>
        /// 数据操作层操作对象
        /// </summary>
        private DAL.ProductType dal = new DAL.ProductType();

        /// <summary>
        /// 构造函数
        /// </summary>
        public ProductType() {; }

        /// <summary>
        /// 添加记录信息
        /// </summary>
        /// <returns></returns>
        public bool SetRecord(Model.ProductType obj)
        {
            return dal.SetRecord(obj);
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
        /// 设置首页显示的商品类型
        /// </summary>
        /// <param name="obj">存放了修改记录的相关信息模型对象</param>
        /// <returns></returns>
        public bool SetHomeTop(int iID)
        {
            return dal.SetHomeTop(iID);
        }

        /// <summary>
        /// 得到记录信息
        /// </summary>
        /// <returns></returns>
        public Model.ProductType GetRecordInfo(int iID)
        {
            return dal.GetRecordInfo(iID);
        }

        /// <summary>
        /// 取得记录信息
        /// </summary>
        /// <param name="iID">要得到的名称</param>
        /// <returns></returns>
        public Model.ProductType GetRecordInfo(string sTitle)
        {
            return dal.GetRecordInfo(sTitle);
        }

        /// <summary>
        /// 得到分页记录信息
        /// </summary>
        public DataTable GetPageRecord(int iPage, int iPageSize, string sTitle, out int iTotalRow)
        {
            return dal.GetPageRecord(iPage, iPageSize, sTitle, out iTotalRow);
        }

        /// <summary>
        /// 取得记录列表信息
        /// </summary>
        /// <returns></returns>
        public DataTable GetRecordList()
        {
            return dal.GetRecordList();
        }


        /// <summary>
        /// 取得首页商品类型
        /// </summary>
        /// <returns></returns>
        public DataTable GetHomeTopList()
        {
            return dal.GetHomeTopList();
        }
    }
}

