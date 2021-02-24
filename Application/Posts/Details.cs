using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;

namespace Application.Posts
{
    public class Details
    {
        public class Query : IRequest<Post> { 
            public Guid Id { get; set; }
            
            
        }

        public class Handler : IRequestHandler<Query, Post>
        {
            private readonly Datacontext _context;
            public Handler(Datacontext context)
            {
                _context = context;
            }

            public async Task<Post> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Posts.FindAsync(request.Id);
            }
        }
    }
}