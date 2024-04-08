using Common.Dto;
using Microsoft.AspNetCore.Mvc;
using MyProject.Model;
using Repository.Entities;
using Service.Interface;
using Common.Dto;
using Microsoft.AspNetCore.Mvc;
using Service.Interface;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using System.Net.NetworkInformation;
using Repository.Repositories;
using Service.Services;



// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
namespace MyProject.Controllers
{
    public class LoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

 
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IServiceUserExtention<UserDto> service;

        private IConfiguration configuration;

        public UserController( IConfiguration configuration, IServiceUserExtention<UserDto> service)
        {
        
            this.configuration = configuration;

            this.service = service;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<List<UserDto>> Get()
        {
            var users =await service.getAll();
            foreach (var item in users)
            {
                if (item.FileImage != null)
                    item.Img = GetImage(item.Img);

            }

            return  users.Cast<UserDto>().ToList();
        }
        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<UserDto> Get(long id)
        {
            var g =await service.getById(id);
            var im = GetImage(g.Img);
            if (im != null)
            {
                g.Img = im;
            }
            
            return (UserDto)g;
        }
        [HttpGet("Getemail/{email}")]
        public async Task<UserShortenedDto> Getemail(string email)
        {
           var users = await service.getAll();
            var user = users.FirstOrDefault(u => u.Email.Equals(email));
            var im = GetImage(user.Img);
            if (im != null)
            {
                user.Img = im;
            }
            
            var userDto = new UserShortenedDto() { Id = user.Id, Username = user.Username, Email = user.Email, FileImage = user.FileImage, Role = user.Role, Img = user.Img };
            return userDto; 
        }
        // POST api/<UserController>
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] UserDto singlersDto)
        {
            var users=await service.getAll();
            var user = users.Count(x => x.Username == singlersDto.Username);
            if (user == 0)
            {
              
                try
                {
                    if (singlersDto.FileImage == null)
                    {

                    }
                    else
                    {
                        var myPath = Path.Combine(Environment.CurrentDirectory + "/images/" + singlersDto.FileImage.FileName);
                        using (FileStream fs = new FileStream(myPath, FileMode.Create))
                        {
                            singlersDto.FileImage.CopyTo(fs);
                            fs.Close();
                        }
                        singlersDto.Img = singlersDto.FileImage.FileName;
                        singlersDto.Img = singlersDto.FileImage.FileName;
                        //Post(singlersDto);
                    }
                  string  realyPassword = singlersDto.Password;
                   
                    string hashedPassword = BCrypt.Net.BCrypt.HashPassword(singlersDto.Password);
                   // var hashedPassword = new PasswordHasher<object?>().HashPassword(null, singlersDto.Password);
                    singlersDto.Password = hashedPassword;
                   await service.Add(singlersDto);

                    var userDto = new UserShortenedDto() {Id= singlersDto.Id, Username = singlersDto.Username, Email = singlersDto.Email, FileImage = singlersDto.FileImage, Role = singlersDto.Role, Img = singlersDto.Img };
                   
                      var im = GetImage(userDto.Img);
                    if (im != null)
                    {
                        userDto.Img = GetImage(userDto.Img); ;
                    } 
                    var token = Generate(singlersDto);
                    // return Ok(new { token = token, newTime = DateTime.Now.ToString(),experinse = 30.ToString(),user= userDto });
                    return Ok(new { token, userDto});
                    // Return token along with success message



                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error addi // Return an error response 1111");
                    return StatusCode(500, "Internal Server Error");
                }
            }
            else
            {
                return BadRequest("exist username");
            }
        }
        [HttpGet("getImage/{ImageUrl}")]
        public string GetImage(string ImageUrl)
        {
            if (ImageUrl != null &&!ImageUrl.Contains("pixabay") ) { 
                var path = Path.Combine(Environment.CurrentDirectory, "images/", ImageUrl);
            byte[] bytes = System.IO.File.ReadAllBytes(path);
            string imageBase64 = Convert.ToBase64String(bytes);
            string image = string.Format("data:image/jpeg;base64,{0}", imageBase64);
            return image;
                }
            return null;
        }
        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task Put(long id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task Delete(long id)
        {
         await   service.Delete(id);
        }

        [HttpGet("byUsername/{userName}")]
        public async Task<IActionResult> Get(string userName)
        {
            var users = await service.getAll();
             var user= users.Count(x => x.Username == userName);

            if (user == 0)
            {

                return Ok();
            }
            else
            {
                return NotFound(new { message = $"User with username '{userName}' exists." });
            }

        }





        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody] LoginModel loginModel)
        {
            // Authentication logic using loginModel.UserName and loginModel.Password
            var user = await Authenticate(loginModel.UserName, loginModel.Password);
            if (user != null)
            {
                /* var passwordVerificationResult = new PasswordHasher<object?>().VerifyHashedPassword(null, user.Password, loginModel.Password);
                 if (passwordVerificationResult == PasswordVerificationResult.Success)*/
                bool passwordMatch = BCrypt.Net.BCrypt.Verify(loginModel.Password,user.Password);
                if(passwordMatch) 
                {
                    var userDto = new UserShortenedDto() { Id = user.Id,Username = user.Username, Email = user.Email, FileImage = user.FileImage, Role = user.Role, Img = user.Img };
                    var im = GetImage(userDto.Img);
                    if (im != null)
                    {
                        userDto.Img = im;
                    }
                
                        var token = Generate(user);
                   
                    // return Ok(new { token = token, newTime = DateTime.Now.ToString(),experinse = 30.ToString(),user= userDto });
                    return Ok(new { token, userDto});
                }
            }
           
            return NotFound("user not found");
        }
        private object Generate(UserDto userDto)
        {
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
          new Claim(ClaimTypes.Surname,userDto.Username),
              new Claim(ClaimTypes.Email,userDto.Email),
           //new Claim(ClaimTypes.Id,userDto.Id),
            new Claim(ClaimTypes.Role,userDto.Role),
          //  new Claim(ClaimTypes.GivenName,user.GivenName)
            };
            var token = new JwtSecurityToken(configuration["Jwt:Isuur"], configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }


      
        private async Task<UserDto> Authenticate(string userName, string password)
        {
            var users = await service.getAll();
            if (users == null)
                return null;
            var user=  users.FirstOrDefault(x => x.Username == userName);
            if (user != null)
            {
                bool passwordMatch = BCrypt.Net.BCrypt.Verify( password,user.Password);
                if (passwordMatch)
                {
                    return user;
                }
            }
            return null;
        }
        [HttpGet("{userId}/activity")]
        public async Task<IActionResult> GetUserActivity(long userId)
        {
            try
            {

                var userActivity =await service.GetUserActivity(userId);
                return Ok(userActivity);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}

