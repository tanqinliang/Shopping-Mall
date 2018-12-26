/******************************************************************
 * Author			:谭清亮
 * Date				:2018-12-26
 * Description		:站点入口
******************************************************************/

using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace CoreDemo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
             WebHost.CreateDefaultBuilder(args)
               .UseKestrel()
               .UseApplicationInsights()
               .UseStartup<Startup>()
               .UseUrls("http://*:5001")
               .Build();
    }
}
