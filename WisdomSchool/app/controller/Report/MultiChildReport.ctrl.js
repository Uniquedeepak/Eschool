(function () {
    'use strict';
    var controllerId = 'MultiChildReportCtrl';

    var myApp = angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'ReportSrvc',
         'Excel',
         '$timeout',
         'StudentDetailservice',
          
         '$location',
          MultiChildReportCtrlFn
        ]);

    function MultiChildReportCtrlFn($scope, ReportSrvc, Excel, $timeout, StudentDetailservice, $location) {
        $scope.heading = "MultiChild Report";
        $scope.subheading = "Detail";
        $scope.currentPage = 1;
        $scope.pageSize = 10;

        $scope.moment = moment;
        $scope.fromDate = new Date();
        $scope.toDate = new Date();
        
        $scope.isLoading = true;
        StudentDetailservice.getMultiChildParent(successCallBack, failureCallBack);
        
        function successCallBack(call, data) {
            switch (call) {
                case 'getStudentDetails':
                    
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.StudentDetails = data;
                        MultiChildDetail(data);
                        break;
                    }
                    break;
                case 'getMultiChildParent':
                    $scope.isLoading = false;
                    if (typeof data !== 'undefined' && data != null) {
                        $scope.MultiChildStudents = data;
                        break;
                    }
                    break;
                    
               
            }
        };

        function failureCallBack(call, data) {
            switch (call) {
                case 'getStudentDetails':
                    
                    $scope.isLoading = false;
                    //alert("Error during get Class");
                    break;
                case 'getMultiChildParent':
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

        function MultiChildDetail(data)
        {
            var rteList = [];
            var id = 0;
            angular.forEach(data, function (item) {
                
                    rteList.push(item);
                    id = id + 1;
                
            });
            //$scope.MultiChildStudents = rteList;
        }

    }

   

    myApp.filter('dateRange', function ()
    {
        return function (items, fromDate, toDate) {
            var filtered = [];
            if (typeof fromDate == 'undefined' || fromDate == "")
            {
                fromDate = "01/01/2000";
            }
            if (typeof toDate == 'undefined' || toDate == "") {
                toDate = "12/30/2020";
            }
            //here you will have your desired input
            
            fromDate = new Date(fromDate);
            fromDate.setDate(fromDate.getDate());
            toDate = new Date(toDate);
            var from_date = Date.parse(moment(fromDate).format('MM/DD/YYYY'));
            var to_date = Date.parse(moment(toDate).format('MM/DD/YYYY'));
            angular.forEach(items, function (item) {
                item.Date = new Date(item.Date);
                var itemDate = Date.parse(moment(item.Date).format('MM/DD/YYYY'));
                if (itemDate >= from_date && itemDate <= to_date) {
                    filtered.push(item);
                }
            });
            return filtered;
        };
    });
})();



