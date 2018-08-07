using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Newtonsoft.Json;
using RealEstateServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RealEstateServer.Controllers
{
    public class AgentsController : ApiController
    {
        [HttpGet]
        [Route("api/Agents")]
        public IHttpActionResult Index()
        {
            UserManager<ApplicationUser> manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            List<Dictionary<string, string>> users = new List<Dictionary<string, string>>();
            foreach(ApplicationUser user in manager.Users.ToList())
            {
                users.Add(new Dictionary<string, string>()
                {
                    {"Username", user.UserName },
                    {"Email", user.Email },
                    {"Phone", user.PhoneNumber },
                    {"Description", user.Description }
                });
            }

            return Json(users);
        }
    }
}
