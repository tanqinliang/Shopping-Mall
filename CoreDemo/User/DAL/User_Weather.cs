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
using Soholife;


namespace Soholife.DAL
{
	/// <summary>
	/// Soholife.DAL
	/// </summary>
	public class User_Weather
	{
		/// <summary>
		/// 构造函数
		/// </summary>
		public User_Weather(){;}

		/// <summary>
		/// 得到数据库连接字符串
		/// </summary>
		private string _connectstring = Soholife.DB.ConfigTools.GetConnection();
		

		/// <summary>
		/// 当前数据层操作对象
		/// </summary>
		private Soholife.IDatabase _db = Soholife.DbFactory.Create(Soholife.DB.ConfigTools.GetDataProvider());
		

		/// <summary>
		/// 添加记录信息
		/// </summary>
		/// <param name="obj">存放了要添加的记录的相关信息模型对象</param>
		/// <returns></returns>
		public void AddRecord(Model.User_Weather obj)
		{
			string sql = "cp_User_Weather_AddRecord";	
			_db.CreateConnection(_connectstring);
			_db.CreateCommand(sql,CommandType.StoredProcedure);

			//开始整理参数
			
			_db.AddParameter("UserID",obj.UserID);
			_db.AddParameter("Title",obj.Title);
			_db.AddParameter("Weather",obj.Weather);
			_db.AddParameter("Journal",obj.Journal);
			_db.AddParameter("Dat",obj.Dat);
			_db.AddParameter("Week",obj.Week);
			_db.AddParameter("AddTime",obj.AddTime);

			//开始执行操作
			_db.ExecuteNonQuery();
		}

		/// <summary>
		/// 修改记录信息
		/// </summary>
		/// <param name="obj">存放了修改记录的相关信息模型对象</param>
		/// <returns></returns>
		public void UpdateRecord(Model.User_Weather obj)
		{
			string sql = "cp_User_Weather_UpdateRecord";	
			_db.CreateConnection(_connectstring);
			_db.CreateCommand(sql,CommandType.StoredProcedure);

			//开始整理参数
			_db.AddParameter("ID",obj.ID);
			_db.AddParameter("UserID",obj.UserID);
			_db.AddParameter("Title",obj.Title);
			_db.AddParameter("Weather",obj.Weather);
			_db.AddParameter("Journal",obj.Journal);
			_db.AddParameter("Dat",obj.Dat);
			_db.AddParameter("Week",obj.Week);
			_db.AddParameter("AddTime",obj.AddTime);

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
			string sql = "cp_User_Weather_DeleteRecord";	
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
		public Model.User_Weather GetRecordInfo(int iID)
		{
			Model.User_Weather obj = new Model.User_Weather(); 
			string sql = "cp_User_Weather_GetRecordInfo";	
			_db.CreateConnection(_connectstring);
			_db.CreateCommand(sql,CommandType.StoredProcedure);

			_db.AddParameter("ID" ,iID)  ;
			using (DbDataReader reader = _db.ExecuteReader())
			{
				if (reader.Read())
				{
					obj.ID = Convert.ToInt32(reader["ID"]); 
					obj.UserID = Convert.ToInt32(reader["UserID"]); 
					obj.Title =reader["Title"].ToString(); 
					obj.Weather =reader["Weather"].ToString(); 
					obj.Journal =reader["Journal"].ToString(); 
					obj.Dat = Convert.ToDateTime(reader["Dat"]); 
					obj.Week =reader["Week"].ToString(); 
					obj.AddTime = Convert.ToDateTime(reader["AddTime"]); 
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
			string sql = "cp_User_Weather_GetRecordList";	
			_db.CreateConnection(_connectstring);
			_db.CreateCommand(sql,CommandType.StoredProcedure);

			return _db.ExecuteReaderToTable();
		}

		/// <summary>
		/// 得到分页记录信息
		/// </summary>
		public Soholife.DB.SplitPage  GetRecordList(int iPage,int iPageSize)
		{
			string sql = "cp_User_Weather_GetPageRecord";	
			_db.CreateConnection(_connectstring);
			_db.CreateCommand(sql,CommandType.StoredProcedure);

			_db.AddParameter("Page", iPage);
			_db.AddParameter("PageSize", iPageSize);
			_db.AddParameter("RowCount", DbType.Int32, ParameterDirection.Output);
			DataTable t = _db.ExecuteReaderToTable();
			int iTotalRow = Convert.ToInt32(_db.GetParameterValue("RowCount"));
			return new Soholife.DB.SplitPage(iPage,iPageSize,iTotalRow ,t);
		}

	}
}

