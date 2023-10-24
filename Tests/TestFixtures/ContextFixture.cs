using LandManager.Persistence;

namespace LandManager.Tests.TestFixtures;

public class ContextFixture : IDisposable
{
	public ContextFixture()
	{
		Context = ContextFactory.Create();
	}

	public void Dispose()
	{
		// ... clean up test data from the database ...
	}

	public Persistence.AppContext Context { get; private set; }
}