using SchoolApi;
using SchoolApi.BAL;
using SchoolApi.Controllers;
using SchoolApi.Models;
using SchoolApi.Utility;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace MvcApplication1.Controllers
{
    public class SMSController : Controller
    {
        [HttpPost]
        public ActionResult SendTextSMS(string Text, string Number)
        {
            string Response = "";
            Response =  SMS.SendSMSApi(Text, Number).Result;
            return Content(Response);
        }

        [HttpPost]
        public ActionResult SmsToAdmin(string Text)
        {
            string Response = string.Empty;
            string AdminNumber = ApplicationConfigurations.AdminNumber;
            Response = SMS.SendSMSApi(Text, AdminNumber).Result;
            return Content(Response);
        }

        [HttpPost]
        public async Task<ActionResult> SendSMSByUser(string Text, int User,string ClassId = "1")
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
                        await SMS.SendSMSApi(Text, item.Contact);
                    }
                    Response = "Message sent to "+ studentList.Count + " students";
                }
                else if (User == 2)
                {
                    TeacherController obj = new TeacherController();
                    var teacherList = obj.GetTeacher();
                    foreach (var item in teacherList)
                    {
                        //SMS.SendSMSApi(Text, item.Phone);
                    }
                    Response = "Message sent to teachers";
                }
            }
            return Content(Response);
        }

        [HttpPost]
        public async Task<ActionResult> PendingFeeSMS(string ClassId, string Months)
        {
            string Response = string.Empty;
            FeesController obj = new FeesController();
            List<StudentFeeDetail> studentList = obj.GetPendingFee(ClassId, Months);
            foreach (var item in studentList)
            {
                if (!string.IsNullOrEmpty(item.Phone) && item.Status.ToUpper()=="PENDING")
                {
                    string msg = string.Format(MessageTemplate.PendingFeeTemplate, item.Name, item.Class, item.Balance);
                    var status = await SMS.SendSMSApi(msg,item.Phone);
                }
            }
            Response = "Pending status message sent to students.";
            return Content(Response);
        }



    }
}