using SchoolApi.BAL;
using SchoolApi.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication1.Controllers
{
    public class SMSController : Controller
    {
        [HttpPost]
        public ActionResult SendTextSMS(string Text, string Number)
        {
            string Response = "";
            Response = SendSMSApi(Text, Number);
            return Content(Response);
        }

        [HttpPost]
        public ActionResult SmsToAdmin(string Text)
        {
            string Response = string.Empty;
            string AdminNumber = PropertiesConfiguration.AdminNumber;
            Response = SendSMSApi(Text, AdminNumber);
            return Content(Response);
        }

        [HttpPost]
        public ActionResult SendSMSByUser(string Text, int User,string ClassId = "1")
        {
            string Response = "unable to sent message";
            if (!string.IsNullOrEmpty(Text))
            {
                if (User == 1)
                {
                    StudentController obj = new StudentController();
                    var studentList = obj.GetStudentDetailByClass(ClassId);
                    foreach (var item in studentList)
                    {
                        SendSMSApi(Text, item.Contact);
                    }
                    Response = "Message sent to students";
                }
                else if (User == 2)
                {
                    TeacherController obj = new TeacherController();
                    var teacherList = obj.GetTeacher();
                    foreach (var item in teacherList)
                    {
                        //SendSMSApi(Text, item.Phone);
                    }
                    Response = "Message sent to teachers";
                }
            }
            return Content(Response);
        }

        private string SendSMSApi(string Text, string Number)
        {
            string Host = PropertiesConfiguration.SMSApiHost;
            string User = PropertiesConfiguration.SMSApiUser;
            string Password = PropertiesConfiguration.SMSApiPassword;

            if (!PropertiesConfiguration.IsSMSEnable)
            {
                return "SMS Service not enabled.";
            }

            string msg = "http://" + Host + "/api/mt/SendSMS?user=" + User + "&password=" + Password + "&senderid=TSOULS&channel=trans&DCS=0&flashsms=0&number=" + Number + "&text=" + Text + "&route=17";
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(Host);

            // Add an Accept header for JSON format.
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.GetAsync(msg).Result;

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