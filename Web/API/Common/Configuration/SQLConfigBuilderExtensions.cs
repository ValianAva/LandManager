using Microsoft.Extensions.Configuration;

namespace LandManager.API.Common.Configuration;

public static class SQLConfigBuilderExtensions
{
	public static IConfigurationBuilder AddSQLConfig(this IConfigurationBuilder builder, string connectionString, string application)
	{
		return builder.Add(new SQLConfigurationSource { ConnectionString = connectionString, Application = application });
	}
}