using Microsoft.AspNetCore.Mvc;
using MyProject.Model;
using Repository.Entities;
using Service.Interface;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        // GET: api/<ContentController>
        [HttpGet]
       // public List<Content> Get()
      //  {
          //  return Db.Content.ToList();
      //  }

        // GET api/<ContentController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ContentController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ContentController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ContentController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
