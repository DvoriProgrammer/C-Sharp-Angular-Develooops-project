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
using System.Xml.Linq;

namespace Service.Services
{
    public class QuestionService:IServiceQuestionExtention<QuestionDto>
    {
        private readonly IRepository<Question> repository;
        private readonly IMapper mapper;
        public QuestionService(IRepository<Question> repository, IMapper map)
        {
            this.repository = repository;
            this.mapper = map;
        }
        public async Task<QuestionDto> Add(QuestionDto item)
        {
          
            return mapper.Map<QuestionDto>(await repository.AddFunction(mapper.Map<Question>(item)));
        }

        public async Task Delete(long id)
        {
           await repository.Delete(id);
        }

        public async Task<List<QuestionDto>> getAll()
        {
            return mapper.Map<List<QuestionDto>>(await repository.GetAll());
        }

        public async Task<QuestionDto> getById(long id)
        {
            return mapper.Map<QuestionDto>(await repository.GetById(id));
        }

      
        public async Task<List<QuestionDto>> GetQuestionsByCategory(long categoryId)
        {
            var allQuestions = await repository.GetAll();
            var filteredQuestions = allQuestions.Where(x => x.CategoryId == categoryId).ToList();
            return mapper.Map<List<QuestionDto>>(filteredQuestions);
        }

        public async Task Post(QuestionDto entity)
        {
           await repository.AddFunction(mapper.Map<Question>(entity));
        }

        public async Task Put(long id, QuestionDto item)
        {
            throw new NotImplementedException();
        }

        public async Task UpDate(long id, QuestionDto entity)
        {
           await repository.Update(id, mapper.Map<Question>(entity));
        }

        




    }
}
