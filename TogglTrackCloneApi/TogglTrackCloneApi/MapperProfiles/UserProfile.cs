using AutoMapper;
using TogglTrackCloneApi.DTOs.User;
using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.MapperProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile() {
            this.CreateMap<UserAuthDTO, User>()
                .AfterMap((ua, user) => user.Name = ua.Email.Split("@")[0]);
            this.CreateMap<User, UserAuthResponseDTO>();
         /*       .ForMember(uar => uar.id, o => o.MapFrom(u => u.UserId));*/
        }
    }
}
