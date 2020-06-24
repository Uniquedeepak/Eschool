using GenericAPI.UnitOfWork;
using Microsoft.Ajax.Utilities;
using SchoolApi.Controllers;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.InteropServices;
using System.Web;

namespace SchoolApi.BAL
{
    public class Fee
    {
        private readonly IUnitOfWork unitOfWork;
        public Fee()
        {
            this.unitOfWork = new UnitOfWork();
        }
        public decimal GetFine(string AdmissionNo)
        {
            decimal fine = 0;
            try
            {
                int TodayDay = Convert.ToInt32(DateTime.Now.ToString("dd"));
                int CurrentMonth = Convert.ToInt32(DateTime.Now.ToString("MM"));
                int CurrentYear = Convert.ToInt32(DateTime.Now.ToString("yyyy"));
                int LastFeeMonth = 0;

                Fine fineDetail = unitOfWork.FineRepository.GetFirstOrDefault(x => x.Name == "Fee");

                string CollectedMonths = unitOfWork.StudentFeeDetailRepository.
                    Get(x => x.AdmissionNo.Equals(AdmissionNo) && x.Session.Equals(PropertiesConfiguration.ActiveSession), odr => odr.OrderByDescending(i=>i.Id)).
                    FirstOrDefault()?.Months;


                #region Last Fee Month
                if (CollectedMonths !=null)
                {
                    var CollectedLastMonth = CollectedMonths.Split(',');
                    if (CollectedLastMonth.Length > 1)
                    {
                        var FeeLastMonth = CollectedLastMonth[CollectedLastMonth.Length - 2];
                        LastFeeMonth = DateTimeFormatInfo.CurrentInfo.MonthNames.ToList().IndexOf(FeeLastMonth) + 1;
                    }
                }
                
                # endregion

                #region Year Check
                if (CurrentYear >Convert.ToInt32(PropertiesConfiguration.ActiveSession.Split('-').First()))
                {
                    fine = Convert.ToDecimal( fineDetail?.Amount * (12 - LastFeeMonth));
                    return fine;
                }
                #endregion

                if (TodayDay > fineDetail.FineDay && fineDetail.StartMonth < CurrentMonth)
                {
                    LastFeeMonth = LastFeeMonth <=0 ? Convert.ToInt32(fineDetail.StartMonth)-1 : LastFeeMonth; 
                    fine = Convert.ToDecimal(fineDetail.Amount * (CurrentMonth - LastFeeMonth));
                }
            }
            catch (Exception ex)
            {
                fine = 0;
            }
            return fine;
        }
        public List<StudentFeeDetail> GetMonthlyPendingFee(string Class, string filterMonth)
        {
            List<StudentFeeDetail> obj = new List<StudentFeeDetail>();
            ClassController _class = new ClassController();
            try
            {
                #region Student and Fee Collection
                var students = unitOfWork.AdmissionFormRepository.Get(x => x.Class.Equals(Class) &&
                                                            x.ESession.Equals(PropertiesConfiguration.ActiveSession));
                List<StudentFeeDetail> studentfees = (from c in unitOfWork.StudentFeeDetailRepository.Get(x => x.Class.Equals(Class) && x.Session.Equals(PropertiesConfiguration.ActiveSession),x=>x.OrderByDescending(p=>p.Id))
                                  group c by c.AdmissionNo into gcs
                                    select new StudentFeeDetail()
                                    {
                                        AdmissionNo = gcs.Key,Name=gcs.FirstOrDefault().Name,
                                        Class = gcs.FirstOrDefault().Class,
                                        Date = gcs.FirstOrDefault().Date,
                                        Months = string.Join("", gcs.Select(x => x.Months).ToList()),
                                        Balance = gcs.FirstOrDefault().Balance,
                                        GrandTotal = (gcs.Sum(x=>x.GrandTotal) - Convert.ToDecimal(gcs.Sum(x => Convert.ToDecimal(x.OldBalanced)))),
                                        PaidAmount = gcs.Sum(x=>x.PaidAmount),

                                    }).ToList();

                List<StudentFeeDetail> StudentFeeInfo = (from student in students
                                 join studentfee in studentfees
                                 on student.AdmissionNo equals studentfee.AdmissionNo into studentInfo
                                 from selectedstudentfee in studentInfo.DefaultIfEmpty()
                                 select new StudentFeeDetail()
                                 {
                                     AdmissionNo = student?.AdmissionNo ?? string.Empty,
                                     Name = student?.StFirstName ?? string.Empty,
                                     Class = student?.Class ?? string.Empty,
                                     Date = selectedstudentfee?.Date ?? string.Empty,
                                     Months = selectedstudentfee?.Months ?? string.Empty,
                                     Balance = selectedstudentfee?.Balance ?? string.Empty,
                                     GrandTotal = selectedstudentfee?.GrandTotal ?? 0,
                                     PaidAmount = selectedstudentfee?.PaidAmount ?? 0,
                                     TransportFee = student?.Transport_Charge ?? string.Empty,
                                     Concession = student?.Concession ?? string.Empty,
                                 }).ToList();
                #endregion
                
                decimal amount;
                foreach (var item in StudentFeeInfo)
                {
                    var defineMonths = unitOfWork.MonthRepository.Get(orderBy:x=>x.OrderBy(l=>l.Sequence)).TakeWhile(x => x.Sequence <= Convert.ToInt32(filterMonth)).ToList();
                    string filterMonthText = defineMonths.Where(x => x.Sequence == Convert.ToInt32(filterMonth)).Select(x=>x.Month1).FirstOrDefault();
                    if (!item.Months.Contains(filterMonthText))
                    {
                        var selectedMonths = item.Months.Split(',').ToList();
                        var months = defineMonths.Select(x=>x.Month1).Union(selectedMonths).Except(defineMonths.Select(x => x.Month1).Intersect(selectedMonths));
                        GetFeeByClass(Class, months.ToList() , out amount);
                        amount += Convert.ToDecimal(string.IsNullOrEmpty(item.Balance)?"0": item.Balance);
                        decimal otherBalance = ((Convert.ToDecimal(string.IsNullOrEmpty(item?.TransportFee)?"0":item?.TransportFee) - Convert.ToDecimal(item.Concession)) * months.Count() - 1);
                        item.Balance = Convert.ToString(amount);
                    }
                }
                StudentFeeInfo.ToList().ForEach(cc => cc.Status = Convert.ToInt32(cc.Balance) > 0 ? "Pending":"Done");
                StudentFeeInfo.ForEach(cc => cc.Class = _class.GetClassName(cc.Class));
                obj = StudentFeeInfo;
            }
            catch (Exception ex)
            {
                obj = null;
            }
            return obj;
        }

        private void GetFeeByClass(string Class,List<string> Months, out decimal amount)
        {
            var query = unitOfWork.FeeHeadingRepository.Get(x => x.Class.Equals(Class)).ToList();
            amount = 0;
            foreach (var item in Months)
            {
                if (!string.IsNullOrEmpty(item) && item != "null")
                {
                    foreach (var heading in query)
                    {
                        amount += Convert.ToDecimal(heading.GetType().GetProperty(item).GetValue(heading));
                    }
                }
            }
        }
    }
}