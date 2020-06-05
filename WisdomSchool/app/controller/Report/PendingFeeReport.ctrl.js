(function () {
    'use strict';
    var controllerId = 'PendingFeeReportCtrl';

    var myApp = angular.module('AngularApp').controller(controllerId,
        ['$scope',
         '$rootScope',
         'ReportSrvc',
         'CommonSrvc',
         'Excel',
         '$timeout',
         'StudentDetailservice',
          
         '$location',
          PendingFeeReportCtrlFn
        ]);

    function PendingFeeReportCtrlFn($scope,$rootScope, ReportSrvc,CommonSrvc, Excel, $timeout, StudentDetailservice, $location) {
        $scope.heading = "Pending Fee Report";
        $scope.subheading = "Detail";
        $scope.currentPage = 1;
        $scope.pageSize = 10;

        $scope.moment = moment;
        $scope.fromDate = new Date();
        $scope.toDate = new Date();
        
       
        CommonSrvc.CurrentSession(successCallBack, failureCallBack);
        StudentDetailservice.getAllClass(successCallBack, failureCallBack);
        //ReportSrvc.getTopFeeDetail($rootScope.schoolSession, successCallBack, failureCallBack);
       
        $scope.GetStudentByClass = function (Classid) {
            $scope.isLoading = true;
            ReportSrvc.getPendingFeeDetail($rootScope.schoolSession, Classid, successCallBack, failureCallBack);
        };
        function successCallBack(call, data) {
            switch (call) {
                case 'GetClass':
                    //
                    if (data) {
                        $scope.Classes = data;
                        break;
                    }
                    break;
                    
                case 'getPendingFeeDetail':
                    //
                    $scope.isLoading = false;
                    if (data && data.length) {
                        pendingFeeDetail(data);
                        }
                    else {
                        $scope.studentFeeInvoiceDetail = null;
                    }
                    break;
            }
        };

        function failureCallBack(call, data) {
            switch (call) {
                case 'getPendingFeeDetail':
                    //
                    $scope.isLoading = false;
                    //alert("Error Occured during get Student Fee Detail. " + data);
                    break;
                case 'GetClass':
                    //
                    $scope.isLoading = false;
                    //alert("Error during get Class");
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
            NURSERY: true
        };


        $scope.testFilter = function (Items) {
            //
            if (typeof $scope.filterItems != 'undefined') {
                return $scope.filterItems[Items.Class];
            }

        };

        function pendingFeeDetail(data)
        {
            //
            var pendingFeeList = [];
            var id = 0;
            angular.forEach(data, function (item) {
                CheckMonthFee(item.Balance);
                pendingFeeList.push({ id: id + 1, AdmissionNo: item.AdmissionNo, Name: item.Name, Class: item.Class, Date: item.Date, Months: item.Months, Balance: item.Balance, GrandTotal: item.GrandTotal, PayedAmount: item.PayedAmount, Status: $scope.MonthStatus });
                id = id + 1;
               
            });
            $scope.studentFeeInvoiceDetail = pendingFeeList;
        }
        function CheckMonthFee(Balance) {
            if (Balance > 0) {
                $scope.MonthStatus = "Pending";
            }
            else {
                $scope.MonthStatus = "Done";
            }
            return;
        }
        function CheckMonthFeeOld(Months,Session) {
            var currentMonth = moment(new Date()).format('M');
            if (Months)
            {
                
                var month = Months.split(',')
                month = month[month.length - 2];
                month = new Date(Date.parse(month + " 1, 2012")).getMonth() + 1;
                $scope.MonthStatus = "";
                if (month >= currentMonth && Session === $rootScope.schoolSession) {
                    $scope.MonthStatus = "Done";
                }
                else {
                    $scope.MonthStatus = "Pending";
                }
            }
            else
            {
                $scope.MonthStatus = "Pending";
            }
            
            return;
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
            //
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



