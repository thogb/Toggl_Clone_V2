using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace TogglTrackCloneApi.Controllers
{
    [Route("api/Auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("Register")]
        public ActionResult<AuthUser> Register(AuthUser user)
        {
            user.UserName = CreateToken(user);

            Response.Cookies.Append("jwt", user.UserName, new CookieOptions { HttpOnly = true });

            return Ok(new
            {
                user.UserName
            });
        }

        [HttpPost("Login")]
        public ActionResult<AuthUser> Login(AuthUser user)
        {
            return Ok(user);
        }

        private string CreateToken(AuthUser request)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, request.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JWTSettings:Key").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.UtcNow.AddYears(1),
                    signingCredentials: creds);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
