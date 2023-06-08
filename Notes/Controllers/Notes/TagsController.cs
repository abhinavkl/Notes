using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notes.Data;
using Notes.Data.Account;
using Notes.Models.Notes;

namespace Notes.Controllers.Notes
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly Microsoft.AspNetCore.Identity.SignInManager<User> signInManager;
        private readonly NotesContext notesContext;
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> userManager;
        private readonly IConfiguration configuration;

        public TagsController(SignInManager<User> signInManager, NotesContext notesContext, UserManager<User> userManager, IConfiguration configuration)
        {
            this.signInManager = signInManager;
            this.notesContext = notesContext;
            this.userManager = userManager;
            this.configuration = configuration;
        }

        [HttpGet]
        public async Task<IEnumerable<Tag>> Get()
        {
            var userId = this.User.GetUserId();
            return await notesContext
                .Tags.Where(i=>i.UserId==userId).ToListAsync();
        }

    }
}
