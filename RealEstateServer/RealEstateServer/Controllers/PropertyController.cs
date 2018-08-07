using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using RealEstateServer.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace RealEstateServer.Controllers
{
    public class PropertyController : ApiController
    {
        PropertyBindingModels db = new PropertyBindingModels();

        [HttpGet]
        [Route("api/Property")]
        public object Index(int id)
        {
            UserManager<ApplicationUser> manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

            Dictionary<string, object> result = new Dictionary<string, object>();
            Property property = db.Properties.Find(id);
            result["Property"] = property;
            result["Pictures"] = db.PropertyPictures.Where(i => i.Property_Id == id);
            ApplicationUser user = manager.Users.Where(i => i.Id == property.Agent_Id).First();
            result["Agent"] = new Dictionary<string, string> { {"Username", user.UserName }, { "Email", user.Email }, { "Phone", user.PhoneNumber }, { "Description", user.Description } };

            return Json(result);
        }

        [HttpGet]
        [Route("api/Property/All")]
        public List<Property> All()
        {
            return db.Properties.ToList();
        }

        [HttpGet]
        [Route("api/Property/Latest")]
        public IEnumerable<Property> Latest()
        {
            return db.Properties.OrderByDescending(i => i.Posted_At).Take(10).ToList();
        }

        [HttpGet]
        [Route("api/Property/Featured")]
        public IEnumerable<Property> Featured()
        {
            return db.Properties.Where(i => i.Featured_At != null).OrderByDescending(i => i.Featured_At).Take(5).ToList();
        }

        [HttpPost]
        [Route("api/Property/Submit")]
        public IHttpActionResult Submit(Property property)
        {
            try
            {
                if (!User.Identity.IsAuthenticated)
                    return Unauthorized();

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                UserManager<ApplicationUser> manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

                property.Posted_At = DateTime.Now;
                property.Agent_Id = manager.Users.Where(i => i.UserName == property.Agent_Id).FirstOrDefault().Id;

                db.Properties.Add(property);
                db.SaveChanges();

                return Ok("Yes");
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message); 
            }
        }

        [HttpPost]
        [Route("api/Property/UploadPicture")]
        public IHttpActionResult UploadPicture()
        {
            var file = HttpContext.Current.Request.Files.Count > 0 ?
                            HttpContext.Current.Request.Files[0] : null;

            if (file != null && file.ContentLength > 0)
                try
                {
                    Account account = new Account(
                                        "dccu6pltu",
                                        "975631646198294",
                                        "h1mOupM3yYluAY-KZB5G7ykTNo0");

                    Cloudinary cloudinary = new Cloudinary(account);
                    
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.FileName, file.InputStream)
                    };
                    var uploadResult = cloudinary.Upload(uploadParams);
                    return Ok(uploadResult.PublicId);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/Property/ForUser")]
        public List<Property> ForUser(string username)
        {
            UserManager<ApplicationUser> manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            ApplicationUser user = manager.Users.Where(i => i.UserName == username).First();

            return db.Properties.Where(i => i.Agent_Id == user.Id).ToList();
        }

        [HttpPost]
        [Route("api/Property/Delete")]
        public IHttpActionResult Delete(int id)
        {
            Property property = db.Properties.Find(id);
            if (property != null)
            {
                if (User.Identity.GetUserId() == property.Agent_Id)
                {
                    db.Properties.Remove(property);
                    db.SaveChanges();
                    return Ok();
                }
                else
                    return Unauthorized();
            }
            else
                return NotFound();
        }

        [HttpPost]
        [Route("api/Property/Search")]
        public object Search(PropertySearchModel search)
        {
            List<Property> properties = db.Properties.ToList();
            if (search.Keyword != null)
                properties = properties.Where(i => i.Title.Contains(search.Keyword)).ToList();

            if (search.Province != null)
                properties = properties.Where(i => i.Province.ToLower() == search.Province.ToLower()).ToList();

            if (search.Status != null)
                properties = properties.Where(i => i.Status.ToLower() == search.Status.ToLower()).ToList();

            if (search.MinBeds != null)
                properties = properties.Where(i => i.Bedrooms >= search.MinBeds).ToList();

            if (search.MaxBeds != null)
                properties = properties.Where(i => i.Bedrooms <= search.MaxBeds).ToList();

            if (search.MinBaths != null)
                properties = properties.Where(i => i.Bathrooms >= search.MinBaths).ToList();

            if (search.MaxBaths != null)
                properties = properties.Where(i => i.Bathrooms <= search.MaxBaths).ToList();

            if (search.MinArea != null)
                properties = properties.Where(i => i.Size >= search.MinArea).ToList();

            if (search.MaxArea != null)
                properties = properties.Where(i => i.Size <= search.MaxArea).ToList();

            if (search.MinPrice != null)
                properties = properties.Where(i => i.Price >= search.MinPrice).ToList();

            if (search.MaxPrice != null)
                properties = properties.Where(i => i.Price <= search.MaxPrice).ToList();

            return properties;
        }
    }
}
