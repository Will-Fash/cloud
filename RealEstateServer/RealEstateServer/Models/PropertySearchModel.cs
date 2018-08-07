using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RealEstateServer.Models
{
    public class PropertySearchModel
    {
        public string Keyword { get; set; }

        public string Province { get; set; }

        public string Status { get; set; }

        public int? MinBeds { get; set; }

        public int? MaxBeds { get; set; }

        public int? MinBaths { get; set; }

        public int? MaxBaths { get; set; }

        public int? MinArea { get; set; }

        public int? MaxArea { get; set; }

        public int? MinPrice { get; set; }

        public int? MaxPrice { get; set; }
    }
}