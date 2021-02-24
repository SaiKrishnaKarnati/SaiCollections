using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Posts
{
    public class List
    {
        public class Query : IRequest<List<Post>> { }

        public class Handler : IRequestHandler<Query, List<Post>>
        {
            private readonly Datacontext _context;
            public Handler(Datacontext context)
            {
                _context = context;
            }

            public Task<List<Post>> Handle(Query request, CancellationToken cancellationToken)
            {
                return _context.Posts.ToListAsync();
            }
        }
    }
}