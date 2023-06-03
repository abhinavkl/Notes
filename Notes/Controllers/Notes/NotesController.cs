using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Notes.Data.Account;
using Notes.Models.Notes;

namespace Notes.Controllers.Notes
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly Microsoft.AspNetCore.Identity.SignInManager<User> signInManager;
        private readonly NotesContext notesContext;
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> userManager;
        private readonly IConfiguration configuration;
        public NotesController(
            IConfiguration configuration, 
            Microsoft.AspNetCore.Identity.UserManager<User> userManager, 
            Microsoft.AspNetCore.Identity.SignInManager<User> signInManager,
            NotesContext notesContext)
        {
            this.configuration = configuration;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.notesContext = notesContext;
        }

        [HttpGet]
        public IEnumerable<Note> Get()
        {
            return notesContext.Notes.OrderByDescending(i=>i.CreatedOn).ToList();
        }
    }
}
