using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;

namespace Application.Categorylist
{
    public class Edit
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
                var category = await _context.CategoryList.FindAsync(request.list.Id);
                if(category != null)
                {
                    category.Cname = request.list.Cname ?? category.Cname;
                    await _context.SaveChangesAsync();
                }
                return Unit.Value;
            }
        }
    }
}