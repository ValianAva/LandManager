using LandManager.Application.Common.Helpers;

namespace LandManager.Tests.Core.Application.Common.Helpers;

public class DateHelperTests : TestFixtureBase
{
	public DateHelperTests(SharedFixture sharedFixture) : base(sharedFixture)
	{
	}

	// trying to set up theory data for dates was too difficult so I'm just making multiple facts
	[Fact]
	public void Returns_correct_fiscal_year_for_date1()
	{
		// arrange
		var expected = 2023;

		// act
		var actual = DateHelper.FiscalYear(new DateTime(2023, 01, 01));

		// assert
		Assert.Equal(expected, actual);
	}

	[Fact]
	public void Returns_correct_fiscal_year_for_date2()
	{
		// arrange
		var expected = 2024;

		// act
		var actual = DateHelper.FiscalYear(new DateTime(2023, 10, 01));

		// assert
		Assert.Equal(expected, actual);
	}

	[Fact]
	public void Returns_upcoming_fiscal_year_for_simulated_fiscal_year()
	{
		// arrange		
		// seems arbitrary to basically duplicate the test function logic but I don't want this to break every October
		var expected = DateHelper.CurrentFiscalYear() + 1;
		var dateHelper = CreateDateHelper(true);

		// act		
		var actual = dateHelper.SimulatedFiscalYear();

		// assert
		Assert.Equal(expected, actual);
	}

	[Fact]
	public void Returns_current_fiscal_year_for_nonsimulated_fiscal_year()
	{
		// arrange		
		// seems arbitrary to basically duplicate the test function logic but I don't want this to break every October
		var expected = DateHelper.CurrentFiscalYear();
		var dateHelper = CreateDateHelper(false);

		// act
		var actual = dateHelper.SimulatedFiscalYear();

		// assert
		Assert.Equal(expected, actual);
	}
}