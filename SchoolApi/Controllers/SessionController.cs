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
    public class SessionController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        public SessionController()
        {
            this.unitOfWork = new UnitOfWork();
        }

        public List<Session> GetSession()
        {
            var SessionDetails = unitOfWork.SessionRepository.Get(orderBy: q=>q.OrderByDescending(x => x.Id));
            return SessionDetails;
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
            string session = unitOfWork.SessionRepository.GetFirstOrDefault(x => x.IsActive == true).Session1;
            return session;
        }

        public HttpResponseMessage Post(Session school)
        {
            HttpRequestMessage Request = new HttpRequestMessage();
            Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());
            
            if (ModelState.IsValid)
            {
                unitOfWork.SessionRepository.Insert(school);
                unitOfWork.Save();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, school);
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        //update Session
        [HttpPut]
        public bool Put(int ID, Session school)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }
            if (ID != school.Id)
            {
                return false;
            }
            try
            {
                unitOfWork.SessionRepository.Update(school);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return false;
            }
            return true;
        }

        //delete Session by id
        public Session Delete(int ID)
        {
            Session school = unitOfWork.SessionRepository.GetById(ID);
            if (school == null)
            {
                return school;
            }
            try
            {
                unitOfWork.SessionRepository.Delete(ID);
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
