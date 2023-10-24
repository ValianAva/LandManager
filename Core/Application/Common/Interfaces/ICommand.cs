namespace LandManager.Application.Common.Interfaces;

/// <summary>
/// A marker interface used to identify MediatR commands
/// </summary>
/// <typeparam name="T"></typeparam>
public interface ICommand<T> : IRequest<T>
{
}