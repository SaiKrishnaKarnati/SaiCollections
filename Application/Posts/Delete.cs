using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;

namespace Application.Posts
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid id { get; set; }


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
                var post = await _context.Posts.FindAsync(request.id);

                _context.Remove(post);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}