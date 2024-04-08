using Microsoft.Extensions.DependencyInjection;
using Repository.Entities;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Formats.Asn1.AsnWriter;

namespace Repository.Repositories
{
    public static class RepositoryExtention
    {
        public static IServiceCollection AddRepository(this IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<User>), typeof(UserRepository));
            services.AddScoped(typeof(IRepository<Category>), typeof(CategoryRepository));
            services.AddScoped(typeof(IRepository<Answer>), typeof(AnswerRepository));
            services.AddScoped(typeof(IRepository<Question>), typeof(QuestionRepository));
             services.AddScoped(typeof(IRepository<UserRatings>), typeof(UserRatingsRepository));


            return services;
        }
    }
}
