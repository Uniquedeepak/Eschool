using log4net;
using MvcApplication1.CustomFilters;
using SchoolApi;
using SchoolApi.Controllers;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace MvcApplication1.Controllers
{
    [AuthLog(Roles = "Admin,Employee")]
    public class FeeController : Controller
    {
        private static readonly ILog Log =
              LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        #region Fee Heads
        [HttpGet]
        public JsonResult GetFeeHeads()
        {
            FeesController obj = new FeesController();
            List<NewFeeHeading> objSession = obj.GetFeeHeads();
            return Json(objSession, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AddFeeHead(NewFeeHeading FeeHeading)
        {
            FeesController obj = new FeesController();
            var response = obj.AddFeeHead(FeeHeading);
            return Json(((SchoolApi.NewFeeHeading)(((System.Net.Http.ObjectContent)(response.Content)).Value)).FID, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateFeeHead(int ID, NewFeeHeading FeeHeading)
        {
            FeesController obj = new FeesController();
            var response = obj.UpdateFeeHead(ID, FeeHeading);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AuthLog(Roles = "Admin")]
        public JsonResult DeleteFeeHeads(int ID)
        {
            FeesController obj = new FeesController();
            var response = obj.DeleteFeeHead(ID);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region Student Fee
        [HttpPost]
        public JsonResult GetAllSubmitedFeeDetail(string Session)
        {
            try
            {
                FeesController obj = new FeesController();
                List<StudentFeeDetail> objClass = obj.GetAllSubmitedFeeDetail(Session);
                var jsonResult = Json(objClass, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message.ToString());
                return null;
            }

        }

        [HttpPost]
        public JsonResult GetTopFeeDetail(string Session, string ClassId = "")
        {
            try
            {
                FeesController obj = new FeesController();
                List<StudentFeeDetail> objClass = obj.GetTopFeeDetail(Session, ClassId);
                var Jsonresult = Json(objClass, JsonRequestBehavior.AllowGet);
                Jsonresult.MaxJsonLength = int.MaxValue;
                return Jsonresult;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message.ToString());
                return null;
            }

        }

        [HttpPost]
        public JsonResult GetStudentFeeDetail(string AdmNo, string Session)
        {
            try
            {
                FeesController obj = new FeesController();
                List<StudentFeeDetail> objClass = obj.GetStudentFeeDetail(AdmNo, Session);
                return Json(objClass, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message.ToString());
                return null;
            }

        }

        [HttpPost]
        public JsonResult AddStudentFeeDetail(StudentFeeDetail stFeeDetail)
        {
            try
            {
                FeesController obj = new FeesController();
                var response = obj.Post(stFeeDetail);
                return Json(((SchoolApi.StudentFeeDetail)(((System.Net.Http.ObjectContent)(response.Content)).Value)), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message.ToString());
                return null;
            }

        }

        [HttpPost]
        [AuthLog(Roles = "Admin")]
        public JsonResult DeleteStudentFee(int Id)
        {
            try
            {
                FeesController obj = new FeesController();
                var response = obj.Delete(Id);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message.ToString());
                return null;
            }

        }


        [HttpPost]
        public JsonResult UpdateStFeeDetail(string AdmissionNo, StudentFeeDetail student)
        {
            try
            {
                FeesController obj = new FeesController();
                var response = obj.Put(AdmissionNo, student);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message.ToString());
                return null;
            }

        }


        [HttpPost]
        public JsonResult GetClassFeeDetail(string SelectedClass)
        {
            try
            {
                FeesController obj = new FeesController();
                List<NewFeeHeading> objClass = obj.GetNewFeeHeading(SelectedClass);
                return Json(objClass, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message.ToString());
                return null;
            }

        }

        [HttpPost]
        public JsonResult GetFeeHeadDetail()
        {
            try
            {
                FeesController obj = new FeesController();
                List<NewFeeHeading> objClass = obj.GetAllNewFeeHeading();
                return Json(objClass, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message.ToString());
                return null;
            }

        }

        [HttpGet]
        public JsonResult GetAdmissionFee()
        {
            try
            {
                FeesController obj = new FeesController();
                List<AdmissionFee> objClass = obj.GetAdmissionFee();
                return Json(objClass, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message.ToString());
                return null;
            }

        }
        #endregion
        #region Fine
        [HttpGet]
        public JsonResult GetFines()
        {
            FineController obj = new FineController();
            List<Fine> objfine = obj.GetFines();
            return Json(objfine, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AddFine(Fine fine)
        {
            FineController obj = new FineController();
            var response = obj.Post(fine);
            return Json(((Fine)(((System.Net.Http.ObjectContent)(response.Content)).Value)).Id, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateFine(int ID, Fine fine)
        {
            FineController obj = new FineController();
            var response = obj.Put(ID, fine);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AuthLog(Roles = "Admin")]
        public JsonResult DeleteFine(int ID)
        {
            FineController obj = new FineController();
            var response = obj.Delete(ID);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}