using log4net;
using Newtonsoft.Json.Linq;
using SchoolApi;
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

namespace MvcApplication1.Controllers
{
    public class MainController : Controller
    {
        //
        // GET: /Home/
        private static readonly ILog Log =
              LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        [Authorize]
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
        public ActionResult Employee()
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
        public ActionResult Admin()
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
    }
}
