(function () {
    'use strict';
    var controllerId = 'CollectFeeCtrl';

    angular.module('AngularApp').controller(controllerId,
        ['$scope',
         '$rootScope',
         'CollectFeeSrvc',
          
         'CommonSrvc',
         '$location',
         '$window',
         'StudentDetailservice',
          CollectFeeCtrl
        ]);

    function CollectFeeCtrl($scope,$rootScope, CollectFeeSrvc, CommonSrvc, $location, $window, StudentDetailservice) {
        $scope.heading = "Submit Fee's";
        $scope.subheading = "Payment Detail";
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.moment = moment;
        $scope.date = new Date();
        $scope.ckboxAdmFee = false;
        $scope.FeeSubmitData = null;
        $scope.PaymentMode = "Cash";
        var totalAmount = 0;
        $scope.AdmissionFee = 0;
        $scope.remark = "";
        $scope.isLoading = true;
        CommonSrvc.CurrentSession(successCallBack, failureCallBack);
        CommonSrvc.getSchool(successCallBack, failureCallBack);
        CollectFeeSrvc.getAllClass(successCallBack, failureCallBack);
        $scope.open = function (isDelete, item) {
            $scope.disableCtrl = isDelete;
            $scope.selectedStudent = item;
            $("#EditStudentDetailModel").modal();
        }
        $scope.GetStudentByClass = function (Classid) {
            $scope.isLoading = true;
            CollectFeeSrvc.getStudentDetails(Classid, successCallBack, failureCallBack);
        };
        $scope.getStudentFeeDetail = function (isDelete, studentDetail) {
            $scope.disableCtrl = isDelete;
            $scope.selectedStudent = studentDetail;
            $scope.moment = moment;
            $scope.TransDefineCharge = $scope.selectedStudent.Transport_Charge;
            $scope.selectedStudent.TotalAmount = "0";
            $scope.selectedStudent.Fine = "0"; //GetStudentFine(moment(new Date()).format('MM'));
            $scope.selectedStudent.Concession = $scope.selectedStudent.Concession == "" ? "0" : $scope.selectedStudent.Concession;
            $scope.ConcessionCharge = $scope.selectedStudent.Concession;
            CollectFeeSrvc.getStudentFeeDetail(studentDetail,$rootScope.schoolSession, successCallBack, failureCallBack);
            
        }
        function GetStudentFine(month) {
            $scope.moment = moment;
            var count = 0;
            var startMonth = 0; //6 for July
            var Day = moment(new Date()).format('DD');
            var currentMonth = moment(new Date()).format('MM') - 7;
            debugger;
            if (parseInt(currentMonth) >= parseInt(month)) {
                // TODO- After December Code;
                for (var i = 0 ; i <= month; i++) {
                    if ($scope.mothFeeHeads[i].id >= startMonth && $scope.mothFeeHeads[i].IsDisabled == false) {
                        count = count + 1;
                    }
                }

                if (parseInt(Day) > 15 || parseInt(currentMonth) > parseInt(month)) {
                    return 30 * count;
                }
                else {
                    return 0 + ((count - 1) * 30);
                }
            }
            else {
                for (var i = 0 ; i <= currentMonth; i++) {
                    if ($scope.mothFeeHeads[i].id >= startMonth && $scope.mothFeeHeads[i].IsDisabled == false) {
                        count = count + 1;
                    }

                }
                if (parseInt(Day) > 15 || parseInt(currentMonth) > parseInt(month)) {
                    return 30 * count;
                }
                else {
                    return 0 + ((count - 1) * 30);
                }
            }
        }
        $scope.getAdmissionFee = function () {
            if ($scope.ckboxAdmFee) {
                $scope.ckboxAdmFee = false;
                $scope.AdmissionFee = 0;
            }
            else {
                $scope.ckboxAdmFee = true;
                $scope.isLoading = true;
                CollectFeeSrvc.getAdmissionFee(successCallBack, failureCallBack);
            }

        }
        $scope.setTotalAmount = function (selectedMonth) {
            selectedMonth.Checked = selectedMonth.Checked ? false : true;

            if (selectedMonth.Checked === false) {
                for (var i = 0 ; i <= $scope.mothFeeHeads.length - 1; i++) {
                   $scope.mothFeeHeads[i].Checked = false;
                }
            }
            for (var i = 0 ; i <= selectedMonth.id - 1; i++) {
                if ($scope.mothFeeHeads[i].IsDisabled != true) {
                    $scope.mothFeeHeads[i].Checked = selectedMonth.Checked;
                }
            }
            updateTotalAmount();
        }
        $scope.viewFeeStudent = function (FeeStudentDetail) {
            $scope.FeeSubmitData = FeeStudentDetail;
            setFeeHeadAmount(FeeStudentDetail.Months);
            $("#ModelFeeReceipt").modal();
        }
        $scope.deleteFeeStudent = function (FeeStudentDetail) {
            $scope.isLoading = true;
            CollectFeeSrvc.deleteFeeStudent(FeeStudentDetail.Id, successCallBack, failureCallBack);
        }
        $scope.updateStudent = function (studentDetail) {
            $scope.isLoading = true;
            CollectFeeSrvc.updateStudent(studentDetail, successCallBack, failureCallBack);
        }
        $scope.printDiv = function (divName) {
            var printContents = document.getElementById(divName).innerHTML;
            var popupWin = window.open('', '_blank', 'width=300,height=300');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" media="print" href="css/bootstrap.min.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
        }
        $scope.submitFees = function()
        {
           
            var Months = "";
            var ReciptNo = $scope.selectedStudent.AdmissionNo + moment(new Date()).format('MMDDHHMMSS');
            for (var i = 0 ; i <= $scope.mothFeeHeads.length - 1; i++) {
                if ($scope.mothFeeHeads[i].Checked == true) {
                    Months += $scope.mothFeeHeads[i].text + ",";
                }
            }

            if (typeof $scope.selectedStudent.PaidAmount == "undefined" || $scope.selectedStudent.PaidAmount == "" || parseInt($scope.selectedStudent.PaidAmount) <= 0)
            {
                alert("Paid Amount Must Be Greater Than Zero.");
                return;
            }

            if (Months == "")
            {
                alert("Please select atleast one month");
                return;
            }

            $scope.disableSubmit = true;
         
            $scope.StudentFeeDetail = {};
            $scope.StudentFeeDetail.Date = $scope.date;
            $scope.StudentFeeDetail.AdmissionNo = $scope.selectedStudent.AdmissionNo;
            $scope.StudentFeeDetail.Name = $scope.selectedStudent.StFirstName;
            $scope.StudentFeeDetail.Father = $scope.selectedStudent.FatherName;
            $scope.StudentFeeDetail.Months = Months;
            $scope.StudentFeeDetail.Class = $scope.selectedStudent.Class;
            $scope.StudentFeeDetail.Section = "A";
            $scope.StudentFeeDetail.Category = "General";
            $scope.StudentFeeDetail.Phone = $scope.selectedStudent.Contact;
            $scope.StudentFeeDetail.Status = "1";
            $scope.StudentFeeDetail.TotalAmount = $scope.selectedStudent.TotalAmount;
            $scope.StudentFeeDetail.TransportFee = $scope.selectedStudent.Transport_Charge;
           //$scope.StudentFeeDetail.Route = $scope.selectedStudent.Route;
            $scope.StudentFeeDetail.PreviousDue = $scope.selectedStudent.PreviousDue;
            $scope.StudentFeeDetail.OldBalanced = $scope.selectedStudent.BalancedShow;
            $scope.StudentFeeDetail.Fine = $scope.selectedStudent.Fine;
            $scope.StudentFeeDetail.Concession = $scope.selectedStudent.Concession;
            $scope.StudentFeeDetail.AdmissionFee = $scope.AdmissionFee;
            $scope.StudentFeeDetail.GrandTotal = $scope.selectedStudent.GrandTotal;
            $scope.StudentFeeDetail.PayedAmount = $scope.selectedStudent.PaidAmount;
            $scope.StudentFeeDetail.Balance = $scope.selectedStudent.GrandTotal - $scope.selectedStudent.PaidAmount;
            $scope.StudentFeeDetail.ReciptNo = ReciptNo;
            $scope.StudentFeeDetail.Remark = $scope.remark;
            $scope.StudentFeeDetail.PaymentMode = $scope.PaymentMode;
            $scope.StudentFeeDetail.ChequeNo = "";
            $scope.StudentFeeDetail.ChequeDate = "";
            $scope.StudentFeeDetail.BankName = "";
            $scope.StudentFeeDetail.CardPaymentRecieptNo = "";
            $scope.StudentFeeDetail.Session = $rootScope.schoolSession;
            $scope.StudentFeeDetail.BalancedShow = $scope.selectedStudent.GrandTotal - $scope.selectedStudent.PaidAmount;;

            $scope.UpdateFeeDetail = $scope.StudentFeeDetail;
            $scope.UpdateFeeDetail.Balance = "0";
            $scope.UpdateFeeDetail.AdmissionNo = $scope.selectedStudent.AdmissionNo;
            CollectFeeSrvc.updateStFeeDetail($scope.UpdateFeeDetail, successCallBack, failureCallBack);

            $scope.StudentFeeDetail.Balance = $scope.selectedStudent.GrandTotal - $scope.selectedStudent.PaidAmount;
            CollectFeeSrvc.submitStudentFee($scope.StudentFeeDetail, successCallBack, failureCallBack);

            //"N"
            var studentDetail = $scope.selectedStudent;
            studentDetail.AdmissionId = $scope.selectedStudent.AdmissionId;
            studentDetail.PreviousDue = "0";
            studentDetail.Jan = "N";
            studentDetail.Feb = "N";
            studentDetail.Mar = "N";
            studentDetail.Apr = "N";
            studentDetail.May = "N";
            studentDetail.June = "N";
            studentDetail.July = "N";
            studentDetail.Aug = "N";
            studentDetail.Sep = "N";
            studentDetail.Oct = "N";
            studentDetail.Nov = "N";
            studentDetail.Dec = "N";
            StudentDetailservice.updateStudent(studentDetail, successCallBack, failureCallBack);
            
        }
        function successCallBack(call, data) {
            switch (call) {
                case 'getStudentDetails':
                    $scope.isLoading = false;
                    if (data && data.length) {
                        $scope.studentDetails = data;
                        break;
                    }
                    else
                    {
                        $scope.studentDetails = null;
                        break;
                    }
                    break;
                case 'getSchool':
                    if (data) {
                        $scope.isLoading = false;
                        $scope.schoolDetails = data[0];
                        break;
                    }
                    break;
                case 'getAdmissionFee':
                    $scope.isLoading = false;
                    if (data && data.length) {
                        $scope.AdmissionFee = data[0].Fee;
                        break;
                    }
                    break;
                case 'getClassFeeHeadDetail':
                    $scope.isLoading = false;
                    if (data && data.length) {
                        $scope.SelectedClassFeeHeads = data;
                        setFeeMonths($scope.SelectedClassFeeHeads);
                        break;
                    }
                    break;
                case 'getStudentFeeDetail':
                    $scope.isLoading = false;
                    $scope.selectedStudent.PaidAmount = 0;
                    if (data && data.length) {
                         $scope.studentFeeInvoiceDetail = data;
                         $scope.selectedStudent.BalancedShow = data[0].BalancedShow;
                         
                    }
                    else {
                        $scope.studentFeeInvoiceDetail = null;
                        $scope.selectedStudent.BalancedShow = 0;
                        
                    }
                    CollectFeeSrvc.getClassFeeHeadDetail($scope.selectedStudent, successCallBack, failureCallBack);
                    $("#EditStudentDetailModel").modal();
                    break;
                case 'submitStudentFee':
                    $scope.isLoading = false;
                    if (data) {
                       // alert("Student Fee Submitted Successfully. " + data);
                        $scope.FeeSubmitData = data;
                        setFeeHeadAmount(data.Months);
                        var stNumber = data.Phone?data.Phone:"8800224410";
                        CommonSrvc.sendSMS(data.Name, data.Class, stNumber, data.Months, data.PayedAmount, successCallBack, failureCallBack);
                        $("#EditStudentDetailModel .close").click();
                        $("#ModelFeeReceipt").modal();
                        $scope.disableSubmit = false;
                        //var earl = '/FeeReceipt';
                        //$location.url(earl);
                        break;
                    }
                    break;
                case 'updateStFeeDetail':
                    $scope.isLoading = false;
                    if (data) {
                       // alert("Student Fee Updated Successfully. " + data);
                        break;
                    }
                    break;
                case 'GetClass':
                    if (data) {
                        $scope.Classes = data;
                        break;
                    }
                    break;
                case 'deleteFeeStudent':
                    $scope.isLoading = false;
                    if (data) {
                       // alert(data);
                        break;
                    }
                    break;
                case 'sendSMS':
                    $scope.isLoading = false;
                    if (data) {
                        // alert(data);
                        break;
                    }
                    break;
            }
        };
        function failureCallBack(call, data) {
            switch (call) {
                case 'getStudentDetails':
                    //
                    $scope.isLoading = false;
                   //alert("Error Occured during getStudentDetails. " + data);
                    break;
                case 'getSchool':
                    //
                    $scope.isLoading = false;
                    alert("Error Occured during getSchool. " + data);
                    break;
                 case 'getClassFeeHeadDetail':
                    //
                    $scope.isLoading = false;
                    //alert("Error Occured during getClassFeeHeadDetail. " + data);
                    break;
                case 'getStudentFeeDetail':
                    //
                    $scope.isLoading = false;
                    //alert("Error Occured during getStudentFeeDetail. " + data);
                    break;
                case 'submitStudentFee':
                    //
                    $scope.isLoading = false;
                    //alert("Error Occured during submitStudentFee. " + data);
                    break;
                case 'updateStFeeDetail':
                    //
                    $scope.isLoading = false;
                    //alert("Error Occured during updateStFeeDetail. " + data);
                    break;
                case 'deleteStudent':
                    //
                    $scope.isLoading = false;
                    //alert("Error Occured during deleteStudent. " + data);
                    break;
                case 'deleteFeeStudent':
                    //
                    $scope.isLoading = false;
                    //alert("Error Occured during deleteFeeStudent. " + data);
                    break;
                case 'sendSMS':
                    //
                    $scope.isLoading = false;
                    alert("Error Occured during send SMS. " + data);
                    break;
            }
        };
        function setFeeMonths(feeHeads) {
            var mothFeeHeads = [];
            $scope.January = 0;
            $scope.February = 0;
            $scope.March = 0;
            $scope.April = 0;
            $scope.May = 0;
            $scope.June = 0;
            $scope.July = 0;
            $scope.August = 0;
            $scope.September = 0;
            $scope.October = 0;
            $scope.November = 0;
            $scope.December = 0;
            //dashboardPages.push({ id: 0, text: "Empty", Notes: "Empty", count: 0, groupId: 0 });
            for (var i = 0 ; i <= feeHeads.length - 1; i++) {
                $scope.January = $scope.January + parseInt(feeHeads[i].January);
                $scope.February = $scope.February + parseInt(feeHeads[i].February);
                $scope.March = $scope.March + parseInt(feeHeads[i].March);
                $scope.April = $scope.April + parseInt(feeHeads[i].April);
                $scope.May = $scope.May + parseInt(feeHeads[i].May);
                $scope.June = $scope.June + parseInt(feeHeads[i].June);
                $scope.July = $scope.July + parseInt(feeHeads[i].July);
                $scope.August = $scope.August + parseInt(feeHeads[i].August);
                $scope.September = $scope.September + parseInt(feeHeads[i].September);
                $scope.October = $scope.October + parseInt(feeHeads[i].October);
                $scope.November = $scope.November + parseInt(feeHeads[i].November);
                $scope.December = $scope.December + parseInt(feeHeads[i].December);
            }
            $scope.isJanDisabled =  false;
            $scope.isFebDisabled =  false;
            $scope.isMarchDisabled = false;
            $scope.isAprilDisabled = false;
            $scope.isMayDisabled = false;
            $scope.isJuneDisabled =  false;
            $scope.isJulyDisabled = false;
            $scope.isAugDisabled = false;
            $scope.isSeptDisabled = false;
            $scope.isOctDisabled = false;
            $scope.isNovDisabled = false;
            $scope.isDecDisabled = false;
            
            angular.forEach($scope.studentFeeInvoiceDetail, function (item) {
                
                if ($scope.isJulyDisabled != true)
                {
                    $scope.isJulyDisabled = item.Months.indexOf("July") >= 0 ? true : false;
                }
                if ($scope.isAugDisabled != true)
                {
                    $scope.isAugDisabled = item.Months.indexOf("August") >= 0 ? true : false;
                }
                if ($scope.isSeptDisabled != true)
                {
                    $scope.isSeptDisabled = item.Months.indexOf("September") >= 0 ? true : false;
                }
                if ($scope.isOctDisabled != true)
                {
                    $scope.isOctDisabled = item.Months.indexOf("October") >= 0 ? true : false;
                }
                if ($scope.isNovDisabled != true)
                {
                    $scope.isNovDisabled = item.Months.indexOf("November") >= 0 ? true : false;
                }
                if ($scope.isDecDisabled != true)
                {
                    $scope.isDecDisabled = item.Months.indexOf("December") >= 0 ? true : false;
                }
                if ($scope.isJanDisabled != true) {
                    $scope.isJanDisabled = item.Months.indexOf("January") >= 0 ? true : false;
                }
                if ($scope.isFebDisabled != true) {
                    $scope.isFebDisabled = item.Months.indexOf("February") >= 0 ? true : false;
                }
                if ($scope.isMarchDisabled != true) {
                    $scope.isMarchDisabled = item.Months.indexOf("March") >= 0 ? true : false;
                }
                if ($scope.isAprilDisabled != true) {
                    $scope.isAprilDisabled = item.Months.indexOf("April") >= 0 ? true : false;
                }
                if ($scope.isMayDisabled != true) {
                    $scope.isMayDisabled = item.Months.indexOf("May") >= 0 ? true : false;
                }
                if ($scope.isJuneDisabled != true) {
                    $scope.isJuneDisabled = item.Months.indexOf("June") >= 0 ? true : false;
                }
                
            });

            mothFeeHeads.push({ id: 0, text: "July", Checked: false, IsDisabled: $scope.isJulyDisabled, Value: $scope.July });
            mothFeeHeads.push({ id: 1, text: "August", Checked: false, IsDisabled: $scope.isAugDisabled, Value: $scope.August });
            mothFeeHeads.push({ id: 2, text: "September", Checked: false, IsDisabled: $scope.isSeptDisabled, Value: $scope.September });
            mothFeeHeads.push({ id: 3, text: "October", Checked: false, IsDisabled: $scope.isOctDisabled, Value: $scope.October });
            mothFeeHeads.push({ id: 4, text: "November", Checked: false, IsDisabled: $scope.isNovDisabled, Value: $scope.November });
            mothFeeHeads.push({ id: 5, text: "December", Checked: false, IsDisabled: $scope.isDecDisabled, Value: $scope.December });
            mothFeeHeads.push({ id: 6, text: "January", Checked: false, IsDisabled: $scope.isJanDisabled, Value: $scope.January });
            mothFeeHeads.push({ id: 7, text: "February", Checked: false, IsDisabled: $scope.isFebDisabled, Value: $scope.February });
            mothFeeHeads.push({ id: 8, text: "March", Checked: false, IsDisabled: $scope.isMarchDisabled, Value: $scope.March });
            mothFeeHeads.push({ id: 9, text: "April", Checked: false, IsDisabled: $scope.isAprilDisabled, Value: $scope.April });
            mothFeeHeads.push({ id: 10, text: "May", Checked: false, IsDisabled: $scope.isMayDisabled, Value: $scope.May });
            mothFeeHeads.push({ id: 11, text: "June", Checked: false, IsDisabled: $scope.isJuneDisabled, Value: $scope.June });

            $scope.mothFeeHeads = mothFeeHeads;

        }
        function updateTotalAmount() {
           
            totalAmount = 0;
            var trasnportAmount = 0;
            var ConcessionAmout = 0;
            var TransDefineAmount = $scope.TransDefineCharge;
            var ConcessionCharges = $scope.ConcessionCharge;
            //
            for (var i = 0 ; i <= $scope.mothFeeHeads.length - 1; i++) {
                if ($scope.mothFeeHeads[i].Checked == true) {
                    totalAmount += $scope.mothFeeHeads[i].Value;
                }
            }

            //Transport and Concession
            for (var i = 0 ; i <= $scope.mothFeeHeads.length - 1; i++) {
                if ($scope.mothFeeHeads[i].Checked == true) {
                    trasnportAmount += parseInt(TransDefineAmount);
                    ConcessionAmout += parseInt(ConcessionCharges);
                    $scope.selectedStudent.Fine = GetStudentFine(setMonthValue($scope.mothFeeHeads[i].text));
                }
            }

            $scope.CalculatedTransport_Charge = trasnportAmount;
            $scope.CalculatedConcession = ConcessionAmout;

            if ($scope.selectedStudent.RTE != 'True')
            {
                $scope.selectedStudent.TotalAmount = totalAmount;
            }
            else
            {
                $scope.selectedStudent.TotalAmount = 0;
            }

            
        }
        $scope.$watch("selectedStudent.TotalAmount", function (newValue, oldValue) {
            updateGrandTotalAmount();
        });
        $scope.$watch("AdmissionFee", function (newValue, oldValue) {
            updateGrandTotalAmount();
        });
        $scope.$watch("selectedStudent.Transport_Charge", function (newValue, oldValue) {
            updateGrandTotalAmount();
        });
        $scope.$watch("selectedStudent.PreviousDue", function (newValue, oldValue) {
            updateGrandTotalAmount();
        });
        $scope.$watch("selectedStudent.BalancedShow", function (newValue, oldValue) {
            updateGrandTotalAmount();
        });
        $scope.$watch("selectedStudent.Fine", function (newValue, oldValue) {
            if (typeof $scope.selectedStudent != 'undefined')
            {
                if (typeof $scope.selectedStudent.Fine != 'undefined') {
                    $scope.selectedStudent.TotalAmount
                    $scope.selectedStudent.Fine = $scope.selectedStudent.Fine == "" ? "0" : $scope.selectedStudent.Fine;
                    updateGrandTotalAmount();
                }
                
            }
        });
        $scope.$watch("selectedStudent.Concession", function (newValue, oldValue) {
            updateGrandTotalAmount();
            });
        $scope.$watch("CalculatedConcession", function (newValue, oldValue) {
            updateGrandTotalAmount();
         });
        $scope.$watch("CalculatedTransport_Charge", function (newValue, oldValue) {
            updateGrandTotalAmount();
         });
        function updateGrandTotalAmount() {
            var grandTotal = 0;

            if (typeof $scope.selectedStudent != 'undefined')
            {
                //
                if ($scope.selectedStudent.RTE == "True") {
                    //if (typeof $scope.selectedStudent.Transport_Charge != 'undefined' && $scope.selectedStudent.Transport_Charge != null) {
                    //    grandTotal += parseInt($scope.selectedStudent.Transport_Charge);
                    //}
                    if (typeof $scope.selectedStudent.PreviousDue != 'undefined' && $scope.selectedStudent.PreviousDue != null) {
                        grandTotal += parseInt($scope.selectedStudent.PreviousDue);
                    }
                    if (typeof $scope.selectedStudent.BalancedShow != 'undefined' && $scope.selectedStudent.BalancedShow != null) {
                        grandTotal += parseInt($scope.selectedStudent.BalancedShow);
                    }
                    if (typeof $scope.selectedStudent.Fine != 'undefined' && $scope.selectedStudent.Fine != null) {
                        grandTotal += parseInt($scope.selectedStudent.Fine);
                    }
                    //if (typeof $scope.selectedStudent.Concession != 'undefined' && $scope.selectedStudent.Concession != null) {
                    //    grandTotal -= parseInt($scope.selectedStudent.Concession);
                    //}
                    if (typeof $scope.CalculatedConcession != 'undefined' && $scope.CalculatedConcession != null) {
                        grandTotal -= parseInt($scope.CalculatedConcession);
                    }
                    if (typeof $scope.CalculatedTransport_Charge != 'undefined' && $scope.CalculatedTransport_Charge != null) {
                        grandTotal += parseInt($scope.CalculatedTransport_Charge);
                    }
                }
                else
                {
                    if (typeof $scope.selectedStudent.TotalAmount != 'undefined' && $scope.selectedStudent.TotalAmount != null) {
                        grandTotal += parseInt($scope.selectedStudent.TotalAmount);
                    }
                    if (typeof $scope.AdmissionFee != 'undefined' && $scope.AdmissionFee != null) {
                        grandTotal += parseInt($scope.AdmissionFee);
                    }
                    //if (typeof $scope.selectedStudent.Transport_Charge != 'undefined' && $scope.selectedStudent.Transport_Charge != null) {
                    //    grandTotal += parseInt($scope.selectedStudent.Transport_Charge);
                    //}
                    if (typeof $scope.selectedStudent.PreviousDue != 'undefined' && $scope.selectedStudent.PreviousDue != null) {
                        grandTotal += parseInt($scope.selectedStudent.PreviousDue);
                    }
                    if (typeof $scope.selectedStudent.BalancedShow != 'undefined' && $scope.selectedStudent.BalancedShow != null) {
                        grandTotal += parseInt($scope.selectedStudent.BalancedShow);
                    }
                    if (typeof $scope.selectedStudent.Fine != 'undefined' && $scope.selectedStudent.Fine != null) {
                        grandTotal += parseInt($scope.selectedStudent.Fine);
                    }
                    //if (typeof $scope.selectedStudent.Concession != 'undefined' && $scope.selectedStudent.Concession != null) {
                    //    grandTotal -= parseInt($scope.selectedStudent.Concession);
                    //}
                     if(typeof $scope.CalculatedConcession != 'undefined' && $scope.CalculatedConcession != null) {
                        grandTotal -= parseInt($scope.CalculatedConcession);
                    }
                    if(typeof $scope.CalculatedTransport_Charge != 'undefined' && $scope.CalculatedTransport_Charge != null) {
                        grandTotal += parseInt($scope.CalculatedTransport_Charge);
                    }
                }
                

                $scope.selectedStudent.GrandTotal = grandTotal;
            }
            
        }
        function setMonthValue(month)
        {
            switch (month) {
                case "January":
                    return 6;
                    break;
                case "February":
                    return 7;
                    break;
                case "March":
                    return 8;
                    break;
                case "April":
                    return 9;
                    break;
                case "May":
                    return 10;
                    break;
                case "June":
                    return 11;
                    break;
                case "July":
                    return 0;
                    break;
                case "August":
                    return 1;
                    break;
                case "September":
                    return 2;
                    break;
                case "October":
                    return 3;
                    break;
                case "November":
                    return 4;
                    break;
                case "December":
                    return 5;
                    break;
            }
            
        }
        function setFeeHeadAmount(submitedMonth) {
            //
            $scope.selectedMonthAmount = {};
            var monthArr = submitedMonth.split(',');
            var FeeHeadDetails = [];

            var amount = 0;
            var i = 0;
            angular.forEach($scope.SelectedClassFeeHeads, function (item) {
                var SelectedClassFeeHeads = item;
                
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

            });

            var HeadFeeAmount = [];
            var j = 0;
            for(var i= 0 ; i < monthArr.length-1 ; i++)
            {
               angular.forEach(FeeHeadDetails, function (item) {
                   if (item.Month == monthArr[i])
                   {
                       HeadFeeAmount.push({ id: j + 1, Month: item.Month, Head: item.Head, Amount: item.Amount, IsMonth: item.IsMonth });
                   }
                });
            }

            $scope.selectedMonthAmount = HeadFeeAmount;
        }
        function setStudentFeeHeadAmount(submitedMonth)
        {
            //
            $scope.selectedMonthAmount = {};
            var monthArr = submitedMonth.split(',');

            var JanAmt = 0;
            var FebAmt = 0;
            var MarchAmt = 0;
            var AprilAmt = 0;
            var MayAmt = 0;
            var JuneAmt = 0;
            var JulyAmt = 0;
            var AugustAmt = 0;
            var SeptAmt = 0;
            var OctAmt = 0;
            var NovAmt = 0;
            var DecAmt = 0;

            for(var i=0 ; i <= monthArr.length-1 ; i++)
            {
                angular.forEach($scope.SelectedClassFeeHeads, function (item) {
                    if (item.hasOwnProperty(submitedMonth) == monthArr[i].indexOf(submitedMonth) >= 0) {
                        //
                        switch (monthArr[i]) {
                            case "July":
                                JulyAmt += parseInt(item.July);
                                break;
                            case "August":
                                AugustAmt += parseInt(item.August);
                                break;
                            case "September":
                                SeptAmt += parseInt(item.September);
                                break;
                            case "October":
                                OctAmt += parseInt(item.October);
                                break;
                            case "November":
                                NovAmt += parseInt(item.November);
                                break;
                            case "December":
                                DecAmt += parseInt(item.Decempber);
                                break;
                            case "January":
                                JanAmt += parseInt(item.January);
                                break;
                            case "February":
                                FebAmt += parseInt(item.February);
                                break;
                            case "March":
                                MarchAmt += parseInt(item.March);
                                break;
                            case "April":
                                AprilAmt += parseInt(item.April);
                                break;
                            case "May":
                                MayAmt += parseInt(item.May);
                                break;
                            case "June":
                                JuneAmt += parseInt(item.June);
                                break;

                        }
                    }
                });
            }

            var selectedMonthAmount = [];
            
            if (JulyAmt != 0) {
                selectedMonthAmount.push({ id: 6, Month: "July", Amount: JulyAmt });
            }
            if (AugustAmt != 0) {
                selectedMonthAmount.push({ id: 7, Month: "August", Amount: AugustAmt });
            }
            if (SeptAmt != 0) {
                selectedMonthAmount.push({ id: 8, Month: "September", Amount: SeptAmt });
            }
            if (OctAmt != 0) {
                selectedMonthAmount.push({ id: 9, Month: "October", Amount: OctAmt });
            }
            if (NovAmt != 0) {
                selectedMonthAmount.push({ id: 10, Month: "November", Amount: NovAmt });
            }
            if (DecAmt != 0) {
                selectedMonthAmount.push({ id: 11, Month: "December", Amount: DecAmt });
            }
            if (JanAmt != 0) {
                selectedMonthAmount.push({ id: 0, Month: "January", Amount: JanAmt });
            }
            if (FebAmt != 0) {
                selectedMonthAmount.push({ id: 1, Month: "February", Amount: FebAmt });
            }
            if (MarchAmt != 0) {
                selectedMonthAmount.push({ id: 2, Month: "March", Amount: MarchAmt });
            }
            if (AprilAmt != 0) {
                selectedMonthAmount.push({ id: 3, Month: "April", Amount: AprilAmt });
            }
            if (MayAmt != 0) {
                selectedMonthAmount.push({ id: 4, Month: "May", Amount: MayAmt });
            }
            if (JuneAmt != 0) {
                selectedMonthAmount.push({ id: 5, Month: "June", Amount: JuneAmt });
            }
            $scope.selectedMonthAmount = selectedMonthAmount;
        }
    }
})();



