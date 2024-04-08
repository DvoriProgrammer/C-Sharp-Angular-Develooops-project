using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class UserRatings
    {
        [Key]
        public long Id { get; set; }

        public long AnswerId { get; set; }

        public long userId { get; set; }
        [ForeignKey("userId")]
        public virtual User User { get; set; }
        [ForeignKey("AnswerId")]
        public virtual Answer Answer { get; set; }
    }
}
