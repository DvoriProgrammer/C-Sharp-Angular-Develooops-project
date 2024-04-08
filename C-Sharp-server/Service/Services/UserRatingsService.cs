using AutoMapper;
using Common.Dto;
using Repository.Entities;
using Repository.Interface;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class UserRatingsService : IService<UserRatingsDto>
    {
        private readonly IRepository<UserRatings> repository;
        private readonly IRepository<Answer> repository_Answer;
        private readonly IMapper mapper;
        public UserRatingsService(IRepository<UserRatings> repository, IMapper map, IRepository<Answer> repository_Answer)
        {
            this.repository = repository;
            mapper = map;
            this.repository_Answer = repository_Answer;
        }
        public async Task<UserRatingsDto> Add(UserRatingsDto item)
        {
            if (!await IsValidUserRating(item))
            {
                return null;
            }



            Answer a = new Answer();
           
          await repository_Answer.Update(item.AnswerId, a ); 
            return mapper.Map<UserRatingsDto>( await repository.AddFunction(mapper.Map<UserRatings>(item)));
        }

        public Task Delete(long id)
        {
            throw new NotImplementedException();
        }

        public Task<List<UserRatingsDto>> getAll()
        {
            throw new NotImplementedException();
        }

        public Task<UserRatingsDto> getById(long id)
        {
            throw new NotImplementedException();
        }

        public Task Post(UserRatingsDto item)
        {
            throw new NotImplementedException();
        }

        public Task Put(long id, UserRatingsDto item)
        {
            throw new NotImplementedException();
        }

        public Task UpDate(long id, UserRatingsDto entity)
        {
            throw new NotImplementedException();
        }
        private async Task<bool> IsValidUserRating(UserRatingsDto userRatingDto)
        {
            var usersRatingDto =await repository.GetAll();
              bool isDuplicate= usersRatingDto.Any(ur => ur.Id != userRatingDto.Id && ur.userId == userRatingDto.UserId && ur.AnswerId == userRatingDto.AnswerId);

            return !isDuplicate;
        }
    }
}
