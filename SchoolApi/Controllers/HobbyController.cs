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
    public class HobbyController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        public HobbyController()
        {
            this.unitOfWork = new UnitOfWork();
        }

        public List<Hobby> GetHobby()
        {
            var Hobby = unitOfWork.HobbyRepository.Get(orderBy:x=>x.OrderByDescending(q => q.Id));
            return Hobby;
        }

        public HttpResponseMessage Post(Hobby Hobby)
        {
            HttpRequestMessage Request = new HttpRequestMessage();
            Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());
            
            if (ModelState.IsValid)
            {
                unitOfWork.HobbyRepository.Insert(Hobby);
                unitOfWork.Save();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, Hobby);
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        //update Class
        [HttpPut]
        public bool Put(int Tid, Hobby Hobby)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }
            if (Tid != Hobby.Id)
            {
                return false;
            }
            try
            {
                unitOfWork.HobbyRepository.Update(Hobby);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return false;
            }
            return true;
        }

        //delete Class by id
        public Hobby Delete(int Tid)
        {
            Hobby Hobby = unitOfWork.HobbyRepository.GetById(Tid);
            if (Hobby == null)
            {
                return Hobby;
            }
            
            try
            {
                unitOfWork.HobbyRepository.Delete(Hobby.Id);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Hobby;
            }
            return Hobby;
        }
    }
}
