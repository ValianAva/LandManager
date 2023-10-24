namespace LandManager.Application.Common.Extensions;

public static class EnumExtensions
{

	/// <summary>
	/// Returns the flag from a flag enumeration with the highest set value
	/// </summary>
	/// <typeparam name="T"></typeparam>
	/// <param name="flags"></param>
	/// <returns></returns>
	/// <remarks></remarks>
	public static int MaxFlag<T>(this T flags) where T : struct
	{
		int value = Convert.ToInt32(Convert.ChangeType(flags, typeof(int)));
		IEnumerable<int> setValues = Enum.GetValues(flags.GetType()).Cast<int>().Where(f => (f & value) == f);
		return setValues.Any() ? setValues.Max() : 0;
	}
}