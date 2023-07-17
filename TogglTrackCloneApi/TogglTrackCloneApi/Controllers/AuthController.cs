using AutoMapper;
using BCrypt.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TogglTrackCloneApi.DTOs.User;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Controllers
{
    [Route("api/Auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public AuthController(IConfiguration configuration, IUserRepository userRepository, IMapper mapper)
        {
            _configuration = configuration;
            this._userRepository = userRepository;
            this._mapper = mapper;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<string>> Register(UserAuthDTO request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                if ((await _userRepository.GetByEmailAsync(request.Email)) != null) return BadRequest("user with this email already exists.");

                User user = _mapper.Map<User>(request);
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
                _userRepository.Add(user);

                if (!(await _userRepository.SaveChangesAsync())) return BadRequest("failed in creating the account.");

                return Ok("Successfully registered account");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Failed");
            }
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserAuthResponseDTO>> Login(UserAuthDTO request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                User? user = await _userRepository.GetByEmailAsync(request.Email);

                if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash)) return BadRequest("Invalid login credentials.");

                UserAuthResponseDTO response = _mapper.Map<UserAuthResponseDTO>(user);
                string token = CreateToken(user.Id, user.Email);
                response.Token = token;
                Response.Cookies.Append("jwt", token, new CookieOptions { HttpOnly = true });

                return Ok(response);

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Failed");
            }
        }

        private string CreateToken(int userId, string email)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Email, email),
            
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JWTSettings:Key").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.UtcNow.AddDays(7),
                    signingCredentials: creds);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
