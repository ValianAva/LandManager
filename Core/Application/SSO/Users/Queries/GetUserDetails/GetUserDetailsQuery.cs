namespace LandManager.Application.SSO.Users.Queries.GetUserDetails;

public class GetUserDetailsQuery : IQuery<UserDetailsDto>
{

	public string Id { get; set; }

	public class GetUserDetailsHandler : IRequestHandler<GetUserDetailsQuery, UserDetailsDto>
	{
		private readonly IAppContext _context;
		private readonly IMapper _mapper;
		private readonly IUserAuthorizer _userAuthorizer;
		private readonly ILogger _logger;

		public GetUserDetailsHandler(IAppContext context, IMapper mapper, ILogger logger, IUserAuthorizer userAuthorizer)
		{
			_context = context;
			_mapper = mapper;
			_userAuthorizer = userAuthorizer;
			_logger = logger.ForContext("SourceContext", GetType().Name);
		}

		public async Task<UserDetailsDto> Handle(GetUserDetailsQuery request, CancellationToken cancellationToken)
		{
			var entity = await _context.Users.Include(u => u.Installations).ThenInclude(i => i.Services).ProjectTo<UserDetailsDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken);

			if (entity == null)
			{
				_logger.Information("User {UserId} was null. Throwing NotFoundException", request.Id);
				throw new NotFoundException(nameof(Users), request.Id);
			}

			if (!_userAuthorizer.HasAccess(request.Id))
			{
				_logger.Warning("User is not allowed to view user {UserId}. Throwing NotAuthorizedException.", request.Id);
				throw new NotAuthorizedException();
			}

			_logger.Debug("Returning details for user {UserId} with name {GivenName} {FamilyName}", entity.Id, entity.GivenName, entity.FamilyName);

			return entity;
		}
	}
}