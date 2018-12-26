/*****************************************************************************************************
Author		:
Date			:2018/12/26
Description	:
Update		:
Author			Date				Description			
*****************************************************************************************************/

using System;
using System.Data;
using System.Text;
using Soholife;


namespace Soholife.BLL
{
	/// <summary>
	/// 业务逻辑层Soholife.Model代码 
	/// </summary>
	public class User_Weather
	{
		/// <summary>
		/// 数据操作层操作对象
		/// </summary>
		private DAL.User_Weather dal = new DAL.User_Weather();

		/// <summary>
		/// 构造函数
		/// </summary>
		public User_Weather(){;}

		/// <summary>
		/// 添加记录信息
		/// </summary>
		/// <returns></returns>
		public void AddRecord(Model.User_Weather obj)
		{
			dal.AddRecord(obj);
		}

		/// <summary>
		/// 修改记录信息
		/// </summary>
		/// <returns></returns>
		public void UpdateRecord(Model.User_Weather obj)
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
		public Model.User_Weather GetRecordInfo(int iID)
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

		/// <summary>
		/// 得到分页记录
		/// </summary>
		/// <returns></returns>
		public Soholife.DB.SplitPage GetRecordList(int iPage,int iPageSize)
		{
			return dal.GetRecordList(iPage,iPageSize);
		}

	}
}

