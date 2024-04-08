using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class Answer
    {
        [Key]
        public long Id { get; set; }
        public DateTime Date { get; set; }
   
        public long QuestionId { get ; set ; }
       [ForeignKey("QuestionId")]
        public virtual Question Question { get; set; }
   
        public long UserId { get ; set ; }
          [ForeignKey("UserId")]
        public virtual User User { get; set; }
        
        // public virtual ICollection <Content> Content { get; set; }
     public int Score { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    } 
}
