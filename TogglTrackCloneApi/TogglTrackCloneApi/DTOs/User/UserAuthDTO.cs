using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.DTOs.User
{
    public class UserAuthDTO
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        [StringLength(72, MinimumLength = 8, ErrorMessage = "Must be between 8 and 72")]
        [RegularExpression(".*[a-z].*[A-Z].*[0-9].*", ErrorMessage = "Incorrect password format")]
        public string Password { get; set; }
    }
}
