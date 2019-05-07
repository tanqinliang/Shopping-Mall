/**********************************************************************
 * Author		:谭清亮
 * Date			:2017-12-26
 * Description	:获取连接字符串
**********************************************************************/
using System;
using System.Collections.Generic;
using System.Text;
using Common;

namespace DBAccess
{
    public class Connection
    {
        #region 私有字段
        //连接字符串
        private static string _userconnecion = "";

        private static string _dataprovider = "";

        //明文的数据库连接字符串的key
        private static string sPlaintextKey = "SqlSettings_Plaintext:{0}";

        //密文的数据库连接字符串的key
        private static string sCiphertextKey = "SqlSettings_Ciphertext:{0}";

        //配置文件的文件名
        private static string sFileName = "appsettings.json";
        #endregion

        public static string UserStatConnection()
        {
            if (string.IsNullOrWhiteSpace(_userconnecion))
            {
                _userconnecion = JsonSettingsUtils.GetSetting(sFileName, string.Format(sPlaintextKey, "UserStatConnection"));
                if (string.IsNullOrEmpty(_userconnecion))
                {
                    _userconnecion = SecurityUtils.Decrypt3DES(JsonSettingsUtils.GetSetting(sFileName, string.Format(sCiphertextKey, "UserStatConnection")));
                }
            }
            return _userconnecion;
        }

        /// <summary>
        /// 得到数据库类型
        /// </summary>
        /// <returns>数据库类型</returns>
        public static string GetDataProvider()
        {
            _dataprovider = JsonSettingsUtils.GetSetting(sFileName, string.Format(sPlaintextKey, "DataProvider"));  //从哪里取的数据
            if (string.IsNullOrWhiteSpace(_dataprovider))
            {
                _dataprovider = "DBAccess.SqlServer";
            }
            return _dataprovider;
        }
    }
}
