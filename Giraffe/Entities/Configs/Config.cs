namespace Giraffe.Entities.Configs
{
    public class Config
    {
        public int? bind_port { get; set; }
        public int AppId { get; set; }
        public string AppKey { get; set; }
        public string? send_to { get; set; }
        public string? smtp_server { get; set; }
        public int smtp_port { get; set; }
        public string? mail_user { get; set; }
        public string? mail_password { get; set; }
    }
}
