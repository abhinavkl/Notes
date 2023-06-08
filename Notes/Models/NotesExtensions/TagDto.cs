namespace Notes.Models.NotesExtensions
{
    public class TagDto
    {
        public int TagId { get; set; }
        public string TagName { get; set; }
        public int UserId { get; set; }
        public List<NoteTagDto> NoteTags { get; set; }
    }
}
