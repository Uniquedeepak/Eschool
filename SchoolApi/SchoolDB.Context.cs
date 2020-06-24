﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SchoolApi
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class wisdomDBEntities : DbContext
    {
        public wisdomDBEntities()
            : base("name=wisdomDBEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<AdmissionFee> AdmissionFees { get; set; }
        public DbSet<Advanced> Advanceds { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<EmployeeEntry> EmployeeEntries { get; set; }
        public DbSet<EmployeeSalaryDetail> EmployeeSalaryDetails { get; set; }
        public DbSet<FeesHeading> FeesHeadings { get; set; }
        public DbSet<FeesPlan> FeesPlans { get; set; }
        public DbSet<Heading> Headings { get; set; }
        public DbSet<House> Houses { get; set; }
        public DbSet<InventoryCategory> InventoryCategories { get; set; }
        public DbSet<InventoryEntry> InventoryEntries { get; set; }
        public DbSet<InventoryIssue> InventoryIssues { get; set; }
        public DbSet<InventoryIssueDetail> InventoryIssueDetails { get; set; }
        public DbSet<InventoryItem> InventoryItems { get; set; }
        public DbSet<Licience_Key> Licience_Key { get; set; }
        public DbSet<NewFeeHeading> NewFeeHeadings { get; set; }
        public DbSet<PassoutDetail> PassoutDetails { get; set; }
        public DbSet<ReportCard> ReportCards { get; set; }
        public DbSet<ReportCardMark> ReportCardMarks { get; set; }
        public DbSet<Setting> Settings { get; set; }
        public DbSet<StAttendance> StAttendances { get; set; }
        public DbSet<StudentAdmissionDetail> StudentAdmissionDetails { get; set; }
        public DbSet<StudentAttendence> StudentAttendences { get; set; }
        public DbSet<StudentRegisteredDetail> StudentRegisteredDetails { get; set; }
        public DbSet<StudentTransportCharge> StudentTransportCharges { get; set; }
        public DbSet<SubjectDetail> SubjectDetails { get; set; }
        public DbSet<TblLoginAdmin> TblLoginAdmins { get; set; }
        public DbSet<TC> TCs { get; set; }
        public DbSet<TCData> TCDatas { get; set; }
        public DbSet<TeacherAss> TeacherAsses { get; set; }
        public DbSet<TransportCharge> TransportCharges { get; set; }
        public DbSet<TblLoginUser> TblLoginUsers { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Fine> Fines { get; set; }
        public DbSet<tbl_homework> tbl_homework { get; set; }
        public DbSet<AdmissionForm> AdmissionForms { get; set; }
        public DbSet<Month> Months { get; set; }
        public DbSet<Hobby> Hobbies { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<StudentFeeDetail> StudentFeeDetails { get; set; }
    }
}
