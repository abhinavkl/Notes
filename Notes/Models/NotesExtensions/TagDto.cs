using System.ComponentModel.DataAnnotations.Schema;

namespace Notes.Models.Notes
{
    public partial class Tag
    {
        [NotMapped]
        public List<int> NoteTagIds
        {
            get
            {
                return NoteTags.Select(i=>i.NoteId).ToList();
            }
            set 
            {
                NoteTags = value.Select(i => new NoteTag()
                {
                    NoteId=i,
                    TagId=TagId
                }).ToList();
            }
        }
    }

    public static partial class TagMetaData
    {
        public static IEnumerable<TagDto> GetTagDtos(this IQueryable<Tag> tags)
        {
            return tags.Select(tag => new TagDto()
            {
                TagId = tag.TagId,
                TagName = tag.TagName,
                UserId = tag.UserId,
                NoteTags = tag.NoteTags.Select(i => new NoteTagDto()
                {
                    TagId = i.TagId,
                    NoteId = i.NoteId,
                    NoteTagId = i.NoteTagId,
                    Note = new NoteDto()
                    {
                        NoteId = i.NoteId,
                        Body=i.Note.Body,
                        CreatedOn=i.Note.CreatedOn,
                        Description=i.Note.Description,
                        UpdatedOn=i.Note.UpdatedOn,
                        UserId=i.Note.UserId
                    }
                }).ToList()
            });
        }

        public static Tag GetTag(this TagDto tagDto)
        {
            return new Tag()
            {
                TagId = tagDto.TagId,
                TagName = tagDto.TagName,
                UserId = tagDto.UserId,
                NoteTags = tagDto.NoteTagIds.Select(i => new NoteTag()
                {
                    NoteId = i,
                    TagId = tagDto.TagId
                }).ToList()
            };
        }

        public static TagDto GetTagDto(this Tag tag)
        {
            return new TagDto()
            {
                TagId = tag.TagId,
                TagName = tag.TagName,
                UserId = tag.UserId,
                NoteTags = tag.NoteTags.Select(i => new NoteTagDto()
                {
                    TagId = i.TagId,
                    NoteId = i.NoteId,
                    NoteTagId = i.NoteTagId,
                    Note = new NoteDto()
                    {
                        NoteId = i.NoteId,
                        Body = i.Note.Body,
                        CreatedOn = i.Note.CreatedOn,
                        Description = i.Note.Description,
                        UpdatedOn = i.Note.UpdatedOn,
                        UserId = i.Note.UserId
                    }
                }).ToList()
            };
        }


    }

    public class TagDto
    {
        public int TagId { get; set; }
        public string TagName { get; set; }
        public int UserId { get; set; }
        public List<NoteTagDto> NoteTags { get; set; }
        public List<int> NoteTagIds { get; set; }
    }
}
