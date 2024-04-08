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
    public class CategoryService : IService<CategoryDto>
    {
        private readonly IRepository<Category> repository;
        private readonly IMapper mapper;

        public CategoryService(IRepository<Category> repository, IMapper map)
        {
            this.repository = repository;
            this.mapper = map;
        }
        public async Task<CategoryDto> Add(CategoryDto item)
        {
        return mapper.Map<CategoryDto>(await repository.AddFunction(mapper.Map<Category>(item)));
        }
        public async Task Delete(long id)
        {
         await   repository.Delete(id);
        }

        public async Task<List<CategoryDto>> getAll()
        {
            return mapper.Map<List<CategoryDto>>( await  repository.GetAll());
        }
     
        public async Task<CategoryDto> getById(long id)
        {
            return mapper.Map<CategoryDto>(await repository.GetById(id));
        }
        public async Task Post(CategoryDto item)
        {
            Console.WriteLine("post");
           await repository.AddFunction(mapper.Map<Category>(item));
        }
        public async Task Put(long id,CategoryDto item)
        {
            throw new NotImplementedException();
        }
        public async Task UpDate(long id, CategoryDto entity)
        {
            throw new NotImplementedException();
        }
      

       
    }
}
