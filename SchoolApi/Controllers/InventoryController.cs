using GenericAPI.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Hosting;

namespace SchoolApi.Controllers
{
    public class InventoriesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        public InventoriesController()
        {
            this.unitOfWork = new UnitOfWork();
        }
        #region Inventory Category
        public List<InventoryCategory> GetInventoryCategory()
        {
            var InventoryCategory = unitOfWork.InventoryCategoryRepository.Query().OrderBy(x => x.ICID).ToList();
            return InventoryCategory;
        }

        public InventoryCategory GetInventoryCategoryById(int id)
        {
            InventoryCategory objFine = unitOfWork.InventoryCategoryRepository.GetById(id);
            if (objFine == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }
            return objFine;
        }

        public HttpResponseMessage PostInventoryCategory(InventoryCategory _InventoryCategory)
        {
            HttpRequestMessage Request = new HttpRequestMessage();
            Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());

            if (ModelState.IsValid)
            {
                unitOfWork.InventoryCategoryRepository.Insert(_InventoryCategory);
                unitOfWork.Save();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, _InventoryCategory);
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        [HttpPut]
        public bool PutInventoryCategory(int Id, InventoryCategory _InventoryCategory)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }

            if (Id != _InventoryCategory.ICID)
            {
                return false;
            }

            try
            {
                unitOfWork.InventoryCategoryRepository.Update(_InventoryCategory);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return false;
            }
            return true;
        }
        public InventoryCategory DeleteInventoryCategory(int Id)
        {
            InventoryCategory _InventoryCategory = unitOfWork.InventoryCategoryRepository.GetById(Id);
            if (_InventoryCategory == null)
            {
                return _InventoryCategory;
            }

            try
            {
                unitOfWork.InventoryCategoryRepository.Delete(Id);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return _InventoryCategory;
            }
            return _InventoryCategory;
        }
        #endregion

        #region Inventory Item
        public List<InventoryItem> GetInventoryItems()
        {
            var fines = unitOfWork.InventoryItemRepository.Query().OrderBy(x => x.IIID).ToList();
            return fines;
        }

        public InventoryItem GetInventoryItemById(int id)
        {
            InventoryItem objInventoryItem = unitOfWork.InventoryItemRepository.GetById(id);
            if (objInventoryItem == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }
            return objInventoryItem;
        }

        public HttpResponseMessage PostInventoryItem(InventoryItem _InventoryItem)
        {
            HttpRequestMessage Request = new HttpRequestMessage();
            Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());

            if (ModelState.IsValid)
            {
                unitOfWork.InventoryItemRepository.Insert(_InventoryItem);
                unitOfWork.Save();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, _InventoryItem);
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        [HttpPut]
        public bool PutInventoryItem(int Id, InventoryItem _InventoryItem)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }

            if (Id != _InventoryItem.IIID)
            {
                return false;
            }

            try
            {
                unitOfWork.InventoryItemRepository.Update(_InventoryItem);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return false;
            }
            return true;
        }
        public InventoryItem DeleteInventoryItem(int Id)
        {
            InventoryItem _InventoryItem = unitOfWork.InventoryItemRepository.GetById(Id);
            if (_InventoryItem == null)
            {
                return _InventoryItem;
            }

            try
            {
                unitOfWork.InventoryItemRepository.Delete(Id);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return _InventoryItem;
            }
            return _InventoryItem;
        }
        #endregion

        #region Inventory Issue
        public List<InventoryIssue> GetInventoryIssues()
        {
            var InventoryIssue = unitOfWork.InventoryIssueRepository.Query().OrderBy(x => x.IIID).ToList();
            return InventoryIssue;
        }

        public InventoryIssue GetInventoryIssue(int id)
        {
            InventoryIssue objInventoryIssue = unitOfWork.InventoryIssueRepository.GetById(id);
            if (objInventoryIssue == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }
            return objInventoryIssue;
        }

        public HttpResponseMessage PostInventoryIssue(InventoryIssue _InventoryIssue)
        {
            HttpRequestMessage Request = new HttpRequestMessage();
            HttpResponseMessage response;
            Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());

            if (ModelState.IsValid)
            {
                bool IsItemAvailable = CheckAndUpdateItem(_InventoryIssue);
                if (IsItemAvailable)
                {
                    unitOfWork.InventoryIssueRepository.Insert(_InventoryIssue);
                    unitOfWork.Save();
                    response = Request.CreateResponse(HttpStatusCode.Created, _InventoryIssue);
                }
                else
                {
                    response = Request.CreateResponse(HttpStatusCode.NotAcceptable, _InventoryIssue);
                }
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        [HttpPut]
        public HttpResponseMessage PutInventoryIssue(int Id, InventoryIssue _InventoryIssue)
        {
            HttpRequestMessage Request = new HttpRequestMessage();
            Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());
            HttpResponseMessage response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid Request"); 
            if (!ModelState.IsValid)
            {
                return response;
            }

            if (Id != _InventoryIssue.IIID)
            {
                return response;
            }

            try
            {
                bool IsItemAvailable = CheckAndUpdateItem(_InventoryIssue);
                if (IsItemAvailable)
                {
                    unitOfWork.InventoryIssueRepository.Update(_InventoryIssue);
                    unitOfWork.Save();
                    response = Request.CreateResponse(HttpStatusCode.Accepted, _InventoryIssue);
                }
                else
                {
                    response = Request.CreateResponse(HttpStatusCode.NotAcceptable, _InventoryIssue);
                }
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return response;
            }
            return response;
        }
        public InventoryIssue DeleteInventoryIssue(int Id)
        {
            InventoryIssue _InventoryIssue = unitOfWork.InventoryIssueRepository.GetById(Id);
            if (_InventoryIssue == null)
            {
                return _InventoryIssue;
            }

            try
            {
                unitOfWork.InventoryIssueRepository.Delete(Id);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return _InventoryIssue;
            }
            return _InventoryIssue;
        }
        #endregion

        private bool CheckAndUpdateItem(InventoryIssue _InventoryIssue)
        {
            try
            {
                int ItemIssueId = _InventoryIssue.IIID;
                int ItemId = Convert.ToInt32(_InventoryIssue.Item);
                int IssueItemQuantity = Convert.ToInt32(_InventoryIssue.Quantity);
               
                InventoryItem objInventoryItem = unitOfWork.InventoryItemRepository.GetById(ItemId);

                InventoryIssue OldIssueItem = unitOfWork.InventoryIssueRepository.GetFirstOrDefault(x => x.IIID == ItemIssueId);
                int OldIssueItemQuantity = OldIssueItem !=null ? Convert.ToInt32(OldIssueItem.Quantity): 0;
                if (OldIssueItem != null)
                {
                    unitOfWork.InventoryIssueRepository.Detach(OldIssueItem);
                }
                var AvailableItem = (Convert.ToInt32(objInventoryItem.Quantity)+ OldIssueItemQuantity) - IssueItemQuantity;
                if (AvailableItem > 0)
                {
                    objInventoryItem.Quantity = AvailableItem;
                    unitOfWork.InventoryItemRepository.Update(objInventoryItem);
                    unitOfWork.Save();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
            
        }
    }
}
