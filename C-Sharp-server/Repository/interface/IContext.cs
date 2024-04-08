using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interface
{
   public interface IContext
{
        public DbSet <User> Users{get;set;}
        public DbSet <Category> Categories{ get; set; }
        public DbSet <Question> Ouestions{ get; set; }
        public DbSet <Answer> Answers{ get; set; }
        public DbSet<UserRatings> UserRatings { get; set; }

        //  public DbSet<Content> Contents { get; set; }
        public Task Save();  
    }
}
