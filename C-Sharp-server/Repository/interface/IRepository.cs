using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interface
{
    public interface IRepository<T>
{
        //descibe the active of data
        public Task<T> AddFunction(T entity);
        public Task Update(long id,T entity);
        public Task Delete(long id);
        public Task<List<T>> GetAll();
        public Task<T> GetById(long id);
        Task Post(User user);
    
    }
}
