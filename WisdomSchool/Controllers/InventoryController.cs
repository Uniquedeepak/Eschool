using log4net;
using MvcApplication1.CustomFilters;
using SchoolApi;
using SchoolApi.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication1.Controllers
{
    public class InventoryController : Controller
    {
        private static readonly ILog Log =
             LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        #region Inventory Category
        [HttpGet]
        public JsonResult GetInventoryCategory()
        {
            InventoriesController obj = new InventoriesController();
            List<InventoryCategory> objInventoryCategory = obj.GetInventoryCategory();
            return Json(objInventoryCategory, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AddInventoryCategory(InventoryCategory inventoryCategory)
        {
            InventoriesController obj = new InventoriesController();
            var response = obj.PostInventoryCategory(inventoryCategory);
            return Json(((InventoryCategory)(((System.Net.Http.ObjectContent)(response.Content)).Value)).ICID, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateInventoryCategory(int ID, InventoryCategory _InventoryCategory)
        {
            InventoriesController obj = new InventoriesController();
            var response = obj.PutInventoryCategory(ID, _InventoryCategory);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AuthLog(Roles = "Admin")]
        public JsonResult DeleteInventoryCategory(int ID)
        {
            InventoriesController obj = new InventoriesController();
            var response = obj.DeleteInventoryCategory(ID);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Inventory Item
        [HttpGet]
        public JsonResult GetInventoryItem()
        {
            InventoriesController obj = new InventoriesController();
            List<InventoryItem> objInventoryItem = obj.GetInventoryItems();
            return Json(objInventoryItem, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AddInventoryItem(InventoryItem _InventoryItem)
        {
            InventoriesController obj = new InventoriesController();
            var response = obj.PostInventoryItem(_InventoryItem);
            return Json(((InventoryItem)(((System.Net.Http.ObjectContent)(response.Content)).Value)).IIID, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateInventoryItem(int ID, InventoryItem _InventoryItem)
        {
            InventoriesController obj = new InventoriesController();
            var response = obj.PutInventoryItem(ID, _InventoryItem);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AuthLog(Roles = "Admin")]
        public JsonResult DeleteInventoryItem(int ID)
        {
            InventoriesController obj = new InventoriesController();
            var response = obj.DeleteInventoryItem(ID);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Inventory Issue
        [HttpGet]
        public JsonResult GetInventoryIssue()
        {
            InventoriesController obj = new InventoriesController();
            List<InventoryIssue> objInventoryIssue = obj.GetInventoryIssues();
            return Json(objInventoryIssue, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AddInventoryIssue(InventoryIssue _InventoryIssue)
        {
            InventoriesController obj = new InventoriesController();
            var response = obj.PostInventoryIssue(_InventoryIssue);
            return Json(((InventoryIssue)(((System.Net.Http.ObjectContent)(response.Content)).Value)).IIID, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateInventoryIssue(int ID, InventoryIssue _InventoryIssue)
        {
            InventoriesController obj = new InventoriesController();
            var response = obj.PutInventoryIssue(ID, _InventoryIssue);
            return Json(((InventoryIssue)(((System.Net.Http.ObjectContent)(response.Content)).Value)).IIID, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AuthLog(Roles = "Admin")]
        public JsonResult DeleteInventoryIssue(int ID)
        {
            InventoriesController obj = new InventoriesController();
            var response = obj.DeleteInventoryIssue(ID);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        #endregion

    }
}