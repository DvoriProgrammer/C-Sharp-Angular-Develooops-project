using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dto
{
    public class UserShortenedDto
    {
        public long? Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public IFormFile FileImage { get; set; }
        public string? Img { get; set; }
       public string Role { get; set; }
    }
}
