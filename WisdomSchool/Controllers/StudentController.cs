using log4net;
using MvcApplication1.CustomFilters;
using SchoolApi;
using SchoolApi.BAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;

namespace MvcApplication1.Controllers.Student
{
    public class StudentController : Controller
    {
        private static readonly ILog Log =
             LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public ActionResult Index()
        {
            try
            {
                return View();
            }
            catch (Exception ex)
            {
                ViewBag.ErrorMessage = ex.Message.ToString();
                return View("Error");
            }

        }

        [System.Web.Mvc.HttpPost]
        public async Task<JsonResult> CreateStudentLogin(List<AdmissionForm> students)
        {
            string responseMsg = string.Empty;
            var sb = new StringBuilder();
            try
            {
                Log.Info("--------------User Credential Started--------------");
                if (students !=null)
                {
                    foreach (var item in students)
                    {
                        var user = CreateUserObject(item);
                        UserHelper userhelper = new UserHelper();
                        string Msg = await userhelper.CreateUserAsync(user);
                        sb.AppendLine(Msg);
                    };
                }
                responseMsg = sb.ToString();
                Log.Info(responseMsg);
                Log.Info("--------------User Credential End--------------");
            }
            catch (Exception ex)
            {
                Log.Error(ex.ToString());
                return null;
            }
            return Json(responseMsg);
        }

        private User CreateUserObject(AdmissionForm student)
        {
            var name = student.StFirstName.Split(' ');
            User user = new User()
            {
                Email = string.IsNullOrEmpty(student.EmailId) ? $"{student.AdmissionNo}@gmail.com" : student.EmailId,
                Username = student.AdmissionNo,
                FirstName = name[0],
                LastName = name.Length > 1 ? name[1] : "NA",
                RoleName = "Student",
                Password = $"{student.AdmissionNo}@abC",
                ConfirmPassword = $"{student.AdmissionNo}@abC",
            };
            return user;
        }
    }
}
