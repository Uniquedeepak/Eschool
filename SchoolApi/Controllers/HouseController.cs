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
    public class HouseController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        public HouseController()
        {
            this.unitOfWork = new UnitOfWork();
        }

        public List<House> GetHouse()
        {
            var House = unitOfWork.HouseRepository.Get(orderBy:x=>x.OrderByDescending(q => q.HID));
            return House;
        }

        public HttpResponseMessage Post(House House)
        {
            HttpRequestMessage Request = new HttpRequestMessage();
            Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());
            
            if (ModelState.IsValid)
            {
                unitOfWork.HouseRepository.Insert(House);
                unitOfWork.Save();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, House);
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        //update Class
        [HttpPut]
        public bool Put(int Tid, House House)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }
            if (Tid != House.HID)
            {
                return false;
            }
            try
            {
                unitOfWork.HouseRepository.Update(House);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return false;
            }
            return true;
        }

        public House Delete(int Tid)
        {
            House house = unitOfWork.HouseRepository.GetById(Tid);
            if (house == null)
            {
                return house;
            }
            
            try
            {
                unitOfWork.HouseRepository.Delete(house.HID);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return house;
            }
            return house;
        }
    }
}
