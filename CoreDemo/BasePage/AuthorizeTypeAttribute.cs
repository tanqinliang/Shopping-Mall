/***************************************************************
 * Author       :谭清亮
 * Date         :2018-12-26
 * Description  :特性类
***************************************************************/
using System;


namespace BasePage
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    public class AuthorizeTypeAttribute : Attribute
    {
        public string PowerKey { get; private set; }

        public AuthorizeTypeAttribute(string sPowerKey)
        {
            PowerKey = sPowerKey;
        }

    }
}
