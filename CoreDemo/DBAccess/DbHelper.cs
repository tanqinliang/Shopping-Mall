/******************************************************************
 * Author			:谭清亮
 * Date				:2017-12-26
 * Description		:数据库对象通过事物执行实现类
******************************************************************/
using System;
using System.Data;
using System.Data.Common;

namespace DBAccess
{
    public abstract class DbHelper
    {
        //数据库类型
        public static string ProviderName = "";

        //是否返回异常信息
        public bool ThrowError { get; set; } = false;

        /// <summary>
        /// 使用事物执行SQL命令
        /// </summary>
        /// <param name="cmd">连接命令</param>
        /// <param name="t">事物实体</param>
        /// <returns>DataSet类型的查询结果</returns>
        public virtual DataSet ExecuteDataSet(DbCommand cmd, Trans t)
        {
            cmd.Connection = t.DbConnection;
            cmd.Transaction = t.DbTrans;
            DbDataAdapter adapter = GetAdapter() as DbDataAdapter;
            adapter.SelectCommand = cmd;
            DataSet dataSet = new DataSet();
            adapter.Fill(dataSet);
            return dataSet;
        }

        /// <summary>
        /// 使用事物执行SQL命令
        /// </summary>
        /// <param name="cmd">连接命令</param>
        /// <param name="t">事物实体</param>
        /// <returns>DataTable类型的查询结果</returns>
        public virtual DataTable ExecuteDataTable(DbCommand cmd, Trans t)
        {
            cmd.Connection = t.DbConnection;
            cmd.Transaction = t.DbTrans;
            DbDataAdapter adapter = GetAdapter() as DbDataAdapter;
            adapter.SelectCommand = cmd;
            DataTable dataTable = new DataTable();
            adapter.Fill(dataTable);
            return dataTable;
        }

        /// <summary>
        /// 使用事物执行SQL命令
        /// </summary>
        /// <param name="cmd">连接命令</param>
        /// <param name="t">事物实体</param>
        /// <returns>DataTable类型的查询结果（使用DbDataReader转换）</returns>
        public virtual DataTable ExecuteReader(DbCommand cmd, Trans t)
        {
            cmd.Connection = t.DbConnection;
            cmd.Transaction = t.DbTrans;
            IDataReader reader = cmd.ExecuteReader();
            return DataReaderToDataTable(reader);
        }

        /// <summary>
        /// 使用事物执行SQL命令
        /// </summary>
        /// <param name="cmd">连接命令</param>
        /// <param name="t">事物实体</param>
        /// <returns>受影响的行数</returns>
        public virtual int ExecuteNonQuery(DbCommand cmd, Trans t)
        {
            cmd.Connection = t.DbConnection;
            cmd.Transaction = t.DbTrans;
            return cmd.ExecuteNonQuery();
        }

        /// <summary>
        /// 使用事物执行SQL命令
        /// </summary>
        /// <param name="cmd">连接命令</param>
        /// <param name="t">事物实体</param>
        /// <returns>object类型的查询结果</returns>
        public virtual object ExecuteScalar(DbCommand cmd, Trans t)
        {
            cmd.Connection = t.DbConnection;
            cmd.Transaction = t.DbTrans;
            return cmd.ExecuteScalar();
        }

        /// <summary>
        /// 将IDataReader转换成DataTable
        /// </summary>
        /// <param name="reader"></param>
        /// <returns></returns>
        protected DataTable DataReaderToDataTable(IDataReader reader)
        {
            DataTable dataTable = new DataTable();
            int fieldCount = reader.FieldCount;
            for (int i = 0; i < fieldCount; i++)
            {
                dataTable.Columns.Add(reader.GetName(i), reader.GetFieldType(i));
            }
            dataTable.BeginLoadData();
            object[] values = new object[fieldCount];
            while (reader.Read())
            {
                reader.GetValues(values);
                dataTable.LoadDataRow(values, true);
            }
            dataTable.EndLoadData();
            reader.Close();
            return dataTable;
        }

        /// <summary>
        /// 获取IDbDataAdapter对象
        /// </summary>
        /// <returns>IDbDataAdapter对象</returns>
        private IDbDataAdapter GetAdapter()
        {
            object obj = Activator.CreateInstance(Type.GetType(ProviderName));
            return (IDbDataAdapter)obj;
        }
    }
}
