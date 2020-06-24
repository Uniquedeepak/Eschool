using log4net;
using MvcApplication1.CustomFilters;
using Newtonsoft.Json.Linq;
using SchoolApi;
using SchoolApi.BAL;
using SchoolApi.Controllers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using SchoolApi.Utility;

namespace MvcApplication1.Controllers
{
    [AuthLog(Roles = "Admin,Employee")]
    public class HomeController : Controller
    {
        //
        // GET: /Home/
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
        #region Student
        [HttpGet]
        [OutputCache(Duration = 600, VaryByParam = "Students")]  
        public JsonResult GetStudentDetails()
        {
            try
            {
                StudentController obj = new StudentController();
                List<AdmissionForm> objStudent = obj.GetStudentDetails();

                return new CustomJsonResult { Data = objStudent };

               // return CustomJsonResult(objStudent, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message.ToString());
                return null;
            }
            
        }
        [HttpGet]
        public JsonResult GetStudentsByClass(string ClassId)
        {
            try
            {
                StudentController obj = new StudentController();
                List<AdmissionForm> objStudent = obj.GetStudentDetailByClass(ClassId);
                return Json(objStudent, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message.ToString());
                return null;
            }

        }
        [HttpGet]
        public JsonResult GetAdmissionNo(int ClassId)
        {
            try
            {
                StudentController obj = new StudentController();
                string AdmissionNo = obj.GetNextAdmNo(ClassId);
                return Json(new { adm = AdmissionNo }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message.ToString());
                return null;
            }
            
        }
        [HttpPost]
        public JsonResult AddStudent(AdmissionForm student)
        {
            try
            {
                if (string.IsNullOrEmpty(student.AdmissionNo))
                {
                    return Json("AdmissionNo cant be blank.");
                }
                StudentController obj = new StudentController();
                var response = obj.Post(student);
                return Json(((SchoolApi.AdmissionForm)(((System.Net.Http.ObjectContent)(response.Content)).Value)).AdmissionId, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message.ToString());
                return null;
            }
            
        }
        [HttpPost]
        public JsonResult UpdateStudent(int AdmissionId, AdmissionForm student)
        {
            try
            {
                StudentController obj = new StudentController();
                var response = obj.Put(AdmissionId, student);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message.ToString());
                return null;
            }
            
        }
        [HttpPost]
        [AuthLog(Roles = "Admin")]
        public JsonResult DeleteStudent(int AdmissionId)
        {
            try
            {
                StudentController obj = new StudentController();
                var response = obj.Delete(AdmissionId);
                return Json(response, JsonRequestBehavior.AllowGet); ;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message.ToString());
                return null;
            }
            
        }
         [HttpGet]
        public JsonResult GetMultiChildParent()
        {
            try
            {
                StudentController obj = new StudentController();
                List<AdmissionForm> objStudent = obj.GetMultiChildParent();
                return Json(objStudent, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message.ToString());
                return null;
            }

        }
        #endregion
        #region Class
        [HttpGet]
        [OutputCache(Duration = 600, VaryByParam = "Classes")]  
        public JsonResult GetClasses()
        {
            ClassController obj = new ClassController();
            List<Class> objClass = obj.GetClasses();
            return Json(objClass, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateClass(int CID, Class _Class)
        {
            ClassController obj = new ClassController();
            var response = obj.Put(CID, _Class);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AuthLog(Roles = "Admin")]
        public JsonResult DeleteClass(int CID)
        {
            ClassController obj = new ClassController();
            var response = obj.Delete(CID);
            return Json(response, JsonRequestBehavior.AllowGet); ;
        }

        #endregion
        #region Transport
        [HttpGet]
        public JsonResult GetTransportCharge()
        {
            TransportController obj = new TransportController();
            List<TransportCharge> objTransport = obj.GetTransportCharge();
            return Json(objTransport, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddTransport(TransportCharge Transport)
        {
            TransportController obj = new TransportController();
            var response = obj.Post(Transport);
            return Json(((SchoolApi.TransportCharge)(((System.Net.Http.ObjectContent)(response.Content)).Value)).TId, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateTransport(int Tid, TransportCharge Transport)
        {
            TransportController obj = new TransportController();
            var response = obj.Put(Tid, Transport);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AuthLog(Roles = "Admin")]
        public JsonResult DeleteTransport(int Tid)
        {
            TransportController obj = new TransportController();
            var response = obj.Delete(Tid);
            return Json(response, JsonRequestBehavior.AllowGet); ;
        }
        #endregion
        #region Employee
        [HttpGet]
        public JsonResult GetEmployee()
        {
            EmployeeController obj = new EmployeeController();
            List<EmployeeEntry> objEmployee = obj.GetEmployee();
            return Json(objEmployee, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddEmployee(EmployeeEntry Employee)
        {
            EmployeeController obj = new EmployeeController();
            var response = obj.Post(Employee);
            return Json(((SchoolApi.EmployeeEntry)(((System.Net.Http.ObjectContent)(response.Content)).Value)).EEID, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateEmployee(int Tid, EmployeeEntry Employee)
        {
            EmployeeController obj = new EmployeeController();
            var response = obj.Put(Tid, Employee);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AuthLog(Roles = "Admin")]
        public JsonResult DeleteEmployee(int Tid)
        {
            EmployeeController obj = new EmployeeController();
            var response = obj.Delete(Tid);
            return Json(response, JsonRequestBehavior.AllowGet); ;
        }
        #endregion
        #region School
        [HttpGet]
        public JsonResult GetSchool()
        {
            SchoolController obj = new SchoolController();
            List<School> objSchool = obj.GetSchool();
            return Json(objSchool, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddSchool(School School)
        {
            SchoolController obj = new SchoolController();
            var response = obj.Post(School);
            return Json(((SchoolApi.School)(((System.Net.Http.ObjectContent)(response.Content)).Value)).ID, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateSchool(int ID, School School)
        {
            SchoolController obj = new SchoolController();
            var response = obj.Put(ID, School);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AuthLog(Roles = "Admin")]
        public JsonResult DeleteSchool(int ID)
        {
            SchoolController obj = new SchoolController();
            var response = obj.Delete(ID);
            return Json(response, JsonRequestBehavior.AllowGet); ;
        }

        [HttpGet]
        public JsonResult GetSessions()
        {
            SchoolController obj = new SchoolController();
            var Session = obj.GetSessions();
            return Json(Session, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetActiveSession()
        {
            SchoolController obj = new SchoolController();
            var activeSession = obj.GetCurrentSession();
            var result = Json(activeSession, JsonRequestBehavior.AllowGet);
            return result;
        }
        #endregion
        #region Session
        [HttpGet]
        public JsonResult GetSession()
        {
            SessionController obj = new SessionController();
            List<Session> objSession = obj.GetSession();
            return Json(objSession, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AddSession(Session Session)
        {
            SessionController obj = new SessionController();
            var response = obj.Post(Session);
            return Json(((SchoolApi.Session)(((System.Net.Http.ObjectContent)(response.Content)).Value)).Id, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateSession(int ID, Session Session)
        {
            SessionController obj = new SessionController();
            var response = obj.Put(ID, Session);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AuthLog(Roles = "Admin")]
        public JsonResult DeleteSession(int ID)
        {
            SessionController obj = new SessionController();
            var response = obj.Delete(ID);
            return Json(response, JsonRequestBehavior.AllowGet); ;
        }

        #endregion
        #region Attendance
        [HttpGet]
        public JsonResult GetAttendance()
        {
            AttendanceController obj = new AttendanceController();
            List<StAttendance> objAttendance = obj.GetAttendanceCharge();
            var jsonResult = Json(objAttendance, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }

        [HttpPost]
        public JsonResult GetMonthlyAttendance(string Class)
        {
            AttendanceController obj = new AttendanceController();
            var requestModel = obj.GetMonthlyAttendance(Class);
            var jsonResult = Json(requestModel, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }

        [HttpPost]
        public ActionResult AddAttendance(List<StAttendance> Attendance)
        {
            AttendanceController obj = new AttendanceController();
            if (obj.IsAttendanceMarked(Attendance))
            {
                return Content("Attendance Already Marked");
            }
            else
            {
                var response = obj.Post(Attendance);

                foreach (var item in Attendance)
                {
                    if (item.Attendance == "Absent" || item.Attendance == "Leave")
                    {
                        string text = "Your ward " + item.StName + " is " + (item.Attendance == "Absent" ? "Absent" : "on Leave") + " today i.e. " + DateTime.Now.ToString("MM/dd/yyyy");
                        SMS.SendSMSApi(text, item.StNumber);    
                    }
                }

                return Json(((List<SchoolApi.StAttendance>)(((System.Net.Http.ObjectContent)(response.Content)).Value)), JsonRequestBehavior.AllowGet);
            }
            
            
        }

        [HttpPost]
        public JsonResult UpdateAttendance(int ID, StAttendance Attendance)
        {
            AttendanceController obj = new AttendanceController();
            var response = obj.Put(ID, Attendance);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AuthLog(Roles = "Admin")]
        public JsonResult DeleteAttendance(int ID)
        {
            AttendanceController obj = new AttendanceController();
            var response = obj.Delete(ID);
            return Json(response, JsonRequestBehavior.AllowGet); ;
        }
        #endregion
        #region Dashboard
        [HttpGet]
        public JsonResult GetCountClass()
        {
            DashboardController obj = new DashboardController();
            Int64 objTransport = obj.GetCountClass();
            return Json(objTransport, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetCountStudent()
        {
            DashboardController obj = new DashboardController();
            Int64 objTransport = obj.GetCountStudent();
            return Json(objTransport, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GeTodayFees()
        {
            DashboardController obj = new DashboardController();
            decimal objTransport = obj.GeTodayFees();
            return Json(objTransport, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetMonthFees()
        {
            DashboardController obj = new DashboardController();
            decimal objTransport = obj.GetMonthFees();
            return Json(objTransport, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetTotalClassStudent()
        {
            DashboardController obj = new DashboardController();
            List<ChartData> objTotalClassStudent = obj.GetTotalClassStudent();
            return Json(objTotalClassStudent, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetMonthBirthday()
        {
            DashboardController obj = new DashboardController();
            List<ChartData> objMonthBirthday = obj.GetMonthBirthday();
            return Json(objMonthBirthday, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetClassFeeBalance()
        {
            DashboardController obj = new DashboardController();
            List<ChartData> objClassFeeBalance = obj.GetClassFeeBalance();
            return Json(objClassFeeBalance, JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Homework
        [HttpGet]
        public JsonResult GetHomework()
        {
            HomeworkController obj = new HomeworkController();
            List<tbl_homework> objHomework = obj.GetHomeworks();
            var jsonResult = Json(objHomework, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpPost]
        public JsonResult AddHomework(FormCollection collection)
        {
            HomeworkController obj = new HomeworkController();
            var homework = collection["Homework"];
            tbl_homework Homework = JsonConvert.DeserializeObject<tbl_homework>(homework);

            var files = System.Web.HttpContext.Current.Request.Files;
            if (files.Count > 0)
            {
                using (var binaryReader = new BinaryReader(files[0].InputStream))
                {
                    Homework.name = files[0].FileName;
                    Homework.contenttype = files[0].ContentType;
                    Homework.data = binaryReader.ReadBytes(files[0].ContentLength);
                }
            }
            var response = obj.Post(Homework);
            return Json(((tbl_homework)(((System.Net.Http.ObjectContent)(response.Content)).Value)).id, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AuthLog(Roles = "Admin")]
        public JsonResult DeleteHomework(int ID)
        {
            HomeworkController obj = new HomeworkController();
            var response = obj.Delete(ID);
            return Json(response, JsonRequestBehavior.AllowGet); 
        }

        [HttpPost]
        public JsonResult UpdateHomework(FormCollection collection)
        {
            HomeworkController obj = new HomeworkController();
            var homework = collection["Homework"];
            tbl_homework Homework = JsonConvert.DeserializeObject<tbl_homework>(homework);

            var files = System.Web.HttpContext.Current.Request.Files;
            if (files.Count > 0)
            {
                using (var binaryReader = new BinaryReader(files[0].InputStream))
                {
                    Homework.name = files[0].FileName;
                    Homework.contenttype = files[0].ContentType;
                    Homework.data = binaryReader.ReadBytes(files[0].ContentLength);
                }
            }

            var response = obj.Put(Homework.id, Homework);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public FileResult DownloadHomework(int id)
        {

            HomeworkController obj = new HomeworkController();
            List<tbl_homework> ObjFiles = obj.GetHomeworks();

            var FileById = (from FC in ObjFiles
                            where FC.id.Equals(id)
                            select new { FC.name,FC.contenttype , FC.data }).FirstOrDefault();

            return File(FileById.data, FileById.contenttype, FileById.name);

        }

        #endregion
        #region House
        [HttpGet]
        public JsonResult GetHouse()
        {
            HouseController obj = new HouseController();
            List<House> objHouse = obj.GetHouse();
            return Json(objHouse, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AddHouse(House House)
        {
            HouseController obj = new HouseController();
            var response = obj.Post(House);
            return Json(((SchoolApi.House)(((System.Net.Http.ObjectContent)(response.Content)).Value)).HID, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateHouse(int ID, House House)
        {
            HouseController obj = new HouseController();
            var response = obj.Put(ID, House);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AuthLog(Roles = "Admin")]
        public JsonResult DeleteHouse(int ID)
        {
            HouseController obj = new HouseController();
            var response = obj.Delete(ID);
            return Json(response, JsonRequestBehavior.AllowGet); ;
        }

        #endregion
        #region Hobby
        [HttpGet]
        public JsonResult GetHobby()
        {
            HobbyController obj = new HobbyController();
            List<Hobby> objHobby = obj.GetHobby();
            return Json(objHobby, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddHobby(Hobby Hobby)
        {
            HobbyController obj = new HobbyController();
            var response = obj.Post(Hobby);
            return Json(((SchoolApi.Hobby)(((System.Net.Http.ObjectContent)(response.Content)).Value)).Id, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateHobby(int Tid, Hobby Hobby)
        {
            HobbyController obj = new HobbyController();
            var response = obj.Put(Tid, Hobby);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AuthLog(Roles = "Admin")]
        public JsonResult DeleteHobby(int Tid)
        {
            HobbyController obj = new HobbyController();
            var response = obj.Delete(Tid);
            return Json(response, JsonRequestBehavior.AllowGet); ;
        }
        #endregion
        [HttpPost()]
        public string UploadFiles(string filepath)
        {
            int iUploadedCnt = 0;
            // DEFINE THE PATH WHERE WE WANT TO SAVE THE FILES.
            string sPath = "";
            sPath = Server.MapPath("~/img/Student/");
            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;

            // CHECK THE FILE COUNT.
            for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
            {
                System.Web.HttpPostedFile hpf = hfc[iCnt];

                if (hpf.ContentLength > 0)
                {
                    // CHECK IF THE SELECTED FILE(S) ALREADY EXISTS IN FOLDER. (AVOID DUPLICATE)
                    if (!System.IO.File.Exists(sPath + Path.GetFileName(hpf.FileName)))
                    {
                        // SAVE THE FILES IN THE FOLDER.
                        hpf.SaveAs(sPath + Path.GetFileName(hpf.FileName));
                        iUploadedCnt = iUploadedCnt + 1;
                    }
                }
            }

            // RETURN A MESSAGE (OPTIONAL).
            if (iUploadedCnt > 0)
            {
                return iUploadedCnt + " Files Uploaded Successfully";
            }
            else
            {
                return "Upload Failed";
            }
        }
        public string UploadTeacherFiles(string filepath)
        {
            int iUploadedCnt = 0;
            // DEFINE THE PATH WHERE WE WANT TO SAVE THE FILES.
            string sPath = "";
            sPath = Server.MapPath("~/img/Teacher/");
            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;

            // CHECK THE FILE COUNT.
            for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
            {
                System.Web.HttpPostedFile hpf = hfc[iCnt];

                if (hpf.ContentLength > 0)
                {
                    // CHECK IF THE SELECTED FILE(S) ALREADY EXISTS IN FOLDER. (AVOID DUPLICATE)
                    if (!System.IO.File.Exists(sPath + Path.GetFileName(hpf.FileName)))
                    {
                        // SAVE THE FILES IN THE FOLDER.
                        hpf.SaveAs(sPath + Path.GetFileName(hpf.FileName));
                        iUploadedCnt = iUploadedCnt + 1;
                    }
                }
            }

            // RETURN A MESSAGE (OPTIONAL).
            if (iUploadedCnt > 0)
            {
                return iUploadedCnt + " Files Uploaded Successfully";
            }
            else
            {
                return "Upload Failed";
            }
        }
        [HttpPost]
        public void BackUpDB()
        {
            try
            {
                //string command = @"BACKUP DATABASE wisdomDB TO DISK='" + Server.MapPath("~/BackUp/School_" + DateTime.Now.ToString("m-dd-yyyy") + ".bak") + "'";
                //SqlCommand oCommand = null;
                //SqlConnection oConnection = null;
                //oConnection = new SqlConnection("Data Source=Sqlpleskindia1.securehostdns.com,1235;initial catalog=wisdomDB;Uid=wisdom; Pwd=P7b0c?z3");
                //if (oConnection.State != ConnectionState.Open)
                //    oConnection.Open();
                //oCommand = new SqlCommand(command, oConnection);
                //oCommand.ExecuteNonQuery();

                string dbname = "wisdomDB";
                SqlConnection sqlcon = new SqlConnection();
                SqlCommand sqlcmd = new SqlCommand();
                SqlDataAdapter da = new SqlDataAdapter();
                DataTable dt = new DataTable();
                sqlcon.ConnectionString = @"Data Source=Sqlpleskindia1.securehostdns.com,1235;initial catalog=wisdomDB;Uid=wisdom; Pwd=P7b0c?z3";
                if (!System.IO.Directory.Exists(Server.MapPath("~/BackUp/")))
                {
                    System.IO.Directory.CreateDirectory(Server.MapPath("~/BackUp/"));
                }
                try
                {
                    //Open connection
                    sqlcon.Open();
                    //query to take backup database
                    sqlcmd = new SqlCommand("backup database wisdomDB to disk='" + Server.MapPath("~/BackUp/") + "\\" + DateTime.Now.ToString("ddMMyyyy_HHmmss") + ".Bak'", sqlcon);
                    sqlcmd.ExecuteNonQuery();
                    //Close connection
                    sqlcon.Close();
                    Response.Write("Backup database successfully");
                }
                catch (Exception ex)
                {
                    Response.Write(ex.Message);
                }


            }
            catch (Exception ex)
            {
                
            }


        }
        [HttpPost]
        public ActionResult SendSMS(string Name, string Class, string Number, string Month, string Amount)
        {
            ClassController _class = new ClassController();
            string message = $"Student Name {Name} of Class {Class} ,Fee Submitted Successfully for the month {Month} of Amount Rs {Amount}.";
            string Response = SMS.SendSMSApi(message, Number);
            return Content(Response); 
        }
       
    }
}
