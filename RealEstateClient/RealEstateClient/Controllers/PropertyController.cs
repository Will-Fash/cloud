using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RealEstateClient.Controllers
{
    public class PropertyController : Controller
    {
        // GET: Property
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Submit()
        {
            return View();
        }

        public ActionResult Mine()
        {
            return View();
        }

        public ActionResult Details(int id)
        {
            return View();  
        }

        public ActionResult Search()
        {
            return View();
        }
    }
}