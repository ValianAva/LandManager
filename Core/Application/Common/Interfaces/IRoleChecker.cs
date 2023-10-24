using LandManager.Domain.Enums;

namespace LandManager.Application.Common.Interfaces;

public interface IRoleChecker
{
	IRoleChecker IsAdmin(Action actionIfTrue);
	bool IsAdmin();
	IRoleChecker IsRegion(Action<List<int>> actionIfTrue);
	IRoleChecker IsRegion1(Action<List<int>> actionIfTrue);
	IRoleChecker IsRegion2(Action<List<int>> actionIfTrue);
	IRoleChecker IsInstallation(Action<List<int>> actionIfTrue);
	bool IsInstallation();
	IRoleChecker IsPartner(Action<List<int>, List<int>> actionIfTrue);
	bool IsPartner();
	IRoleChecker IsReadOnly(Action actionIfTrue);
	bool IsReadOnly();
	string FullName();
	Guid Id();
	string Email();
	Services ServiceId();
}