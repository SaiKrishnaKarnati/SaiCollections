using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;

namespace Application.Categorylist
{
    public class Create
    {

        public class Command : IRequest
        {
            public CategoryList list { get; set; }


        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly Datacontext _context;
            public Handler(Datacontext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
              await _context.CategoryList.AddAsync(request.list);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}