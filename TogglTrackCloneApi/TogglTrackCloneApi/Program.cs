using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Writers;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Reflection;
using System.Text;
using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Filters;
using TogglTrackCloneApi.Helper;
using TogglTrackCloneApi.Repositories;
using TogglTrackCloneApi.Repositories.IRepositories;
using TogglTrackCloneApi.Services;
using TogglTrackCloneApi.Services.IServices;
using TogglTrackCloneApi.Swagger;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Add services to the container.

string? jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,
            ValidateIssuer = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey ?? config.GetSection("JWTSettings:Key").Value))
        };
    });
/*    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme,
        options => builder.Configuration.Bind("JwtSettings", options))*/
/*    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme,
        options => builder.Configuration.Bind("CookieSettings", options));*/
builder.Services.AddAuthorization();

builder.Services.AddCors();

builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

builder.Services.AddControllers(
    options =>
    {
        options.Filters.Add<ApiExceptionFilter>();
    })
    .AddNewtonsoftJson();

var provider = config.GetValue("Provider", string.Empty);

if (provider == string.Empty)
{
    if (builder.Environment.IsDevelopment())
    {
        provider = "SqlServer";
    }
    else
    {
        provider = "Npgsql";
    }
}

Console.WriteLine(provider);

if (provider == "SqlServer")
{
    builder.Services.AddDbContext<TTCloneContext>();
}
else if (provider == "Npgsql")
{
    builder.Services.AddDbContext<TTCloneContext, TTCloneContextProd>();
}
else
{
    throw new Exception("Unsupported database type.");
}
/*builder.Services.AddDbContext<TTCloneContext>();*/


// Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITagRepository, TagRepository>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<ITimeEntryRepository, TimeEntryRepository>();
builder.Services.AddScoped<ITimeEntryTagRepository, TimeEntryTagRepository>();
builder.Services.AddScoped<IWorkspaceRepository, WorkspaceRepository>();
builder.Services.AddScoped<IWorkspaceUserRepository, WorkspaceUserRepository>();
builder.Services.AddScoped<IOrganisationRepository, OrganisationRepository>();
builder.Services.AddScoped<IOrganisationUsersRepository, OrganisationUserRepository>();

// Services
builder.Services.AddScoped<IOrganisationService, OrganisationService>();
builder.Services.AddScoped<IWorkspaceService, WorkspaceService>();
builder.Services.AddScoped<ITimeEntryService, TimeEntryService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IUserServices, UserServices>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (app.Environment.IsProduction())
{
    var scope = app.Services.CreateScope();
    await DataHelper.ManageDataAsync(scope.ServiceProvider);
}

app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    app.UseCors(options => options
        .SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
} else
{
      app.UseCors(options => options
        .SetIsOriginAllowed(origin => new Uri(origin).Host == "ttcloneapp.netlify.app")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());

}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
