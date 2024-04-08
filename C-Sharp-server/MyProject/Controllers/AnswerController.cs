using Common.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyProject.Model;
using Repository.Entities;
using Service.Interface;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        private readonly IService<AnswerDto> service;
        public AnswerController(IService<AnswerDto> service)
        {
            this.service = service;
        }
        // GET: api/<AnswerController>
        [HttpGet]
        public async Task<List<AnswerDto>> Get()
        {
            var answers =await service.getAll();
            foreach (var item in answers)
            {
                var im = GetImage(item.User.Img);
                if (im != null)
                {
                    item.User.Img = GetImage(item.User.Img); ;
                }
                // item.Question.Img = GetImage(item.Question.Img);
               
            }
            return answers.Cast<AnswerDto>().ToList();
        }

        // GET api/<AnswerController>/5
        [HttpGet("{id}")]
        public async Task<AnswerDto> Get(long id)
        {

            var g = await service.getById(id);
            if (g != null) { 
           // g.Question.Img = GetImage(g.Question.Img);
            g.User.Img = GetImage(g.User.Img);
            return (AnswerDto)g;}
            return null;
        }

        // POST api/<AnswerController>
        [HttpPost]
        [Authorize]
        public async Task Post([FromBody] AnswerDto Answer)
        {
          
            var x= await service.Add(Answer);
            
           
        }
        // PUT api/<AnswerController>/5
        [HttpPut("{id}")]
        public async Task Put(long id, [FromBody] string value)
        {
        }
        // DELETE api/<AnswerController>/5
        [HttpDelete("{id}")]
        public async Task Delete(long id)
        {
      await  service.Delete(id);
        }



        [HttpGet("getImage/{ImageUrl}")]
        public string GetImage(string ImageUrl)
        {
            if (!ImageUrl.Contains("pixabay"))
            {

                var path = Path.Combine(Environment.CurrentDirectory, "images/", ImageUrl);
                byte[] bytes = System.IO.File.ReadAllBytes(path);
                string imageBase64 = Convert.ToBase64String(bytes);
                string image = string.Format("data:image/jpeg;base64,{0}", imageBase64);
                return image;
            }
            else
            {
                return null;
            }
        }
    }
}
