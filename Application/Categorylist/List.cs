using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistance;
using Microsoft.EntityFrameworkCore;

namespace Application.Categorylist
{
    public class List
    {
        public class Query : IRequest<List<CategoryList>> { }

        public class Handler : IRequestHandler<Query, List<CategoryList>>
        {
            private readonly Datacontext _context;
            public Handler(Datacontext context)
            {
                _context = context;
            }

            public async Task<List<CategoryList>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.CategoryList.ToListAsync();
            }
        }
    }
}