/*************************************************************
 * Author		:谭清亮
 * Date			:2018-12-28
 * Description	:IP相关工具信息
*************************************************************/

using Microsoft.AspNetCore.Http;
using System;

namespace Common
{
    public class IPUtils
    {
        /// <summary>
        /// 判断特定信息是否是输入的IP内容
        /// </summary>
        /// <param name="sIP"></param>
        /// <returns></returns>
        public static bool CheckIP(string sIP, out long iMinNum, out long iMaxNum)
        {
            bool bValue = true;
            string sMinIP = "";
            string sMaxIP = "";
            int iTemp = 0;

            iMinNum = 0;
            iMaxNum = 0;

            string[] s = sIP.Split(".".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
            if (s.Length != 4) return false;

            for (int i = 0; i < s.Length; i++)
            {
                if (s[i] == "*")
                {
                    sMinIP += "0.";
                    sMaxIP += "255.";
                }
                else
                {
                    iTemp = CommonUtils.GetIntValue(s[i]);
                    sMinIP += iTemp + ".";
                    sMaxIP += iTemp + ".";

                    if (iTemp < 0 || iTemp > 255)
                    {
                        bValue = false;
                        break;
                    }
                }
            }

            //截取当前数值信息，并返回结果信息
            sMinIP = sMinIP.Substring(0, sMinIP.Length - 1);
            sMaxIP = sMaxIP.Substring(0, sMaxIP.Length - 1);

            //转换数值信息
            iMinNum = IpToInt(sMinIP);
            iMaxNum = IpToInt(sMaxIP);
            return bValue;
        }


        /// <summary>
        /// IP地址转换成Int数据
        /// </summary>
        /// <param name="ip"></param>
        /// <returns></returns>
        public static long IpToInt(string ip)
        {
            long ip_Int = 0;
            try
            {

                char[] dot = new char[] { '.' };
                string[] ipArr = ip.Split(dot);
                if (ipArr.Length == 3)
                    ip = ip + ".0";
                ipArr = ip.Split(dot);


                long p1 = long.Parse(ipArr[0]) * 256 * 256 * 256;
                long p2 = long.Parse(ipArr[1]) * 256 * 256;
                long p3 = long.Parse(ipArr[2]) * 256;
                long p4 = long.Parse(ipArr[3]);
                ip_Int = p1 + p2 + p3 + p4;
            }
            catch {; }
            return ip_Int;
        }

        /// <summary>
        /// int转换成IP 
        /// </summary>
        /// <param name="ip_Int"></param>
        /// <returns></returns>
        public static string IntToIP(long ip_Int)
        {
            string ip = "";
            try
            {
                long seg1 = (ip_Int & 0xff000000) >> 24;
                if (seg1 < 0)
                    seg1 += 0x100;
                long seg2 = (ip_Int & 0x00ff0000) >> 16;
                if (seg2 < 0)
                    seg2 += 0x100;
                long seg3 = (ip_Int & 0x0000ff00) >> 8;
                if (seg3 < 0)
                    seg3 += 0x100;
                long seg4 = (ip_Int & 0x000000ff);
                if (seg4 < 0)
                    seg4 += 0x100;
                ip = seg1.ToString() + "." + seg2.ToString() + "." + seg3.ToString() + "." + seg4.ToString();
            }
            catch {; }

            return ip;
        }


        /// <summary>
        /// 新增方法，原方法继续保留
        /// </summary>
        /// <returns></returns>
        public static string GetIP(HttpRequest hRequest, HttpContext hContext)
        {
            return RequetUtils.GetIP(hRequest, hContext);
        }

    }
}
