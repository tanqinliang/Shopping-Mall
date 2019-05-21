/*****************************************************************************************************
Author		:
Date			:2019/1/22
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
    public class Product_Material
    {
        /// <summary>
        /// 数据操作层操作对象
        /// </summary>
        private DAL.Product_Material dal = new DAL.Product_Material();

        /// <summary>
        /// 构造函数
        /// </summary>
        public Product_Material() {; }

        /// <summary>
        /// 添加记录信息
        /// </summary>
        /// <returns></returns>
        public bool SetRecord(Model.Product_Material obj)
        {
            return dal.SetRecord(obj);
        }

        /// <summary>
        /// 修改记录信息
        /// </summary>
        /// <returns></returns>
        public void UpdateRecord(Model.Product_Material obj)
        {
            dal.UpdateRecord(obj);
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
        public Model.Product_Material GetRecordInfo(int iID)
        {
            return dal.GetRecordInfo(iID);
        }

        /// <summary>
        /// 得到记录信息
        /// </summary>
        /// <returns></returns>
        public DataTable GetRecordList()
        {
            return dal.GetRecordList();
        }

        /// <summary>
        /// 得到分页记录
        /// </summary>
        /// <returns></returns>
        public DataTable GetRecordList(int iPage, int iPageSize, string sName, out int iTotalRow)
        {
            return dal.GetRecordList(iPage, iPageSize, sName, out iTotalRow);
        }

    }
}

