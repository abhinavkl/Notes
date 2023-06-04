using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Win32;
using Newtonsoft.Json;
using Notes.Data;
using Notes.Data.Account;
using Notes.Data.Authentication;
using Notes.Models;
using System.Security.Claims;

namespace Notes.Controllers.Auth
{
    [Route("[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly IConfiguration configuration;

        public RegisterController(UserManager<User> userManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.configuration = configuration;
        }

        [HttpGet]
        public bool Get(string email = "")
        {
            email = !string.IsNullOrWhiteSpace(email) ? email.ToLower() : "";
            return userManager.Users.Any(i => i.Email.Equals(email));
        }

        [HttpPost]
        public async Task<IActionResult> Post(object obj)
        {
            ResponseMessage message = new ResponseMessage();
            try
            {
                var register = JsonConvert.DeserializeObject<Register>(obj.ToString());

                if (!ModelState.IsValid)
                {
                    message.Message = string.Join("; ", ModelState.Values
                                            .SelectMany(x => x.Errors)
                                            .Select(x => x.ErrorMessage));
                    message.StatusCode = ResponseStatus.ERROR;
                    return new JsonResult(message);
                }
                else
                {
                    var userId = userManager.Users.Any() ? userManager.Users.Select(i => i.UserId).Max(i => i + 1) : 1;
                    var user = new User()
                    {
                        UserName = register.Email,
                        Email = register.Email,
                        EmailConfirmed = true,
                        FirstName = register.FirstName,
                        LastName = register.LastName,
                        UserId = userId
                    };

                    var result = await userManager.CreateAsync(user, register.Password);

                    if (result.Succeeded)
                    {
                        var claims = new List<Claim>()
                        {
                            new Claim("FirstName", register.FirstName),
                            new Claim("LastName", register.LastName),
                            new Claim("FullName", register.FirstName + " " + register.LastName),
                            new Claim("Email",register.Email),
                            new Claim("Id",user.Id.ToString()),
                            new Claim("UserId",userId.ToString())
                        };

                        claims.Add(new Claim("Authenticated", "true"));

                        await userManager.AddClaimsAsync(user, claims);

                        message.Message = "Registration successful." + Environment.NewLine + "You will be redirected to Login Page.";
                        message.StatusCode = ResponseStatus.SUCCESS;
                    }
                    else
                    {
                        foreach (var error in result.Errors)
                        {
                            message.Message += error.Description + Environment.NewLine;
                        }
                        message.StatusCode = ResponseStatus.ERROR;
                    }
                }
            }
            catch (Exception ex)
            {
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }
    }
}
