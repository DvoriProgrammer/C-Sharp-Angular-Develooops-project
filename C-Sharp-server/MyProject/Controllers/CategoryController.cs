using Common.Dto;
using Microsoft.AspNetCore.Mvc;
using MyProject.Model;
using Repository.Entities;
using Service.Interface;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IService<CategoryDto> service;
        public CategoryController(IService<CategoryDto> service)
        {
            this.service = service;
        }
        // GET: api/<CategoryController>
        [HttpGet]
        public async Task<List<CategoryDto>> Get()
        {

           return await service.getAll();
        }
        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public async Task<CategoryDto> Get(long id)
        {
             return await service.getById(id);
        }
        // POST api/<CategoryController>
        [HttpPost]
        public async Task<CategoryDto> Post([FromBody] CategoryDto category )
        {
          Console.WriteLine("Hello World");
             return  await service.Add(category);
        }
        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public async Task Put(long id, [FromBody] string value )
        {
           // service.Add(category);
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public async Task Delete(long id)
        {
         await   service.Delete(id);
        }
    }
}
