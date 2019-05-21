/**********************************************************************
 * Author			:谭清亮
 * Date				:2018-05-08
 * Description		:错误码列表
**********************************************************************/
using System;
using System.Collections.Generic;
using System.Text;

namespace ConstValue
{
    public class ResultModel
    {
        public string code;    //状态码
        public string msg;  //说明
        public object data; //预留字段
        public ResultModel()
        {
            this.code = "999";
            this.msg = "系统异常";
            this.data = "";
        }
    }
}
