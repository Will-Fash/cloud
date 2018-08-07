namespace RealEstateServer.Models
{
    using CloudinaryDotNet;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class PropertyPicture
    {
        public int Id { get; set; }

        public int Property_Id { get; set; }

        [Required(ErrorMessage = "Picture url is required")]
        public string Picture { get; set; }

        public string ImageUrl
        {
            get
            {
                Account account = new Account(
                                           "dccu6pltu",
                                           "975631646198294",
                                           "h1mOupM3yYluAY-KZB5G7ykTNo0");

                Cloudinary cloudinary = new Cloudinary(account);
                return cloudinary.GetResource(Picture).Url;
            }
        }
    }
}
