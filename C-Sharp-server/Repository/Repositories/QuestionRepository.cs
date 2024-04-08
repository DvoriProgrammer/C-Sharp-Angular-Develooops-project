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
    public class QuestionRepository : IRepository<Question>
    {
        private readonly IContext context;
    public QuestionRepository(IContext context)
    {
        this.context = context;
    }

        public async Task<Question> AddFunction(Question entity)
        {
            this.context.Ouestions.Add(entity);
          await  this.context.Save();
            return entity;
        }

        public async Task Delete(Question entity)
        {
            this.context.Ouestions.Remove(entity);
         await   this.context.Save();
        }

        public async Task Delete(long id)
        {
            var p =await this.context.Ouestions.FirstOrDefaultAsync(x => x.Id == id);
            if (p != null) { 
            this.context.Ouestions.Remove(p);
          await  this.context.Save();}
        }

        public async Task<Question> GetById(long id)
        {
            return await this.context.Ouestions.Include(c => c.User).Include(c => c.Answers)
                    .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Question>> GetAll()
        {
            
            var x= await this.context.Ouestions.Include(c => c.User).Include(c => c.Answers).ToListAsync();
            return x;
        }

        public async Task Post(User user)
        {
            throw new NotImplementedException();
        }

        public async Task Update(long id, Question entity)
        {
            var p = context.Ouestions.FirstOrDefault(x => x.Id == id);
            p.Title = entity.Title;
            p.Date=entity.Date;
            p.User= entity.User;
            p.Answers=entity.Answers;
        //    p.Content=entity.Content;
            p.Category=entity.Category;


            this.context.Save();
        }

        public async Task<List<Question>> GetQuestionsByCategory(long categoryId)
        {
            // Use Include to eagerly load the Category navigation property
            return await context.Ouestions
                .Include(q => q.Category)
                .Where(q => q.CategoryId == categoryId)
                .ToListAsync();

        }

     

      
    }
}
