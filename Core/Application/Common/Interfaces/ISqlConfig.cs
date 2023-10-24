namespace LandManager.Application.Common.Interfaces;

/// <summary>
/// For config classes whose values may be updated in the database from within the application
/// </summary>
public interface ISqlConfig
{
	string ToSqlValues();
}
