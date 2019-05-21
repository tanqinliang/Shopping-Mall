/******************************************************************
 * Author			:̷����
 * Date				:2018-12-26
 * Description		:ע����������м��
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
            //������У�����
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
            ////����httpЭ���쳣�򷵻�״̬��
            //app.UseStatusCodePages(async context =>
            //{
            //    context.HttpContext.Response.ContentType = "text/plain";
            //    await context.HttpContext.Response.WriteAsync(
            //        "Status code page, status code: " +
            //        context.HttpContext.Response.StatusCode);
            //});
            //��������쳣��ת���쳣ҳ��
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            //���Ubuntu Nginx �����ܻ�ȡIP���� 
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            app.UseStaticFiles();

            //��֤�м��
            app.UseAuthentication();
            //����·�ɹ���
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
