using AutoMapper;
using Common.Dto;
using Microsoft.AspNetCore.Http;


using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Formats.Asn1.AsnWriter;

namespace Service
{
    class MapperProfile : Profile
    {

        public MapperProfile()
        {
           // CreateMap<User, UserDto>()
            //    .ForMember(dest => dest.Img, opt => opt.Ignore());
            // Ignore the property during mapping
               
            //});
            CreateMap<Question,QuestionDto>().ReverseMap();
            CreateMap<Category,CategoryDto>().ReverseMap();
            CreateMap<Answer, AnswerDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserShortenedDto>().ReverseMap();
            CreateMap<UserRatings, UserRatingsDto>().ReverseMap();
           
        }

    }
}
