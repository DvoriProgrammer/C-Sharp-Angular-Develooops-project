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

    public class UserRepository : IRepository<User>
    {
        private readonly IContext context;
        public UserRepository(IContext context)
        {
            this.context = context;
        }
        public async Task<User> AddFunction(User entity)
        {
           this.context.Users.Add(entity);
          await  this.context.Save();
        return entity;
        }


        public async Task Delete(User entity)
        {
           this.context.Users.Remove(entity);
            await  this.context.Save();
        }

        public async Task Delete(long id)
        {
            var p = this.context.Users.FirstOrDefault(x => x.Id == id);
            this.context.Users.Remove(p);
            await this.context.Save();
        }

        public async Task<User> GetById(long id)
        {
            var u = await this.context.Users.Include(x => x.Questions).Include(x => x.Answers).FirstOrDefaultAsync(x => x.Id == id);

            // var path =u.Img;
            // byte[] bytes = System.IO.File.ReadAllBytes(path);
            // string imageBase64 = Convert.ToBase64String(bytes);
            // string image = string.Format("data:image/jpeg;base64,{0}", imageBase64);
            //u.Img = image;
            return u;

        }

        public async Task<List<User>> GetAll()
        {
            return   await  this.context.Users.Include(x => x.Questions).Include(x => x.Answers).ToListAsync();
            //foreach (var item in users)
            //{
            //    var path =item.Img;
            //    Console.WriteLine(path);
            //   byte[] bytes = System.IO.File.ReadAllBytes(path);
            //    string imageBase64 = Convert.ToBase64String(bytes);
            //   string image = string.Format("data:image/jpeg;base64,{0}",imageBase64);
            //    item.Img = image;
            //}
           

        }

        public async Task Post(User user)
        {
          
        }

        public async Task Update(long id,User entity)
        {
            var p=context.Users.FirstOrDefault(x=>x.Id == id);
            p.FirstName = entity.FirstName;
            p.LastName = entity.LastName;
            p.PhoneNumber = entity.PhoneNumber; 
            p.Password = entity.Password;
            p.Img = entity.Img;
            p.Role = entity.Role;
            p.Username = entity.Username;   
            p.Answers = entity.Answers; 
            p.Questions = entity.Questions; 
            this.context.Save();    
        }
    }
}
