using ITfoxtec.Identity.Saml2.Schemas;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Notes.Data;
using Notes.Data.Account;
using Notes.Models;
using Notes.Models.Notes;
using NuGet.Packaging;

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
        public IEnumerable<TagDto> Get()
        {
            var userId = this.User.GetUserId();
            return notesContext
                .Tags
                .Include(i=>i.NoteTags).ThenInclude(i=>i.Note).DefaultIfEmpty()
                .Where(i=>i.UserId==userId)
                .GetTagDtos();
        }

        [HttpGet]
        [Route("[action]")]
        public bool CheckTag(int id,string tagName)
        {
            var userId = this.User.GetUserId();
            return notesContext.Tags.Any(i => i.TagId != id && i.UserId==userId && i.TagName.Trim() == tagName.Trim());
        }

        [HttpDelete("{tagId}")]
        public async Task<JsonResult> Delete(int tagId)
        {
            var message = new ResponseMessage();
            try
            {
                var userId = this.User.GetUserId();
                var tag = await notesContext.Tags.FindAsync(tagId);
                if (tag != null)
                {
                    var noteTags = notesContext.NoteTags.Where(i => i.TagId == tagId);
                    notesContext.NoteTags.RemoveRange(noteTags);
                    notesContext.Tags.Remove(tag);
                    notesContext.SaveChanges();
                }
                message.Message = "Tag deleted successfully";
                message.Data= notesContext.Notes
                            .Include(i => i.NoteTags).ThenInclude(i => i.Tag).DefaultIfEmpty()
                            .Where(i => i.UserId == userId)
                            .OrderByDescending(i => i.CreatedOn)
                            .GetNoteDtos();
            }
            catch (Exception ex)
            {
                message.Message = ex.Message;
                message.StatusCode = ResponseStatus.EXCEPTION;
            }
            return new JsonResult(message);
        }

        [HttpPost]
        public async Task<JsonResult> Post(object obj)
        {
            var message = new ResponseMessage();
            try
            {
                var userId = this.User.GetUserId();
                var tag = JsonConvert.DeserializeObject<TagDto>(obj.ToString()).GetTag();
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
                    var dbTag = await notesContext.Tags.Include(i => i.NoteTags).FirstOrDefaultAsync(i=>i.TagId==tag.TagId);
                    if(dbTag == null)
                    {
                        dbTag = new Tag();
                        dbTag.UserId = userId;
                        dbTag.CreatedOn = DateTime.Now;
                        notesContext.Tags.Add(dbTag);
                    }
                    dbTag.TagName = tag.TagName;
                    dbTag.UpdatedOn = DateTime.Now;
                    if (!Enumerable.SequenceEqual(dbTag.NoteTagIds, tag.NoteTagIds))
                    {
                        dbTag.NoteTags.AddRange(tag.NoteTagIds.Except(dbTag.NoteTagIds).Select(id => new NoteTag()
                        {
                            NoteId = id,
                            TagId = tag.TagId,
                            CreatedOn= DateTime.Now,
                            UpdatedOn=DateTime.Now
                        }));

                        var deletedTags = dbTag.NoteTagIds.Except(tag.NoteTagIds);
                        notesContext.NoteTags.RemoveRange(notesContext.NoteTags
                                                        .Where(i => i.TagId == tag.TagId
                                                                && deletedTags.Contains(i.NoteId)
                                                                )
                                                        );
                    }
                    notesContext.SaveChanges();
                    tag= notesContext
                            .Tags
                            .Include(i => i.NoteTags).ThenInclude(i => i.Note).DefaultIfEmpty()
                            .FirstOrDefault(i => i.UserId == userId && i.TagId==dbTag.TagId);

                    var notes= notesContext.Notes
                            .Include(i => i.NoteTags).ThenInclude(i => i.Tag).DefaultIfEmpty()
                            .Where(i => i.UserId == userId)
                            .OrderByDescending(i => i.CreatedOn)
                            .GetNoteDtos();
                    message.Data = new
                    {
                        Tag = tag.GetTagDto(),
                        Notes = notes
                    };
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
