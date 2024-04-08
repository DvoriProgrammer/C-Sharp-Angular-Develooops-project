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
    public class AnswerService: IService<AnswerDto>
    {
        private readonly IRepository<Answer> repository;
        private readonly IMapper mapper;

        public AnswerService(IRepository<Answer> repository, IMapper map)
        {
            this.repository = repository;
            this.mapper = map;
        }
        public async Task<AnswerDto> Add(AnswerDto item)
        {
           return  mapper.Map<AnswerDto>(await repository.AddFunction(mapper.Map<Answer>(item)));
            
        }
        public async Task Delete(long id)
        {
           await repository.Delete(id);
        }
        public async Task<List<AnswerDto>> getAll()
        {
            return  mapper.Map<List<AnswerDto>>(await repository.GetAll());
        }
        public async Task<AnswerDto> getById(long id)
        {
            return mapper.Map<AnswerDto>(await repository.GetById(id));
        }

        public async Task Post(AnswerDto item)
        {
            throw new NotImplementedException();
        }

        public async Task Put(long id, AnswerDto item)
        {
            throw new NotImplementedException();
        }

        public async Task UpDate(long id, AnswerDto entity)
        {
            await repository.Update(id, mapper.Map<Answer>(entity));
        }
    }
}
