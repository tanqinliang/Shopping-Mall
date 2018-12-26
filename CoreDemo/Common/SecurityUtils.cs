/*************************************************************************************************************
 * Author			:谭清亮
 * Date				:2016-05-27
 * Description		:加密、解密相关功能类 
*************************************************************************************************************/

using System;
using System.Text;
using System.Security.Cryptography;
using System.Web;
using System.Text.RegularExpressions;

namespace Common
{
    public class SecurityUtils
    {
        /// <summary>
        /// 唯一密匙
        /// </summary>
        private static string _sStrKey = "rr_201611115_@#$TSDF8G#%Y$&&$";

        #region 3DES加密
        /// <summary>
        /// 3des加密字符串
        /// </summary>
        /// <param name="sSource">要加密的字符串</param>
        /// <remarks>静态方法，采用默认ascii编码</remarks>
        public static string Encrypt3DES(string sSource)
        {
            return Encrypt3DES(sSource, _sStrKey, Encoding.Default);
        }

        /// /// <summary>
        /// 3des加密字符串
        /// </summary>
        /// <param name="sSource">要加密的字符串</param>
        /// <param name="sKey">密钥</param>
        /// <returns>加密后并经base64编码的字符串</returns>
        /// <remarks>静态方法，采用默认ascii编码</remarks>
        public static string Encrypt3DES(string sSource, string sKey)
        {
            //return Encrypt3DES(sSource, _sStrKey, Encoding.Default);
            return Encrypt3DES(sSource, sKey, Encoding.Default);
        }

        /// <summary>
        /// 3des加密字符串
        /// </summary>
        /// <param name="sSource">要加密的字符串</param>
        /// <param name="sKey">密钥</param>
        /// <param name="eEncoding">编码方式</param>
        /// <returns>加密后并经base64编码的字符串</returns>
        /// <remarks>重载，指定编码方式</remarks>
        public static string Encrypt3DES(string sSource, string sKey, Encoding eEncoding)
        {
            TripleDESCryptoServiceProvider DES = new TripleDESCryptoServiceProvider();
            MD5CryptoServiceProvider hashMD5 = new MD5CryptoServiceProvider();

            DES.Key = hashMD5.ComputeHash(eEncoding.GetBytes(sKey));
            DES.Mode = CipherMode.ECB;

            ICryptoTransform DESEncrypt = DES.CreateEncryptor();

            byte[] Buffer = eEncoding.GetBytes(sSource);
            return Convert.ToBase64String(DESEncrypt.TransformFinalBlock(Buffer, 0, Buffer.Length));
        }
        #endregion


        #region  3DES解密
        /// <summary>
        /// 3des解密字符串（直接使用当前默认的加密钥匙）
        /// </summary>
        /// <param name="sSource">要解密的字符串</param>
        /// <remarks>静态方法，采用默认ascii编码</remarks>
        public static string Decrypt3DES(string sSource)
        {
            return Decrypt3DES(sSource, _sStrKey, Encoding.Default);
        }


        /// <summary>
        /// 3des解密字符串
        /// </summary>
        /// <param name="sSource">要解密的字符串</param>
        /// <param name="sKey">密钥</param>
        /// <returns>解密后的字符串</returns>
        /// <exception cref="">密钥错误</exception>
        /// <remarks>静态方法，采用默认ascii编码</remarks>
        public static string Decrypt3DES(string sSource, string sKey)
        {
            //return Decrypt3DES(sSource, _sStrKey, Encoding.Default);
            return Decrypt3DES(sSource, sKey, Encoding.Default);
        }

        /// <summary>
        /// 3des解密字符串
        /// </summary>
        /// <param name="sSource">要解密的字符串</param>
        /// <param name="sKey">密钥</param>
        /// <param name="eEncoding">编码方式</param>
        /// <returns>解密后的字符串</returns>
        /// <exception cref="">密钥错误</exception>
        /// <remarks>静态方法，指定编码方式</remarks>
        public static string Decrypt3DES(string sSource, string sKey, Encoding eEncoding)
        {
            string result = "";

            try
            {
                TripleDESCryptoServiceProvider DES = new TripleDESCryptoServiceProvider();
                MD5CryptoServiceProvider hashMD5 = new MD5CryptoServiceProvider();

                DES.Key = hashMD5.ComputeHash(eEncoding.GetBytes(sKey));
                DES.Mode = CipherMode.ECB;

                ICryptoTransform DESDecrypt = DES.CreateDecryptor();

                byte[] Buffer = Convert.FromBase64String(sSource);
                result = eEncoding.GetString(DESDecrypt.TransformFinalBlock(Buffer, 0, Buffer.Length));
            }
            catch {; }
            return result;
        }
        #endregion


        #region MD5加密方式
        /// <summary>
        /// 使用MD5方式加密
        /// </summary>
        /// <param name="sSource">参加加密的内容</param>
        /// <returns>加密后的内容</returns>
        public static string EncryptMD5(string sSource)
        {
            StringBuilder sBuilder = new StringBuilder();
            using (MD5 md5Hash = MD5.Create())
            {
                byte[] bData = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(sSource));

                for (int i = 0; i < bData.Length; i++)
                {
                    sBuilder.Append(bData[i].ToString("x2"));
                }
            }
            return sBuilder.ToString().ToLower();
        }

        /// <summary>
        /// 16位MD5加密方式
        /// </summary>
        /// <param name="ConvertString">参加加密的内容</param>
        /// <returns>加密后的内容</returns>
        public static string EncryptMD5_16(string ConvertString)
        {
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            string sMd5Data = BitConverter.ToString(md5.ComputeHash(Encoding.Default.GetBytes(ConvertString)), 4, 8);
            sMd5Data = sMd5Data.Replace("-", "");
            return sMd5Data.ToLower();
        }


        /// <summary>
        /// MD5加密
        /// </summary>
        /// <param name="sData">参加加密的内容</param>
        /// <param name="eEncoding">编码方式</param>
        /// <returns>加密后的内容</returns>
        public static string EncryptMD5(string sData, Encoding eEncoding)
        {
            byte[] bData = eEncoding.GetBytes(sData);
            bData = new MD5CryptoServiceProvider().ComputeHash(bData);
            string ret = "";
            for (int i = 0; i < bData.Length; i++)
            {
                ret += bData[i].ToString("x").PadLeft(2, '0');
            }
            return ret;
        }


        /// <summary>
        /// RSA-SHA1加密（16进制）
        /// </summary>
        /// <param name="sData">参加加密的内容</param>
        /// <param name="eEncoding">编码方式</param>
        /// <returns>加密后的内容</returns>
        public string SHA1_Hash(string sData, Encoding eEncoding)
        {
            byte[] bData = eEncoding.GetBytes(sData);
            SHA1 sha1 = SHA1.Create();
            byte[] hashBytes = sha1.ComputeHash(bData);
            string sha1Data = ToHexString(hashBytes).ToLower();
            return Convert.ToBase64String(eEncoding.GetBytes(sha1Data));

        }

        /// <summary>
        /// 16进制编码
        /// </summary>
        /// <param name="bytes">参加编码的内容</param>
        /// <returns>编码结果</returns>
        public string ToHexString(byte[] bytes)
        {
            string hexString = string.Empty;
            if (bytes != null)
            {
                StringBuilder strB = new StringBuilder();

                for (int i = 0; i < bytes.Length; i++)
                {
                    strB.Append(bytes[i].ToString("X2"));
                }
                hexString = strB.ToString();
            }
            return hexString;
        }
        
        #endregion


    }
}
