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
    public class EmployeeController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        public EmployeeController()
        {
            this.unitOfWork = new UnitOfWork();
        }

        public List<EmployeeEntry> GetEmployee()
        {
            var EmployeeCharge = unitOfWork.EmployeeRepository.Get(orderBy: x => x.OrderByDescending(q => q.EEID));
            return EmployeeCharge;
        }

        public HttpResponseMessage Post(EmployeeEntry Employee)
        {
            HttpRequestMessage Request = new HttpRequestMessage();
            Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());
           
            if (ModelState.IsValid)
            {
                unitOfWork.EmployeeRepository.Insert(Employee);
                unitOfWork.Save();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, Employee);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { EEID = Employee.EEID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        [HttpPut]
        public bool Put(int Tid, EmployeeEntry Employee)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }
            if (Tid != Employee.EEID)
            {
                return false;
            }
            try
            {
                unitOfWork.EmployeeRepository.Update(Employee);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return false;
            }
            return true;
        }

        public EmployeeEntry Delete(int Tid)
        {
            EmployeeEntry Employee = unitOfWork.EmployeeRepository.GetById(Tid);
            if (Employee == null)
            {
                return Employee;
            }
            
            try
            {
                unitOfWork.EmployeeRepository.Delete(Tid);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Employee;
            }
            return Employee;
        }
    }
}
