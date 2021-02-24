using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Categorylist;
using MediatR;
using System;

namespace API.Controllers
{
    public class CategoryListController : BasApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<CategoryList>>> getallCategories()
        {

            return await Mediator.Send(new List.Query());
        }

        [HttpPost]
        public async Task<ActionResult> CreateCategory(CategoryList list)
        {
            return Ok(await Mediator.Send(new Create.Command { list = list }));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditCategory(CategoryList list, int id)
        {
            list.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { list = list }));
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            return Ok(await Mediator.Send(new Delete.Command { id = id }));
        }

    }
}