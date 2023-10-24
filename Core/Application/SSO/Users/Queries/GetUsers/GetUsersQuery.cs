using RolesEnum = LandManager.Domain.Enums.Roles;

namespace LandManager.Application.SSO.Users.Queries.GetUsers;

public class GetUsersQuery : IQuery<IList<UserDto>>
{

	public class GetUserHandler : IRequestHandler<GetUsersQuery, IList<UserDto>>
	{
		private readonly IAppContext _context;
		private readonly IMapper _mapper;
		private readonly IRoleChecker _roleChecker;
		private readonly ILogger _logger;

		public GetUserHandler(IAppContext context, IMapper mapper, ILogger logger, IRoleChecker roleChecker)
		{
			_context = context;
			_mapper = mapper;
			_roleChecker = roleChecker;
			_logger = logger.ForContext("SourceContext", GetType().Name);
		}

		public async Task<IList<UserDto>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
		{
			var users = _context.Users.AsQueryable();

			_roleChecker
				.IsRegion(installationIds => users = users.Where(a => a.Installations.Any(i => installationIds.Contains(i.Id))))
				.IsInstallation(installationIds => users = users.Where(u => false)) // make sure installation users see nothing
				.IsPartner((installationIds, partnerIds) => users = users = users.Where(u => false)); // make sure partner users see nothing

			var entities = await users.ProjectTo<UserDto>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);

			if (entities.Count > 0)
			{
				_logger.Debug("Returning {UserCount} users", entities.Count);
			}

			return entities;
		}
	}
}