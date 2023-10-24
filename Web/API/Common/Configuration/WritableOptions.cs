using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using LandManager.Application.Common.Interfaces;

namespace LandManager.API.Common.Configuration;

// https://stackoverflow.com/a/45986656
public class WritableOptions<T> : IWritableOptions<T> where T : class, ISqlConfig, new()
{
	private readonly IOptionsMonitor<T> _options;
	private readonly string _connectionString;

	public WritableOptions(
		IOptionsMonitor<T> options,
		string connectionString)
	{
		_options = options;
		_connectionString = connectionString;
	}

	public T Value => _options.CurrentValue;
	public T Get(string name) => _options.Get(name);

	public void Update(Action<T> applyChanges)
	{

		// persist new config values to the database
		var sectionObject = _options.CurrentValue ?? new T();

		applyChanges(sectionObject);

		var connStringBuilder = new SqlConnectionStringBuilder(_connectionString)
		{
			ConnectRetryCount = 3,
			ConnectRetryInterval = 15,
			ConnectTimeout = 45
		};

		using (var connection = new SqlConnection(connStringBuilder.ConnectionString))
		{

			var query = new SqlCommand(@$"
				CREATE TABLE #tempConfig (
					ApplicationName nvarchar(50) NOT NULL,
					SectionName nvarchar(50) NOT NULL,
					SettingName nvarchar(50) NOT NULL,
					SettingValue nvarchar(1000) NOT NULL
				)

				INSERT INTO #tempConfig
				VALUES {sectionObject.ToSqlValues()}

				UPDATE c
				SET c.SettingValue = t.SettingValue
				FROM Config AS c
				JOIN #tempConfig AS t
					ON c.ApplicationName = t.ApplicationName
					AND c.SectionName = t.SectionName
					AND c.SettingName = t.SettingName

				DROP TABLE #tempConfig", connection);

			query.Connection.Open();
			query.ExecuteNonQuery();

		}
	}
}

public static class ServiceCollectionExtensions
{
	public static void ConfigureWritable<T>(
		this IServiceCollection services,
		IConfigurationSection section,
		string connectionString) where T : class, ISqlConfig, new()
	{
		services.Configure<T>(section);
		services.AddTransient<IWritableOptions<T>>(provider =>
		{
			var options = provider.GetService<IOptionsMonitor<T>>();
			return new WritableOptions<T>(options, connectionString);
		});
	}
}