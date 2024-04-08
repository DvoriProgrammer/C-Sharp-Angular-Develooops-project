using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dto
{
    public class UserRatingsDto
    {
        public long Id { get; set; }

        public long AnswerId { get; set; }

        public long UserId { get; set; }
    }
}
