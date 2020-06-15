using GenericAPI.Repository;
using SchoolApi;

namespace GenericAPI.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork, System.IDisposable
    {
        private readonly wisdomDBEntities _context;

        private IGenericRepository<AdmissionForm> _AdmissionFormRepository;
        private IGenericRepository<Fine> _fineRepository;
        private IGenericRepository<Class> _classRepository;
        private IGenericRepository<tbl_homework> _homeworkRepository;
        private IGenericRepository<EmployeeEntry> _employeeRepository;
        private IGenericRepository<TransportCharge> _transportRepository;
        private IGenericRepository<TeacherAss> _teacherRepository;
        private IGenericRepository<School> _schoolRepository;
        private IGenericRepository<Session> _sessionRepository;
        private IGenericRepository<InventoryCategory> _InventoryCategoryRepository;
        private IGenericRepository<InventoryItem> _InventoryItemRepository;
        private IGenericRepository<InventoryIssue> _InventoryIssueRepository;
        private IGenericRepository<Month> _MonthRepository;
        private IGenericRepository<StudentFeeDetail> _StudentFeeDetailRepository;
        private IGenericRepository<NewFeeHeading> _FeeHeadingRepository;

        public UnitOfWork()
        {
            _context = new wisdomDBEntities();
        }

        public IGenericRepository<AdmissionForm> AdmissionFormRepository
        {
            get { return _AdmissionFormRepository ?? (_AdmissionFormRepository = new GenericRepository<AdmissionForm>(_context)); }
        }
        public IGenericRepository<Fine> FineRepository
        {
            get { return _fineRepository ?? (_fineRepository = new GenericRepository<Fine>(_context)); }
        }
        public IGenericRepository<Class> ClassRepository
        {
            get { return _classRepository ?? (_classRepository = new GenericRepository<Class>(_context)); }
        }
        public IGenericRepository<tbl_homework> HomeworkRepository
        {
            get { return _homeworkRepository ?? (_homeworkRepository = new GenericRepository<tbl_homework>(_context)); }
        }
        public IGenericRepository<EmployeeEntry> EmployeeRepository
        {
            get { return _employeeRepository ?? (_employeeRepository = new GenericRepository<EmployeeEntry>(_context)); }
        }
        public IGenericRepository<TransportCharge> TransportRepository
        {
            get { return _transportRepository ?? (_transportRepository = new GenericRepository<TransportCharge>(_context)); }
        }
        public IGenericRepository<TeacherAss> TeacherRepository
        {
            get { return _teacherRepository ?? (_teacherRepository = new GenericRepository<TeacherAss>(_context)); }
        }
        public IGenericRepository<School> SchoolRepository
        {
            get { return _schoolRepository ?? (_schoolRepository = new GenericRepository<School>(_context)); }
        }
        public IGenericRepository<Session> SessionRepository
        {
            get { return _sessionRepository ?? (_sessionRepository = new GenericRepository<Session>(_context)); }
        }
        public IGenericRepository<InventoryCategory> InventoryCategoryRepository
        {
            get { return _InventoryCategoryRepository ?? (_InventoryCategoryRepository = new GenericRepository<InventoryCategory>(_context)); }
        }
        public IGenericRepository<InventoryItem> InventoryItemRepository
        {
            get { return _InventoryItemRepository ?? (_InventoryItemRepository = new GenericRepository<InventoryItem>(_context)); }
        }
        public IGenericRepository<InventoryIssue> InventoryIssueRepository
        {
            get { return _InventoryIssueRepository ?? (_InventoryIssueRepository = new GenericRepository<InventoryIssue>(_context)); }
        }
        public IGenericRepository<Month> MonthRepository
        {
            get { return _MonthRepository ?? (_MonthRepository = new GenericRepository<Month>(_context)); }
        }
        public IGenericRepository<StudentFeeDetail> StudentFeeDetailRepository
        {
            get { return _StudentFeeDetailRepository ?? (_StudentFeeDetailRepository = new GenericRepository<StudentFeeDetail>(_context)); }
        }

        public IGenericRepository<NewFeeHeading> FeeHeadingRepository =>  _FeeHeadingRepository ?? (_FeeHeadingRepository = new GenericRepository<NewFeeHeading>(_context));

        public void Save()
        {
            _context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            System.GC.SuppressFinalize(this);
        }
    }
}