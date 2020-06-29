using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;

namespace SchoolApi.Utility
{
    public class SMS
    {
        public bool IsSMSEnable { get; set; }
        public string Host { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public string Senderid { get; set; }
        public string Channel { get; set; }
        public static async Task<string> SendSMSApi(string Text, string Number)
        {
#if DEBUG
            Number = "8800224410";
#endif
            bool IsSMSEnable = Convert.ToBoolean(System.Configuration.ConfigurationManager.AppSettings["IsSMSEnable"]);
            string Host = System.Configuration.ConfigurationManager.AppSettings["SMSApiHost"].ToString();
            string User = System.Configuration.ConfigurationManager.AppSettings["SMSApiUser"].ToString();
            string Password = System.Configuration.ConfigurationManager.AppSettings["SMSApiPassword"].ToString();
            string Senderid = System.Configuration.ConfigurationManager.AppSettings["SMSApiSenderid"].ToString();
            string Channel = System.Configuration.ConfigurationManager.AppSettings["SMSApiChannel"].ToString();

            if (!IsSMSEnable)
            {
                return "SMS Service not enabled.";
            }
            string msg = $"{Host}api/mt/SendSMS?user={User}&password={Password}&senderid={Senderid}&channel={Channel}&DCS=0&flashsms=0&number={Number}&text={Text}";
          //  string msg = Host + "/api/mt/SendSMS?user=" + User + "&password=" + Password + "&senderid=TSOULS&channel=trans&DCS=0&flashsms=0&number=" + Number + "&text=" + Text + "&route=17";
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(Host);

            // Add an Accept header for JSON format.
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response =await client.GetAsync(msg);

            if (response.IsSuccessStatusCode)
            {
                return "SMS Sent";
            }
            else
            {
                return "SMS Failed";
            }
        }
    }
}