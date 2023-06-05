using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Notes.Data;
using Notes.Data.Account;
using Notes.Data.Authentication;
using Notes.Models;
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
            int userId = this.User.GetUserId();
            return notesContext.Notes.Where(i=>i.CreatedBy==userId).OrderByDescending(i=>i.CreatedOn).ToList();
        }

        [HttpPost]
        public async Task<JsonResult> Post(object obj)
        {
            var message = new ResponseMessage();
            try
            {
                Note note= JsonConvert.DeserializeObject<Note>(obj.ToString());
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
                    int userId = this.User.GetUserId();
                    note.UpdatedOn = DateTime.Now;
                    var dbNote = await notesContext.Notes.FindAsync(note.NoteId);
                    if(dbNote== null)
                    {
                        note.CreatedBy=userId;
                        note.CreatedOn = DateTime.Now;
                        await notesContext.Notes.AddAsync(note);
                    }
                    else
                    {
                        if (dbNote.Content != note.Content)
                        {
                            dbNote.Content = note.Content;
                            dbNote.UpdatedOn = note.UpdatedOn;
                        }
                    }
                    await notesContext.SaveChangesAsync();
                    message.Data = note;
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
