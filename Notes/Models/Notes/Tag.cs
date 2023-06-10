using System;
using System.Collections.Generic;

namespace Notes.Models.Notes
{
    public partial class Tag
    {
        public Tag()
        {
            NoteTags = new HashSet<NoteTag>();
        }

        public int TagId { get; set; }
        public string TagName { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public virtual ICollection<NoteTag> NoteTags { get; set; }
    }
}
