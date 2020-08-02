using GenericAPI.UnitOfWork;
using SchoolApi.BAL;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SchoolApi.Controllers
{
    public class ClassController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly string SchoolSession;
         public ClassController()
        {
            this.unitOfWork = new UnitOfWork();
            SchoolSession = ApplicationConfigurations.ActiveSession;
        }

        // GET api/school/5
        public List<Class> GetClasses()
        {
            var ClassDetails = unitOfWork.ClassRepository.Get();
            return ClassDetails;
        }

        ////get all Class
        //[HttpGet]
        //public IEnumerable<AdmissionForm> Get()
        //{
        //    var list = SchoolDB.AdmissionForms.Where(x=>x.ESession.Contains(SchoolSession)).ToList();
        //    ClassController _class = new ClassController();
        //    list.ForEach(cc => cc.Class = _class.GetClassName(cc.Class));
        //    return list;
        //}

        ////get student by id
        //public Class Get(int id)
        //{
        //    Class objClass = SchoolDB.Classes.Find(id);
        //    if (objClass == null)
        //    {
        //        throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
        //    }
        //    return objClass;
        //}

        //insert Class
        public HttpResponseMessage Post(Class _Class)
        {
            if (ModelState.IsValid)
            {
                unitOfWork.ClassRepository.Insert(_Class);
                unitOfWork.Save();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, _Class);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { AdmissionId = _Class.CID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        //update Class
        [HttpPut]
        public bool Put(int CID, Class _Class)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }
            if (CID != _Class.CID)
            {
                return false;
            }
            try
            {
                unitOfWork.ClassRepository.Update(_Class);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return false;
            }
            return true;
        }

        //delete Class by id
        public Class Delete(int CID)
        {
            Class _Class = unitOfWork.ClassRepository.GetById(CID);
            if (_Class == null)
            {
                return _Class;
            }
            try
            {
                unitOfWork.ClassRepository.Delete(_Class);
                unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return _Class;
            }
            return _Class;
        }

        public string GetClassName(string ClassID)
        {
            string ClassName = string.Empty;
            int ID = Convert.ToInt32(ClassID);
            ClassName = unitOfWork.ClassRepository.GetFirstOrDefault(x => x.CID == ID).Class1;
            return ClassName;
        }
        public int GetClassID(string SelectedClass)
        {
            int ClassID = 0;
            ClassID = unitOfWork.ClassRepository.GetFirstOrDefault(x => x.Class1 == SelectedClass).CID;
            return ClassID;
        }
    }
}
