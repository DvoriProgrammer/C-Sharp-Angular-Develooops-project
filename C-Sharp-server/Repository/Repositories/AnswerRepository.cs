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
    public class AnswerRepository : IRepository<Answer>
    {
        private readonly IContext context;
        public AnswerRepository(IContext context)
        {
            this.context = context;
        }
        public async Task<Answer> AddFunction(Answer entity)
        {
            this.context.Answers.Add(entity);
           await this.context.Save();
            return  entity;
        }
        public async Task Delete(long id)
        {
            var p = this.context.Answers.FirstOrDefault(x => x.Id == id);
            this.context.Answers.Remove(p);
           await this.context.Save();
        }

        public async Task<Answer> GetById(long id)
        {
            return await this.context.Answers.Include(c => c.User)
               .Include(r => r.Question).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Answer>> GetAll()
        {
            return await this.context.Answers.Include(c => c.User).Include(r => r.Question).ToListAsync();
        }

        public async Task Post(User user)
        {
            throw new NotImplementedException();
        }

        public async Task Update(long id, Answer entity)
        {
            var p = context.Answers.FirstOrDefault(x => x.Id == id);
           
            p.Score+=1;
           // p.Content=entity.Content;   
           
           await this.context.Save();
        }
    }
}
