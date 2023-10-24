using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace LandManager.Persistence;

// https://stackoverflow.com/a/70951699
public static class ValueComparers
{
	public static ValueComparer<List<T>> ListValueComparer<T>()
	{
		return new ValueComparer<List<T>>(
			(c1, c2) => c1.SequenceEqual(c2),
			c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
			c => c.ToList());
	}

	public static ValueComparer<HashSet<T>> HashSetValueComparer<T>(Func<T, T> clone)
	{
		var comparer = HashSet<T>.CreateSetComparer();

		return new ValueComparer<HashSet<T>>(
			(c1, c2) => comparer.Equals(c1, c2),
			c => comparer.GetHashCode(c),
			c => new HashSet<T>(c.Select(v => clone(v)), c.Comparer));
	}

}