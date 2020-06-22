using System.Web;
using System.Web.Optimization;

namespace MvcApplication1
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new Bundle("~/bundles/jquery").Include(
                "~/Scripts/jquery.js",
                "~/Scripts/bootstrap.min.js",
                "~/Scripts/moment.min.js",
                "~/Scripts/bootstrap-datepicker.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new Bundle("~/bundles/angularjs").Include(
                        "~/app/components/angular/angular.js",
                        "~/app/components/angular/angular-sanitize.min.js",
                        "~/app/components/angular-route/angular-route.js",
                        "~/app/components/angular-resource/angular-resource.js",
                        "~/Scripts/Chart/Chart.min.js",
                        "~/Scripts/Chart/angular-chart.js",
                        "~/app/js/app.js",
                        "~/app/js/controllers.js",
                        "~/app/js/filters.js",
                        "~/app/js/services.js",
                        "~/app/Utility/toaster.js",
                        "~/app/controller/Dashboard/Dashboard.ctrl.js",
                        "~/app/controller/Dashboard/Dashboard.srvc.js",
                        "~/app/controller/Student/StudentDetailsctrl.js",
                        "~/app/controller/Student/StudentDetailservice.js",
                        "~/app/controller/Class/Class.ctrl.js",
                        "~/app/controller/Class/Class.srvc.js",
                        "~/app/controller/Fee/CollectFee.ctrl.js",
                        "~/app/controller/Fee/CollectFee.srvc.js",
                        "~/app/controller/Fee/FeeHeads.ctrl.js",
                        "~/app/controller/Fee/FeeHeads.srvc.js",
                         "~/app/controller/Fee/Fine.ctrl.js",
                        "~/app/controller/Fee/Fine.srvc.js",
                        "~/app/controller/Report/Report.ctrl.js",
                        "~/app/controller/Report/PendingFeeReport.ctrl.js",
                        "~/app/controller/Report/pendingFeeReportMonthWise.ctrl.js",
                        "~/app/controller/Report/Report.srvc.js",
                        "~/app/controller/Report/attendanceReport.ctrl.js",
                        "~/app/controller/Report/monthlyAttendanceReport.ctrl.js",
                        "~/app/controller/Report/rteReport.ctrl.js",
                        "~/app/controller/Report/MultiChildReport.ctrl.js",
                        "~/app/controller/Report/ConcessionReport.ctrl.js",
                        "~/app/controller/Report/TransportReport.ctrl.js",
                        "~/app/controller/Transport/Transport.ctrl.js",
                        "~/app/controller/Transport/Transport.srvc.js",
                        "~/app/controller/Hobby/Hobby.ctrl.js",
                        "~/app/controller/Hobby/Hobby.srvc.js",
                         "~/app/controller/Teacher/Teacher.ctrl.js",
                        "~/app/controller/Teacher/Teacher.srvc.js",
                        "~/app/controller/Attendance/Attendance.ctrl.js",
                        "~/app/controller/Attendance/Attendance.srvc.js",
                        "~/app/controller/Certificate/Certificate.ctrl.js",
                        "~/app/controller/Student/StAdmissionForm.Ctrl.js",
                        "~/app/controller/Common/Common.srvc.js",
                        "~/app/controller/SMS/SMS.ctrl.js",
                        "~/app/controller/SMS/SMS.srvc.js",
                        "~/app/controller/SMS/SMSPanel.ctrl.js",
                        "~/app/controller/SMS/SMSPanel.srvc.js",
                        "~/app/controller/School/School.ctrl.js",
                        "~/app/controller/School/School.srvc.js",
                         "~/app/controller/School/House.ctrl.js",
                        "~/app/controller/School/House.srvc.js",
                        "~/app/controller/Session/Session.ctrl.js",
                        "~/app/controller/Session/Session.srvc.js",
                        "~/app/controller/Homework/Homework.ctrl.js",
                        "~/app/controller/Homework/Homework.srvc.js",
                        "~/app/controller/Inventory/InventoryCategory.ctrl.js",
                        "~/app/controller/Inventory/InventoryCategory.srvc.js",
                        "~/app/controller/Inventory/InventoryItem.ctrl.js",
                        "~/app/controller/Inventory/InventoryItem.srvc.js",
                        "~/app/controller/Inventory/InventoryIssue.ctrl.js",
                        "~/app/controller/Inventory/InventoryIssue.srvc.js",
                        "~/app/directive/DatePicker.js",
                        "~/app/directive/loading.js",
                        "~/app/directive/fileUploader.js",
                        "~/app/Filter/DateFilter.js",
                        "~/app/Utility/dirPagination.js"));
                        //"~/app/Utility/toastr.js",
                        //"~/app/js/services.js"

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));
            
            bundles.Add(new StyleBundle("~/bootstrap/css").Include(
                "~/css/bootstrap.min.css",
                "~/app/css/toaster.css",
                "~/css/gistfile1.css",
                "~/app/css/app.css",
                "~/css/datepicker3.min.css"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      //"~/css/bootstrap.min.css",
                      //"~/css/bootstrap-rtl.min.css",
                      // "~/css/sb-admin.css",
                      //"~/css/sb-admin-rtl.css",
                      // "~/css/plugins/morris.css",
                      "~/app/app.css"));
        }
    }
}