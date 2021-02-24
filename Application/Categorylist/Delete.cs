using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistance;

namespace Application.Categorylist
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int id { get; set; }


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

                var category = await _context.CategoryList.FindAsync(request.id);

                 _context.CategoryList.Remove(category);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}