using Microsoft.AspNetCore;

namespace LandManager.API.SSO;

public class Program
{
	public static void Main(string[] args)
	{
		var contentRoot = Directory.GetCurrentDirectory();
		CreateWebHostBuilder(args)
			.UseContentRoot(contentRoot)
			.UseWebRoot(Path.Combine(contentRoot, "wwwroot"))
			.Build().Run();
	}

	public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
		WebHost.CreateDefaultBuilder(args)
			.UseIISIntegration()
			.UseSerilog()
			.UseSentry("https://001997df9cd742cfaacb6848cf58b957@o283074.ingest.sentry.io/5264801")
			.UseStartup<Startup>();
}
