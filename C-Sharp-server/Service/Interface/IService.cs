using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IService<T>
    {
      public Task< T> Add(T item);
        public Task<List<T>> getAll();
        public Task<T> getById(long id);
        public Task UpDate(long id, T entity);
        public Task Delete(long id);
        public Task Put(long id, T item);
        public Task Post(T item);

    }
}
