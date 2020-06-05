    
var mymainApp = angular.module('AngularApp', [
  'ngRoute',
  'myFilters',
  'MyFactory',
  'toaster',
  'ngSanitize',
  'chart.js',
  'angularUtils.directives.dirPagination'
]);


mymainApp.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/school', {
            templateUrl: './app/controller/school/School.html',
            controller: ''
        }).
          when('/dashboard', {
              templateUrl: './app/controller/Dashboard/Dashboard.html',
              controller: ''
          }).
        when('/session', {
            templateUrl: './app/controller/session/Session.html',
            controller: ''
        })
          .when('/student', {
              templateUrl: './app/controller/Student/StudentDetails.html',
              controller: ''
          }).
        when('/class', {
            templateUrl: './app/controller/Class/Class.html',
            controller: ''
        }).
        when('/FeeHeads', {
            templateUrl: './app/controller/Fee/FeeHeads.html',
            controller: ''
        }).
        when('/CollectFee', {
            templateUrl: './app/controller/Fee/CollectFee.html',
            controller: ''
        }).
        when('/fine', {
            templateUrl: './app/controller/Fee/Fine.html',
            controller: ''
        }).
        when('/headwiseReport', {
            templateUrl: './app/controller/Report/headwise.html',
            controller: ''
        }).
        when('/dailyReport', {
            templateUrl: './app/controller/Report/dailyReport.html',
            controller: ''
        }).
        when('/pendingFeeReport', {
            templateUrl: './app/controller/Report/pendingFeeReport.html',
            controller: ''
        }).
        when('/pendingFeeReportMonthWise', {
            templateUrl: './app/controller/Report/pendingFeeReportMonthWise.html',
            controller: ''
        }).
        when('/attendanceReport', {
            templateUrl: './app/controller/Report/attendanceReport.html',
            controller: ''
        }).
        when('/monthlyAttendanceReport', {
            templateUrl: './app/controller/Report/monthlyAttendanceReport.html',
            controller: ''
        }).
        when('/rteReport', {
            templateUrl: './app/controller/Report/rteReport.html',
            controller: ''
        }).
        when('/MultiChildReport', {
            templateUrl: './app/controller/Report/MultiChildReport.html',
            controller: ''
        }).
        when('/ConcessionReport', {
            templateUrl: './app/controller/Report/ConcessionReport.html',
            controller: ''
        }).
        when('/TransportReport', {
            templateUrl: './app/controller/Report/TransportReport.html',
            controller: ''
        }).
        when('/Admission', {
            templateUrl: './app/controller/Student/StAdmissionForm.html',
           controller: ''
        }).
        when('/FeeReceipt', {
            templateUrl: './app/partials/FeeReceipt.html',
            controller: ''
        }).
        when('/Transport', {
            templateUrl: './app/controller/Transport/Transport.html',
            controller: ''
        }).
        when('/Teacher', {
            templateUrl: './app/controller/Teacher/Teacher.html',
            controller: ''
        }).
        when('/Attendance', {
            templateUrl: './app/controller/Attendance/Attendance.html',
            controller: ''
        }).
        when('/TransferCertificate', {
            templateUrl: './app/controller/Certificate/TransferCertificate.html',
            controller: ''
        }).
        when('/BirthCertificate', {
            templateUrl: './app/controller/Certificate/BirthCertificate.html',
            controller: ''
        }).
        when('/LeavingCertificate', {
            templateUrl: './app/controller/Certificate/LeavingCertificate.html',
            controller: ''
        }).
        when('/SMS', {
            templateUrl: './app/controller/SMS/SMS.html',
            controller: ''
        }).
        when('/SMSPanel', {
            templateUrl: './app/controller/SMS/SMSPanel.html',
            controller: ''
        }).
        when('/homework', {
            templateUrl: './app/controller/Homework/Homework.html',
            controller: ''
        }).
        when('/InventoryCategory', {
            templateUrl: './app/controller/Inventory/InventoryCategory.html',
          controller: ''
        }).
        when('/InventoryItem', {
            templateUrl: './app/controller/Inventory/InventoryItem.html',
          controller: ''
        }).
        when('/InventoryIssue', {
            templateUrl: './app/controller/Inventory/InventoryIssue.html',
          controller: ''
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
  }]);