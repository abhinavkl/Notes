using System;
using System.Collections.Generic;

namespace Notes.Models.Notes
{
    public partial class Note
    {
        public int NoteId { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int CreatedBy { get; set; }
    }
}
