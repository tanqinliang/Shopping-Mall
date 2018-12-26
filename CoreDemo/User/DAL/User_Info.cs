/*****************************************************************************************************
Author		:
Date			:2018/12/26
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
	public class User_Info
	{
		/// <summary>
		/// 构造函数
		/// </summary>
		public User_Info(){;}

		/// <summary>
		/// 得到数据库连接字符串
		/// </summary>
		private string _connectstring =Connection.UserStatConnection();
		

		/// <summary>
		/// 当前数据层操作对象
		/// </summary>
		private IDatabase _db = DbFactory.Create(Connection.GetDataProvider());
		

		/// <summary>
		/// 添加记录信息
		/// </summary>
		/// <param name="obj">存放了要添加的记录的相关信息模型对象</param>
		/// <returns></returns>
		public void AddRecord(Model.User_Info obj)
		{
			string sql = "cp_User_Info_AddRecord";	
			_db.CreateConnection(_connectstring);
			_db.CreateCommand(sql,CommandType.StoredProcedure);

			//开始整理参数
			
			_db.AddParameter("ShowName",obj.ShowName);
			_db.AddParameter("Account",obj.Account);
			_db.AddParameter("Password",obj.Password);
			_db.AddParameter("AddTime",obj.AddTime);
			_db.AddParameter("IsLock",obj.IsLock);
			_db.AddParameter("LastLoginIP",obj.LastLoginIP);
			_db.AddParameter("LastLoginTime",obj.LastLoginTime);
			_db.AddParameter("Moblie",obj.Moblie);

			//开始执行操作
			_db.ExecuteNonQuery();
		}

		/// <summary>
		/// 修改记录信息
		/// </summary>
		/// <param name="obj">存放了修改记录的相关信息模型对象</param>
		/// <returns></returns>
		public void UpdateRecord(Model.User_Info obj)
		{
			string sql = "cp_User_Info_UpdateRecord";	
			_db.CreateConnection(_connectstring);
			_db.CreateCommand(sql,CommandType.StoredProcedure);

			//开始整理参数
			_db.AddParameter("ID",obj.ID);
			_db.AddParameter("ShowName",obj.ShowName);
			_db.AddParameter("Account",obj.Account);
			_db.AddParameter("Password",obj.Password);
			_db.AddParameter("AddTime",obj.AddTime);
			_db.AddParameter("IsLock",obj.IsLock);
			_db.AddParameter("LastLoginIP",obj.LastLoginIP);
			_db.AddParameter("LastLoginTime",obj.LastLoginTime);
			_db.AddParameter("Moblie",obj.Moblie);

			//开始执行操作
			_db.ExecuteNonQuery();
		}
        
		/// <summary>
		/// 取得记录信息
		/// </summary>
		/// <param name="iID">要得到的信息ID</param>
		/// <returns></returns>
		public Model.User_Info GetRecordInfo(int iID)
		{
			Model.User_Info obj = new Model.User_Info(); 
			string sql = "cp_User_Info_GetRecordInfo";	
			_db.CreateConnection(_connectstring);
			_db.CreateCommand(sql,CommandType.StoredProcedure);

			_db.AddParameter("ID" ,iID)  ;
			using (DbDataReader reader = _db.ExecuteReader())
			{
				if (reader.Read())
				{
					obj.ID = Convert.ToInt32(reader["ID"]); 
					obj.ShowName =reader["ShowName"].ToString(); 
					obj.Account =reader["Account"].ToString(); 
					obj.Password =reader["Password"].ToString(); 
					obj.AddTime = Convert.ToDateTime(reader["AddTime"]); 
					obj.IsLock = Convert.ToBoolean(reader["IsLock"]); 
					obj.LastLoginIP =reader["LastLoginIP"].ToString(); 
					obj.LastLoginTime = Convert.ToDateTime(reader["LastLoginTime"]); 
					obj.Moblie =reader["Moblie"].ToString(); 
				}
			}
			return obj;
		}

	}
}

