using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Notes.Models.NotesExtensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace Notes.Models.Notes
{
    public partial class Note
    {
        [NotMapped]
        public List<int> NoteTagIds
        {
            get
            {
                return NoteTags != null ? NoteTags.Select(i => i.TagId).ToList() : new List<int>();
            }
            set 
            {
                NoteTags=value.Select(i=> new NoteTag()
                {
                    TagId = i,
                    NoteId=NoteId
                }).ToList();
            }
        }
    }

    public static class NoteMetaData
    {
        public static Note GetNote(this NoteDto note)
        {
            return new Note()
            {
                NoteId = note.NoteId,
                NoteTagIds = note.NoteTagIds,
                Body = note.Body,
                CreatedOn = note.CreatedOn,
                Description = note.Description,
                UpdatedOn = note.UpdatedOn,
                UserId = note.UserId,
                NoteTags=note.NoteTagIds.Select(i => new NoteTag()
                {
                    TagId = i,
                    NoteId=note.NoteId
                }).ToList()
            };
        }

        public static NoteDto GetNoteDto(this Note note)
        {
            return new NoteDto()
            {
                NoteId = note.NoteId,
                Description = note.Description,
                Body = note.Body,
                CreatedOn = note.CreatedOn,
                UpdatedOn = note.UpdatedOn,
                UserId = note.UserId,
                NoteTagIds = note.NoteTagIds,
                NoteTags = note.NoteTags.Select(i => new NoteTagDto()
                {
                    NoteId = i.NoteId,
                    TagId = i.NoteTagId,
                    NoteTagId = i.NoteTagId,
                    Tag=new TagDto()
                    {
                        TagId=i.TagId,
                        TagName=i.Tag.TagName,
                        UserId=i.Tag.UserId
                    }
                }).ToList()
            };
        }

        public static IQueryable<NoteDto> GetNoteDtos(this IQueryable<Note> notes)
        {
            return notes.Select(note => new NoteDto()
            {
                NoteId = note.NoteId,
                Description = note.Description,
                Body = note.Body,
                CreatedOn = note.CreatedOn,
                UpdatedOn = note.UpdatedOn,
                UserId = note.UserId,
                NoteTagIds = note.NoteTagIds,
                NoteTags = note.NoteTags.Select(i => new NoteTagDto()
                {
                    NoteId = i.NoteId,
                    TagId = i.TagId,
                    NoteTagId = i.NoteTagId,
                    Tag=new TagDto()
                    {
                        TagId=i.TagId,
                        TagName=i.Tag.TagName,
                        UserId=note.UserId
                    }
                }).ToList()
            });
        }
    }

    public partial class NoteDto
    {
        public int NoteId { get; set; }
        public string Description { get; set; }
        public string Body { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UserId { get; set; }
        public List<int> NoteTagIds { get; set; }
        public List<NoteTagDto> NoteTags { get; set; }
    }

}