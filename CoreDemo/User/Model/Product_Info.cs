/*****************************************************************************************************
Author		:
Date			:2019/1/14
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
    public class Product_Info
    {
        /// <summary>
        /// ID
        /// </summary>
        public int ID { get; set; }


        /// <summary>
        /// ProductType
        /// </summary>
        public int ProductType { get; set; }


        /// <summary>
        /// ProductName
        /// </summary>
        public string ProductName { get; set; }


        /// <summary>
        /// Price
        /// </summary>
        public decimal Price { get; set; }


        /// <summary>
        /// Unit
        /// </summary>
        public string Unit { get; set; }


        /// <summary>
        /// Image
        /// </summary>
        public string Image { get; set; }


        /// <summary>
        /// Details
        /// </summary>
        public string Details { get; set; }


        /// <summary>
        /// IsEnable
        /// </summary>
        public bool IsEnable { get; set; }

        /// <summary>
        /// SetTime
        /// </summary>
        public DateTime SetTime { get; set; }

        /// <summary>
        /// Material
        /// </summary>
        public int Material { get; set; }

        /// <summary>
        /// IsHomeTop
        /// </summary>
        public bool IsHomeTop { get; set; }

        /// <summary>
        /// 构造函数
        /// </summary>
        public Product_Info()
        {
            this.ID = 0;
            this.ProductType = 0;
            this.ProductName = "";
            this.Price = 0;
            this.Unit = "";
            this.Image = "";
            this.Details = "";
            this.IsEnable = false;
            this.SetTime = DateTime.Now;
            this.Material = 0;
            this.IsHomeTop = false;
        }
    }
}

