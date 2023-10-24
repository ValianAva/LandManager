using Microsoft.Extensions.Options;
using LandManager.Application.Common.Interfaces;

namespace LandManager.API.Common.Configuration;

public interface IWritableOptions<out T> : IOptionsSnapshot<T> where T : class, ISqlConfig, new()
{
	void Update(Action<T> applyChanges);
}