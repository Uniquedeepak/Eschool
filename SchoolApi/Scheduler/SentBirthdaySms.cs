using GenericAPI.UnitOfWork;
using SchoolApi.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Timers;
using System.Web;

namespace SchoolApi.Scheduler
{
    public class SentBirthdaySms
    {
        private static readonly System.Timers.Timer aTimer = null;
        private static readonly IUnitOfWork unitOfWork;
        static SentBirthdaySms()
        {
            unitOfWork = new UnitOfWork();
            aTimer = new System.Timers.Timer();
            aTimer.Interval = 1000 * 60 * 1 ; //30 Minutes
            aTimer.Elapsed += OnTimerElapsed;
            aTimer.Enabled = true;
        }

        private static void OnTimerElapsed(object sender, ElapsedEventArgs e)
        {
            DateTime dt = DateTime.Now;

            if (dt.Hour == 10 && dt.Minute <= 15)
            {
                SendStudentBirthdaySms();
            }
        }

        private static void SendStudentBirthdaySms()
        {
            var StudentList = unitOfWork.AdmissionFormRepository.Get(x=>x.Status=="1").
                Where(u => Convert.ToDateTime(u.DOB)
                .AddYears(DateTime.Now.Year - Convert.ToDateTime(u.DOB).Year) >= DateTime.Now.Date && 
                Convert.ToDateTime(u.DOB).AddYears(DateTime.Now.Year - Convert.ToDateTime(u.DOB).Year) == DateTime.Now.Date.AddDays(3));

            foreach (var item in StudentList)
            {
                SMS.SendSMSApi("Happy birthday " + item.StFirstName + ". Many Many Happy Returns of the day!!" ,item.Contact);
            }
        }
    }
}