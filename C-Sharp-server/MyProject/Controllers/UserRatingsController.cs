using Microsoft.AspNetCore.Mvc;
using Service.Interface;
using MyProject.Model;
using Repository.Entities;
using Service.Interface;
using Common.Dto;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRatingsController : ControllerBase
    {


         private readonly IService<UserRatingsDto> service;
        public UserRatingsController(IService<UserRatingsDto> service)
        {
            this.service = service;
        }
        // GET: api/<UserRatingsController>
        [HttpGet]
        public async Task<List<UserRatingsDto>> Get()
        {
            return await  service.getAll();
        }

        // GET api/<UserRatingsController>/5
        [HttpGet("{id}")]
        public async  Task<UserRatingsDto> Get(long id)
        {
            return await service.getById(id);
        }

        // POST api/<UserRatingsController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserRatingsDto userRatingsDto)
        {
            try
            {
                
                var addedUserRating =await service.Add(userRatingsDto);
                if (addedUserRating == null)
                {
                    return BadRequest(new { message = "duplicate" });
                }
                return Ok(addedUserRating);
                
            }
            catch (InvalidOperationException ex)
            {
                // Handle the case where the user has already dragged the answer
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                // Handle other exceptions if necessary
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT api/<UserRatingsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserRatingsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
