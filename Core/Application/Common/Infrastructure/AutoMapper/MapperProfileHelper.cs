using System.Reflection;

namespace LandManager.Application.Common.Infrastructure.AutoMapper;

public sealed class Map
{
	public Type Source { get; set; }
	public Type Destination { get; set; }
}

public static class MapperProfileHelper
{
	public static IList<IHaveCustomMapping> LoadCustomMappings(params AssemblyName[] rootAssemblies)
	{
		var types = rootAssemblies.SelectMany(a => Assembly.Load(a).GetExportedTypes());

		var mapsFrom = (
				from type in types
				from instance in type.GetInterfaces()
				where
					typeof(IHaveCustomMapping).IsAssignableFrom(type) &&
					!type.IsAbstract &&
					!type.IsInterface
				select (IHaveCustomMapping)Activator.CreateInstance(type)).ToList();

		return mapsFrom;
	}
}
