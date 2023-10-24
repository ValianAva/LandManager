namespace LandManager.Application.Common.Infrastructure.AutoMapper;

public class AutoMapperProfile : Profile
{
	public AutoMapperProfile()
	{
		var assemblies = AppDomain.CurrentDomain.GetAssemblies().Select(x => x.GetName()).Where(x => x.Name.StartsWith("LandManager.Application")).ToArray();
		var mapsFrom = MapperProfileHelper.LoadCustomMappings(assemblies);

		foreach (var map in mapsFrom)
		{
			map.CreateMappings(this);
		}
	}
}
