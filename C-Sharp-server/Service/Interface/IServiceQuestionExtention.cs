using Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IServiceQuestionExtention<T>:IService<T>
    {
        public Task<List<QuestionDto>> GetQuestionsByCategory(long categoryId);
    }
}
