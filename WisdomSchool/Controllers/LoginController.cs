using SchoolApi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication1.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/
        public ActionResult Index()
        {
            
            return View();
        }
        public ActionResult Validate(FormCollection form)
        {
            try
            {
                string _Username =  System.Configuration.ConfigurationManager.AppSettings["UserName"].ToString();
                string _Password = System.Configuration.ConfigurationManager.AppSettings["Password"].ToString();
                string UserName =  string.IsNullOrEmpty(form["UserName"]) ? "": form["UserName"].ToString();
                string Password = string.IsNullOrEmpty(form["Password"]) ? "" : form["Password"].ToString();
                if (UserName == _Username && Password == _Password)
                {
                    Session["UserName"] = UserName;
                    Session["Password"] = Password;
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    return RedirectToAction("Index");
                }
            
            }
            catch (Exception ex)
            {
                ViewBag.ErrorMessage = ex.Message.ToString();
                return View("Error");
            }
            
        }
        [HttpGet]
        public JsonResult GetCurrentUser()
        {
            TblLoginUser user = new TblLoginUser()
            {
                LoginId = 1,
                UserName = "",// Session["UserName"].ToString(),
                Pwd = "",// Session["Password"].ToString()
            };
            return Json(user, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult LogOut()
        {
            Session["UserName"] = "";
            Session["Password"] = "";
            return RedirectToAction("Index", "Login");
        }
        //
        // GET: /Login/Details/5

       
    }
}
