using Common.Dto;
using Microsoft.Extensions.DependencyInjection;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service;
using Repository.Repositories;
using Service.Services;
namespace Service.Services;


public static class ServiceExtention
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddRepository();
        services.AddScoped(typeof(IService<AnswerDto>), typeof(AnswerService));
        services.AddScoped(typeof(IService<CategoryDto>), typeof(CategoryService));
        services.AddScoped(typeof(IServiceUserExtention<UserDto>), typeof(UserService));
        services.AddScoped(typeof(IService<QuestionDto>), typeof(QuestionService));
        services.AddScoped<IServiceQuestionExtention<QuestionDto>, QuestionService>();
        services.AddScoped(typeof(IService<UserRatingsDto>), typeof(UserRatingsService));
        services.AddAutoMapper(typeof(MapperProfile)); 
        return services;
    }
}
