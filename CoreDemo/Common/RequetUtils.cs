/*******************************************************************************************************************
 * Author		:谭清亮
 * Date			:2018-06-21
 * Description	:http管道工具类
*******************************************************************************************************************/

using System;
using Microsoft.AspNetCore.Http;
namespace Common
{
    public class RequetUtils
    {
        /// <summary>
        /// 得到IP地址
        /// </summary>
        /// <returns></returns>
        public static string GetIP(HttpRequest hRequest, HttpContext hContext)
        {
            string ip = string.Empty;
            try
            {
                ip = hRequest.Headers["Cdn-Src-Ip"];

                if (string.IsNullOrEmpty(ip))
                {
                    ip = hRequest.Headers["X-Forwarded-For"];
                }
                if (string.IsNullOrEmpty(ip))
                {
                    ip = hContext.Connection.RemoteIpAddress.ToString();
                }
            }
            catch {; }
            return ip;
        }

        /// <summary>
        /// 得到数字IP
        /// </summary>
        /// <returns></returns>
        public long GetIPNumber(HttpRequest hRequest, HttpContext hContext)
        {
            return GetIPNumber(GetIP(hRequest, hContext));
        }

        /// <summary>
        /// 得到数字IP
        /// </summary>
        /// <returns></returns>
        public static long GetIPNumber(string sIP)
        {
            long ip = 0;

            try
            {
                string[] s = sIP.Split('.');
                ip = 16777216 * Convert.ToInt64(s[0]) + 65536 * Convert.ToInt64(s[1]) + 256 * Convert.ToInt64(s[2]) + Convert.ToInt64(s[3]);
            }
            catch {; }
            return ip;
        }
        /// <summary>
        /// 根据 User Agent 获取操作系统名称
        /// </summary>
        /// <param name="userAgent"></param>
        /// <returns></returns>
        public static string GetOSNameByUserAgent(string userAgent)
        {
            string osVersion = "未知";

            if (userAgent.Contains("NT 6.0"))
            {
                osVersion = "Windows Vista/Server 2008";
            }
            else if (userAgent.Contains("NT 5.2"))
            {
                osVersion = "Windows Server 2003";
            }
            else if (userAgent.Contains("NT 5.1"))
            {
                osVersion = "Windows XP";
            }
            else if (userAgent.Contains("NT 5"))
            {
                osVersion = "Windows 2000";
            }
            else if (userAgent.Contains("NT 4"))
            {
                osVersion = "Windows NT4";
            }
            else if (userAgent.Contains("Me"))
            {
                osVersion = "Windows Me";
            }
            else if (userAgent.Contains("98"))
            {
                osVersion = "Windows 98";
            }
            else if (userAgent.Contains("95"))
            {
                osVersion = "Windows 95";
            }
            else if (userAgent.Contains("Mac"))
            {
                osVersion = "Mac";
            }
            else if (userAgent.Contains("Unix"))
            {
                osVersion = "UNIX";
            }
            else if (userAgent.Contains("Linux"))
            {
                osVersion = "Linux";
            }
            else if (userAgent.Contains("SunOS"))
            {
                osVersion = "SunOS";
            }
            return osVersion;
        }
    }
}
