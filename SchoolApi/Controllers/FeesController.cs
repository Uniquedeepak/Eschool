using SchoolApi.BAL;
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
    public class FeesController : ApiController
    {
        private readonly wisdomDBEntities SchoolDB = null;
        private readonly string SchoolSession;
        public FeesController()
        {
            SchoolDB = new wisdomDBEntities();
            SchoolSession = PropertiesConfiguration.ActiveSession;
        }

        // GET api/school/5
        public List<StudentFeeDetail> GetStudentFeeDetail(string AdmNo, string Session)
        {
            string admissionNo = AdmNo.ToString();
            ClassController _class = new ClassController();
            var StFeeDetail = (from x in SchoolDB.StudentFeeDetails
                               where x.AdmissionNo.Equals(admissionNo) && x.Session.Equals(Session) 
                               orderby x.Id descending 
                               select x);
            var StFeeDetails = StFeeDetail.ToList();
            StFeeDetails.ForEach(x => x.Class = _class.GetClassName(x.Class));
            return StFeeDetails;
        }

        public List<StudentFeeDetail> GetTopFeeDetail(string Session, string Class = "1")
        {
            var stFeeDetailList = from r in SchoolDB.AdmissionForms
                                  join sfd in SchoolDB.StudentFeeDetails on r.AdmissionNo equals sfd.AdmissionNo into edept
                                  where r.Class == Class && r.ESession.Equals(Session)
                                  from p in edept.DefaultIfEmpty()

                                  select new
                                  {
                                      AdmissionNo = r.AdmissionNo == null ? "" : r.AdmissionNo,
                                      AdmissionFee = p.AdmissionFee == null ? "" : p.AdmissionFee,
                                      Balance = p.Balance == null ? "" : p.Balance,
                                      BalancedShow = p.BalancedShow == null ? "" : p.BalancedShow,
                                      BankName = p.BankName == null ? "" : p.BankName,
                                      CardPaymentRecieptNo = p.CardPaymentRecieptNo == null ? "" : p.CardPaymentRecieptNo,
                                      Category = r.Category == null ? "" : r.Category,
                                      ChequeDate = p.ChequeDate == null ? "" : p.ChequeDate,
                                      ChequeNo = p.ChequeNo == null ? "" : p.ChequeNo,
                                      Class = r.Class == null ? "" : r.Class,
                                      Concession = p.Concession == null ? "" : p.Concession,
                                      Date = p.Date == null ? "" : p.Date,
                                      Father = r.FatherName == null ? "" : r.FatherName,
                                      Fine = p.Fine == null ? "" : p.Fine,
                                      GrandTotal = p.GrandTotal == null ? 0 : p.GrandTotal,
                                      Id = p.Id == null ? 0 : p.Id,
                                      Months = p.Months == null ? "" : p.Months,
                                      Name = r.StFirstName == null ? "" : r.StFirstName,
                                      OldBalanced = p.OldBalanced == null ? "" : p.OldBalanced,
                                      PaidAmount = p.PaidAmount == null ? 0 : p.PaidAmount,
                                      PaymentMode = p.PaymentMode == null ? "" : p.PaymentMode,
                                      Phone = r.Contact == null ? "" : r.Contact,
                                      PreviousDue = p.PreviousDue == null ? "" : p.PreviousDue,
                                      ReciptNo = p.ReciptNo == null ? "" : p.ReciptNo,
                                      Remark = p.Remark == null ? "" : p.Remark,
                                      Section = r.Section == null ? "" : r.Section,
                                      Session = r.ESession == null ? "" : r.ESession,
                                      Status = r.Status == null ? "" : r.Status,
                                      TotalAmount = p.TotalAmount == null ? "" : p.TotalAmount,
                                      TransportFee = p.TransportFee == null ? "" : p.TransportFee
                                  };
            var stFeeDetails = stFeeDetailList.Distinct().ToList();
            List<StudentFeeDetail> StFeeDetails = stFeeDetails.Select(a => new StudentFeeDetail()
            {
                AdmissionFee = a.AdmissionFee,
                AdmissionNo = a.AdmissionNo,
                Balance = (Convert.ToInt32(string.IsNullOrEmpty(a.Balance) ? "0" : a.Balance) + GetBalanceAmount(a.AdmissionNo, a.Class, a.Months)).ToString(),
                BalancedShow = a.BalancedShow,
                BankName = a.BankName,
                CardPaymentRecieptNo = a.CardPaymentRecieptNo,
                Category = a.Category,
                ChequeDate = a.ChequeDate,
                ChequeNo = a.ChequeNo,
                Class = a.Class,
                Concession = a.Concession,
                Date = a.Date,
                Father = a.Father,
                Fine = a.Fine,
                GrandTotal = a.GrandTotal,
                Id = a.Id,
                Months = a.Months,
                Name = a.Name,
                OldBalanced = a.OldBalanced,
                PaidAmount = a.PaidAmount,
                PaymentMode = a.PaymentMode,
                Phone = a.Phone,
                PreviousDue = a.PreviousDue,
                ReciptNo = a.ReciptNo,
                Remark = a.Remark,
                Section = a.Section,
                Session = a.Section,
                Status = a.Status,
                TotalAmount = a.TotalAmount,
                TransportFee = a.TransportFee
            }).ToList();

            ClassController _class = new ClassController();
            StFeeDetails.ForEach(cc => cc.Class = _class.GetClassName(cc.Class));
            var Sortlist = StFeeDetails.OrderBy(a => a.Id).GroupBy(a => a.AdmissionNo).Select(g => g.Last()).ToList();
            return Sortlist;
        }

        private int GetBalanceAmount(string AdmNo ,string Class,string Months)
        {
            var Monthlist = SchoolDB.Months.OrderBy(x => x.Sequence).ToList();
            List<string> MonthList = new List<string>();
            string[] selectedMonths = Months.Split(',');
            string SelectedMonth = selectedMonths.Take(selectedMonths.Length-1).FirstOrDefault();
            int MonthID = Monthlist.Where(x => x.Month1.Equals(SelectedMonth)).Select(x=>x.Id).FirstOrDefault();

            var _months = Monthlist.Where(x => x.Id >= MonthID).ToList();
            foreach (var item in _months)
            {
                if ((DateTime.Now.Month+1) == item.Id)
                    break;
                if (!Months.Contains(item.Month1))
                    MonthList.Add(item.Month1);    
            }
            
            Int32 amount = 0;
            foreach (var item in MonthList)
            {
                switch (item)
                {
                    case "January":
                        amount += Convert.ToInt32(SchoolDB.NewFeeHeadings.Where(x=>x.Class == Class).Select(x=>x.January).FirstOrDefault());
                        break;
                    case "February":
                        amount += Convert.ToInt32(SchoolDB.NewFeeHeadings.Where(x=>x.Class == Class).Select(x=>x.February).FirstOrDefault());
                        break;
                    case "March":
                        amount += Convert.ToInt32(SchoolDB.NewFeeHeadings.Where(x=>x.Class == Class).Select(x=>x.March).FirstOrDefault());
                        break;
                    case "April":
                        amount += Convert.ToInt32(SchoolDB.NewFeeHeadings.Where(x=>x.Class == Class).Select(x=>x.April).FirstOrDefault());
                        break;
                    case "May":
                        amount += Convert.ToInt32(SchoolDB.NewFeeHeadings.Where(x=>x.Class == Class).Select(x=>x.May).FirstOrDefault());
                        break;
                    case "June":
                        amount += Convert.ToInt32(SchoolDB.NewFeeHeadings.Where(x=>x.Class == Class).Select(x=>x.June).FirstOrDefault());
                        break;
                    case "July":
                        amount += Convert.ToInt32(SchoolDB.NewFeeHeadings.Where(x=>x.Class == Class).Select(x=>x.July).FirstOrDefault());
                        break;
                    case "August":
                        amount += Convert.ToInt32(SchoolDB.NewFeeHeadings.Where(x=>x.Class == Class).Select(x=>x.August).FirstOrDefault());
                        break;
                    case "September":
                        amount += Convert.ToInt32(SchoolDB.NewFeeHeadings.Where(x=>x.Class == Class).Select(x=>x.September).FirstOrDefault());
                        break;
                    case "October":
                        amount += Convert.ToInt32(SchoolDB.NewFeeHeadings.Where(x=>x.Class == Class).Select(x=>x.October).FirstOrDefault());
                        break;
                    case "November":
                        amount += Convert.ToInt32(SchoolDB.NewFeeHeadings.Where(x=>x.Class == Class).Select(x=>x.November).FirstOrDefault());
                        break;
                    case "December":
                        amount += Convert.ToInt32(SchoolDB.NewFeeHeadings.Where(x => x.Class == Class).Select(x => x.December).FirstOrDefault());
                        break;
                }
            }

            var OtherAmount = SchoolDB.AdmissionForms.Where(x => x.AdmissionNo == AdmNo && x.ESession == SchoolSession).ToList()
                                    .Select(x => 
                                        Convert.ToInt32(x.PreviousDue) + 
                                        (Convert.ToInt32(x.Transport_Charge) * MonthList.Count) -
                                        (Convert.ToInt32(x.Concession) * MonthList.Count));
            return amount + Convert.ToInt32(OtherAmount.FirstOrDefault());
        }

        public List<StudentFeeDetail> GetAllSubmitedFeeDetail(string Session)
        {
            var StFeeDetail = (from x in SchoolDB.StudentFeeDetails
                               where x.Session.Equals(Session)
                               orderby x.Id descending
                               select x);
            var StFeeDetails = StFeeDetail.ToList();
            ClassController _class = new ClassController();
            StFeeDetails.ForEach(x=>x.Class=_class.GetClassName(x.Class));
            return StFeeDetails;
        }

        public List<NewFeeHeading> GetNewFeeHeading(string SelectedClass)
        {
            ClassController _class = new ClassController();
            string Selected = _class.GetClassID(SelectedClass).ToString();
            var classFeeDetail = (from x in SchoolDB.NewFeeHeadings
                                  where x.Class.Equals(Selected)
                               select x);
            var classFeeDetails = classFeeDetail.ToList();
            return classFeeDetails;
        }
       
        public List<NewFeeHeading> GetAllNewFeeHeading()
        {
            var classFeeDetail = (from x in SchoolDB.NewFeeHeadings
                                  select x);
            ClassController _class = new ClassController();
            classFeeDetail.ToList().ForEach(x=>x.Class=_class.GetClassName(x.Class));
            List<NewFeeHeading> FeeHeading = classFeeDetail.ToList();
            return FeeHeading;
        }

        public decimal GetStudentFine(string AdmissionNo)
        {
            Fee obj = new Fee();
            var fine = obj.GetFine(AdmissionNo);
            return fine;
        }

        public List<AdmissionFee> GetAdmissionFee()
        {
            var StAdmissionFee = SchoolDB.AdmissionFees.OrderByDescending(x => x.AID).ToList();
            return StAdmissionFee;
        }

        //insert stFeeDetail
        public HttpResponseMessage Post(StudentFeeDetail stFeeDetail)
        {
            HttpRequestMessage Request = new HttpRequestMessage();
            Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());
            
            if (ModelState.IsValid)
            {
                ClassController _class = new ClassController();
                stFeeDetail.Class = Convert.ToString( _class.GetClassID(stFeeDetail.Class));
                SchoolDB.StudentFeeDetails.Add(stFeeDetail);
                SchoolDB.SaveChanges();
                stFeeDetail.Class = Convert.ToString(_class.GetClassName(stFeeDetail.Class));
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, stFeeDetail);
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        public StudentFeeDetail Delete(int Id)
        {
            StudentFeeDetail student = SchoolDB.StudentFeeDetails.Find(Id);
            if (student == null)
            {
                return student;
            }
            SchoolDB.StudentFeeDetails.Remove(student);
            try
            {
                SchoolDB.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return student;
            }
            return student;
        }

        [HttpPut]
        public bool Put(string AdmissionNo, StudentFeeDetail studentFeeDetail)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }
            if (AdmissionNo != studentFeeDetail.AdmissionNo)
            {
                return false;
            }
            SchoolDB.Entry(studentFeeDetail).State = EntityState.Modified;
            try
            {
                SchoolDB.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return false;
            }
            return true;
        }

        public List<StudentFeeDetail> GetPendingFee(string Class, string Months)
        {
            List<StudentFeeDetail> obj = new List<StudentFeeDetail>();
            Fee objFee = new Fee();
            obj = objFee.GetMonthlyPendingFee(Class,Months);
            return obj;
        }

        #region Fee Heading
        public List<NewFeeHeading> GetFeeHeads()
        {
            ClassController _class = new ClassController();
            var NewFeeHeadings = SchoolDB.NewFeeHeadings.OrderBy(x => x.FID).ToList();
            NewFeeHeadings.ForEach(x => x.Class = _class.GetClassName(x.Class));
            return NewFeeHeadings;
        }

        //insert stFeeDetail
        public HttpResponseMessage AddFeeHead(NewFeeHeading newFeeHeading)
        {
            HttpRequestMessage Request = new HttpRequestMessage();
            Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());

            if (ModelState.IsValid)
            {
                ClassController _class = new ClassController();
                newFeeHeading.Class = Convert.ToString(_class.GetClassID(newFeeHeading.Class));
                SchoolDB.NewFeeHeadings.Add(newFeeHeading);
                SchoolDB.SaveChanges();
                newFeeHeading.Class = Convert.ToString(_class.GetClassName(newFeeHeading.Class));
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, newFeeHeading);
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        public NewFeeHeading DeleteFeeHead(int Id)
        {
            NewFeeHeading FeeHeading = SchoolDB.NewFeeHeadings.Find(Id);
            if (FeeHeading == null)
            {
                return FeeHeading;
            }
            SchoolDB.NewFeeHeadings.Remove(FeeHeading);
            try
            {
                SchoolDB.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return FeeHeading;
            }
            return FeeHeading;
        }

        [HttpPut]
        public bool UpdateFeeHead(int FID, NewFeeHeading newFeeHeading)
        {
            ClassController _class = new ClassController();
            if (!ModelState.IsValid)
            {
                return false;
            }
            if (FID != newFeeHeading.FID)
            {
                return false;
            }
            
            newFeeHeading.Class = Convert.ToString(_class.GetClassID(newFeeHeading.Class));
            SchoolDB.Entry(newFeeHeading).State = EntityState.Modified;
            try
            {
                SchoolDB.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return false;
            }
            return true;
        }
        #endregion

        //prevent memory leak
        protected override void Dispose(bool disposing)
        {
            SchoolDB.Dispose();
            base.Dispose(disposing);
        }
    }

}
