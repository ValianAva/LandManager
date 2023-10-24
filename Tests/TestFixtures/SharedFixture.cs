using AutoMapper;
using MediatR;

namespace LandManager.Tests.TestFixtures;

/// <summary>
/// A shared fixture that contains dependencies used for all, or most, tests
/// Only news up these objects once for all tests
/// </summary>
public class SharedFixture : IDisposable
{
	/// <summary>
	///  Registers actual mapping from application core. Is the preferred method for testing functionality with automapper
	/// </summary>
	/// <returns></returns> <summary>
	/// 
	/// </summary>
	/// <returns></returns>
	public SharedFixture()
	{
		Mapper = new MapperConfiguration(cfg =>
		{
			cfg.AddMaps(new string[] {
				"LandManager.Application.Common",
				"LandManager.Application.Proposals",
				"LandManager.Application.Projects",
			});

		}).CreateMapper();

		Logger = Substitute.For<ILogger>();

		Mediator = Substitute.For<IMediator>();
	}

	public void Dispose()
	{
		// ... clean up test data from the database ...
	}

	public IMapper Mapper { get; private set; }
	public ILogger Logger { get; private set; }
	public IMediator Mediator { get; private set; }
}