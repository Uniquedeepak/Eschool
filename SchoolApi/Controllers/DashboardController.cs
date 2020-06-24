using SchoolApi.BAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SchoolApi.Controllers
{
    public class DashboardController : ApiController
    {
         private wisdomDBEntities SchoolDB = null;
         private string SchoolSession = "";
         public DashboardController()
        {
            SchoolDB = new wisdomDBEntities();
            SchoolSession = PropertiesConfiguration.ActiveSession;
        }

        // GET api/school/5
        public Int64 GetCountClass()
        {
            var Class = SchoolDB.Classes.Count();
            return Class;
        }

        // GET api/school/5
        public Int64 GetCountStudent()
        {
            var students = SchoolDB.AdmissionForms.Where(x => x.ESession.Contains(SchoolSession)).Count();
            return students;
        }

        // GET api/school/5
        public decimal GeTodayFees()
        {
            DateTime dt = new DateTime();
            dt = DateTime.Now;
            var TodayFees = SchoolDB.StudentFeeDetails.Where(x => x.Session.Contains(SchoolSession)).ToList();
            TodayFees = TodayFees.Where(x => Convert.ToDateTime(x.Date).Year == dt.Year
                             && Convert.ToDateTime(x.Date).Month == dt.Month
                             && Convert.ToDateTime(x.Date).Day == dt.Day).ToList();
            decimal? Total = TodayFees.Select(x => x.PaidAmount).Sum();
            return Convert.ToDecimal(Total);
        }

        // GET api/school/5
        public decimal GetMonthFees()
        {
            DateTime dt = new DateTime();
            dt = DateTime.Now;
            decimal? Total = null;
            var studentFees = SchoolDB.StudentFeeDetails.ToList();
            if (studentFees != null)
            {
                var TodayFees = studentFees.Where(x => x.Session.Contains(SchoolSession)).ToList();
                TodayFees = TodayFees.Where(x => Convert.ToDateTime(x.Date).Year == dt.Year
                                  && Convert.ToDateTime(x.Date).Month == dt.Month).ToList();

                Total = TodayFees.Select(x => x.PaidAmount).Sum();
            }
            
            return Convert.ToDecimal(Total);
        }

        // GET api/school/5
        public List<ChartData> GetTotalClassStudent()
        {
            List<ChartData> objList = new List<ChartData>();
            objList = SchoolDB.AdmissionForms.Where(x => x.ESession.Contains(SchoolSession)).ToList()
            .GroupBy(n => n.Class)
            .Select(n => new ChartData
            {
                Label = n.Key.ToString(),
                Data = n.Count().ToString()
            }
            ).ToList();
            return objList;
        }

        // GET api/school/5
        public List<ChartData> GetMonthBirthday()
        {
            List<ChartData> objList = new List<ChartData>();
            try
            {
                objList = SchoolDB.AdmissionForms.Where(x => x.ESession.Contains(SchoolSession)).ToList()
                .GroupBy(n => Convert.ToDateTime(n.DOB).ToString("MMMM", CultureInfo.InvariantCulture).ToString())
                .Select(n => new ChartData
                {
                    Label = n.Key,
                    Data = n.Count().ToString()
                }
                ).ToList();
                
            }
            catch (Exception ex)
            {
                
            }
            return objList;
            
        }

        // GET api/school/5
        public List<ChartData> GetClassFeeBalance()
        {
            List<ChartData> objList = new List<ChartData>();
            objList = SchoolDB.StudentFeeDetails.Where(x => x.Session.Contains(SchoolSession)).ToList()
            .GroupBy(n => n.Class)
            .Select(n => new ChartData
            {
                Label = n.Key.ToString(),
                Data = n.Sum(x => Convert.ToDecimal(x.Balance)).ToString()
            }
            ).ToList();
            return objList;
        }
        
        //prevent memory leak
        protected override void Dispose(bool disposing)
        {
            SchoolDB.Dispose();
            base.Dispose(disposing);
        }
    }

    public class ChartData
    {
        public string Label { get; set; }
        public string Data { get; set; }
    }
}
