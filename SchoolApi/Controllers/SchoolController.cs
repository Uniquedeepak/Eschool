using GenericAPI.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Hosting;

namespace SchoolApi.Controllers
{
    public class SchoolController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        public SchoolController()
        {
            this.unitOfWork = new UnitOfWork();
        }

        public List<School> GetSchool()
        {
            var SchoolDetails = unitOfWork.SchoolRepository.Get(orderBy: q=>q.OrderByDescending(x => x.ID));
            return SchoolDetails;
        }

        public HttpResponseMessage GetSessions()
        {
            HttpRequestMessage Request = new HttpRequestMessage();
            Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());
            var session = unitOfWork.SessionRepository.Get();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, session);
            return response;
        }

        public string GetCurrentSession()
        {
            string session = unitOfWork.SessionRepository.GetFirstOrDefault(x=>x.IsActive==true).Session1;
            return session;
        }

        public HttpResponseMessage Post(School school)
        {
            HttpRequestMessage Request = new HttpRequestMessage();
            Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());
            
            if (ModelState.IsValid)
            {
                unitOfWork.SchoolRepository.Insert(school);
                unitOfWork.Save();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, school);
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        //update School
        [HttpPut]
        public bool Put(int ID, School school)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }
            if (ID != school.ID)
            {
                return false;
            }
            try
            {
                unitOfWork.SchoolRepository.Update(school);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return false;
            }
            return true;
        }

        //delete School by id
        public School Delete(int ID)
        {
            School school = unitOfWork.SchoolRepository.GetById(ID);
            if (school == null)
            {
                return school;
            }
            try
            {
                unitOfWork.SchoolRepository.Delete(ID);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return school;
            }
            return school;
        }
    }
}
