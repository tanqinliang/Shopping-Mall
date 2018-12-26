/*****************************************************************************************************
Author		:
Date			:2018/12/26
Description	:
Update		:
Author			Date				Description			
*****************************************************************************************************/

using System;


namespace Model
{
	/// <summary>
	/// Soholife.Model
	/// </summary>
	public class User_Info
	{
		/// <summary>
		/// ID
		/// </summary>
		public  int ID { get ; set ; } 


		/// <summary>
		/// ShowName
		/// </summary>
		public  string ShowName { get ; set ; } 


		/// <summary>
		/// Account
		/// </summary>
		public  string Account { get ; set ; } 


		/// <summary>
		/// Password
		/// </summary>
		public  string Password { get ; set ; } 


		/// <summary>
		/// AddTime
		/// </summary>
		public  DateTime AddTime { get ; set ; } 


		/// <summary>
		/// IsLock
		/// </summary>
		public  bool IsLock { get ; set ; } 


		/// <summary>
		/// LastLoginIP
		/// </summary>
		public  string LastLoginIP { get ; set ; } 


		/// <summary>
		/// LastLoginTime
		/// </summary>
		public  DateTime LastLoginTime { get ; set ; } 


		/// <summary>
		/// Moblie
		/// </summary>
		public  string Moblie { get ; set ; } 



		/// <summary>
		/// 构造函数
		/// </summary>
		public User_Info(){
			this.ID =  0 ;
			this.ShowName =  "" ;
			this.Account =  "" ;
			this.Password =  "" ;
			this.AddTime =  DateTime.Now ;
			this.IsLock =  false ;
			this.LastLoginIP =  "" ;
			this.LastLoginTime =  DateTime.Now ;
			this.Moblie =  "" ;
		}
	}
}

