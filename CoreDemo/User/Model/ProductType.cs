/*****************************************************************************************************
Author		:
Date			:2019/1/3
Description	:
Update		:
Author			Date				Description			
*****************************************************************************************************/


namespace Model
{
	/// <summary>
	/// Soholife.Model
	/// </summary>
	public class ProductType
	{
		/// <summary>
		/// ID
		/// </summary>
		public  int ID { get ; set ; } 


		/// <summary>
		/// Title
		/// </summary>
		public  string Title { get ; set ; } 


		/// <summary>
		/// IsEnable
		/// </summary>
		public  bool IsEnable { get ; set ; }

        /// <summary>
        /// IsHomeTop
        /// </summary>
        public bool IsHomeTop { get; set; }



        /// <summary>
        /// 构造函数
        /// </summary>
        public ProductType(){
			this.ID =  0 ;
			this.Title =  "" ;
			this.IsEnable =  false ;
            this.IsHomeTop = false;
		}
	}
}

