/*****************************************************************************************************
Author		:
Date			:2019/1/3
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
    public class ProductType
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        public ProductType() {; }

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
        public bool SetRecord(Model.ProductType obj)
        {
            string sql = "cp_ProductType_SetRecord";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            //开始整理参数

            _db.AddParameter("ID", obj.ID);
            _db.AddParameter("Title", obj.Title);

            //开始执行操作
            return _db.ExecuteNonQuery()>0;

        }

        /// <summary>
        /// 修改记录信息
        /// </summary>
        /// <param name="obj">存放了修改记录的相关信息模型对象</param>
        /// <returns></returns>
        public bool SetStatus(int iID)
        {
            string sql = "cp_ProductType_SetStatus";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            //开始整理参数
            _db.AddParameter("ID", iID);

            //开始执行操作
            return _db.ExecuteNonQuery()>0;
        }

        /// <summary>
        /// 设置首页显示的商品类型
        /// </summary>
        /// <param name="obj">存放了修改记录的相关信息模型对象</param>
        /// <returns></returns>
        public bool SetHomeTop(int iID)
        {
            string sql = "cp_ProductType_SetHomeTop";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            //开始整理参数
            _db.AddParameter("ID", iID);

            //开始执行操作
            return _db.ExecuteNonQuery() > 0;
        }

        /// <summary>
        /// 得到分页记录信息
        /// </summary>
        public DataTable GetPageRecord(int iPage, int iPageSize, string sTitle, out int iTotalRow)
        {
            
            string sql = "cp_ProductType_GetPageRecord";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);
            _db.AddParameter("Page", iPage);
            _db.AddParameter("PageSize", iPageSize);
            _db.AddParameter("TypeTitle", sTitle);
            _db.AddParameter("RowCount", DbType.Int32, ParameterDirection.Output);
            DataTable dt = _db.ExecuteReaderToTable();
            iTotalRow = Convert.ToInt32(_db.GetParameterValue("RowCount"));
            return dt;
        }

    

        /// <summary>
        /// 取得记录信息
        /// </summary>
        /// <param name="iID">要得到的信息ID</param>
        /// <returns></returns>
        public Model.ProductType GetRecordInfo(int iID)
        {
            Model.ProductType obj = new Model.ProductType();
            string sql = "cp_ProductType_GetRecordInfo";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            _db.AddParameter("ID", iID);
            using (DbDataReader reader = _db.ExecuteReader())
            {
                if (reader.Read())
                {
                    obj.ID = Convert.ToInt32(reader["ID"]);
                    obj.Title = reader["Title"].ToString();
                    obj.IsEnable = Convert.ToBoolean(reader["IsEnable"]);
                    obj.IsHomeTop = Convert.ToBoolean(reader["IsHomeTop"]);
                }
            }
            return obj;
        }

        /// <summary>
        /// 取得记录信息
        /// </summary>
        /// <param name="iID">要得到的名称</param>
        /// <returns></returns>
        public Model.ProductType GetRecordInfo(string sTitle)
        {
            Model.ProductType obj = new Model.ProductType();
            string sql = "cp_ProductType_GetRecordInfoTitle";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            _db.AddParameter("Title", sTitle);
            using (DbDataReader reader = _db.ExecuteReader())
            {
                if (reader.Read())
                {
                    obj.ID = Convert.ToInt32(reader["ID"]);
                    obj.Title = reader["Title"].ToString();
                    obj.IsEnable = Convert.ToBoolean(reader["IsEnable"]);
                    obj.IsHomeTop = Convert.ToBoolean(reader["IsHomeTop"]);
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
            string sql = "cp_ProductType_GetRecordList";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            return _db.ExecuteReaderToTable();
        }


        /// <summary>
        /// 取得首页商品类型
        /// </summary>
        /// <returns></returns>
        public DataTable GetHomeTopList()
        {
            string sql = "cp_ProductType_GetHomeTopList";
            _db.CreateConnection(_connectstring);
            _db.CreateCommand(sql, CommandType.StoredProcedure);

            return _db.ExecuteReaderToTable();
        }

    }
}

