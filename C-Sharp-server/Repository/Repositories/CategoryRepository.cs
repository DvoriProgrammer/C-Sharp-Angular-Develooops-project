using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class CategoryRepository : IRepository<Category>
    {
        private readonly IContext context;
        public CategoryRepository(IContext context)
        {
            this.context = context;
        }

        public async Task< Category> AddFunction(Category entity)
        {
            this.context.Categories.Add(entity);//בעיה
           await this.context.Save();
            return entity;
        }

        public async Task Delete(long id)
        {
            var p =await this.context.Categories.FirstOrDefaultAsync(x => x.Id == id);
            this.context.Categories.Remove(p);
             await  this.context.Save();
        }

        public async Task<List<Category>> GetAll()
        {
            return await this.context.Categories.ToListAsync();
        }

        public async Task<Category> GetById(long id)
        {
            return await this.context.Categories.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task Post(User user)
        {
            throw new NotImplementedException();
        }

        public async Task Update(long id, Category entity)
        {
            throw new NotImplementedException();
        }
    }
}
