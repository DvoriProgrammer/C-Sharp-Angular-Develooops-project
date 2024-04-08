using Microsoft.AspNetCore.Http;
using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
namespace Common.Dto
{
    public class QuestionDto
    {
        public long? Id { get; set; }
        public string Title { get; set; }
        public DateTime? Date { get; set; }

        public string Content { get; set; }
        public long CategoryId { get; set; }

        public long UserId { get; set; }
        public virtual UserShortenedDto? User { get; set; }

        public IFormFile? FileImage { get; set; }
        public string? Img { get; set; }
       public virtual ICollection<AnswerDto>? Answers { get; set; }
    }
}
