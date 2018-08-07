namespace RealEstateServer.Models
{
    using CloudinaryDotNet;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Property
    {
        public int Id { get; set; }

        [Display(Name = "Property's title")]
        [Required(ErrorMessage = "{0} is required")]
        [StringLength(50, ErrorMessage = "{0} cannot be more than 50 characters")]
        public string Title { get; set; }

        [Display(Name = "Street name and block number")]
        [Required(ErrorMessage = "{0} is required")]
        [StringLength(50, ErrorMessage = "{0} cannot be more than 50 characters")]
        public string Street { get; set; }

        [Display(Name = "City")]
        [Required(ErrorMessage = "{0} is required")]
        [StringLength(50, ErrorMessage = "{0} cannot be more than 50 characters")]
        public string City { get; set; }

        [Display(Name = "Province")]
        [Required(ErrorMessage = "{0} is required")]
        [StringLength(50, ErrorMessage = "{0} cannot be more than 50 characters")]
        public string Province { get; set; }
        
        [Display(Name = "Status")]
        [Required(ErrorMessage = "{0} is required")]
        [StringLength(10, ErrorMessage = "{0} cannot be more than 10 characters")]
        public string Status { get; set; }
        
        [Display(Name = "Property's size")]
        [Required(ErrorMessage = "{0} is required")]
        public decimal? Size { get; set; }
        
        [Display(Name ="Number of bedrooms")]
        [Required(ErrorMessage = "{0} is required")]
        public int? Bedrooms { get; set; }
        
        [Display(Name ="Number of bathrooms")]
        [Required(ErrorMessage = "{0} is required")]
        public int? Bathrooms { get; set; }

        [Display(Name ="Property's description")]
        [Required(ErrorMessage = "{0} is required")]
        public string Description { get; set; }
        
        public string Features { get; set; }
        
        [Display(Name ="Preview image")]
        [Required(ErrorMessage = "{0} is required")]
        public string Preview { get; set; }
        
        public string Agent_Id { get; set; }
        
        [Display(Name ="Property's price")]
        [Required(ErrorMessage = "{0} is required")]
        public decimal? Price { get; set; }
        
        public DateTime Posted_At { get; set; }

        public Boolean Is_Expired { get; set; }

        public DateTime? Featured_At { get; set; }

        [ForeignKey("Property_Id")]
        public List<PropertyPicture> Pictures { get; set; }

        public string PreviewUrl
        {
            get
            {
                Account account = new Account(
                                           "dccu6pltu",
                                           "975631646198294",
                                           "h1mOupM3yYluAY-KZB5G7ykTNo0");

                Cloudinary cloudinary = new Cloudinary(account);
                return cloudinary.GetResource(Preview).Url;
            }
        }
    }
}
