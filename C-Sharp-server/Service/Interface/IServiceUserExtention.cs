using Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IServiceUserExtention<T>: IService<T>
    {
        public Task<Dictionary<string, Dictionary<int, int>>> GetUserActivity(long userId);
      
    }
}
