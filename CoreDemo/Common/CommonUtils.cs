/***************************************************************************************************
 * Author		:谭清亮
 * Date			:2016-06-03
 * Description	:基本的一些通用方法
***************************************************************************************************/


using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;

namespace Common
{
    /// <summary>
    /// 通用项目文档
    /// </summary>
	public static class CommonUtils
    {
        /// <summary>
        /// 逻辑类型转换
        /// </summary>
        /// <param name="sValue">传递需要转换的字符参数</param>
        /// <returns>将指定的参数转换成bool类型值返回</returns>
        public static bool GetBooleanValue(string sValue)
        {
            return GetBooleanValue(sValue, false);
        }

        /// <summary>
        /// 逻辑类型转换
        /// </summary>
        /// <param name="oValue">传递需要转换的对象参数</param>
        /// <returns>将指定的参数转换成bool类型值返回</returns>
        public static bool GetBooleanValue(object oValue)
        {
            if (oValue == null) return false;

            return GetBooleanValue(oValue.ToString(), false);
        }

        /// <summary>
        /// 逻辑类型转换
        /// </summary>
        /// <param name="sValue">传递需要转换的字符参数</param>
        /// <param name="bDefault">默认值</param>
        /// <returns>将指定的参数转换成bool类型值返回，如果异常则返回默认值</returns>
        public static bool GetBooleanValue(string sValue, bool bDefault)
        {
            if (((sValue != null) && (sValue != "")))
            {
                bool b;
                if (bool.TryParse(sValue, out b))
                {
                    return b;
                }
                else
                {
                    return bDefault;
                }
            }
            else
            {
                return bDefault;
            }
        }


        /// <summary>
        /// 日期转换,如转换失败返回当天日期
        /// </summary>
        /// <param name="sValue">传递需要转换的字符参数</param>
        /// <returns>将传递的参数转换成日期类型返回，如转换失败返回默认日期</returns>
        public static DateTime GetDateTimeValue(string sValue)
        {
            return GetDateTimeValue(sValue, DateTime.Now);
        }

        /// <summary>
        /// 日期转换,如转换失败返回当天日期
        /// </summary>
        /// <param name="oValue">传递需要转换的对象参数</param>
        /// <returns>将传递的参数转换成日期类型返回，如转换失败返回默认日期</returns>
        public static DateTime GetDateTimeValue(object oValue)
        {
            return GetDateTimeValue(oValue.ToString(), DateTime.Now);
        }

        /// <summary>
        /// 日期转换，如转换失败返回默认日期
        /// </summary>
        /// <param name="sValue">需要转换的字符串</param>
        /// <param name="dDefault">默认值</param>
        /// <returns>将传递的参数转换成日期类型返回，如转换失败返回默认日期</returns>
        public static DateTime GetDateTimeValue(string sValue, DateTime dDefault)
        {
            if ((sValue != null) && (sValue != ""))
            {
                DateTime t;
                if (DateTime.TryParse(sValue, out t))
                {
                    return t;
                }
                else
                {
                    return dDefault;
                }
            }
            else
            {
                return dDefault;
            }
        }

        /// <summary>
        /// float类型转换,如转换失败返回0
        /// </summary>
        /// <param name="sValue">需要转换的字符串</param>
        /// <returns>将传递的参数转换成浮点类型，如果转换失败返回0</returns>
        public static float GetFloatValue(string sValue)
        {
            return GetFloatValue(sValue, .0f);
        }

        /// <summary>
        ///  float类型转换,如转换失败返回0
        /// </summary>
        /// <param name="oValue">需要转换的对象</param>
        /// <returns>将传递的参数转换成浮点类型，如果转换失败返回0</returns>
        public static float GetFloatValue(object oValue)
        {
            return GetFloatValue(oValue, .0f);
        }

        /// <summary>
        /// float类型转换,如转换失败返回默认值
        /// </summary>
        /// <param name="oValue">需要转换的对象</param>
        /// <param name="fValue">默认值</param>
        /// <returns>将传递的参数转换成浮点类型，如果转换失败返回0</returns>
        public static float GetFloatValue(object oValue, float fValue)
        {
            if (oValue == null) return fValue;

            return GetFloatValue(oValue.ToString(), fValue);
        }

        /// <summary>
        /// float类型转换,如转换失败返回默认值
        /// </summary>
        /// <param name="sValue">需要转换的字符串</param>
        /// <param name="fValue">默认值</param>
        /// <returns>将传递的参数转换成浮点类型，如果转换失败返回0</returns>
        public static float GetFloatValue(string sValue, float fValue)
        {
            float iValue = 0f;

            if (!float.TryParse(sValue, out iValue))
            {
                iValue = fValue;
            }

            return iValue;
        }



        /// <summary>
        /// Int32类型转换，如转换失败返回0
        /// </summary>
        /// <param name="sValue">需要转换的字符串</param>
        /// <returns>将传递的参数转换成整形，如果转换失败返回0</returns>
        public static int GetIntValue(string sValue)
        {
            if (string.IsNullOrEmpty(sValue)) return 0;

            return GetIntValue(sValue, 0);
        }

        /// <summary>
        /// Int32类型转换，如转换失败返回0
        /// </summary>
        /// <param name="oValue">需要转换的对象</param>
        /// <returns>将传递的参数转换成整形，如果转换失败返回0</returns>
        public static int GetIntValue(object oValue)
        {
            if (oValue == null) return 0;
            return GetIntValue(oValue.ToString(), 0);
        }

        /// <summary>
        /// Int32类型转换，如转换失败返回默认值
        /// </summary>
        /// <param name="sValue">需要转换的字符串</param>
        /// <param name="iDefault">默认值</param>
        /// <returns>将传递的参数转换成整形，如果转换失败返回指定的默认值</returns>
        public static int GetIntValue(string sValue, int iDefault)
        {
            int iValue = 0;


            if (string.IsNullOrEmpty(sValue)) return iDefault;


            if (!int.TryParse(sValue, out iValue))
            {
                iValue = iDefault;
            }

            return iValue;
        }

        /// <summary>
        /// long类型转换，如转换失败返回默认值
        /// </summary>
        /// <param name="sValue">需要转换的字符串</param>
        /// <param name="iDefault">64默认值</param>
        /// <returns>将传递的参数转换成长整形，如果转换失败返回指定的默认值</returns>
        public static long GetlongValue(string sValue, Int64 iDefault)
        {
            long iValue = 0;

            if (string.IsNullOrEmpty(sValue)) return iDefault;


            if (!long.TryParse(sValue, out iValue))
            {
                iValue = iDefault;
            }

            return iValue;
        }

        /// <summary>
        /// Int32类型转换，如转换失败返回默认值
        /// </summary>
        /// <param name="oValue">需要转换的对象</param>
        /// <param name="iDefault">默认值</param>
        /// <returns>将传递的参数转换成整形，如果转换失败返回指定的默认值</returns>
        public static int GetIntValue(object oValue, int iDefault)
        {
            int iValue = 0;

            if (oValue == null) return iDefault;

            if (!int.TryParse(oValue.ToString(), out iValue))
            {
                iValue = iDefault;
            }

            return iValue;
        }

        /// <summary>
        /// 得到字符串记录
        /// </summary>
        /// <param name="oValue">需要转换的对象</param>
        /// <returns>将传递的参数转换成字符类型返回，如果传递的参数为空则返回""</returns>
		public static string GetStringValue(object oValue)
        {
            if (oValue == null) return "";

            return GetStringValue(oValue, "");
        }

        /// <summary>
        /// 得到字符串记录
        /// </summary>
        /// <param name="oValue">需要转换的对象</param>
        /// <returns>将传递的参数转换成字符类型返回，如果传递的参数为空则返回""</returns>
        public static string GetStringValue(object oValue, string sDefaultValue)
        {
            if (oValue == null)
            {
                return sDefaultValue;
            }
            else
            {
                return oValue.ToString().Trim();
            }
        }

        /// <summary>
        /// decimal类型转换,如转换失败返回0
        /// </summary>
        /// <param name="sValue">需要转换的字符串</param>
        /// <returns>返回decimal类型，,如转换失败返回0</returns>
        public static decimal GetDecimalValue(string sValue)
        {
            return GetDecimalValue(sValue, 0, 4);
        }

        /// <summary>
        ///  decimal类型转换,如转换失败返回0
        /// </summary>
        /// <param name="oValue">需要转换的对象</param>
        /// <returns>f返回decimal类型，,如转换失败返回0</returns>
        public static decimal GetDecimalValue(object oValue)
        {
            return GetDecimalValue(oValue.ToString(), 0, 4);
        }

        /// <summary>
        /// decimal类型转换,如转换失败返回默认值
        /// </summary>
        /// <param name="oValue">需要转换的字符串</param>
        /// <param name="fValue">默认值</param>
        /// <returns>返回decimal类型，,如转换失败返回指定的默认值</returns>
        public static decimal GetDecimalValue(object oValue, decimal fValue)
        {
            return GetDecimalValue(oValue.ToString(), fValue, 4);
        }

        /// <summary>
        /// decimal类型转换,如转换失败返回默认值
        /// </summary>
        /// <param name="sValue">需要转换的字符串</param>
        /// <param name="fValue">默认值</param>
        /// <returns>返回decimal类型，,如转换失败返回指定的默认值</returns>
        public static decimal GetDecimalValue(string sValue, decimal fValue)
        {
            return GetDecimalValue(sValue, fValue, 4);
        }

        /// <summary>
        /// decimal类型转换,如转换失败返回默认值
        /// </summary>
        /// <param name="sValue">需要转换的字符串</param>
        /// <param name="fValue">默认值</param>
        /// <param name="iPointNum">小数位数</param>
        /// <returns>返回decimal类型，,如转换失败返回指定的默认值</returns>
        public static decimal GetDecimalValue(string sValue, decimal fValue, int iPointNum)
        {
            decimal iValue = 0;

            if (!decimal.TryParse(sValue, out iValue))
            {
                iValue = fValue;
            }

            return Math.Round(iValue, iPointNum);
        }


        /// <summary>
        /// 根据时间得到星期几
        /// </summary>
        /// <param name="dTime">时间</param>
        /// <returns>星期几</returns>
        public static string GetWeek(DateTime dTime)
        {
            string[] sWeek = new string[] { "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" };
            int iWeek = GetIntValue(dTime.DayOfWeek.ToString("d"));
            return sWeek[iWeek];
        }

        /// <summary>
        /// 根据时间得到星期几
        /// </summary>
        /// <param name="dTime">时间</param>
        /// <returns>星期几</returns>
        public static string GetWeek(string sTime)
        {
            return GetWeek(GetDateTimeValue(sTime));
        }

        /// <summary>
        /// DataTable转成List
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static List<T> GetDataList<T>(this DataTable dt)
        {
            var list = new List<T>();
            var plist = new List<PropertyInfo>(typeof(T).GetProperties());
            foreach (DataRow item in dt.Rows)
            {
                T s = Activator.CreateInstance<T>();
                for (int i = 0; i < dt.Columns.Count; i++)
                {
                    PropertyInfo info = plist.Find(p => p.Name == dt.Columns[i].ColumnName);
                    if (info != null)
                    {
                        try
                        {
                            if (!Convert.IsDBNull(item[i]))
                            {
                                object v = null;
                                if (info.PropertyType.ToString().Contains("System.Nullable"))
                                {
                                    v = Convert.ChangeType(item[i], Nullable.GetUnderlyingType(info.PropertyType));
                                }
                                else
                                {
                                    v = Convert.ChangeType(item[i], info.PropertyType);
                                }
                                info.SetValue(s, v, null);
                            }
                        }
                        catch (Exception ex)
                        {
                            
                        }
                    }
                }
                list.Add(s);
            }
            return list;
        }
    }
}
