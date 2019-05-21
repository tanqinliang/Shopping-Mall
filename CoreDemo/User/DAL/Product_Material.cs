/*****************************************************************************************************
Author		:
Date			:2019/1/22
Description	:
Update		:
Author			Date				Description			
*****************************************************************************************************/

using DBAccess;
using System;
using System.Data;
using System.Data.Common;


namespace DAL
{
    /// <summary>
    /// Soholife.DAL
    /// </summary>
    public class Product_Material
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        public Product_Material() {; }

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
        public bool SetRecord(Model.Product_Material obj)
        {
            string sql = "cp_Product_Material_SetRecord";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            //开始整理参数
            _db.AddParameter("ID", obj.ID);
            _db.AddParameter("Name", obj.Name);
            _db.AddParameter("IsEnable", obj.IsEnable);
            _db.AddParameter("SetTime", obj.SetTime);
            _db.AddParameter("Details", obj.Details);

            //开始执行操作
           return _db.ExecuteNonQuery()>0;
        }

        /// <summary>
        /// 修改记录信息
        /// </summary>
        /// <param name="obj">存放了修改记录的相关信息模型对象</param>
        /// <returns></returns>
        public void UpdateRecord(Model.Product_Material obj)
        {
            string sql = "cp_Product_Material_UpdateRecord";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            //开始整理参数
            _db.AddParameter("ID", obj.ID);
            _db.AddParameter("Name", obj.Name);
            _db.AddParameter("IsEnable", obj.IsEnable);
            _db.AddParameter("SetTime", obj.SetTime);
            _db.AddParameter("Details", obj.Details);

            //开始执行操作
            _db.ExecuteNonQuery();
        }

        /// <summary>
        /// 删除记录信息
        /// </summary>
        /// <param name="iID">要删除的记录ID</param>
        /// <returns></returns>
        public void DeleteRecord(int iID)
        {
            string sql = "cp_Product_Material_DeleteRecord";
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
        public Model.Product_Material GetRecordInfo(int iID)
        {
            Model.Product_Material obj = new Model.Product_Material();
            string sql = "cp_Product_Material_GetRecordInfo";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            _db.AddParameter("ID", iID);
            using (DbDataReader reader = _db.ExecuteReader())
            {
                if (reader.Read())
                {
                    obj.ID = Convert.ToInt32(reader["ID"]);
                    obj.Name = reader["Name"].ToString();
                    obj.IsEnable = Convert.ToBoolean(reader["IsEnable"]);
                    obj.SetTime = Convert.ToDateTime(reader["SetTime"]);
                    obj.Details = reader["Details"].ToString();
                }
            }
            return obj;
        }

        /// <summary>
        /// 取得记录列表信息
        /// </summary>
        /// <returns></returns>
        public DataTable GetRecordList()
        {
            string sql = "cp_Product_Material_GetRecordList";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            return _db.ExecuteReaderToTable();
        }

        /// <summary>
        /// 得到分页记录信息
        /// </summary>
        public DataTable GetRecordList(int iPage, int iPageSize, string sName, out int iTotalRow)
        {
            string sql = "cp_Product_Material_GetPageRecord";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            _db.AddParameter("Page", iPage);
            _db.AddParameter("PageSize", iPageSize);
            _db.AddParameter("Name", sName);
            _db.AddParameter("RowCount", DbType.Int32, ParameterDirection.Output);
            DataTable t = _db.ExecuteReaderToTable();
            iTotalRow = Convert.ToInt32(_db.GetParameterValue("RowCount"));
            return t;
        }

    }
}

