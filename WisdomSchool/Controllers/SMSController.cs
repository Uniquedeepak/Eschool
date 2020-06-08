using SchoolApi.BAL;
using SchoolApi.Controllers;
using SchoolApi.Utility;
using System.Web.Mvc;

namespace MvcApplication1.Controllers
{
    public class SMSController : Controller
    {
        [HttpPost]
        public ActionResult SendTextSMS(string Text, string Number)
        {
            string Response = "";
            Response =  SMS.SendSMSApi(Text, Number);
            return Content(Response);
        }

        [HttpPost]
        public ActionResult SmsToAdmin(string Text)
        {
            string Response = string.Empty;
            string AdminNumber = PropertiesConfiguration.AdminNumber;
            Response = SMS.SendSMSApi(Text, AdminNumber);
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
                        SMS.SendSMSApi(Text, item.Contact);
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

    }
}