using System.Diagnostics;
using System.Reflection;
using System.Security.Claims;
using AutoMapper;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using LandManager.API.Common;
using LandManager.API.Common.Configuration;
using LandManager.API.Common.Filters;
using LandManager.API.SSO.Authorization.Handlers;
using LandManager.API.SSO.Authorization.Requirements;
using LandManager.Application.Common.Configuration;
using LandManager.Application.Common.Infrastructure;
using LandManager.Application.Common.Interfaces;
using LandManager.Application.SSO.Common.Interfaces;
using LandManager.Domain.Models;
using LandManager.Infrastructure.Common;
using LandManager.Infrastructure.SSO;
using LandManager.Persistence;

namespace LandManager.API.SSO;

public class Startup
{
	public Startup(IConfiguration configuration, IWebHostEnvironment env)
	{
		var builder = new ConfigurationBuilder()
			.SetBasePath(env.ContentRootPath)
			.AddJsonFile("appsettings.json", false, true)
			.AddJsonFile(Debugger.IsAttached ? "connections.local.json" : "connections.json", optional: false, reloadOnChange: true)
			.AddEnvironmentVariables();

		// have to build once so we get access to connection strings from files loaded above
		// https://learn.microsoft.com/en-us/dotnet/core/extensions/custom-configuration-provider
		var tempConfig = builder.Build();
		builder.AddSQLConfig(tempConfig.GetConnectionString("AppContext"), Applications.SSO);

		Configuration = builder.Build();
	}

	public IConfiguration Configuration { get; }

	// This method gets called by the runtime. Use this method to add services to the container.
	public void ConfigureServices(IServiceCollection services)
	{
		//https://octopus.com/docs/guides/deploying-asp.net-core-web-applications
		services.AddAntiforgery(opts => opts.Cookie.Name = "AntiForgery.LandManager.SSO.Web.API");
		services.AddDataProtection().SetApplicationName("LandManager.SSO.Web.API");

		services.AddCors();
		services.AddMvc(options => options.Filters.Add(typeof(CustomExceptionFilterAttribute)))
			.AddNewtonsoftJson()
			.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<IAppContext>());

		// Autofac to .NET core lifetime equivalent guesses
		// https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-2.2
		// InstancePerLifetimeScope -> AddTransient
		// InstancePerRequest -> AddScoped
		// SingleInstance -> AddSingleton	

		services.AddAutoMapper(Assembly.Load("LandManager.Application.Common"));
		services.AddMediatR(Assembly.Load("LandManager.Application.SSO"), Assembly.Load("LandManager.Application.Common"));
		services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));

		services.AddAuthorization(options =>
		{
			options.AddPolicy("ApiScope", policy =>
			{
				policy.RequireAuthenticatedUser();
				policy.RequireClaim("scope", "app.sso.api");
			});

			options.AddPolicy("Admin", policy =>
				policy.Requirements.Add(new AdminRequirement()));
		});
		services.AddOptions();
		services.AddHttpContextAccessor();

		services.Configure<UiSettings>(Configuration.GetSection("Ui"));
		services.Configure<ApplicationSettings>(Configuration.GetSection("Application"));
		services.Configure<SmtpSettings>(Configuration.GetSection("Smtp"));
		services.AddControllers();

		services.AddSingleton<IAuthorizationHandler, AdminHandler>();

		// imagine Kevin from The Office yelling WARNING!
		// AddIdentityCore just adds the services for managing users
		// AddIdentity will completely take over your authentication pipeline
		// the context must also be registered as itself to make AddEntityFrameworkStores happy

		// I also messed up in commit b8ee300. Both IAppContext and AppContext need to be registered
		services.AddDbContext<IAppContext, Persistence.AppContext>(options =>
			options.UseSqlServer(Configuration.GetConnectionString("AppContext"), x => x.UseNetTopologySuite()));

		services.AddDbContext<Persistence.AppContext, Persistence.AppContext>(options =>
			options.UseSqlServer(Configuration.GetConnectionString("AppContext"), x => x.UseNetTopologySuite()));

		services.AddIdentityCore<User>(o => o.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+'")
			.AddRoles<Role>()
			.AddEntityFrameworkStores<Persistence.AppContext>();

		services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
			.AddJwtBearer(options =>
			{
				options.Authority = Configuration["Oidc:Authority"];
				options.TokenValidationParameters.ValidateAudience = false;
				options.TokenValidationParameters.ValidTypes = new[] { "at+jwt" };
			});

		// register single instance since Serilog relies on static variables
		services.AddSingleton((ILogger)new LoggerConfiguration().ReadFrom.Configuration(Configuration).CreateLogger());

		services.AddScoped<INotify, Smtp>();
		services.AddScoped(provider => (IRoleChecker)new RoleChecker(provider.GetService<IHttpContextAccessor>().HttpContext.User.Identity as ClaimsIdentity, provider.GetService<ILogger>(), "SSO"));
		services.AddScoped<IUserAuthorizer, UserAuthorizer>();

		// I know this is an anti-pattern. It's only here so HTTP method attributes can get config without having to pass constructor
		// params in a weird way to an attribute
		ServiceLocator.SetLocatorProvider(services.BuildServiceProvider());

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

		app.UseStaticFiles();
		app.UseRouting();

		// make sure origins don't have trailing slashes or the compare will return false for all and CORS will be broken
		app.UseCors(builder =>
		{
			builder
			.SetIsOriginAllowedToAllowWildcardSubdomains()
			.WithOrigins(Configuration["AllowedOrigins"].Split(',', StringSplitOptions.RemoveEmptyEntries))
			.AllowAnyMethod()
			.AllowAnyHeader();
		});

		if (!bool.Parse(Configuration["Application:DisableHttpsRedirect"]))
		{
			app.UseRewriter(new RewriteOptions()
				.AddRedirectToHttps());
			app.UseHttpsRedirection();
		}
		app.UseAuthentication();
		app.UseAuthorization();
		app.UseDefaultFiles();

		app.UseEndpoints(endpoints =>
		{
			endpoints.MapControllers();
		});
	}
}