/************************************************************************************************************
 * Author		:谭清亮
 * Date			:2018-12-28
 * Description	:随机数相关类
************************************************************************************************************/
using System;
using System.Collections.Generic;

namespace Common
{
	public class RndUtils
	{
		private static Random rInt = new Random(unchecked((int)DateTime.Now.Ticks));
		private static object _syn = new object();

		/// <summary>
		/// 得到特定范围内的一个随机数字
		/// </summary>
		/// <param name="iMax"></param>
		/// <returns></returns>
		public static int GetRndNumber(int iMax)
		{
			lock (_syn)
			{
				return GetRndNumber(0, iMax);
			}
		}

        /// <summary>
        /// 得到特定范围内的一个随机数字
        /// </summary>
        /// <param name="iMax"></param>
        /// <returns></returns>
        public static int GetRndNumber(int iMin,int iMax)
        {
			lock (_syn)
			{
				return rInt.Next(iMin, iMax);
			}
        }

		/// <summary>
		/// 使用随机数生成一个数字字符串
		/// </summary>
		/// <returns></returns>
		public static string GetRndString()
		{
			return GetRndString("");
		}

		/// <summary>
		/// 使用随机数生成一个数字字符串
		/// </summary>
		/// <returns></returns>
		public static string GetRndString(string sPrefix)
		{
			return GetRndString(sPrefix,100000);
		}


		/// <summary>
		/// 使用随机数生成一个数字字符串
		/// </summary>
		/// <returns></returns>
		public static string GetRndString(string sPrefix,int iMaxNumber)
		{
			int i = 0;
			lock (_syn)
			{
				i = GetRndNumber(iMaxNumber);
			} 
			return sPrefix + DateTime.Now.ToString("MMddmmHHss") + DateTime.Now.Millisecond.ToString() + i.ToString();
		}

		/// <summary>
		/// 从List对象中，随机获取一个
		/// </summary>
		/// <param name="oList"></param>
		/// <returns></returns>
		public static T GetRndObject<T>(List<T> oList)
		{
			int iID = GetRndNumber(oList.Count);

			return oList[iID];
		}



		/// <summary>
		/// 得到是否特定比率是否被选中
		/// </summary>
		/// <param name="iTotalNumber"></param>
		/// <returns></returns>
		public static bool CheckIsSelect(int iTotalNumber)
		{
			int i = 0;
			lock (_syn)
			{
				i = rInt.Next(0, iTotalNumber);
			}
			if (i == 0)
			{
				return true;
			}
			else
			{
				return false;
			}
		}

		/// <summary>
		/// 得到特定比率的命中率(这个一般用于百分比计算)
		/// </summary>
		/// <param name="iTotalNumber"></param>
		/// <returns></returns>
		public static bool CheckIsSelect(int iRate, int iMaxRateNum)
		{
			if (iRate >= iMaxRateNum) return true;
			if (iRate <= 0) return false;

			int i = 0;

			lock (_syn)
			{
				i = rInt.Next(0, iMaxRateNum);
			}

			if (i <= iRate)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}
}
