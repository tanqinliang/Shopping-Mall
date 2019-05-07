/******************************************************************
 * Author			:谭清亮
 * Date				:2017-12-26
 * Description		:数据库对象父类
******************************************************************/
using System.Data;
using System.Data.Common;

namespace DBAccess
{
    public interface IDatabase
    {
        bool ThrowError
        {
            get;
            set;
        }
        /// <summary>
        /// 创建数据库连接
        /// </summary>
        /// <param name="sConnectString">连接字符串</param>
        /// <returns>据库连接</returns>
        DbConnection CreateConnection(string sConnectString);

        /// <summary>
        /// 创建连接命令
        /// </summary>
        /// <param name="sSqlText">执行的语句</param>
        /// <param name="oCommandType">执行语句的类型</param>
        /// <returns>连接命令</returns>
        DbCommand CreateCommand(string sSqlText, CommandType oCommandType);

        /// <summary>
        /// 添加参数
        /// </summary>
        /// <param name="dbParameterCollection">参数实体</param>
        void AddParameter(DbParameterCollection dbParameterCollection);

        /// <summary>
        /// 添加参数
        /// </summary>
        /// <param name="sName">参数名称</param>
        /// <param name="oValue">参数值</param>
        void AddParameter(string sName, object oValue);

        /// <summary>
        /// 添加参数
        /// </summary>
        /// <param name="sName">参数名称</param>
        /// <param name="oType">参数数据类型</param>
        /// <param name="oDirection">参数类型</param>
        void AddParameter(string sName, DbType oType, ParameterDirection oDirection);

        /// <summary>
        /// 添加参数
        /// </summary>
        /// <param name="sName">参数名称</param>
        /// <param name="oType">参数数据类型</param>
        /// <param name="iSize">参数大小</param>
        /// <param name="oDirection">参数类型</param>
        void AddParameter(string sName, DbType oType, int iSize, ParameterDirection oDirection);

        /// <summary>
        /// 添加参数
        /// </summary>
        /// <param name="sName">参数名称</param>
        /// <param name="oValue">参数值</param>
        /// <param name="oType">参数数据类型</param>
        /// <param name="oDirection">参数类型</param>
        void AddParameter(string sName, object oValue, DbType oType, ParameterDirection oDirection);

        /// <summary>
        /// 添加参数
        /// </summary>
        /// <param name="sName">参数名称</param>
        /// <param name="oValue">参数值</param>
        /// <param name="oType">参数数据类型</param>
        /// <param name="iSize">参数大小</param>
        /// <param name="oDirection">参数类型</param>
        void AddParameter(string sName, object oValue, DbType oType, int iSize, ParameterDirection oDirection);

        /// <summary>
        /// 获取返回值（用于SQL内的“return”或者“out put”的参数）
        /// </summary>
        /// <param name="parameterName">参数名称</param>
        /// <returns>执行SQL命令后的返回值</returns>
        object GetParameterValue(string parameterName);

        /// <summary>
        /// 执行SQL命令
        /// </summary>
        /// <returns>DataSet类型的查询结果</returns>
        DataSet ExecuteDataSet();

        /// <summary>
        /// 执行SQL命令
        /// </summary>
        /// <returns>DataTable类型的查询结果</returns>
        DataTable ExecuteTable();

        /// <summary>
        /// 执行SQL命令
        /// </summary>
        /// <returns>DbDataReader类型的查询结果</returns>
        DbDataReader ExecuteReader();

        /// <summary>
        /// 执行SQL命令
        /// </summary>
        /// <returns>DataTable类型的查询结果（使用DbDataReader转换）</returns>
        DataTable ExecuteReaderToTable();

        /// <summary>
        /// 执行SQL命令
        /// </summary>
        /// <returns>受影响的行数</returns>
        int ExecuteNonQuery();

        /// <summary>
        /// 执行SQL命令
        /// </summary>
        /// <returns>object类型的查询结果</returns>
        object ExecuteScalar();

        /// <summary>
        /// 使用事物执行SQL命令
        /// </summary>
        /// <param name="cmd">连接命令</param>
        /// <param name="t">事物实体</param>
        /// <returns>DataSet类型的查询结果</returns>
        DataSet ExecuteDataSet(DbCommand cmd, Trans t);

        /// <summary>
        /// 使用事物执行SQL命令
        /// </summary>
        /// <param name="cmd">连接命令</param>
        /// <param name="t">事物实体</param>
        /// <returns>DataTable类型的查询结果</returns>
        DataTable ExecuteDataTable(DbCommand cmd, Trans t);

        /// <summary>
        /// 使用事物执行SQL命令
        /// </summary>
        /// <param name="cmd">连接命令</param>
        /// <param name="t">事物实体</param>
        /// <returns>DataTable类型的查询结果（使用DbDataReader转换）</returns>
        DataTable ExecuteReader(DbCommand cmd, Trans t);

        /// <summary>
        /// 使用事物执行SQL命令
        /// </summary>
        /// <param name="cmd">连接命令</param>
        /// <param name="t">事物实体</param>
        /// <returns>受影响的行数</returns>
        int ExecuteNonQuery(DbCommand cmd, Trans t);

        /// <summary>
        /// 使用事物执行SQL命令
        /// </summary>
        /// <param name="cmd">连接命令</param>
        /// <param name="t">事物实体</param>
        /// <returns>object类型的查询结果</returns>
        object ExecuteScalar(DbCommand cmd, Trans t);
    }
}