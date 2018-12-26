/******************************************************************
 * Author			:谭清亮
 * Date				:2017-12-26
 * Description		:数据库对象事物类
******************************************************************/
using System;
using System.Data;
using System.Data.Common;

namespace DBAccess
{
    public class Trans : IDisposable
    {
        private DbConnection _myconn;

        private DbTransaction _dbtran;

        public DbConnection DbConnection => _myconn;

        public DbTransaction DbTrans => _dbtran;

        /// <summary>
        /// 初始化
        /// </summary>
        /// <param name="conn">数据库连接</param>
        public Trans(DbConnection conn)
        {
            _myconn = conn;
            if (_myconn.State != ConnectionState.Open)
            {
                _myconn.Open();
            }
            _dbtran = _myconn.BeginTransaction();
        }

        public void Commit()
        {
            _dbtran.Commit();
            Colse();
        }

        public void RollBack()
        {
            _dbtran.Rollback();
            Colse();
        }

        public void Dispose()
        {
            Colse();
        }

        public void Colse()
        {
            if (_myconn.State == ConnectionState.Open)
            {
                _myconn.Close();
            }
        }
    }
}