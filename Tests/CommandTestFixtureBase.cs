namespace LandManager.Tests;

/// <summary>
/// A test fixture for commands since they will just new up their own context
/// So changes to the test context don't mess with query tests
/// </summary>
public class CommandTestFixtureBase : TestFixtureBase
{
	protected Persistence.AppContext _context = ContextFactory.Create();

	public CommandTestFixtureBase(SharedFixture sharedFixture) : base(sharedFixture)
	{
	}
}