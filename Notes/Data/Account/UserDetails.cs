using Notes.Models.Notes;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Flurl.Util;

namespace Notes.Data.Account
{
    public class UserDetails
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string UserId { get; set; }
        public List<string> Claims { get; set; } = new();
        public List<string> Roles { get; set; } = new();
        public static UserDetails GetDetails(IEnumerable<Claim> claims)
        {
            var claimtypes = claims.Select(i=>i.Type).ToList();
            return new UserDetails()
            {
                FirstName=claims.FirstOrDefault(i=>i.Type=="FirstName")?.Value,
                LastName= claims.FirstOrDefault(i => i.Type == "LastName")?.Value,
                FullName= claims.FirstOrDefault(i => i.Type == "FullName")?.Value,
                Email= claims.FirstOrDefault(i => i.Type == "Email")?.Value,
                UserId= claims.FirstOrDefault(i => i.Type == "UserId")?.Value,
                Claims=claimtypes
            };
        }
    }
}
