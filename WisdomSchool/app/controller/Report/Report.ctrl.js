(function () {
    'use strict';
    var controllerId = 'ReportCtrl';

    var myApp = angular.module('AngularApp').controller(controllerId,
        ['$scope',
         '$rootScope',
         'ReportSrvc',
         'Excel',
         '$timeout',
         'CommonSrvc',
         'StudentDetailservice',
          
         '$location',
         '$q',
          ReportCtrlFn
        ]);

    function ReportCtrlFn($scope,$rootScope, ReportSrvc, Excel, $timeout, CommonSrvc, StudentDetailservice, $location, $q) {
        $scope.heading = "Report";
        $scope.subheading = "Detail";
        $scope.currentPage = 1;
        $scope.pageSize = 10;

        $scope.moment = moment;
        $scope.fromDate = new Date();
        $scope.toDate = new Date();
        
        $scope.isLoading = true;
        CommonSrvc.CurrentSession(successCallBack, failureCallBack);
              
        $scope.viewFeeStudent = function (FeeStudentDetail) {
            ReportSrvc.getClassFeeHeadDetail(FeeStudentDetail, successCallBack, failureCallBack).then(function () {
                $scope.FeeSubmitData = FeeStudentDetail;
                setFeeHeadAmount(FeeStudentDetail.Months);

                var otherFee = []
                if ($scope.FeeSubmitData.Concession && $scope.FeeSubmitData.Concession != '0') {
                    otherFee.push({ Head: "Concession", Amount: "-" + $scope.FeeSubmitData.Concession });
                }
                if ($scope.FeeSubmitData.OldBalanced && $scope.FeeSubmitData.OldBalanced != '0') {
                    otherFee.push({ Head: "OldBalanced", Amount: $scope.FeeSubmitData.OldBalanced });
                }
                if ($scope.FeeSubmitData.PreviousDue && $scope.FeeSubmitData.PreviousDue != '0') {
                    otherFee.push({ Head: "PreviousDue", Amount: $scope.FeeSubmitData.PreviousDue });
                }
                if ($scope.FeeSubmitData.TransportFee && $scope.FeeSubmitData.TransportFee != '0') {
                    otherFee.push({ Head: "TransportFee", Amount: $scope.FeeSubmitData.TransportFee });
                }
                if ($scope.FeeSubmitData.Fine && $scope.FeeSubmitData.Fine != '0') {
                    otherFee.push({ Head: "Fine", Amount: $scope.FeeSubmitData.Fine });
                }
                if ($scope.FeeSubmitData.AdmissionFee && $scope.FeeSubmitData.AdmissionFee != '0') {
                    otherFee.push({ Head: "AdmissionFee", Amount: $scope.FeeSubmitData.AdmissionFee });
                }

                $scope.otherFees = $scope.selectedMonthAmount.concat(otherFee);

                $("#ModelFeeReceipt").modal();
            });
        }
        $scope.SmsToAdmin = function (stuPayList) {
            var totalPaidAmount = stuPayList.reduce((acc, current) => acc + current.PaidAmount, 0);
            var msg = "Daily fee collection amount is Rs. " + totalPaidAmount;
            CommonSrvc.smsToAdmin(msg,successCallBack, failureCallBack);
        };
        
        $scope.filterItems = {
            NURSERY: true,
        };

        
        $scope.testFilter = function (Items) {
            
            if (typeof $scope.filterItems != 'undefined')
            {
                return $scope.filterItems[Items.Class];
            }
            
        };

        function successCallBack(call, data) {
            switch (call) {
                case 'GetClass':
                    if (data) {
                        $scope.Classes = data;
                        break;
                    }
                    break;
                case 'CurrentSession':
                    CommonSrvc.getSchool(successCallBack, failureCallBack);
                    StudentDetailservice.getAllClass(successCallBack, failureCallBack);
                    ReportSrvc.getAllSubmitedFeeDetail($rootScope.schoolSession, successCallBack, failureCallBack);
                    break;
                   
                case 'getSchool':
                    if (data) {
                        $scope.schoolDetails = data[0];
                        break;
                    }
                    break;
                case 'smsToAdmin':
                    $scope.isLoading = false;
                    if (data) {
                        break;
                    }
                    break;
                case 'getAllSubmitedFeeDetail':
                    
                    if (data && data.length) {
                        $scope.studentFeeInvoiceDetail = data;
                        //$scope.selectedStudent.BalancedShow = data[0].BalancedShow;
                        }
                    else {
                        $scope.studentFeeInvoiceDetail = null;
                    }
                    ReportSrvc.getFeeHeadDetail(successCallBack, failureCallBack);
                    break;
                case 'getClassFeeHeadDetail':
                    
                    $scope.isLoading = false;
                    if (data && data.length) {
                        $scope.SelectedClassFeeHeads = data;
                       // setFeeMonths($scope.SelectedClassFeeHeads);
                        break;
                    }
                    break;
                case 'getFeeHeadDetail':
                    
                    $scope.isLoading = false;
                    if (data && data.length) {
                        $scope.SelectedFeeHeads = data;
                        setHeadByMonth($scope.studentFeeInvoiceDetail);
                        break;
                    }
                    break;
               
            }
        };

        function failureCallBack(call, data) {
            switch (call) {
                case 'getStudentFeeDetail':
                    
                    $scope.isLoading = false;
                    //alert("Error Occured during get Student Fee Detail. " + data);
                    break;
                case 'getSchool':
                    
                    $scope.isLoading = false;
                    alert("Error Occured during getSchool. " + data);
                    break;
                case 'CurrentSession':
                    $scope.isLoading = false;
                    alert("Error Occured during CurrentSession. " + data);
                    break;
                case 'GetClass':
                    
                    $scope.isLoading = false;
                    //alert("Error during get Class");
                    break;
                case 'getClassFeeHeadDetail':
                    
                    $scope.isLoading = false;
                    //alert("Error Occured during getClassFeeHeadDetail. " + data);
                    break;
                case 'getFeeHeadDetail':
                    
                    $scope.isLoading = false;
                    //alert("Error during get Class FeeHead Detail");
                    break;
                case 'smsToAdmin':
                    $scope.isLoading = false;
                    //alert("Error during get Class FeeHead Detail");
                    break;
            }
        };

        $scope.StudentObj = function (user) {
            return user.StudentFee;
        };

        function setFeeHeadAmount(submitedMonth) {
            
            $scope.selectedMonthAmount = {};
            var monthArr = submitedMonth.split(',');
            var FeeHeadDetails = [];

            var amount = 0;
            var i = 0;
            angular.forEach($scope.SelectedClassFeeHeads, function (item) {
                var SelectedClassFeeHeads = item;
                if (item.January != 0 && item.January != null && item.January != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "January", Head: item.Heading, Amount: item.January, IsMonth: item.IsMonth });
                }
                if (item.February != 0 && item.February != null && item.February != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "February", Head: item.Heading, Amount: item.February, IsMonth: item.IsMonth });
                }
                if (item.March != 0 && item.March != null && item.March != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "March", Head: item.Heading, Amount: item.March, IsMonth: item.IsMonth });
                }
                if (item.April != 0 && item.April != null && item.April != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "April", Head: item.Heading, Amount: item.April, IsMonth: item.IsMonth });
                }
                if (item.May != 0 && item.May != null && item.May != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "May", Head: item.Heading, Amount: item.May, IsMonth: item.IsMonth });
                }
                if (item.June != 0 && item.June != null && item.June != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "June", Head: item.Heading, Amount: item.June, IsMonth: item.IsMonth });
                }
                if (item.July != 0 && item.July != null && item.July != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "July", Head: item.Heading, Amount: item.July, IsMonth: item.IsMonth });
                }
                if (item.August != 0 && item.August != null && item.August != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "August", Head: item.Heading, Amount: item.August, IsMonth: item.IsMonth });
                }
                if (item.September != 0 && item.September != null && item.September != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "September", Head: item.Heading, Amount: item.September, IsMonth: item.IsMonth });
                }
                if (item.October != 0 && item.October != null && item.October != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "October", Head: item.Heading, Amount: item.October, IsMonth: item.IsMonth });
                }
                if (item.November != 0 && item.November != null && item.November != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "November", Head: item.Heading, Amount: item.November, IsMonth: item.IsMonth });
                }
                if (item.December != 0 && item.December != null && item.December != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "December", Head: item.Heading, Amount: item.December, IsMonth: item.IsMonth });
                }
            });

            var HeadFeeAmount = [];
            var j = 0;
            for (var i = 0 ; i < monthArr.length - 1 ; i++) {
                angular.forEach(FeeHeadDetails, function (item) {
                    if (item.Month == monthArr[i]) {
                        HeadFeeAmount.push({ id: j + 1, Month: item.Month, Head: item.Head, Amount: item.Amount, IsMonth: item.IsMonth });
                    }
                });
            }

            $scope.selectedMonthAmount = HeadFeeAmount;
        }

        $scope.exportToExcel = function (tableId) { // ex: '#my-table'
            $scope.exportHref = Excel.tableToExcel(tableId, 'sheet name');
            $timeout(function () { location.href = $scope.exportHref; }, 100); // trigger download
        }

        $scope.printDiv = function (divName) {
            var printContents = document.getElementById(divName).innerHTML;
            var popupWin = window.open('', '_blank', 'width=300,height=300');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" /></head><body onload="window.print()">' + printContents + printContents + printContents + '</body></html>');
            popupWin.document.close();
        }

        function setHeadByMonth(studentFeeInvoiceDetail) {
            var i = 0;
            var j = 0;
            var studentFeeDetailsWithHeadAmt = [];
            var FeeHeadDetails = [];
            var HeadKey = [];
            GetAllHeads();
         
            angular.forEach(studentFeeInvoiceDetail, function (item) {
                var studentFeeDetailsWithHead = {};
                GetHeadsAmount(item.Class, item.Months);
                studentFeeDetailsWithHead["id"] = i + 1;
                studentFeeDetailsWithHead["AdmissionNo"] = item.AdmissionNo;
                studentFeeDetailsWithHead["Name"] = item.Name;
                studentFeeDetailsWithHead["Class"] = item.Class;
                studentFeeDetailsWithHead["Date"] = item.Date;
                studentFeeDetailsWithHead["Balance"] = item.Balance;
                studentFeeDetailsWithHead["Concession"] = item.Concession;
                studentFeeDetailsWithHead["Fine"] = item.Fine;
                studentFeeDetailsWithHead["GrandTotal"] = item.GrandTotal;
                studentFeeDetailsWithHead["PaidAmount"] = item.PaidAmount;
                studentFeeDetailsWithHead["Months"] = item.Months;
                angular.forEach($scope.AllHeads, function (Head) {
                    studentFeeDetailsWithHead[Head.replace(/ /g, '')] = 0;
                    angular.forEach($scope.headAmountArr, function (headAmt) {
                        if (Head === headAmt.Head) {
                            studentFeeDetailsWithHead[Head.replace(/ /g, '')] = headAmt.Amount;
                        }
                    });
                });
                studentFeeDetailsWithHeadAmt.push(studentFeeDetailsWithHead);
                i = i + 1;
            });
            angular.forEach($scope.AllHeads, function (HeadName) {
                HeadKey.push(HeadName.replace(/ /g, ''));
            });
            $scope.studentFeeDetailsWithHeadAmt = studentFeeDetailsWithHeadAmt;
            $scope.HeadKey = HeadKey;
            
        }

        function GetAllHeads()
        {
            var lookup = {};
            var items = $scope.SelectedFeeHeads;
            var result = [];

            for (var item, i = 0; item = items[i++];) {
                var name = item.Heading;

                if (!(name in lookup)) {
                    lookup[name] = 1;
                    result.push(name);
                }
            }
            $scope.AllHeads = result;
        }

        function GetHeadsAmount(Class,Months)
        {
            var i = 0;
            var headsAmount = [];
            $scope.headsAmount = [];
            if (!Months)
            {
                return;
            }

            var month = Months.split(',');
            var FeeHeadDetails = [];
            angular.forEach($scope.SelectedFeeHeads, function (item) {
                var SelectedClassFeeHeads = item;
                if (item.January != 0 && item.January != null && item.January != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "January", Class: item.Class, Head: item.Heading, Amount: item.January });
                }
                if (item.February != 0 && item.February != null && item.February != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "February", Class: item.Class, Head: item.Heading, Amount: item.February });
                }
                if (item.March != 0 && item.March != null && item.March != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "March", Class: item.Class, Head: item.Heading, Amount: item.March });
                }
                if (item.April != 0 && item.April != null && item.April != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "April", Class: item.Class, Head: item.Heading, Amount: item.April });
                }
                if (item.May != 0 && item.May != null && item.May != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "May", Class: item.Class, Head: item.Heading, Amount: item.May });
                }
                if (item.June != 0 && item.June != null && item.June != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "June", Class: item.Class, Head: item.Heading, Amount: item.June });
                }
                if (item.July != 0 && item.July != null && item.July != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "July", Class: item.Class, Head: item.Heading, Amount: item.July });
                }
                if (item.August != 0 && item.August != null && item.August != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "August", Class: item.Class, Head: item.Heading, Amount: item.August });
                }
                if (item.September != 0 && item.September != null && item.September != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "September", Class: item.Class, Head: item.Heading, Amount: item.September });
                }
                if (item.October != 0 && item.October != null && item.October != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "October", Class: item.Class, Head: item.Heading, Amount: item.October });
                }
                if (item.November != 0 && item.November != null && item.November != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "November", Class: item.Class, Head: item.Heading, Amount: item.November });
                }
                if (item.December != 0 && item.December != null && item.December != "") {
                    FeeHeadDetails.push({ id: i + 1, Month: "December", Class: item.Class, Head: item.Heading, Amount: item.December });
                }
                i = i + 1;
            });

            for (var x = 0; x < month.length - 1; x++) {
                angular.forEach(FeeHeadDetails, function (item) {
                        if (item.Class == Class) {
                            if (item.Month == month[x]) {
                                headsAmount.push({ id: i + 1, Month: item.Month, Class: item.Class, Head: item.Head, Amount: item.Amount });
                            }
                        }
                });
            }
            findHead(headsAmount);
            $scope.headsAmount = headsAmount;
        }

        function findHead(JsonObj) {
            
            var i = 0;
            var total = 0;
            var month = "";
            var stclass = "";
            var head = "";
            var heads = [];
            $scope.headAmountArr = [];
            if (JsonObj.length > 0) {
                angular.forEach($scope.AllHeads, function (item, id)
                {
                    total = 0;
                    angular.forEach(JsonObj, function (value, key) {
                        if (value.Head === item) {
                            total += parseInt(value.Amount);
                        }
                        month = value.Month;
                        stclass = value.Class;
                        head = item;

                    });
                    if (total > 0)
                    {
                        heads.push({ id: i + 1, Month: month, Class: stclass, Head: head, Amount: total });
                        i = i + 1;
                    }
                });
            }
            $scope.headAmountArr = heads;
        };

        function findValue(DetailsWithHead, enteredValue, Month) {
            if (DetailsWithHead.length > 0)
            {
                angular.forEach(DetailsWithHead, function (value, key) {
                    if (value.StudentFee.AdmissionNo === enteredValue && value.Month === Month) {
                        //results.push({ AdmNo: enteredValue, HeadName: value.Head, HeadAmount: value.Amount });
                        $scope.IsExist = true;
                    }
                    else {
                        $scope.IsExist = false;
                    }
                });
                //$scope.results = results;
            }
        };
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



