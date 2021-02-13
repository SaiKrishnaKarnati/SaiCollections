using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistance
{
    public class Datacontext : DbContext
    {
        public Datacontext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Post> Posts { get; set; }


    }
}