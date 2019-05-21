/*****************************************************************************************************
Author		:
Date			:2019/1/22
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
	public class Product_Material
	{
		/// <summary>
		/// ID
		/// </summary>
		public  int ID { get ; set ; } 


		/// <summary>
		/// Name
		/// </summary>
		public  string Name { get ; set ; } 


		/// <summary>
		/// IsEnable
		/// </summary>
		public  bool IsEnable { get ; set ; } 


		/// <summary>
		/// SetTime
		/// </summary>
		public  DateTime SetTime { get ; set ; } 


		/// <summary>
		/// Details
		/// </summary>
		public  string Details { get ; set ; } 



		/// <summary>
		/// 构造函数
		/// </summary>
		public Product_Material(){
			this.ID =  0 ;
			this.Name =  "" ;
			this.IsEnable =  false ;
			this.SetTime =  DateTime.Now ;
			this.Details =  "" ;
		}
	}
}

