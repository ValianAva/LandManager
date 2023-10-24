using System.Diagnostics;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace LandManager.API.Common.Configuration;

public class SQLConfigurationProvider : ConfigurationProvider
{
	private readonly SQLConfigurationSource _source;

	public SQLConfigurationProvider(SQLConfigurationSource source)
	{
		_source = source;
	}

	public override void Load()
	{
		var dic = new Dictionary<string, string>();

		var connStringBuilder = new SqlConnectionStringBuilder(_source.ConnectionString)
		{
			ConnectRetryCount = 3,
			ConnectRetryInterval = 15,
			ConnectTimeout = 45
		};
		using (var connection = new SqlConnection(connStringBuilder.ConnectionString))
		{
			// pull separate config values when debugging, to allow us to separate dev and localhost while sharing the same db connection
			var valueColumn = Debugger.IsAttached ? "DebugValue" : "SettingValue";
			var query = new SqlCommand($"SELECT SectionName, SettingName, {valueColumn} FROM Config WHERE ApplicationName IN ('{_source.Application}', '')", connection);

			query.Connection.Open();
			using (var reader = query.ExecuteReader())
			{
				while (reader.Read())
				{
					// join sectionname and setting name so Configuration.GetSection works in startup
					dic.Add($"{reader[0]}:{reader[1]}", reader[2].ToString());
				}
			}
		}
		Data = dic;
	}
}