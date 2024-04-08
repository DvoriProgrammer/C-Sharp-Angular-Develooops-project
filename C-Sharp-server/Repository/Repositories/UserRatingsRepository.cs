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
    public class UserRatingsRepository : IRepository<UserRatings>
    {
        private readonly IContext context;

        public UserRatingsRepository(IContext context)
        {
            this.context = context;
        }
        public async Task<UserRatings> AddFunction(UserRatings entity)
        {
           this.context.UserRatings.Add(entity);
            await this.context.Save();
            return entity;
        }

        public Task Delete(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<UserRatings>> GetAll()
        {
            return await this.context.UserRatings.Include(x => x.User).ToListAsync();
        }

        public async Task<UserRatings> GetById(long id)
        {
            return  this.context.UserRatings.FirstOrDefault(x => x.AnswerId == id);
        }

        public Task Post(User user)
        {
            throw new NotImplementedException();
        }

        public Task Update(long id, UserRatings entity)
        {
            throw new NotImplementedException();
        }
    }
}
