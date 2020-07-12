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
    public class HomeworkController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        public HomeworkController()
        {
            this.unitOfWork = new UnitOfWork();
        }

        public List<tbl_homework> GetHomeworks()
        {
            ClassController _class = new ClassController();
            var Homeworks = unitOfWork.HomeworkRepository.Get(orderBy: q => q.OrderBy(s => s.id));
            Homeworks.ForEach(cc => cc.@class = _class.GetClassName(cc.@class));
            return Homeworks;
        }

        public tbl_homework Get(int id)
        {
            tbl_homework objHomework = unitOfWork.HomeworkRepository.GetById(id);
            if (objHomework == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }
            return objHomework;
        }

        public HttpResponseMessage Post(tbl_homework _Homework)
        {
            HttpRequestMessage Request = new HttpRequestMessage();
            Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());

            if (ModelState.IsValid)
            {
                unitOfWork.HomeworkRepository.Insert(_Homework);
                unitOfWork.Save();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, _Homework);
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        [HttpPut]
        public bool Put(int Id, tbl_homework _Homework)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }
            if (Id != _Homework.id)
            {
                return false;
            }
            
            try
            {
                unitOfWork.HomeworkRepository.Update(_Homework);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return false;
            }
            return true;
        }

        public tbl_homework Delete(int Id)
        {
            tbl_homework _Homework = unitOfWork.HomeworkRepository.GetById(Id);
            if (_Homework == null)
            {
                return _Homework;
            }
            
            try
            {
                unitOfWork.HomeworkRepository.Delete(_Homework.id);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return _Homework;
            }
            return _Homework;
        }
    }
}
