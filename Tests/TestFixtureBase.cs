using System.Security.Claims;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Options;
using LandManager.Application.Common.Configuration;
using LandManager.Application.Common.Helpers;
using LandManager.Infrastructure.Common;

namespace LandManager.Tests;

public class TestFixtureBase : IClassFixture<SharedFixture>
{
	protected readonly ILogger _logger;
	protected readonly IMapper _mapper;
	protected readonly IMediator _mediator;

	public TestFixtureBase(SharedFixture sharedFixture)
	{
		_mapper = sharedFixture.Mapper;
		_logger = sharedFixture.Logger;
		_mediator = sharedFixture.Mediator;
	}

	protected CancellationToken _cancellationToken = new CancellationTokenSource().Token;

	/// <param name="application">'Projects' | 'ProposalTracker' | 'SSO'</param>
	protected RoleChecker CreateRoleChecker(ClaimsIdentity user, string application)
	{
		return new RoleChecker(user, _logger, application);
	}

	protected static DateHelper CreateDateHelper(bool simulateUpcomingFiscalYear)
	{
		var options = Substitute.For<IOptionsMonitor<ApplicationSettings>>();
		options.CurrentValue.Returns(new ApplicationSettings()
		{
			SimulateUpcomingFiscalYear = simulateUpcomingFiscalYear
		});
		return new DateHelper(options);
	}

	/// <summary>
	/// Creates a mapper with the specified mapping. Should only be used when SQLite presents limitations, such as queries that rely on APPLY
	/// </summary>
	/// <typeparam name="S"></typeparam>
	/// <typeparam name="D"></typeparam>
	/// <returns></returns>
	protected static IMapper CreateMapper<S, D>()
	{
		var config = new MapperConfiguration(cfg =>
		{
			cfg.CreateMap<S, D>();
		});

		return config.CreateMapper();
	}

	/// <summary>
	/// Creates a mapper with the specified mappings. Should only be used when SQLite presents limitations, such as queries that rely on APPLY
	/// </summary>
	/// <returns></returns>
	protected static IMapper CreateMapper(Dictionary<Type, Type> maps)
	{
		var config = new MapperConfiguration(cfg =>
		{
			foreach (var m in maps)
			{
				cfg.CreateMap(m.Key, m.Value);
			}
		});

		return config.CreateMapper();
	}
}