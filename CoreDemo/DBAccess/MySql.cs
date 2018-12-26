/******************************************************************
 * Author			:谭清亮
 * Date				:2017-12-26
 * Description		:MySql数据库对象
******************************************************************/
using System;
using System.Data;
using System.Data.Common;
using MySql.Data.MySqlClient;

namespace DBAccess
{
    public class MySql : DbHelper, IDatabase
    {
        private MySqlConnection _myconn;

        private MySqlCommand _mycommand;

        /// <summary>
        /// 创建数据库连接
        /// </summary>
        /// <param name="sConnectString">连接字符串</param>
        /// <returns>据库连接</returns>
        public DbConnection CreateConnection(string sConnectString)
        {
            _myconn = new MySqlConnection(sConnectString);
            return _myconn;
        }

        /// <summary>
        /// 创建连接命令
        /// </summary>
        /// <param name="sSqlText">执行的语句</param>
        /// <param name="oCommandType">执行语句的类型</param>
        /// <returns>连接命令</returns>
        public DbCommand CreateCommand(string sSqlText, CommandType oCommandType)
        {
            _mycommand = new MySqlCommand();
            _mycommand.CommandText = sSqlText;
            _mycommand.CommandType = oCommandType;
            _mycommand.Connection = _myconn;
            return _mycommand;
        }

        /// <summary>
        /// 添加参数
        /// </summary>
        /// <param name="dbParameterCollection">参数实体</param>
        public void AddParameter(DbParameterCollection dbParameterCollection)
        {
            foreach (MySqlParameter item in dbParameterCollection)
            {
                _mycommand.Parameters.Add(item);
            }
        }

        /// <summary>
        /// 添加参数
        /// </summary>
        /// <param name="sName">参数名称</param>
        /// <param name="oValue">参数值</param>
        public void AddParameter(string sName, object oValue)
        {
            _mycommand.Parameters.Add(new MySqlParameter(sName, oValue));
        }

        /// <summary>
        /// 添加参数
        /// </summary>
        /// <param name="sName">参数名称</param>
        /// <param name="oType">参数数据类型</param>
        /// <param name="oDirection">参数类型</param>
        public void AddParameter(string sName, DbType oType, ParameterDirection oDirection)
        {
            MySqlParameter mySqlParameter = new MySqlParameter();
            mySqlParameter.ParameterName = sName;
            mySqlParameter.DbType = oType;
            mySqlParameter.Direction = oDirection;
            _mycommand.Parameters.Add(mySqlParameter);
        }

        /// <summary>
        /// 添加参数
        /// </summary>
        /// <param name="sName">参数名称</param>
        /// <param name="oType">参数数据类型</param>
        /// <param name="iSize">参数大小</param>
        /// <param name="oDirection">参数类型</param>
        public void AddParameter(string sName, DbType oType, int iSize, ParameterDirection oDirection)
        {
            MySqlParameter mySqlParameter = new MySqlParameter();
            mySqlParameter.ParameterName = sName;
            mySqlParameter.DbType = oType;
            mySqlParameter.Direction = oDirection;
            mySqlParameter.Size = iSize;
            _mycommand.Parameters.Add(mySqlParameter);
        }

        /// <summary>
        /// 添加参数
        /// </summary>
        /// <param name="sName">参数名称</param>
        /// <param name="oValue">参数值</param>
        /// <param name="oType">参数数据类型</param>
        /// <param name="oDirection">参数类型</param>
        public void AddParameter(string sName, object oValue, DbType oType, ParameterDirection oDirection)
        {
            MySqlParameter mySqlParameter = new MySqlParameter();
            mySqlParameter.ParameterName = sName;
            mySqlParameter.Value = ((oValue == null) ? DBNull.Value : oValue);
            mySqlParameter.DbType = oType;
            mySqlParameter.Direction = oDirection;
            _mycommand.Parameters.Add(mySqlParameter);
        }

        /// <summary>
        /// 添加参数
        /// </summary>
        /// <param name="sName">参数名称</param>
        /// <param name="oValue">参数值</param>
        /// <param name="oType">参数数据类型</param>
        /// <param name="iSize">参数大小</param>
        /// <param name="oDirection">参数类型</param>
        public void AddParameter(string sName, object oValue, DbType oType, int iSize, ParameterDirection oDirection)
        {
            MySqlParameter mySqlParameter = new MySqlParameter();
            mySqlParameter.ParameterName = sName;
            mySqlParameter.DbType = oType;
            mySqlParameter.Direction = oDirection;
            mySqlParameter.Size = iSize;
            mySqlParameter.Value = ((oValue == null) ? DBNull.Value : oValue);
            _mycommand.Parameters.Add(mySqlParameter);
        }

        /// <summary>
        /// 获取返回值（用于SQL内的“return”或者“out put”的参数）
        /// </summary>
        /// <param name="parameterName">参数名称</param>
        /// <returns>执行SQL命令后的返回值</returns>
        public object GetParameterValue(string parameterName)
        {
            return _mycommand.Parameters[parameterName].Value;
        }

        /// <summary>
        /// 执行SQL命令
        /// </summary>
        /// <returns>DataSet类型的查询结果</returns>
        public DataSet ExecuteDataSet()
        {
            DataSet dataSet = new DataSet();
            try
            {
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter();
                mySqlDataAdapter.SelectCommand = _mycommand;
                mySqlDataAdapter.Fill(dataSet);
            }
            catch (Exception ex)
            {
                if (!base.ThrowError)
                {
                    throw ex;
                }
            }
            finally
            {
                if (_mycommand.Connection.State != 0)
                {
                    _mycommand.Connection.Close();
                }
                _mycommand.Dispose();
            }
            return dataSet;
        }

        /// <summary>
        /// 执行SQL命令
        /// </summary>
        /// <returns>DataTable类型的查询结果</returns>
        public DataTable ExecuteTable()
        {
            DataTable dataTable = new DataTable();
            try
            {
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter();
                mySqlDataAdapter.SelectCommand = _mycommand;
                mySqlDataAdapter.Fill(dataTable);
            }
            catch (Exception ex)
            {
                if (!base.ThrowError)
                {
                    throw ex;
                }
            }
            finally
            {
                if (_myconn.State != 0)
                {
                    _myconn.Close();
                }
                _mycommand.Dispose();
            }
            return dataTable;
        }

        /// <summary>
        /// 执行SQL命令
        /// </summary>
        /// <returns>DbDataReader类型的查询结果</returns>
        public virtual DbDataReader ExecuteReader()
        {
            DbDataReader result = null;
            try
            {
                _myconn.Open();
                result = _mycommand.ExecuteReader(CommandBehavior.CloseConnection);
            }
            catch (Exception ex)
            {
                if (_myconn.State != 0)
                {
                    _myconn.Close();
                }
                if (!base.ThrowError)
                {
                    throw ex;
                }
            }
            finally
            {
                _mycommand.Dispose();
            }
            return result;
        }

        /// <summary>
        /// 执行SQL命令
        /// </summary>
        /// <returns>DataTable类型的查询结果（使用DbDataReader转换）</returns>
        public virtual DataTable ExecuteReaderToTable()
        {
            DataTable result = new DataTable();
            try
            {
                _myconn.Open();
                IDataReader dataReader = _mycommand.ExecuteReader(CommandBehavior.CloseConnection);
                if (dataReader != null)
                {
                    result = base.DataReaderToDataTable(dataReader);
                }
            }
            catch (Exception ex)
            {
                if (!base.ThrowError)
                {
                    throw ex;
                }
            }
            finally
            {
                if (_myconn.State != 0)
                {
                    _myconn.Close();
                }
                _mycommand.Dispose();
            }
            return result;
        }

        /// <summary>
        /// 执行SQL命令
        /// </summary>
        /// <returns>受影响的行数</returns>
        public virtual int ExecuteNonQuery()
        {
            int result = 0;
            try
            {
                _myconn.Open();
                result = _mycommand.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                if (!base.ThrowError)
                {
                    throw ex;
                }
            }
            finally
            {
                if (_myconn.State != 0)
                {
                    _myconn.Close();
                }
                _mycommand.Dispose();
            }
            return result;
        }

        /// <summary>
        /// 执行SQL命令
        /// </summary>
        /// <returns>object类型的查询结果</returns>
        public virtual object ExecuteScalar()
        {
            object result = new object();
            try
            {
                _myconn.Open();
                result = _mycommand.ExecuteScalar();
            }
            catch (Exception ex)
            {
                if (!base.ThrowError)
                {
                    throw ex;
                }
            }
            finally
            {
                if (_myconn.State == ConnectionState.Open)
                {
                    _myconn.Close();
                }
                _mycommand.Dispose();
            }
            return result;
        }
    }
}
