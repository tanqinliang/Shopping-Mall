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


namespace BLL
{
	/// <summary>
	/// 业务逻辑层Soholife.Model代码 
	/// </summary>
	public class User_Info
	{
		/// <summary>
		/// 数据操作层操作对象
		/// </summary>
		private DAL.User_Info dal = new DAL.User_Info();

		/// <summary>
		/// 构造函数
		/// </summary>
		public User_Info(){;}

		/// <summary>
		/// 添加记录信息
		/// </summary>
		/// <returns></returns>
		public void AddRecord(Model.User_Info obj)
		{
			dal.AddRecord(obj);
		}

		/// <summary>
		/// 修改记录信息
		/// </summary>
		/// <returns></returns>
		public void UpdateRecord(Model.User_Info obj)
		{
			dal.UpdateRecord(obj);
		}
        
		/// <summary>
		/// 得到记录信息
		/// </summary>
		/// <returns></returns>
		public Model.User_Info GetRecordInfo(string sAccount)
		{
			return dal.GetRecordInfo(sAccount);
		}

	}
}

