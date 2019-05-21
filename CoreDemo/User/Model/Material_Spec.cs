/*****************************************************************************************************
Author		:
Date			:2019/2/22
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
    public class Material_Spec
	{
		/// <summary>
		/// ID
		/// </summary>
		public  int ID { get ; set ; } 


		/// <summary>
		/// Specifications
		/// </summary>
		public  string Specifications { get ; set ; } 


		/// <summary>
		/// ProductType
		/// </summary>
		public  int ProductType { get ; set ; } 



		/// <summary>
		/// 构造函数
		/// </summary>
		public Material_Spec(){
			this.ID =  0 ;
			this.Specifications =  "" ;
			this.ProductType =  0 ;
		}
	}
}

