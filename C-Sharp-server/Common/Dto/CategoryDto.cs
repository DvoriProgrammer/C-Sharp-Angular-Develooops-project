using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Common.Dto
{
    public class CategoryDto
    {
        public long Id { get; set; }
        public string Text { get; set; }
        //public virtual ICollection<QuestionDto> Questions{ get; set;}

    }
}
