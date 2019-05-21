/*************************************************************************************************************
 * Author			:谭清亮
 * Date				:2018-12-29
 * Description		:IO文件相关功能类
*************************************************************************************************************/
using System;
using System.Text;
using System.IO;
using Common;

namespace Common
{
    public class IO
    {
        /// <summary>
        /// 删除特定文件记录
        /// </summary>
        /// <param name="sFilePath"></param>
        public static void DeleteFile(string sFilePath)
        {
            try
            {
                File.Delete(sFilePath);
            }
            catch (Exception e)
            {

            }
        }

        /// <summary>
        /// 将特定文本内容写入特定文件(覆盖写入)
        /// </summary>
        /// <param name="sFilePath">文件存储地址（物理路径）</param>
        /// <param name="sContent">文件内容</param>
        public static void WriteFile(string sFilePath, string sContent)
        {
            WriteFile(sFilePath, sContent, Encoding.UTF8);
        }

        /// <summary>
        /// 将特定文本内容写入特定文件(覆盖写入)
        /// </summary>
        /// <param name="sFilePath">文件存储地址（物理路径）</param>
        /// <param name="sFileName">文件名字</param>
        /// <param name="sContent">文件内容</param>
        public static void WriteFile(string sFilePath, string sFileName, string sContent)
        {
            WriteFile(sFilePath, sFileName, sContent, Encoding.UTF8);
        }

        /// <summary>
        /// 将特定文本内容写入特定文件(覆盖写入)
        /// </summary>
        /// <param name="sFilePath">文件存储地址（物理路径）</param>
        /// <param name="sFileName">文件名字</param>
        /// <param name="sContent">文件内容</param>
        public static void WriteFile(string sFilePath, string sFileName, string sContent, Encoding oEncode)
        {
            if (!Directory.Exists(sFilePath)) Directory.CreateDirectory(sFilePath);
            if (!sFilePath.EndsWith("\\")) sFilePath = sFilePath + "\\";

            WriteFile(sFilePath + sFileName, sContent, oEncode);
        }

        /// <summary>
        /// 将特定文本内容写入特定文件(覆盖写入)
        /// </summary>
        /// <param name="sFilePath">文件存储地址（物理路径）</param>
        /// <param name="sFileName">文件名字</param>
        /// <param name="sContent">文件内容</param>
        public static void WriteFile(string sFilePath, string sContent, Encoding oEncode)
        {
            try
            {
                StreamWriter sw = new StreamWriter(sFilePath, false, oEncode);
                sw.WriteLine(sContent);
                sw.Close();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// 追加文件内容
        /// </summary>
        /// <param name="sFilePath"></param>
        /// <param name="sFileName"></param>
        /// <param name="sContent"></param>
        public static void AppendFile(string sFilePath, string sFileName, string sContent)
        {
            AppendFile(sFilePath, sFileName, sContent, Encoding.UTF8);
        }

        /// <summary>
        /// 追加文件内容
        /// </summary>
        /// <param name="sFilePath"></param>
        /// <param name="sFileName"></param>
        /// <param name="sContent"></param>
        public static void AppendFile(string sFilePath, string sFileName, string sContent, Encoding oEncode)
        {
            if (!Directory.Exists(sFilePath)) Directory.CreateDirectory(sFilePath);
            if (!sFilePath.EndsWith("\\")) sFilePath = sFilePath + "\\";

            try
            {
                //StreamWriter sw = new StreamWriter(sFilePath + sFileName, true, Encoding.GetEncoding("gb2312"));
                StreamWriter sw = new StreamWriter(sFilePath + sFileName, true, oEncode);
                sw.WriteLine(sContent);
                sw.Close();
            }
            catch (Exception e)
            {

            }
        }

        /// <summary>
        /// 得到特定文本文件内容信息
        /// </summary>
        /// <returns></returns>
        public static string GetFileContent(string sFile)
        {
            return GetFileContent(sFile, Encoding.UTF8);
        }

        /// <summary>
        /// 得到特定文本文件内容信息
        /// </summary>
        /// <returns></returns>
        public static string GetFileContent(string sFile, Encoding oEncode)
        {
            string s = "";
            try
            {
                //得到显示房间列表的页面模板数据
                FileStream oFS = File.OpenRead(sFile);
                //StreamReader oSR = new StreamReader(oFS, System.Text.Encoding.GetEncoding("gb2312"));
                StreamReader oSR = new StreamReader(oFS, oEncode);
                s = oSR.ReadToEnd();
                oSR.Close();
                oFS.Close();
            }
            catch
            {

            }
            return s;
        }


        /// <summary>
        ///ErrorLog 的摘要说明
        /// </summary>
        public class ErrorLog
        {
            private const string LOGPATH = "";
            private static string _path = "";
            private static string _filename = "debug";

            /// <summary>
            /// 构造函数
            /// </summary>
            public ErrorLog()
            {

            }



            /// <summary>
            /// 填写日志记录信息
            /// </summary>
            public static void SetLog(string sContent)
            {
                SetLog(_filename, sContent);
            }

            /// <summary>
            /// 填写日志记录信息
            /// </summary>
            public static void SetLog(Exception e)
            {
                SetLog(_filename, e);
            }

            /// <summary>
            /// 填写日志记录信息
            /// </summary>
            public static void SetLog(string sFileName, Exception e)
            {
                SetLog(_filename, DateTime.Now.ToString() + "\t" + e.Message + "\r\n" + e.StackTrace);
            }


            /// <summary>
            /// 填写日志记录信息
            /// </summary>
            public static void SetLog(string sFileName, string sContent)
            {
                GetPath();

                try
                {
                    IO.AppendFile(_path, sFileName + DateTime.Now.ToString("yyyyMMdd") + ".txt", sContent);
                }
                catch {; }
            }


            /// <summary>
            /// 获取路径
            /// </summary>
            private static void GetPath()
            {
                if (string.IsNullOrEmpty(_path))
                {
                    try
                    {
                        _path = JsonSettingsUtils.GetSetting("OtherSettings:LogPath");
                    }
                    catch
                    {

                    }

                    try
                    {
                        //if (string.IsNullOrEmpty(_path)) _path = System.Web.HttpContext.Current.Server.MapPath("/debug/");
                        if (string.IsNullOrEmpty(_path))
                        {
                            _path = AppDomain.CurrentDomain.BaseDirectory;
                            if (!_path.EndsWith("\\"))
                            {
                                _path += "\\debug\\";
                            }
                            else
                            {
                                _path += "debug\\";
                            }

                        }
                    }
                    catch
                    {

                    }
                }
            }
        }
    }
}

