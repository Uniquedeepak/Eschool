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
            aTimer.Interval = 1000 * 60 * 30 ; //30 Minutes
            aTimer.Elapsed += OnTimerElapsed;
            aTimer.Enabled = true;
        }

        private static void OnTimerElapsed(object sender, ElapsedEventArgs e)
        {
            DateTime dt = DateTime.Now;

            if (dt.Hour == 10 && dt.Minute <= 30)
            {
                SendStudentBirthdaySms();
            }
        }

        private static void SendStudentBirthdaySms()
        {
            var StudentList = (from emp in unitOfWork.AdmissionFormRepository.Get()
                         where emp.DOB.HasValue == true
                                    && emp.DOB.Value.Day == DateTime.Now.Day && emp.DOB.Value.Month == DateTime.Now.Month
                        select new {
                            StFirstName = emp.StFirstName,
                            Contact = emp.Contact
                                 }).ToList();
            var schoolName = unitOfWork.SchoolRepository.Get().FirstOrDefault().SchoolName;
            foreach (var item in StudentList)
            {
                if (!string.IsNullOrEmpty(item.Contact))
                {
                    SMS.SendSMSApi($"{schoolName} Family wishes you a very Happy Birthday {item.StFirstName }.", item.Contact);
                }
            }
        }
    }
}