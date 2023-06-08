using System;
using System.Collections.Generic;

namespace Notes.Models.Notes
{
    public partial class Note
    {
        public Note()
        {
            NoteTags = new HashSet<NoteTag>();
        }

        public int NoteId { get; set; }
        public string Description { get; set; }
        public string Body { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UserId { get; set; }

        public virtual ICollection<NoteTag> NoteTags { get; set; }
    }
}
