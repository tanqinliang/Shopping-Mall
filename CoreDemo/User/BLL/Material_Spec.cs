/*****************************************************************************************************
Author		:
Date			:2019/2/22
Description	:
Update		:
Author			Date				Description			
*****************************************************************************************************/

using System;
using System.Data;
using System.Text;
using Soholife;


namespace BLL
{
    /// <summary>
    /// 业务逻辑层Soholife.Model代码 
    /// </summary>
    public class Material_Spec
	{
		/// <summary>
		/// 数据操作层操作对象
		/// </summary>
		private DAL.Material_Spec dal = new DAL.Material_Spec();

		/// <summary>
		/// 构造函数
		/// </summary>
		public Material_Spec(){;}

		/// <summary>
		/// 添加记录信息
		/// </summary>
		/// <returns></returns>
		public void AddRecord(Model.Material_Spec obj)
		{
			dal.AddRecord(obj);
		}

		/// <summary>
		/// 修改记录信息
		/// </summary>
		/// <returns></returns>
		public void UpdateRecord(Model.Material_Spec obj)
		{
			dal.UpdateRecord(obj);
		}

		/// <summary>
		/// 删除记录信息
		/// </summary>
		/// <returns></returns>
		public void DeleteRecord(int iID)
		{
			dal.DeleteRecord(iID);
		}

		/// <summary>
		/// 得到记录信息
		/// </summary>
		/// <returns></returns>
		public Model.Material_Spec GetRecordInfo(int iID)
		{
			return dal.GetRecordInfo(iID);
		}

		/// <summary>
		/// 得到记录信息
		/// </summary>
		/// <returns></returns>
		public DataTable GetRecordList()
		{
			return dal.GetRecordList();
		}


	}
}

