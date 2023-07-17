using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.DTOs.Tag
{
    public class TagDTO
    {
        [Required]
        [StringLength(32, MinimumLength = 1)]
        public string Name { get; set; }
    }
}

/*eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ1c2VyQGV4YW1wbGUuY29tIiwiZXhwIjoxNjkwMTcwNTQ5fQ.GWLWuPdivbjkJkURMpdcVNSW7LuMGlUvlF0ccSdHB28*/