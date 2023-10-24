
using LandManager.Application.Common.Extensions;

namespace LandManager.Tests.Core.Application.Common.Extensions;

public class IEnumerableExtensionsTests
{
	[Fact]
	public void Returns_correct_median_for_odd_items()
	{
		// arrange
		var expected = .35M;
		var items = new List<decimal>() { 0, 0, .25M, .35M, .6M, .75M, 1 };

		// act
		var actual = items.Median();

		// assert
		Assert.Equal(expected, actual);
	}

	[Fact]
	public void Returns_correct_median_for_even_items()
	{
		// arrange
		var expected = .3M;
		var items = new List<decimal>() { 0, 0, .25M, .35M, .6M, .75M };

		// act
		var actual = items.Median();

		// assert
		Assert.Equal(expected, actual);
	}
}