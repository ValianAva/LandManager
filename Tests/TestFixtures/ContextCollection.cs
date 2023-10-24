namespace LandManager.Tests.TestFixtures;

[CollectionDefinition("Shared Context")]
public class ContextCollection : ICollectionFixture<ContextFixture>
{
	// This class has no code, and is never created. Its purpose is simply
	// to be the place to apply [CollectionDefinition] and all the
	// ICollectionFixture<> interfaces.


	// https://xunit.net/docs/shared-context
	// to use this, decorate the desired test class with 
	// [Collection("Shared Context")]
	// and add a constructor that takes ContextFixture

	// private new readonly AppContext _context;
	// public ctor(ContextFixture contextFixture)
	// {
	// 	_context = contextFixture.Context;
	// }
}