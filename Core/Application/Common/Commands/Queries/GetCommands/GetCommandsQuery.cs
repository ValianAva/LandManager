
using LandManager.Domain.Enums;

namespace LandManager.Application.Common.Commands.Queries.GetCommands;

public class GetCommandsQuery : IQuery<IList<CommandDto>>
{
	public Services? ServiceId { get; set; }
}

public class GetCommandsQueryHandler : IRequestHandler<GetCommandsQuery, IList<CommandDto>>
{
	private readonly IAppContext _context;
	private readonly IMapper _mapper;
	private readonly ILogger _logger;

	public GetCommandsQueryHandler(IAppContext context, IMapper mapper, ILogger logger)
	{
		_context = context;
		_mapper = mapper;
		_logger = logger.ForContext("SourceContext", GetType().Name);
	}

	public async Task<IList<CommandDto>> Handle(GetCommandsQuery request, CancellationToken cancellationToken)
	{
		var entities = await _context.Command
			.Where(c => request.ServiceId.HasValue ? c.ServiceId == request.ServiceId : true)
			.ProjectTo<CommandDto>(_mapper.ConfigurationProvider).Distinct().ToListAsync(cancellationToken);
		_logger.Debug("Returning {CommandCount} Commands", entities.Count);
		return entities;
	}
}