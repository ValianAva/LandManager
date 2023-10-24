using RolesEnum = LandManager.Domain.Enums.Roles;

namespace LandManager.Application.SSO.Roles.Queries.GetRoles;

public class GetRolesQuery : IQuery<IList<RoleDto>>
{
}

public class GetRolesQueryHandler : IRequestHandler<GetRolesQuery, IList<RoleDto>>
{
	private readonly IAppContext _context;
	private readonly IMapper _mapper;
	private readonly IRoleChecker _roleChecker;
	private readonly ILogger _logger;

	public GetRolesQueryHandler(IAppContext context, IMapper mapper, ILogger logger, IRoleChecker roleChecker)
	{
		_context = context;
		_mapper = mapper;
		_roleChecker = roleChecker;
		_logger = logger.ForContext("SourceContext", GetType().Name);

	}

	public async Task<IList<RoleDto>> Handle(GetRolesQuery request, CancellationToken cancellationToken)
	{
		var roles = await _context.Roles.ProjectTo<RoleDto>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);
		// roles hq users should not see
		List<string> hqRestrictedRoles = new[] { RolesEnum.LandManager.ToLower(), RolesEnum.Reviewer.ToLower() }.ToList();
		// roles region users should not see
		List<string> regionRestrictedRoles = new[] { RolesEnum.LandManager.ToLower(), RolesEnum.Reviewer.ToLower(), RolesEnum.Hq.ToLower(), RolesEnum.NonInternal.ToLower() }.ToList();

		_roleChecker
			.IsRegion(installationIds => roles = roles.Where(r => !regionRestrictedRoles.Contains(r.Name.ToLower())).ToList())
			.IsInstallation(installationIds => roles.Clear());

		_logger.Debug("Returning {RoleCount} roles", roles.Count);
		return roles;
	}
}