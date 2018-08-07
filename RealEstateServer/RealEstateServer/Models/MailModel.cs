using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RealEstateServer.Models
{
    public class MailModel
    {
        [Required(ErrorMessage = "Full name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email address is required")]
        public string Email { get; set; }
        
        public string Phone { get; set; }

        [Required(ErrorMessage = "Message is required")]
        public string Message { get; set; }

        public int? Property { get; set; }
    }
}