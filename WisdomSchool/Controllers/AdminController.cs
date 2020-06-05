using Demo1;
using Demo1.Models;
using log4net;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using MvcApplication1.CustomFilters;
using MvcApplication1.Models;
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
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication1.Controllers
{
    [AuthLog(Roles = "Admin")]
    public class AdminController : Controller
    {
        //
        // GET: /Home/
        private static readonly ILog Log =
              LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private ApplicationDbContext context = new ApplicationDbContext();
        private wisdomDBEntities SchoolDB = new wisdomDBEntities();
        private string SchoolSession = PropertiesConfiguration.ActiveSession;
        private ApplicationUserManager _userManager;
        private ApplicationSignInManager _signInManager;
        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

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

        #region School
        public ActionResult School()
        {
            return View(SchoolDB.Schools.ToList());
        }

        public ActionResult EditSchool(int id)
        {
            using (wisdomDBEntities db = new wisdomDBEntities())
            {
                School SeletedSchool = new School();

                SeletedSchool = db.Schools.Find(id);
                return View("EditSchool", SeletedSchool);
            }
        }

        [HttpPost]
        public ActionResult EditSchool(School objSchool)
        {
            using (wisdomDBEntities db = new wisdomDBEntities())
            {
                School Existing = db.Schools.Find(objSchool.ID);
                Existing.SchoolName = objSchool.SchoolName;
                Existing.schooladdress = objSchool.schooladdress;
                Existing.Phone = objSchool.Phone;
                Existing.Date = DateTime.Now;
                Existing.logo = objSchool.logo;
                db.SaveChanges();
                return RedirectToAction("School");
            }
        }
        [HttpPost]
        public ActionResult DeleteSchool(int id)
        {
            using (wisdomDBEntities db = new wisdomDBEntities())
            {
                School objSchool = db.Schools.Find(id);
                db.Schools.Remove(objSchool);
                db.SaveChanges();
                return RedirectToAction("School");
            }
        }

        #endregion
        #region Session
        public ActionResult Session()
        {
            return View(SchoolDB.Sessions.ToList());
        }

        [HttpPost]
        public ActionResult EditSession(Session objSession)
        {
            using (wisdomDBEntities db = new wisdomDBEntities())
            {
                Session Existing = db.Sessions.Find(objSession.Id);
                Existing.IsActive = objSession.IsActive;
                db.SaveChanges();
                return View("Index");
            }
        }

        #endregion

        #region Manage User
        // To view the List of User 
        public ActionResult ListUsers()
        {
            return View(context.Users.ToList());
        }
        public async Task<ActionResult> EditUser(string email)
        {
            ApplicationUser appUser = new ApplicationUser();
            ViewBag.Name = new SelectList(context.Roles.Where(u => !u.Name.Contains("Admin")).ToList(), "Name", "Name");
            appUser = await UserManager.FindByNameAsync(email);
            UserEdit user = new UserEdit();
            user.Address = appUser.Address;
            user.FirstName = appUser.FirstName;
            user.LastName = appUser.LastName;
            user.EmailConfirmed = appUser.EmailConfirmed;
            user.Mobile = appUser.Mobile;
            user.City = appUser.City;
            
            return View(user);
        }
        [HttpPost]
        public async Task<ActionResult> EditUser(UserEdit model)
        {
            ViewBag.Name = new SelectList(context.Roles.Where(u => !u.Name.Contains("Admin")).ToList(), "Name", "Name");
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var store = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(store);

            ApplicationUser currentUser = manager.FindByEmail(model.Email);
            
            currentUser.FirstName = model.FirstName;
            currentUser.LastName = model.LastName;
            currentUser.Mobile = model.Mobile;
            currentUser.Address = model.Address;
            currentUser.City = model.City;
            currentUser.EmailConfirmed = model.EmailConfirmed;
            await manager.UpdateAsync(currentUser);

            //Role Update
            ApplicationDbContext DB = new ApplicationDbContext();
            var oldUser = manager.FindById(currentUser.Id);
            var oldRoleId = oldUser.Roles.SingleOrDefault().RoleId;
            var oldRoleName = DB.Roles.SingleOrDefault(r => r.Id == oldRoleId).Name;
            if (oldRoleName != model.UserRole)
            {
                await manager.RemoveFromRoleAsync(currentUser.Id, oldRoleName);
                await manager.AddToRoleAsync(currentUser.Id, model.UserRole);
            }


            var ctx = store.Context;
            ctx.SaveChanges();
            TempData["msg"] = "Profile Changes Saved !";
            return RedirectToAction("ListUsers");
        }
        // for deleting a user
        public ActionResult DeleteUser(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var user = context.Users.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(context.Users.Find(id));
        }
        public async Task<ActionResult> UserDeleteConfirmed(string id)
        {
            var user = await UserManager.FindByIdAsync(id);
            var result = await UserManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                TempData["UserDeleted"] = "User Successfully Deleted";
                return RedirectToAction("ManageEditors");
            }
            else
            {
                TempData["UserDeleted"] = "Error Deleting User";
                return RedirectToAction("ManageEditors");
            }
        }
        public async Task<ActionResult> ChangePassword(string id)
        {
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            ChangePasswordViewModel model = new ChangePasswordViewModel()
            {
                UserId = id,
                OldPassword = user.PasswordHash

            };
            return View(model);
        }
        [HttpPost]
        public async Task<ActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            //var result = await UserManager.ChangePasswordAsync(model.UserId, model.OldPassword, model.NewPassword);
            var result= await UserManager.RemovePasswordAsync(model.UserId);
            result = await UserManager.AddPasswordAsync(model.UserId, model.NewPassword);
            
            if (result.Succeeded)
            {
                var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
                if (user != null)
                {
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                }
                return RedirectToAction("ListUsers");
            }
            AddErrors(result);
            return View(model);
        }
        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }
        #endregion

        #region Fee Heading
        public ActionResult FeeHeadings()
        {
            var list = SchoolDB.NewFeeHeadings.ToList();
            ClassController obj = new ClassController();
            list.ForEach(x => x.Class = obj.GetClassName(x.Class));
            return View(list);
        }

        //EditFeeHeading
        public ActionResult AddFeeHeading()
        {
            using (wisdomDBEntities db = new wisdomDBEntities())
            {
                return View("AddFeeHEading");
            }
        }

        [HttpPost]
        public ActionResult AddFeeHeading(NewFeeHeading objNewFeeHeading)
        {
            using (wisdomDBEntities db = new wisdomDBEntities())
            {
                ClassController _class = new ClassController();
                NewFeeHeading Existing = new NewFeeHeading();
                Existing.January = objNewFeeHeading.January;
                Existing.February = objNewFeeHeading.February;
                Existing.March = objNewFeeHeading.March;
                Existing.April = objNewFeeHeading.April;
                Existing.May = objNewFeeHeading.May;
                Existing.June = objNewFeeHeading.June;
                Existing.July = objNewFeeHeading.July;
                Existing.August = objNewFeeHeading.August;
                Existing.September = objNewFeeHeading.September;
                Existing.October = objNewFeeHeading.October;
                Existing.November = objNewFeeHeading.November;
                Existing.December = objNewFeeHeading.December;
                Existing.Class = _class.GetClassID(objNewFeeHeading.Class).ToString();
                Existing.Heading = objNewFeeHeading.Heading;
                Existing.IsMonth = objNewFeeHeading.IsMonth;
                db.NewFeeHeadings.Add(Existing);
                db.SaveChanges();
                return RedirectToAction("FeeHeadings");
            }
        }

        //EditFeeHeading
        public ActionResult EditFeeHeading(int id)
        {
            using (wisdomDBEntities db= new wisdomDBEntities())
            {
                NewFeeHeading SeletedHeading = new NewFeeHeading();
                ClassController _class = new ClassController();
                SeletedHeading = db.NewFeeHeadings.Find(id);
                SeletedHeading.Class = _class.GetClassName(SeletedHeading.Class);
                return View("EditFeeHEading", SeletedHeading);
            }
        }

        [HttpPost]
        public ActionResult EditFeeHeading(NewFeeHeading objNewFeeHeading)
        {
            using (wisdomDBEntities db = new wisdomDBEntities())
            {
                ClassController _class = new ClassController();
                NewFeeHeading Existing = db.NewFeeHeadings.Find(objNewFeeHeading.FID);
                Existing.January = objNewFeeHeading.January;
                Existing.February = objNewFeeHeading.February;
                Existing.March = objNewFeeHeading.March;
                Existing.April = objNewFeeHeading.April;
                Existing.May = objNewFeeHeading.May;
                Existing.June = objNewFeeHeading.June;
                Existing.July = objNewFeeHeading.July;
                Existing.August = objNewFeeHeading.August;
                Existing.September = objNewFeeHeading.September;
                Existing.October = objNewFeeHeading.October;
                Existing.November = objNewFeeHeading.November;
                Existing.December = objNewFeeHeading.December;
                Existing.Class = Convert.ToString(_class.GetClassID(objNewFeeHeading.Class));
                Existing.Heading = objNewFeeHeading.Heading;
                Existing.IsMonth = objNewFeeHeading.IsMonth;
                db.SaveChanges();
                return RedirectToAction("FeeHeadings");
            }
        }

        //DeleteFeeHeading
        public ActionResult FeeHeadingDelete(int id)
        {
            using (wisdomDBEntities db = new wisdomDBEntities())
            {
                NewFeeHeading objDelete = db.NewFeeHeadings.Find(id);
                db.NewFeeHeadings.Remove(objDelete);
                db.SaveChanges();
                return RedirectToAction("FeeHeadings");
            }
        }
        #endregion

        #region Class
        public ActionResult ClassList()
        {
            return View(SchoolDB.Classes.ToList());
        }

        public ActionResult AddClass()
        {
            using (wisdomDBEntities db = new wisdomDBEntities())
            {
                return View("AddClass");
            }
        }

        [HttpPost]
        public ActionResult AddClass(Class objClass)
        {
            using (wisdomDBEntities db = new wisdomDBEntities())
            {
                Class Existing = new Class();
                Existing.Class1 = objClass.Class1;
                Existing.Inc_Class = objClass.Inc_Class;
                db.Classes.Add(Existing);
                db.SaveChanges();
                return RedirectToAction("ClassList");
            }
        }

        //Class
        public ActionResult EditClass(int id)
        {
            using (wisdomDBEntities db = new wisdomDBEntities())
            {
                Class SeletedClass = new Class();

                SeletedClass = db.Classes.Find(id);
                return View("EditClass", SeletedClass);
            }
        }

        [HttpPost]
        public ActionResult EditClass(Class objClass)
        {
            using (wisdomDBEntities db = new wisdomDBEntities())
            {
                Class Existing = db.Classes.Find(objClass.CID);
                Existing.Class1 = objClass.Class1;
                Existing.Inc_Class = objClass.Inc_Class;
                db.SaveChanges();
                return RedirectToAction("ClassList");
            }
        }

        public ActionResult DeleteClass(int id)
        {
            using (wisdomDBEntities db = new wisdomDBEntities())
            {
                Class objDelete = db.Classes.Find(id);
                db.Classes.Remove(objDelete);
                db.SaveChanges();
                return RedirectToAction("ClassList");
            }
        }
        #endregion

        #region Fee Details
        public ActionResult StudentFeeDetailList()
        {
            var list = SchoolDB.StudentFeeDetails.Where(x => x.Session.Contains(SchoolSession)).ToList();
            ClassController _class = new ClassController();
            list.ForEach(x=>x.Class=_class.GetClassName(x.Class));
            return View(list);
        }

        //Class
        public ActionResult EditFeeDetail(int id)
        {
            using (wisdomDBEntities db = new wisdomDBEntities())
            {
                ClassController _class = new ClassController();
                StudentFeeDetail SeletedStudentFeeDetail = new StudentFeeDetail();
                SeletedStudentFeeDetail = db.StudentFeeDetails.Find(id);
                SeletedStudentFeeDetail.Class = _class.GetClassName(SeletedStudentFeeDetail.Class);
                return View("EditFeeDetail", SeletedStudentFeeDetail);
            }
        }

        [HttpPost]
        public ActionResult EditFeeDetail(StudentFeeDetail objClass)
        {
            using (wisdomDBEntities db = new wisdomDBEntities())
            {
                ClassController _class = new ClassController();
                objClass.Class = _class.GetClassID(objClass.Class).ToString();
                StudentFeeDetail Existing = db.StudentFeeDetails.Find(objClass.Id);
                Existing.Name = objClass.Name;
                Existing.Class = objClass.Class;
                Existing.AdmissionNo = objClass.AdmissionNo;
                Existing.ReciptNo = objClass.ReciptNo;
                Existing.Months= objClass.Months;
                Existing.PayedAmount = objClass.PayedAmount;
                Existing.PreviousDue = objClass.PreviousDue;
                Existing.TotalAmount = objClass.TotalAmount;
                Existing.GrandTotal = objClass.GrandTotal;
                Existing.Balance = objClass.Balance;
                Existing.Concession = objClass.Concession;
                Existing.Fine = objClass.Fine;
                Existing.OldBalanced= objClass.OldBalanced;
                Existing.TransportFee= objClass.TransportFee;
                Existing.BalancedShow= objClass.BalancedShow;
                db.SaveChanges();
                return RedirectToAction("StudentFeeDetailList");
            }
        }

        public ActionResult DeleteFeeDetail(int id)
        {
            using (wisdomDBEntities db = new wisdomDBEntities())
            {
                StudentFeeDetail objDelete = db.StudentFeeDetails.Find(id);
                if (objDelete != null)
                {
                    db.StudentFeeDetails.Remove(objDelete);
                    db.SaveChanges();
                }

                return RedirectToAction("StudentFeeDetailList");
            }
        }
        #endregion

        #region Student
        public ActionResult PromoteStudent()
        {
            return View("PromoteStudent");
        }

        [HttpPost]
        public ActionResult PromoteStudent(List<AdmissionForm> StdList )
        {
            try
            {
                StudentController obj = new StudentController();
                dynamic response;
                foreach (AdmissionForm item in StdList)
                {
                    response = obj.Put(item.AdmissionId, item);
                    return Json(response, JsonRequestBehavior.AllowGet);
                }

                return null;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message.ToString());
                return null;
            }
            
        }
        #endregion
    }
}
