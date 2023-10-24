using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Rewrite;
using LandManager.UI.Rewrite.Rules;

namespace LandManager.UI;

public class Startup
{
	public IConfiguration Configuration { get; }

	public Startup(IWebHostEnvironment env)
	{
		var builder = new ConfigurationBuilder()
			.SetBasePath(env.ContentRootPath)
			.AddJsonFile("appsettings.json", false, true)
			.AddEnvironmentVariables();
		Configuration = builder.Build();
	}

	// This method gets called by the runtime. Use this method to add services to the container.
	// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
	public void ConfigureServices(IServiceCollection services)
	{
		//https://octopus.com/docs/guides/deploying-asp.net-core-web-applications
		services.AddAntiforgery(opts => opts.Cookie.Name = "AntiForgery.LandManager.UI");
		services.AddDataProtection().SetApplicationName("LandManager.UI");
	}

	// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
	public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
	{
		if (env.IsDevelopment())
		{
			app.UseDeveloperExceptionPage();
		}
		else
		{
			app.UseHsts();
		}

		app.UsePathBase($"/{Configuration["PathBase"]}");
		var useHttps = !bool.Parse(Configuration["DisableHttpsRedirect"]);
		if (useHttps)
		{
			app.UseRewriter(new RewriteOptions()
				.AddRedirectToHttps()
				.Add(new ReactRewrite(env)));
			app.UseHttpsRedirection();
		}
		else
		{
			app.UseRewriter(new RewriteOptions()
			.Add(new ReactRewrite(env)));
		}
		app.UseDefaultFiles();
		app.UseStaticFiles();
	}
}
