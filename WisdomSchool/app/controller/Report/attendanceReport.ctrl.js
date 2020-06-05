(function () {
    'use strict';
    var controllerId = 'AttendanceReportCtrl';

    var myApp = angular.module('AngularApp').controller(controllerId,
        ['$scope',
         '$rootScope',
         'ReportSrvc',
         'Excel',
         '$timeout',
         'StudentDetailservice',
         'ClassService',
          
         '$location',
          AttendanceReportCtrlFn
        ]);

    function AttendanceReportCtrlFn($scope,$rootScope, ReportSrvc, Excel, $timeout, StudentDetailservice,ClassService, $location) {
        $scope.heading = "Attendance Report";
        $scope.subheading = "Detail";
        $scope.currentPage = 1;
        $scope.pageSize = 10;

        $scope.moment = moment;
        $scope.stDate = new Date();
        $scope.toDate = new Date();
        //$scope.fromDate = new Date();
        //$scope.toDate = new Date();
        
        $scope.isLoading = true;
        ClassService.getClassDetails(successCallBack, failureCallBack);
        ReportSrvc.getAttendanceDetail($rootScope.schoolSession, successCallBack, failureCallBack);
       
        function successCallBack(call, data) {
            switch (call) {
                case 'getClassDetails':
                    if (data) {
                        $scope.Classes = data;
                        break;
                    }
                    break;
                case 'getAttendanceDetail':
                    
                    if (data) {
                        $scope.isLoading = false;
                        $scope.AttendanceDetail = data;
                        break;
                    }
                    break;
               
            }
        };

        function failureCallBack(call, data) {
            switch (call) {
                case 'getClassDetails':
                    $scope.isLoading = false;
                    break;
                case 'getAttendanceDetail':
                    $scope.isLoading = false;
                    break;
            }
        };

        $scope.exportToExcel = function (tableId) { // ex: '#my-table'
            $scope.exportHref = Excel.tableToExcel(tableId, 'sheet name');
            $timeout(function () { location.href = $scope.exportHref; }, 100); // trigger download
        }

        $scope.printDiv = function (divName) {
            var printContents = document.getElementById(divName).innerHTML;
            var popupWin = window.open('', '_blank', 'width=300,height=300');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
        }

        $scope.filterItems = {
            NURSERY: true,
        };

        $scope.testFilter = function (Items) {
            if (typeof $scope.filterItems != 'undefined') {
                return $scope.filterItems[Items.StClass];
            }
        };
    }

    myApp.filter('selectedDate', function ()
    {
        return function (items, stDate, toDate) {
            var filtered = [];
            if (typeof stDate == 'undefined' || stDate == "")
            {
                stDate = "01/01/2000";
            }
            if (typeof toDate == 'undefined' || toDate == "") {
                toDate = "12/30/2020";
            }
            //here you will have your desired input
            
            stDate = new Date(stDate);
            stDate.setDate(stDate.getDate());
            toDate = new Date(toDate);
            var to_date = Date.parse(moment(toDate).format('MM/DD/YYYY'));
            var st_Date = Date.parse(moment(stDate).format('MM/DD/YYYY'));
            angular.forEach(items, function (item) {
                var itemDate = Date.parse(moment(item.Date).format('MM/DD/YYYY'));
                if (itemDate >= st_Date && itemDate <= to_date) {
                    filtered.push(item);
                }
            });
            return filtered;
        };
    });

})();



