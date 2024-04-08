 using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dto
{
    public class AnswerDto
    {
        public long? Id { get; set; }
        public DateTime ?Date { get; set; }
        public int Score { get; set; }

        public  long QuestionId { get; set; }
        //public virtual QuestionDto? Question { get; set; }
        public long UserId { get; set; }
        public virtual UserShortenedDto? User { get; set; }
        public  string Content { get; set; }
        public  string Title { get;set; }


    }
}
