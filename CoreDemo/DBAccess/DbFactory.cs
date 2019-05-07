/******************************************************************
 * Author			:谭清亮
 * Date				:2017-12-26
 * Description		:获取数据库对象
******************************************************************/
using System;

namespace DBAccess
{
    public class DbFactory
    {
        /// <summary>
        /// 返回数据库对象
        /// </summary>
        /// <param name="sCacheKey">数据库类型</param>
        /// <returns></returns>
        public static IDatabase Create(string sCacheKey)
        {
            //根据传入的不同数据库类型，反射到不同的工具类
            object obj = Activator.CreateInstance(Type.GetType(sCacheKey));
            return (IDatabase)obj;
        }
    }
}