using GenericAPI.Repository;
using SchoolApi;

namespace GenericAPI.UnitOfWork
{
    public interface IUnitOfWork
    {
        IGenericRepository<AdmissionForm> AdmissionFormRepository { get; }
        IGenericRepository<Fine> FineRepository { get; }
        IGenericRepository<Class> ClassRepository { get; }
        IGenericRepository<tbl_homework> HomeworkRepository { get; }
        IGenericRepository<EmployeeEntry> EmployeeRepository { get; }
        IGenericRepository<TransportCharge> TransportRepository { get; }
        IGenericRepository<TeacherAss> TeacherRepository { get; }
        IGenericRepository<School> SchoolRepository { get; }
        IGenericRepository<Session> SessionRepository { get; }
        IGenericRepository<InventoryCategory> InventoryCategoryRepository { get; }
        IGenericRepository<InventoryItem> InventoryItemRepository { get; }
        IGenericRepository<InventoryIssue> InventoryIssueRepository { get; }
        
        void Save();
    }
}