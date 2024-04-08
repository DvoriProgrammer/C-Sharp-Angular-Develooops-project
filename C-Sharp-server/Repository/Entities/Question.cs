using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class Question
    {
        [Key]
        public long Id {get; set;}
        public string Title { get; set; }
        public DateTime Date { get; set; }

        public long UserId { get ; set ; }
         [ForeignKey("UserId")]
        public virtual  User User { get; set; }
       
        public long CategoryId { get ; set ; }
           [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }
        
        public virtual ICollection<Answer> Answers { get; set; }
       
        public string Content { get; set; }
        public string? Img { get; set; }
        //  public virtual ICollection<Content> Content { get; set; }
    }
}
