(function () {
    'use strict';
    var controllerId = 'SMSReportCtrl';

    var myApp = angular.module('AngularApp').controller(controllerId,
        ['$scope',
         'Excel',
         '$timeout',
         'CommonSrvc',
         'StudentDetailservice',
          
         '$location',
          SMSReportCtrlFn
        ]);

    function SMSReportCtrlFn($scope, Excel, $timeout, CommonSrvc, StudentDetailservice, $location) {
        $scope.heading = "SMS Panel";
        $scope.subheading = "Detail";
        $scope.currentPage = 1;
        $scope.pageSize = 10;

        $scope.moment = moment;
        $scope.fromDate = new Date();
        $scope.toDate = new Date();
        $scope.isLoading = true;
        StudentDetailservice.getAllClass(successCallBack, failureCallBack);
        StudentDetailservice.getStudentDetails(successCallBack, failureCallBack);
        
        $scope.sendSMS = function (SMSStudents)
        {
            //CommonSrvc.sendTextSMS(SMSStudents, successCallBack, failureCallBack);
             angular.forEach(SMSStudents, function (item) {
                if (item.IsSendSMS === true)
                {

                    CommonSrvc.sendTextSMS($scope.smsTextArea, item.Contact, successCallBack, failureCallBack);
                }
             });
        }

        $scope.selectAll = function()
        {
            angular.forEach($scope.SMSStudents, function (item) {
                if ($scope.chkSelectAll)
                    item.IsSendSMS = true;
                else
                    item.IsSendSMS = false;
            });
        }

        function successCallBack(call, data) {
            switch (call) {
                case 'getStudentDetails':
                    
                    $scope.isLoading = false;
                    if (data) {
                        $scope.StudentDetails = data;
                        SMSDetail(data);
                        break;
                    }
                    break;
                case 'sendTextSMS':
                    //
                    if (data) {
                        console.log(data);
                        break;
                    }
                    break;
                case 'GetClass':
                    //
                    if (data) {
                        $scope.Classes = data;
                        break;
                    }
                    break;
            }
        };

        function failureCallBack(call, data) {
            switch (call) {
                case 'getStudentDetails':
                    $scope.isLoading = false;
                    break;
                case 'GetClass':
                    $scope.isLoading = false;
                    break;
                case 'sendTextSMS':
                    if (data) {
                        console.log(data)
                        break;
                    }
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

        function SMSDetail(data) {
            var SMSList = [];
            var id = 0;
            angular.forEach(data, function (item) {
                
                if (item.Contact != "") {
                    SMSList.push(item);
                    id = id + 1;
                }
            });
            $scope.SMSStudents = SMSList;
        }

        $scope.filterItems = {
            NURSERY: true
        };

        $scope.testFilter = function (Items) {
            //
            if (typeof $scope.filterItems != 'undefined') {
                return $scope.filterItems[Items.Class];
            }

        };

    }

   

    myApp.filter('dateRange', function () {
        return function (items, fromDate, toDate) {
            var filtered = [];
            if (typeof fromDate == 'undefined' || fromDate == "") {
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



