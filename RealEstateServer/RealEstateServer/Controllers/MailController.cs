using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using RealEstateServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;

namespace RealEstateServer.Controllers
{
    public class MailController : ApiController
    {
        private void SendMail(string receiver, string title, MailModel mail)
        {
            SmtpClient client = new SmtpClient();
            client.Host = "smtp.gmail.com";
            client.Port = 587;
            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential("chinedumsam@gmail.com", "Chris111");
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("chinedumsam@gmail.com", "Sam Chinedum");
            mailMessage.To.Add(new MailAddress(receiver));
            mailMessage.Subject = title;
            mailMessage.Body = title + " <br><br>Name: " + mail.Name + "<br>Email: " + mail.Email + "<br>Phone: " + mail.Phone + "<br>Message: " + mail.Message;
            mailMessage.IsBodyHtml = true;
            
            client.Send(mailMessage);
        }

        [HttpPost]
        [Route("api/Mail/Contact")]
        public IHttpActionResult Contact(MailModel mail)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                SendMail("chinedumsam@gmail.com", "NEW CONTACT FORM MESSAGE", mail);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("api/Mail/ContactAgent")]
        public IHttpActionResult ContactAgent(MailModel mail)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                Property property = new PropertyBindingModels().Properties.Find(mail.Property);

                UserManager<ApplicationUser> manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
                ApplicationUser user = manager.Users.Where(i => i.Id == property.Agent_Id).First();

                SendMail(user.Email, "A new inquiry about your property " + property.Title + " located at " + property.Street + ", " + property.City + ", " + property.Province, mail);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}
