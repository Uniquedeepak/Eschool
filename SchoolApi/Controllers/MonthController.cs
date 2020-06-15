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
    public class MonthController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public MonthController()
        {
            this.unitOfWork = new UnitOfWork();
        }

        public List<Month> GetMonths()
        {
            var Months = unitOfWork.MonthRepository.Query().OrderBy(x => x.Id).ToList();
            return Months;
        }

        public Month Get(int id)
        {
            Month objMonth = unitOfWork.MonthRepository.GetById(id);
            if (objMonth == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }
            return objMonth;
        }

        public HttpResponseMessage Post(Month _Month)
        {
            HttpRequestMessage Request = new HttpRequestMessage();
            Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());

            if (ModelState.IsValid)
            {
                unitOfWork.MonthRepository.Insert(_Month);
                unitOfWork.Save();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, _Month);
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        [HttpPut]
        public bool Put(int Id, Month _Month)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }

            if (Id != _Month.Id)
            {
                return false;
            }
            
            try
            {
                unitOfWork.MonthRepository.Update(_Month);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return false;
            }
            return true;
        }

        public Month Delete(int Id)
        {
            Month _Month = unitOfWork.MonthRepository.GetById(Id);
            if (_Month == null)
            {
                return _Month;
            }
            
            try
            {
                unitOfWork.MonthRepository.Delete(Id);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return _Month;
            }
            return _Month;
        }
    }
}
