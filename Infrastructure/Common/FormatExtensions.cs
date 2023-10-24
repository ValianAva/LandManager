namespace LandManager.Infrastructure.Common;

public static class FormatExtensions
{
	/// <summary>
	/// Formats a nullable decimal as currency
	/// </summary>
	/// <param name="value"></param>
	/// <returns></returns>
	public static string Currency(this decimal? value)
	{
		return value.GetValueOrDefault(0).ToString("c");
	}

	// <summary>
	/// Formats a decimal as currency
	/// </summary>
	/// <param name="value"></param>
	/// <returns></returns>
	public static string Currency(this decimal value)
	{
		return value.ToString("c");
	}

	/// <summary>
	/// Formats a nullable decimal as a number
	/// </summary>
	/// <param name="value"></param>
	/// <returns></returns>
	public static string Numeric(this decimal? value)
	{
		return value.GetValueOrDefault(0).ToString("n");
	}

	// <summary>
	/// Formats a decimal as a number
	/// </summary>
	/// <param name="value"></param>
	/// <returns></returns>
	public static string Numeric(this decimal value)
	{
		return value.ToString("n");
	}
}