using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;

namespace Application.Posts
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Post Post { get; set; }


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
                var post = await _context.Posts.FindAsync(request.Post.Id);
                if(post != null)
                {
                    post.DisplayName = request.Post.DisplayName ?? post.DisplayName;
                    post.Description = request.Post.Description ?? post.Description;
                    post.Image = request.Post.Image ?? post.Image;
                    post.Sizes = request.Post.Sizes ?? post.Sizes;
                    post.price = request.Post.price  ;
                    post.category = request.Post.category ?? post.category;
                    await _context.SaveChangesAsync();
                }
                return Unit.Value;
            }
        }
    }
}