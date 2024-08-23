using MimeKit;
using MailKit.Net.Smtp;

namespace Giraffe.Services
{
    public static class MailService
    {
        public static async Task NewMail(string text, string subject)
        {

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Giraffe", Configurator.config.mail_user));
            message.To.Add(new MailboxAddress("Giraffe Administrator", Configurator.config.send_to));
            message.Subject = subject;
            message.Body = new TextPart("html")
            {
                Text = text,
            };

            using var client = new SmtpClient();
            client.Connect(Configurator.config.smtp_server, Configurator.config.smtp_port, true);
            client.Authenticate(Configurator.config.mail_user, Configurator.config.mail_password);

            await client.SendAsync(message);
            client.Disconnect(true);
        }
    }
}
