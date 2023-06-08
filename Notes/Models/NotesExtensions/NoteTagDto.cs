using Notes.Models.Notes;

namespace Notes.Models.NotesExtensions
{
    public class NoteTagDto
    {
        public int NoteTagId { get; set; }
        public int TagId { get; set; }
        public int NoteId { get; set; }
        public NoteDto Note { get; set; }
        public TagDto Tag { get; set; }
    }
}
