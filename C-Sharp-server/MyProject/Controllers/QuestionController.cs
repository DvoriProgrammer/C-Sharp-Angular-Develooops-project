using Common.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyProject.Model;
using Repository.Entities;
using Service.Interface;
using Service.Services;
using Service.Services;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController:ControllerBase
    {
        private readonly IService<QuestionDto> service;
        private readonly IServiceQuestionExtention<QuestionDto> serviceQuestionExtention;
        public QuestionController(IService<QuestionDto> service,IServiceQuestionExtention<QuestionDto> serviceQuestionExtention)
        {
            this.service = service;
            this.serviceQuestionExtention= serviceQuestionExtention;
        }
        // GET: api/<QuestionController>
        [HttpGet]
        public async Task<List<QuestionDto>> Get()
        {
            var questions =await service.getAll();
            var filteredQuestions = questions
           .Where(item => !item.User.Role.Equals("admin")).ToList();
            foreach (var item in filteredQuestions)
            {
               
                    item.Img = GetImage(item.Img);
                var im = GetImage(item.User.Img);
                if (im != null)
                {
                    item.User.Img = im;
                }

                
              //item.Answers.
            }
            return questions.Cast<QuestionDto>().ToList();
        }
        // GET api/<QuestionController>/5
        [HttpGet("{id}")]
        public async Task<QuestionDto> Get(long id)
        {
            var g =await service.getById(id);
            if (g.Img != null)
            {
                g.Img = GetImage(g.Img);
                var im = GetImage(g.User.Img);
                if (im != null)
                {
                    g.User.Img = im;
                }

               
                return (QuestionDto)g;
                ;
            }
            else return g;
        }
     //   [HttpGet("{id}")]
       // public QuestionDto GetByCategoryId(long id)
       // {
         //   return service.getById(id);
       // }
        // POST api/<QuestionController>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromForm] QuestionDto singlersDto)
        {
            if (singlersDto.FileImage == null)
            {
                var addedQuestion =await service.Add(singlersDto);

                return Ok(addedQuestion.Id);
            }  
             else{try
            {
                var myPath = Path.Combine(Environment.CurrentDirectory + "/images/" + singlersDto.FileImage.FileName);
                using (FileStream fs = new FileStream(myPath, FileMode.Create))
                {
                    singlersDto.FileImage.CopyTo(fs);
                    fs.Close();
                }
                singlersDto.Img = singlersDto.FileImage.FileName;
                //  Post(singlersDto);
                    var addedQuestion =await service.Add(singlersDto);
                   
                return Ok(addedQuestion.Id);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error addi // Return an error response");
                return StatusCode(500, "Internal Server Error");
            }
                }
        }


        [HttpGet("dailyQuestion/{admin}")]
     //[ Authorize(Roles = "admin")]
        public async Task<QuestionDto> Get(string admin)
        {
            try
            {
                var questions =await service.getAll();
                var adminQuestion = questions
                    .Where(item => item.User.Role.Equals("admin"))
                    .OrderByDescending(item => item.Date)
                    .FirstOrDefault();

                if (adminQuestion != null)
                {
                    adminQuestion.Img = GetImage(adminQuestion.Img);
                    var im = GetImage(adminQuestion.User.Img);
                    if (im != null)
                    {
                        adminQuestion.User.Img = im;
                    }
                }

                return adminQuestion;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpGet("getImage/{ImageUrl}")]
        public string GetImage(string ImageUrl)
        {
            if (ImageUrl!=null&&!ImageUrl.Contains("pixabay"))
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
        // PUT api/<QuestionController>/5
        [HttpPut("{id}")]
        public async Task Put(long id,[FromBody] QuestionDto q)
        {
          await  service.UpDate(id, q);
        }



       

        // DELETE api/<QuestionController>/5
        [HttpDelete("{id}")]
        [ Authorize(Roles = "admin")]
        public async Task Delete(long id)
        {
      await  service.Delete(id);
        }

      [HttpGet("byCategoryId/{categoryId}")]
        public async Task<IActionResult> GetQuestionsByCategory(long categoryId)
       {
        var questions = await serviceQuestionExtention.GetQuestionsByCategory(categoryId);
            var filteredQuestions = questions
        .Where(item => !item.User.Role.Equals("admin")).ToList();
            //var questions = await Get();
            //var filteredQuestions = questions.Where(q=>q.CategoryId== categoryId);

            foreach (var item in filteredQuestions)
            {
                var im = GetImage(item.User.Img);
                if (im != null)
                {
                    item.User.Img = im;
                }
           
                item.Img = GetImage(item.Img);

                foreach (var answer in item.Answers)
                {
                    var imm = GetImage(answer.User.Img);
                    if (imm != null)
                    {
                        answer.User.Img = imm;
                    }

                }
            }
            if (filteredQuestions == null )
            {
              return NotFound("No questions found for the specified category");
            }
           return Ok(filteredQuestions);
       }



        [HttpGet("byUserId/{userName}/{categoryId}")]
       
        public async Task<IActionResult> GetbyUserId(string userName,long categoryId)
        {
            var questions = await serviceQuestionExtention.GetQuestionsByCategory(categoryId);
    

        

            var filteredQuestions = questions
        .Where(item => item.User.Username== userName).ToList();
            foreach (var item in filteredQuestions)
            {
                var im = GetImage(item.User.Img);
                if (im != null)
                {
                    item.User.Img = im;
                }

                item.Img = GetImage(item.Img);

                foreach (var answer in item.Answers)
                {
                    var imm = GetImage(answer.User.Img);
                    if (imm != null)
                    {
                        answer.User.Img = imm;
                    }

                }
            }

            if (filteredQuestions == null)
            {
                return NotFound("No questions found for the specified user");
            }
            return Ok(filteredQuestions);
        }



    }
}
