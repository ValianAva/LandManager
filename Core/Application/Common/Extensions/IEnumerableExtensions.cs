namespace LandManager.Application.Common.Extensions;

public static class IEnumerableExtensions
{
	public static void ForEach<T>(this IEnumerable<T> enumeration, Action<T> action)
	{
		foreach (T item in enumeration)
		{
			action(item);
		}
	}

	// https://stackoverflow.com/a/10738416
	public static decimal? Median<TColl, TValue>(
	this IEnumerable<TColl> source,
	Func<TColl, TValue> selector)
	{
		return source.Select(selector).Median();
	}

	public static decimal? Median<T>(
		this IEnumerable<T> source)
	{
		if (Nullable.GetUnderlyingType(typeof(T)) != null)
			source = source.Where(x => x != null);

		int count = source.Count();
		if (count == 0)
			return null;

		source = source.OrderBy(n => n);

		int midpoint = count / 2;
		if (count % 2 == 0)
			return (Convert.ToDecimal(source.ElementAt(midpoint - 1)) + Convert.ToDecimal(source.ElementAt(midpoint))) / 2.0M;
		else
			return Convert.ToDecimal(source.ElementAt(midpoint));
	}
}