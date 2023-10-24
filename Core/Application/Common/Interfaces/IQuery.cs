namespace LandManager.Application.Common.Interfaces;

/// <summary>
/// A marker interface used to identify MediatR queries
/// </summary>
/// <typeparam name="T"></typeparam>
public interface IQuery<T> : IRequest<T>
{
}