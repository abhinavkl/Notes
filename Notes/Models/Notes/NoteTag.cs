using System;
using System.Collections.Generic;

namespace Notes.Models.Notes
{
    public partial class NoteTag
    {
        public int NoteTagId { get; set; }
        public int TagId { get; set; }
        public int NoteId { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public virtual Note Note { get; set; }
        public virtual Tag Tag { get; set; }
    }
}
