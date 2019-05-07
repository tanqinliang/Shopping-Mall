/*****************************************************************************************************
Author		:
Date			:2018/12/26
Description	:
Update		:
Author			Date				Description			
*****************************************************************************************************/

using System;


namespace Soholife.Model
{
	/// <summary>
	/// Soholife.Model
	/// </summary>
	public class User_Weather
	{
		/// <summary>
		/// ID
		/// </summary>
		public  int ID { get ; set ; } 


		/// <summary>
		/// UserID
		/// </summary>
		public  int UserID { get ; set ; } 


		/// <summary>
		/// Title
		/// </summary>
		public  string Title { get ; set ; } 


		/// <summary>
		/// Weather
		/// </summary>
		public  string Weather { get ; set ; } 


		/// <summary>
		/// Journal
		/// </summary>
		public  string Journal { get ; set ; } 


		/// <summary>
		/// Dat
		/// </summary>
		public  DateTime Dat { get ; set ; } 


		/// <summary>
		/// Week
		/// </summary>
		public  string Week { get ; set ; } 


		/// <summary>
		/// AddTime
		/// </summary>
		public  DateTime AddTime { get ; set ; } 



		/// <summary>
		/// 构造函数
		/// </summary>
		public User_Weather(){
			this.ID =  0 ;
			this.UserID =  0 ;
			this.Title =  "" ;
			this.Weather =  "" ;
			this.Journal =  "" ;
			this.Dat =  DateTime.Now.Date;
			this.Week =  "" ;
			this.AddTime =  DateTime.Now ;
		}
	}
}

