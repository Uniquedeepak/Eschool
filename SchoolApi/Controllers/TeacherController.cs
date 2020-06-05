using GenericAPI.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SchoolApi.Controllers
{
    public class TeacherController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        public TeacherController()
        {
            this.unitOfWork = new UnitOfWork();
        }

        public List<TeacherAss> GetTeacher()
        {
            var TeacherCharge = unitOfWork.TeacherRepository.Get(orderBy: q=>q.OrderByDescending(x => x.TAId));
            return TeacherCharge;
        }

        public HttpResponseMessage Post(TeacherAss Teacher)
        {
            if (ModelState.IsValid)
            {
                unitOfWork.TeacherRepository.Insert(Teacher);
                unitOfWork.Save();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, Teacher);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { AdmissionId = Teacher.TAId }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        [HttpPut]
        public bool Put(int Tid, TeacherAss Teacher)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }
            if (Tid != Teacher.TAId)
            {
                return false;
            }
            
            try
            {
                unitOfWork.TeacherRepository.Update(Teacher);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return false;
            }
            return true;
        }

        public TeacherAss Delete(int Tid)
        {
            TeacherAss Teacher = unitOfWork.TeacherRepository.GetById(Tid);
            if (Teacher == null)
            {
                return Teacher;
            }
           
            try
            {
                unitOfWork.TeacherRepository.Delete(Tid);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Teacher;
            }
            return Teacher;
        }
    }
}
