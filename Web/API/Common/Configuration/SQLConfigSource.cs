using Microsoft.Extensions.Configuration;

namespace LandManager.API.Common.Configuration;

public class SQLConfigurationSource : IConfigurationSource
{
	public string ConnectionString { get; set; }
	public string Application { get; set; }

	public IConfigurationProvider Build(IConfigurationBuilder builder)
	{
		return new SQLConfigurationProvider(this);
	}
}