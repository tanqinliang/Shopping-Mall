/*****************************************************************************************************
Author		:
Date			:2019/1/14
Description	:
Update		:
Author			Date				Description			
*****************************************************************************************************/

using System;
using System.Data;
using System.Data.Common;
using DBAccess;


namespace DAL
{
    /// <summary>
    /// Soholife.DAL
    /// </summary>
    public class Product_Info
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        public Product_Info() {; }

        /// <summary>
        /// 得到数据库连接字符串
        /// </summary>
        private string _connectstring = Connection.UserStatConnection();


        /// <summary>
        /// 当前数据层操作对象
        /// </summary>
        private IDatabase _db = DbFactory.Create(Connection.GetDataProvider());

        /// <summary>
        /// 添加记录信息
        /// </summary>
        /// <param name="obj">存放了要添加的记录的相关信息模型对象</param>
        /// <returns></returns>
        public bool SetRecord(Model.Product_Info obj, out int iID)
        {
            string sql = "cp_Product_Info_SetRecord";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            //开始整理参数
            _db.AddParameter("ID", obj.ID);
            _db.AddParameter("ProductType", obj.ProductType);
            _db.AddParameter("ProductName", obj.ProductName);
            _db.AddParameter("Material", obj.Material);
            _db.AddParameter("Price", obj.Price);
            _db.AddParameter("Unit", obj.Unit);
            _db.AddParameter("Image", obj.Image);
            _db.AddParameter("Details", obj.Details);
            _db.AddParameter("ReturnValue", DbType.Int32, ParameterDirection.ReturnValue);

            //开始执行操作
            bool bIsSuc = _db.ExecuteNonQuery() > 0;
            iID = Common.CommonUtils.GetIntValue(_db.GetParameterValue("ReturnValue"));
            return bIsSuc;
        }

        /// <summary>
        /// 修改记录信息
        /// </summary>
        /// <param name="obj">存放了修改记录的相关信息模型对象</param>
        /// <returns></returns>
        public bool SetStatus(int iID)
        {
            string sql = "cp_Product_Info_SetStatus";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            //开始整理参数
            _db.AddParameter("ID", iID);

            //开始执行操作
            return _db.ExecuteNonQuery() > 0;
        }

        /// <summary>
        /// 修改首页显示状态
        /// </summary>
        /// <param name="obj">存放了修改记录的相关信息模型对象</param>
        /// <returns></returns>
        public bool SetHomeTop(int iID)
        {
            string sql = "cp_Product_Info_SetHomeTop";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            //开始整理参数
            _db.AddParameter("ID", iID);

            //开始执行操作
            return _db.ExecuteNonQuery() > 0;
        }

        /// <summary>
        /// 删除记录信息
        /// </summary>
        /// <param name="iID">要删除的记录ID</param>
        /// <returns></returns>
        public void DeleteRecord(int iID)
        {
            string sql = "cp_Product_Info_DeleteRecord";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            _db.AddParameter("ID", iID);
            _db.ExecuteNonQuery();
        }

        /// <summary>
        /// 取得记录信息
        /// </summary>
        /// <param name="iID">要得到的信息ID</param>
        /// <returns></returns>
        public Model.Product_Info GetRecordInfo(int iID)
        {
            Model.Product_Info obj = new Model.Product_Info();
            string sql = "cp_Product_Info_GetRecordInfo";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            _db.AddParameter("ID", iID);
            using (DbDataReader reader = _db.ExecuteReader())
            {
                if (reader.Read())
                {
                    obj.ID = Convert.ToInt32(reader["ID"]);
                    obj.ProductType = Convert.ToInt32(reader["ProductType"]);
                    obj.ProductName = reader["ProductName"].ToString();
                    obj.Material = Convert.ToInt32(reader["Material"]);
                    obj.Price = Convert.ToDecimal(reader["Price"]);
                    obj.Unit = reader["Unit"].ToString();
                    obj.Image = reader["Image"].ToString();
                    obj.Details = reader["Details"].ToString();
                    obj.IsEnable = Convert.ToBoolean(reader["IsEnable"]);
                    obj.SetTime = Convert.ToDateTime(reader["SetTime"]);
                    obj.IsHomeTop= Convert.ToBoolean(reader["IsHomeTop"]);
                }
            }
            return obj;
        }

        /// <summary>
        /// 取得记录列表信息
        /// </summary>
        /// <returns></returns>
        public DataTable GetRecordListByProductType(int iProductType,int iIsHomeTop)
        {
            string sql = "cp_Product_Info_GetRecordListByProductType";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);
            _db.AddParameter("ProductType", iProductType);
            _db.AddParameter("IsHomeTop", iIsHomeTop);

            return _db.ExecuteReaderToTable();
        }

        /// <summary>
        /// 得到分页记录信息
        /// </summary>
        public DataTable GetRecordList(int iPage, int iPageSize, int iProductType,int iMaterial, int iIsEnable, string sProductName, out int iTotalRow)
        {
            string sql = "cp_Product_Info_GetPageRecord";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            _db.AddParameter("Page", iPage);
            _db.AddParameter("PageSize", iPageSize);
            _db.AddParameter("ProductType", iProductType);
            _db.AddParameter("Material", iMaterial);
            _db.AddParameter("IsEnable", iIsEnable);
            _db.AddParameter("ProductName", sProductName);
            _db.AddParameter("RowCount", DbType.Int32, ParameterDirection.Output);
            DataTable t = _db.ExecuteReaderToTable();
            iTotalRow = Convert.ToInt32(_db.GetParameterValue("RowCount"));
            return t;
        }

        /// <summary>
        /// 获取首页商品
        /// </summary>
        /// <returns></returns>
        public DataTable GetHomeTopList()
        {
            string sql = "cp_Product_Info_GetHomeTopList";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            return _db.ExecuteReaderToTable();
        }

    }
}

