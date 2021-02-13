using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace API.Controllers
{
    public class PostsController : BasApiController
    {
        private readonly Datacontext _context;
        public PostsController(Datacontext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Post>>> GetPosts(){
            return await _context.Posts.ToListAsync();
            
        }
[HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(Guid id)
        {
            return await _context.Posts.FindAsync(id);
        }
    }
}