using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interface;

namespace MyProject.Model
{
   public static class Db 
    {
        public static List<User> Users =new List<User>();
        public static List<Category> Categories=new List<Category>();
        public static List<Question> Ouestions =new List<Question>();
        public static List<Answer> Answers =new List<Answer>();

        static Db()
        {

            Users.Add(
          new User()
                ); ;

        }
        public static void save()
        {
            throw new NotImplementedException();
        }
    }

}
