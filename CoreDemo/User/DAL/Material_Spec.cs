/*****************************************************************************************************
Author		:
Date			:2019/2/22
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
    public class Material_Spec
	{
		/// <summary>
		/// 构造函数
		/// </summary>
		public Material_Spec(){;}

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
        public void AddRecord(Model.Material_Spec obj)
		{
			string sql = "cp_Material_Spec_AddRecord";	
			_db.CreateConnection(_connectstring);
			_db.CreateCommand(sql,CommandType.StoredProcedure);

			//开始整理参数
			
			_db.AddParameter("Specifications",obj.Specifications);
			_db.AddParameter("ProductType",obj.ProductType);

			//开始执行操作
			_db.ExecuteNonQuery();
		}

		/// <summary>
		/// 修改记录信息
		/// </summary>
		/// <param name="obj">存放了修改记录的相关信息模型对象</param>
		/// <returns></returns>
		public void UpdateRecord(Model.Material_Spec obj)
		{
			string sql = "cp_Material_Spec_UpdateRecord";	
			_db.CreateConnection(_connectstring);
			_db.CreateCommand(sql,CommandType.StoredProcedure);

			//开始整理参数
			_db.AddParameter("ID",obj.ID);
			_db.AddParameter("Specifications",obj.Specifications);
			_db.AddParameter("ProductType",obj.ProductType);

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
			string sql = "cp_Material_Spec_DeleteRecord";	
			_db.CreateConnection(_connectstring);
			_db.CreateCommand(sql,CommandType.StoredProcedure);

			_db.AddParameter("ID" ,iID)  ;
			_db.ExecuteNonQuery();
		}

		/// <summary>
		/// 取得记录信息
		/// </summary>
		/// <param name="iID">要得到的信息ID</param>
		/// <returns></returns>
		public Model.Material_Spec GetRecordInfo(int iID)
		{
			Model.Material_Spec obj = new Model.Material_Spec(); 
			string sql = "cp_Material_Spec_GetRecordInfo";	
			_db.CreateConnection(_connectstring);
			_db.CreateCommand(sql,CommandType.StoredProcedure);

			_db.AddParameter("ID" ,iID)  ;
			using (DbDataReader reader = _db.ExecuteReader())
			{
				if (reader.Read())
				{
					obj.ID = Convert.ToInt32(reader["ID"]); 
					obj.Specifications =reader["Specifications"].ToString(); 
					obj.ProductType = Convert.ToInt32(reader["ProductType"]); 
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
			string sql = "cp_Material_Spec_GetRecordList";	
			_db.CreateConnection(_connectstring);
			_db.CreateCommand(sql,CommandType.StoredProcedure);
            
            return _db.ExecuteReaderToTable();
		}

	}
}

