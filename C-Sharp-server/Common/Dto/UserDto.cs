using Microsoft.AspNetCore.Http;
using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dto
{
    public class UserDto
    {
        public long? Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public string Email { get; set; }
        public IFormFile ?FileImage { get; set; }
        public string ?Img { get; set; }
        public string Role { get; set; }// 0 for student 1 for working
         //public virtual ICollection<Question>? question { get; set; }
    }
}
