using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using MyProject.Model;

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        [HttpPost("sendEmail")]
        public async Task<IActionResult> SendEmail([FromBody] EmailModel emailModel)
        {
            try
            {
                // Set up email credentials and server details
                string smtpServer = "smtp.gmail.com";
                int port = 587;
                // string senderEmail = "bytheway933@gmail.com"; // הכנס כאן את כתובת האימייל שלך
                // string senderEmail = "crk246810@gmail.com";                                                // string senderPassword = "iird xfqr oydt rpzq"; // הכנס כאן את הסיסמה של האימייל שלך
                //string senderEmail = "develooops@gmail.com";    
                string senderEmail = "develop.ch.2026@gmail.com";// string senderPassword = "zdzl aysa ibbv oage";
                //string senderPassword = "p l g b o x y c y v h e a o g g";
                string senderPassword = "zlrm dihe vkoi hazn";
                string recipientEmail = emailModel.RecipientEmail; // הכנס כאן את כתובת האימייל של הנמען
                string subject = emailModel.Subject;
                string body = emailModel.Body;

                // Create a new MailMessage object
                MailMessage message = new MailMessage(senderEmail, recipientEmail, subject, body);

                // Set up the SMTP client
                SmtpClient client = new SmtpClient(smtpServer, port);
                client.EnableSsl = true;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(senderEmail, senderPassword);

                // Send the email
                client.Send(message);

                return Ok("Email sent successfully!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error sending email: {ex.Message}");
            }
        }

    }
}
