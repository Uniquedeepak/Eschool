using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolApi.Models
{
    public class MonthAttendanceReport
    {
        public string AdmissionNo { get; set; }
        public string Name { get; set; }
        public string Class { get; set; }
        public int Present { get; set; }
        public int Absent { get; set; }
        public int Leave { get; set; }
        public int TotalDays { get; set; }
    }
}