/******************************************************************
 * Author			:谭清亮
 * Date				:2018-12-26
 * Description		:注册服务和添加中间件
******************************************************************/
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CoreDemo
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            //添加身份校验服务
            services.AddAuthentication(BasePage.CookiesManage.AuthenticationScheme).AddCookie(
              BasePage.CookiesManage.AuthenticationScheme,
              options =>
              {
                  options.LoginPath = new PathString("/Admin/Login");
                  options.LogoutPath = new PathString("/Admin/Logout");
                  options.AccessDeniedPath = new PathString("/Admin/Login");
              });

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            ////出现http协议异常则返回状态码
            //app.UseStatusCodePages(async context =>
            //{
            //    context.HttpContext.Response.ContentType = "text/plain";
            //    await context.HttpContext.Response.WriteAsync(
            //        "Status code page, status code: " +
            //        context.HttpContext.Response.StatusCode);
            //});
            //程序出现异常跳转到异常页面
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            //解决Ubuntu Nginx 代理不能获取IP问题 
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            app.UseStaticFiles();

            //验证中间件
            app.UseAuthentication();
            //配置路由规则
            app.UseMvc(routes =>
              {
                  routes.MapRoute(
                  name: "areas",
                  template: "{area:exists}/{controller}/{action}/{id?}"
                );
                  routes.MapRoute(
                      name: "default",
                      template: "{controller=Main}/{action=Index}/{id?}");
              }
                );
        }
    }
}
