using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Notes.Data;
using Notes.Data.Account;
using Notes.Data.Authentication;
using Notes.Models;
using Notes.Models.Notes;
using NuGet.Packaging;

namespace Notes.Controllers.Notes
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
        public IQueryable<NoteDto> Get()
        {
            int userId = this.User.GetUserId();
            return notesContext.Notes
                .Include(i=>i.NoteTags).ThenInclude(i=>i.Tag)
                .Where(i => i.UserId == userId)
                .OrderByDescending(i => i.CreatedOn)
                .GetNoteDtos();
        }

        [HttpPost]
        public async Task<JsonResult> Post(object obj)
        {
            var message = new ResponseMessage();
            try
            {
                Note note = JsonConvert.DeserializeObject<NoteDto>(obj.ToString()).GetNote();
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
                    var dbNote = await notesContext.Notes
                        .Include(i=>i.NoteTags).ThenInclude(i=>i.Tag)
                        .Where(i=>i.NoteId==note.NoteId).FirstOrDefaultAsync();
                    if (dbNote == null)
                    {
                        note.UserId = userId;
                        note.CreatedOn = DateTime.Now;
                        await notesContext.Notes.AddAsync(note);
                    }
                    else
                    {
                        if (dbNote.Body != note.Body)
                        {
                            dbNote.Body = note.Body;
                        }
                        if(!Enumerable.SequenceEqual(dbNote.NoteTagIds, note.NoteTagIds))
                        {
                            dbNote.NoteTags.AddRange(note.NoteTagIds.Except(dbNote.NoteTagIds).Select(id=> new NoteTag()
                            {
                                NoteId=note.NoteId,
                                TagId=id
                            }));

                            var deletedTags = dbNote.NoteTagIds.Except(note.NoteTagIds);
                            notesContext.NoteTags.RemoveRange(notesContext.NoteTags.Where(i=> i.NoteId==note.NoteId && deletedTags.Contains(i.TagId)));
                        }
                        dbNote.UpdatedOn = note.UpdatedOn;
                    }
                    await notesContext.SaveChangesAsync();
                    note = notesContext.Notes
                        .Include(i => i.NoteTags).ThenInclude(i => i.Tag)
                        .FirstOrDefault(i => i.NoteId == note.NoteId);
                    message.Data = note.GetNoteDto();
                }
            }
            catch (Exception ex)
            {
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }


        [HttpDelete("{noteId}")]
        public async Task<JsonResult> Delete(int noteId)
        {
            var message = new ResponseMessage();
            try
            {
                var note = await notesContext.Notes.FindAsync(noteId);
                if (note != null)
                {
                    notesContext.Notes.Remove(note);
                    notesContext.SaveChanges();
                }
                message.Message = "Note deleted successfully";
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
