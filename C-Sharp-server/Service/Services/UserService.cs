using AutoMapper;
using Common.Dto;
using Microsoft.Extensions.Logging;
using Repository.Entities;
using Repository.Interface;
using Repository.Repositories;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class UserService : IServiceUserExtention<UserDto>
    {
        private readonly IRepository<User> repository;
        private readonly IMapper mapper;
        public UserService(IRepository<User> repository,IMapper map)
        {
           this. repository = repository;
            this.mapper = map;
        }
        public async Task<UserDto> Add(UserDto item)
        {
         return mapper.Map<UserDto>(await repository.AddFunction(mapper.Map<User>(item))); 
        }

        public async Task Delete(long id)
        {
            await repository.Delete(id);
        }

      

        public async Task<List<UserDto>> getAll()
        {
            return mapper.Map < List <UserDto>>( await repository.GetAll());
        }

        public async Task<UserDto> getById(long id)
        {
         return mapper.Map<UserDto> (await repository.GetById(id));
        }
       


        public async Task UpDate(long id, UserDto entity)
        {
          await  repository.Update(id,mapper.Map<User>(entity)); 
        }
        public async Task Post(UserDto entity)
        {
         await  repository.AddFunction(mapper.Map<User>(entity));
        }

        public async Task Put(long id, UserDto item)
        {
            throw new NotImplementedException();
        }
        public async Task<Dictionary<string, Dictionary<int, int>>> GetUserActivity(long userId)
 {
            string[] englishMonthNames = new string[] { "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" };

            var user = await repository.GetById(userId);
            if (user == null)
            {
                throw new ArgumentException($"User with ID {userId} not found");
            }

            Dictionary<string, Dictionary<int, int>> activityPerMonth = new Dictionary<string, Dictionary<int, int>>();

            // Initialize the dictionary with month names
            for (int i = 1; i <= 12; i++)
            {
                string monthName = englishMonthNames[i - 1];
                activityPerMonth[monthName] = new Dictionary<int, int>();


                // Initialize the dictionary with days of the month
                for (int day = 1; day <= DateTime.DaysInMonth(2000, i); day++)
                {
                    activityPerMonth[monthName][day] = 0;
                }
            }

            // Iterate over all user's questions and add activity to the dictionary according to the month and day
            foreach (var question in user.Questions)
            {
                string monthName = englishMonthNames[question.Date.Month - 1];
                int dayOfMonth = question.Date.Day;
                activityPerMonth[monthName][dayOfMonth]++;
            }

            // Iterate over all user's answers and add activity to the dictionary according to the month and day
            foreach (var answer in user.Answers)
            {
                string monthName = englishMonthNames[answer.Date.Month - 1];
                int dayOfMonth = answer.Date.Day;
                activityPerMonth[monthName][dayOfMonth]++;
            }

            return  activityPerMonth;
        }
     
    }
}
