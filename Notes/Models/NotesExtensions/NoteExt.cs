using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace Notes.Models.Notes
{
    [ModelMetadataType(typeof(NoteMetaData))]
    public partial class Note
    {
        [NotMapped]
        public string CreatedDate
        {
            get
            {
                return CreatedOn.ToString("MM/dd/yyyy");
            }
            set
            {
                CreatedOn = DateTime.ParseExact(value,"MM/dd/yyyy",CultureInfo.InvariantCulture);
            }
        }

        [NotMapped]
        public string UpdatedDate
        {
            get
            {
                return UpdatedOn.ToString("MM/dd/yyyy");
            }
            set
            {
                UpdatedOn = DateTime.ParseExact(value, "MM/dd/yyyy", CultureInfo.InvariantCulture);
            }
        }
    }

    public partial class NoteMetaData
    {

    }

}
