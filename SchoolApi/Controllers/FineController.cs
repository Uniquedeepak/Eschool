using GenericAPI.UnitOfWork;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Hosting;

namespace SchoolApi.Controllers
{
    public class FineController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public FineController()
        {
            this.unitOfWork = new UnitOfWork();
        }

        public List<Fine> GetFines()
        {
            var fines = unitOfWork.FineRepository.Query().OrderBy(x => x.Id).ToList();
            return fines;
        }

        public Fine Get(int id)
        {
            Fine objFine = unitOfWork.FineRepository.GetById(id);
            if (objFine == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }
            return objFine;
        }

        public HttpResponseMessage Post(Fine _Fine)
        {
            HttpRequestMessage Request = new HttpRequestMessage();
            Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());

            if (ModelState.IsValid)
            {
                unitOfWork.FineRepository.Insert(_Fine);
                unitOfWork.Save();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, _Fine);
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        [HttpPut]
        public bool Put(int Id, Fine _Fine)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }

            if (Id != _Fine.Id)
            {
                return false;
            }
            
            try
            {
                unitOfWork.FineRepository.Update(_Fine);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return false;
            }
            return true;
        }

        public Fine Delete(int Id)
        {
            Fine _Fine = unitOfWork.FineRepository.GetById(Id);
            if (_Fine == null)
            {
                return _Fine;
            }
            
            try
            {
                unitOfWork.FineRepository.Delete(Id);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return _Fine;
            }
            return _Fine;
        }
    }
}
