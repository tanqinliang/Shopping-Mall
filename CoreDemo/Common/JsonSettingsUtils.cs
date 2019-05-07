/***************************************************************************************************
 * Author		:谭清亮
 * Date			:2018-08-13
 * Description	:读取json配置文件的方法
***************************************************************************************************/

using Microsoft.Extensions.Configuration;
using System;

namespace Common
{
    public class JsonSettingsUtils
    {

        /// <summary>
        /// 从json配置文件根据key获取指定的数据
        /// </summary>
        /// <param name="sKey">需要得到数据的key</param>
        /// <returns>Key对应的参数值</returns>
        public static string GetSetting(string sKey)
        {
            return GetSetting("appsettings.json", sKey);
        }

        /// <summary>
        /// 从json配置文件根据key获取指定的数据
        /// </summary>
        /// <param name="sFileName">文件名</param>
        /// <param name="sKey">需要得到数据的key</param>
        /// <returns>Key对应的参数值</returns>
        public static string GetSetting(string sFileName, string sKey)
        {
            string sPath = AppDomain.CurrentDomain.BaseDirectory;
            if (sPath.EndsWith(@"\bin\Debug\netcoreapp2.0\"))
            {
                sPath = sPath.Replace(@"bin\Debug\netcoreapp2.0\", "");
            }
            else if (!sPath.EndsWith(@"\"))
            {
                sPath = sPath + @"\";
            }
            return GetSetting(sPath, sFileName, sKey);
        }

        /// <summary>
        /// 从json配置文件根据key获取指定的数据
        /// </summary>
        /// <param name="sPath">文件路径</param>
        /// <param name="sFileName">文件名</param>
        /// <param name="sKey">需要得到数据的key</param>
        /// <returns>Key对应的参数值</returns>
        public static string GetSetting(string sPath, string sFileName, string sKey)
        {
            try
            {
                ConfigurationBuilder ConfigBuilder = new ConfigurationBuilder();
                ConfigBuilder.AddJsonFile(sPath + sFileName);
                return ConfigBuilder.Build()[sKey];
            }
            catch (Exception)
            {

                return "";
            }

        }
    }
}
