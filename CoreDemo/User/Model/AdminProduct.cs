using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    /// <summary>
    /// Soholife.Model
    /// </summary>
    public class AdminProduct
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
        /// ProductTypeTitle
        /// </summary>
        public string ProductTypeTitle { get; set; }

        /// <summary>
        /// SetTime
        /// </summary>
        public DateTime SetTime { get; set; }

        /// <summary>
        /// Material
        /// </summary>
        public int Material { get; set; }

        /// <summary>
        /// MaterialName
        /// </summary>
        public string MaterialName { get; set; }

        /// <summary>
        /// IsHomeTop
        /// </summary>
        public bool IsHomeTop { get; set; }

        /// <summary>
        /// 构造函数
        /// </summary>
        public AdminProduct()
        {
            this.ID = 0;
            this.ProductType = 0;
            this.ProductName = "";
            this.Price = 0;
            this.Unit = "";
            this.Image = "";
            this.Details = "";
            this.IsEnable = false;
            this.ProductTypeTitle = "";
            this.SetTime = DateTime.Now;
            this.Material = 0;
            this.MaterialName = "";
            this.IsHomeTop = false;
        }
    }
}


